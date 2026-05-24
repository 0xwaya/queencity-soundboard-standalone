import { POLL_ARTISTS, isPollArtist, type PollArtist } from "@/lib/poll-artists";
import { Redis } from "@upstash/redis";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export type VoteCounts = Record<PollArtist, number>;

const DEFAULT_LIMIT_MAX = 1;
const DEFAULT_LIMIT_WINDOW_SECONDS = 6 * 60 * 60;
const DEFAULT_STORAGE_FILE = "/tmp/qcs-poll-votes.json";
const DEFAULT_AUDIT_FILE = "/tmp/qcs-poll-reset-audit.log";
const DEFAULT_KV_PREFIX = "qcs:poll";
const DEFAULT_CAMPAIGN_ID = "default";

const rateLimitMaxVotes = Number(process.env.POLL_RATE_LIMIT_MAX_VOTES ?? DEFAULT_LIMIT_MAX);
const rateLimitWindowSeconds = Number(process.env.POLL_RATE_LIMIT_WINDOW_SECONDS ?? DEFAULT_LIMIT_WINDOW_SECONDS);
const storageFile = process.env.POLL_STORAGE_FILE || DEFAULT_STORAGE_FILE;
const auditFile = process.env.POLL_RESET_AUDIT_FILE || DEFAULT_AUDIT_FILE;
const kvPrefix = process.env.POLL_KV_PREFIX || DEFAULT_KV_PREFIX;
const campaignId = process.env.POLL_CAMPAIGN_ID || DEFAULT_CAMPAIGN_ID;
const storageAdapter = (process.env.POLL_STORAGE_ADAPTER || "auto").toLowerCase();
const hasKvEnv = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

const voteCounts = initializeCounts();
const ipVotes = new Map<string, number[]>();
const redis = hasKvEnv
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

hydrateFromDisk();

function initializeCounts(): VoteCounts {
  return POLL_ARTISTS.reduce((acc, artist) => {
    acc[artist] = 0;
    return acc;
  }, {} as VoteCounts);
}

function normalizeIp(ip: string): string {
  return ip.trim() || "unknown";
}

function canVote(ip: string, now: number): { allowed: boolean; retryAfterSeconds: number } {
  const key = normalizeIp(ip);
  const windowMs = Math.max(1, rateLimitWindowSeconds) * 1000;
  const maxVotes = Math.max(1, rateLimitMaxVotes);
  const oldestAllowedTs = now - windowMs;
  const attempts = (ipVotes.get(key) ?? []).filter((ts) => ts >= oldestAllowedTs);

  if (attempts.length >= maxVotes) {
    const oldest = attempts[0] ?? now;
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    ipVotes.set(key, attempts);
    return { allowed: false, retryAfterSeconds };
  }

  attempts.push(now);
  ipVotes.set(key, attempts);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getVoteTotals(): VoteCounts {
  return { ...voteCounts };
}

function shouldUseKvAdapter() {
  if (storageAdapter === "kv") {
    return hasKvEnv;
  }
  if (storageAdapter === "local") {
    return false;
  }
  return hasKvEnv;
}

function getResolvedStorageMode(): "kv" | "local" {
  return shouldUseKvAdapter() ? "kv" : "local";
}

function getWindowMeta(now: number) {
  const windowMs = Math.max(1, rateLimitWindowSeconds) * 1000;
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const windowEnd = windowStart + windowMs;
  return { windowMs, windowStart, windowEnd };
}

function getVoteKey(artist: PollArtist): string {
  return `${kvPrefix}:campaign:${campaignId}:votes:${artist}`;
}

function getRateLimitKey(ipAddress: string, windowStart: number): string {
  return `${kvPrefix}:campaign:${campaignId}:rate:${normalizeIp(ipAddress)}:${windowStart}`;
}

function getResetAuditKey(): string {
  return `${kvPrefix}:campaign:${campaignId}:audit:resets`;
}

function hydrateFromDisk() {
  if (!existsSync(storageFile)) {
    return;
  }

  try {
    const raw = readFileSync(storageFile, "utf8");
    const payload = JSON.parse(raw) as { counts?: Record<string, unknown> };
    const persistedCounts = payload.counts ?? {};

    POLL_ARTISTS.forEach((artist) => {
      const value = Number(persistedCounts[artist]);
      voteCounts[artist] = Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
    });
  } catch (error) {
    console.error("[votes-store] Failed to hydrate vote counts from disk", error);
  }
}

function persistToDisk() {
  try {
    mkdirSync(dirname(storageFile), { recursive: true });
    writeFileSync(storageFile, JSON.stringify({ counts: voteCounts, savedAt: new Date().toISOString() }), "utf8");
  } catch (error) {
    console.error("[votes-store] Failed to persist vote counts", error);
  }
}

function persistResetAuditToDisk(event: Record<string, unknown>) {
  try {
    mkdirSync(dirname(auditFile), { recursive: true });
    writeFileSync(auditFile, `${JSON.stringify(event)}\n`, { encoding: "utf8", flag: "a" });
  } catch (error) {
    console.error("[votes-store] Failed to persist reset audit log", error);
  }
}

async function getVoteTotalsFromKv(): Promise<VoteCounts> {
  const next = initializeCounts();
  if (!redis) {
    return next;
  }

  await Promise.all(
    POLL_ARTISTS.map(async (artist) => {
      const value = Number(await redis.get<number>(getVoteKey(artist)));
      next[artist] = Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
    }),
  );

  return next;
}

async function submitVoteToKv(input: { artist: PollArtist; ipAddress: string; now: number }): Promise<
  | { ok: true; totals: VoteCounts }
  | { ok: false; reason: "rate_limited"; retryAfterSeconds: number }
> {
  if (!redis) {
    return { ok: true, totals: getVoteTotals() };
  }

  const { windowEnd, windowStart } = getWindowMeta(input.now);
  const maxVotes = Math.max(1, rateLimitMaxVotes);
  const rateKey = getRateLimitKey(input.ipAddress, windowStart);
  const attempts = await redis.incr(rateKey);
  if (attempts === 1) {
    await redis.expire(rateKey, Math.max(1, rateLimitWindowSeconds));
  }

  if (attempts > maxVotes) {
    const retryAfterSeconds = Math.max(1, Math.ceil((windowEnd - input.now) / 1000));
    return { ok: false, reason: "rate_limited", retryAfterSeconds };
  }

  await redis.incr(getVoteKey(input.artist));
  const totals = await getVoteTotalsFromKv();
  return { ok: true, totals };
}

async function resetVotesInKv(): Promise<VoteCounts> {
  if (!redis) {
    return initializeCounts();
  }

  await Promise.all(POLL_ARTISTS.map((artist) => redis.del(getVoteKey(artist))));
  return initializeCounts();
}

async function submitVoteToLocal(input: { artist: PollArtist; ipAddress: string; now: number }): Promise<
  | { ok: true; totals: VoteCounts }
  | { ok: false; reason: "rate_limited"; retryAfterSeconds: number }
> {
  const gate = canVote(input.ipAddress, input.now);
  if (!gate.allowed) {
    return { ok: false, reason: "rate_limited", retryAfterSeconds: gate.retryAfterSeconds };
  }

  voteCounts[input.artist] += 1;
  persistToDisk();
  return { ok: true, totals: getVoteTotals() };
}

function resetVotesInLocal(): VoteCounts {
  POLL_ARTISTS.forEach((artist) => {
    voteCounts[artist] = 0;
  });
  persistToDisk();
  return getVoteTotals();
}

export async function getVoteTotalsForApi(): Promise<VoteCounts> {
  if (shouldUseKvAdapter()) {
    return getVoteTotalsFromKv();
  }

  return getVoteTotals();
}

export function getVoteStorageStatusForApi(): {
  mode: "kv" | "local";
  configuredAdapter: string;
  kvConfigured: boolean;
  campaignId: string;
} {
  return {
    mode: getResolvedStorageMode(),
    configuredAdapter: storageAdapter,
    kvConfigured: hasKvEnv,
    campaignId,
  };
}

export async function recordResetAuditForApi(event: {
  outcome: "success" | "unauthorized" | "not_configured";
  ipAddress: string;
  userAgent: string;
  totals?: VoteCounts;
}) {
  const payload = {
    at: new Date().toISOString(),
    campaignId,
    mode: getResolvedStorageMode(),
    outcome: event.outcome,
    ipAddress: normalizeIp(event.ipAddress),
    userAgent: event.userAgent,
    totals: event.totals,
  };

  if (shouldUseKvAdapter() && redis) {
    try {
      await redis.lpush(getResetAuditKey(), JSON.stringify(payload));
      await redis.ltrim(getResetAuditKey(), 0, 199);
    } catch (error) {
      console.error("[votes-store] Failed to persist reset audit log in KV", error);
    }
  }

  persistResetAuditToDisk(payload);
}

export async function resetVoteTotalsForApi(): Promise<VoteCounts> {
  if (shouldUseKvAdapter()) {
    return resetVotesInKv();
  }

  return resetVotesInLocal();
}

export async function submitVote(input: { artist: string; ipAddress: string; now?: number }): Promise<
  | { ok: true; totals: VoteCounts }
  | { ok: false; reason: "invalid_artist" }
  | { ok: false; reason: "rate_limited"; retryAfterSeconds: number }
> {
  const now = input.now ?? Date.now();
  if (!isPollArtist(input.artist)) {
    return { ok: false, reason: "invalid_artist" };
  }

  if (shouldUseKvAdapter()) {
    return submitVoteToKv({ artist: input.artist, ipAddress: input.ipAddress, now });
  }

  return submitVoteToLocal({ artist: input.artist, ipAddress: input.ipAddress, now });
}

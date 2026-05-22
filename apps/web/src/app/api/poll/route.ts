import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getServerSupabaseClient,
  hasServerSupabaseConfig,
} from "@/lib/supabase-server";

const ARTISTS = [
  "Rudy La Escala",
  "Elena Rose",
  "José Feliciano",
  "Servando y Florentino",
] as const;

type Artist = (typeof ARTISTS)[number];

// --- Rate limiting (soft, in-memory per serverless instance) ---
// Acts as a first line of defence against rapid-fire abuse within the same
// cold-start window.  The durable guard is the HttpOnly cookie set on success.
// Note: this map is reset on every cold-start / deployment in serverless
// environments (e.g. Vercel).  That is intentional — it provides best-effort
// abuse prevention and is not a substitute for a distributed rate-limit store.
const IP_RATE_WINDOW_MS = 60_000; // 1 minute
const IP_RATE_MAX_VOTES = 3;
// Cap map size to prevent memory growth in long-running environments.
const IP_RATE_MAP_MAX_ENTRIES = 2_000;

type IpEntry = { count: number; windowStart: number };
const ipRateMap = new Map<string, IpEntry>();

function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateMap.get(ip);

  if (!entry || now - entry.windowStart > IP_RATE_WINDOW_MS) {
    ipRateMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= IP_RATE_MAX_VOTES) return true;

  entry.count += 1;
  return false;
}

// Prune stale IP entries to avoid unbounded memory growth.
// Also enforces a hard cap to handle burst scenarios in long-running instances.
function pruneIpRateMap() {
  const now = Date.now();
  for (const [ip, entry] of ipRateMap.entries()) {
    if (now - entry.windowStart > IP_RATE_WINDOW_MS) {
      ipRateMap.delete(ip);
    }
  }
  // If the map is still over the cap after expiry pruning, evict oldest entries.
  if (ipRateMap.size > IP_RATE_MAP_MAX_ENTRIES) {
    let evict = ipRateMap.size - IP_RATE_MAP_MAX_ENTRIES;
    for (const ip of ipRateMap.keys()) {
      if (evict-- <= 0) break;
      ipRateMap.delete(ip);
    }
  }
}

const VOTE_COOKIE = "qcs_poll_voted";
const VOTE_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

// --- POST /api/poll  (submit vote) ---

const voteBodySchema = z.object({
  artist_name: z.enum(ARTISTS),
});

export async function POST(request: Request) {
  if (!hasServerSupabaseConfig()) {
    return NextResponse.json(
      { error: "Poll backend not configured." },
      { status: 503 },
    );
  }

  // Cookie guard — durable per-browser rate limit
  const cookieHeader = request.headers.get("cookie") ?? "";
  if (cookieHeader.includes(`${VOTE_COOKIE}=1`)) {
    return NextResponse.json(
      { error: "You have already voted." },
      { status: 429 },
    );
  }

  // IP guard — soft per-instance throttle.
  // Prefer platform headers (Vercel / Cloudflare) over raw x-forwarded-for,
  // which can be spoofed by clients that connect without a trusted proxy.
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;

  // If we cannot determine the IP (e.g. local dev behind no proxy) skip the
  // IP guard and rely solely on the cookie guard above.
  if (ip !== null) {
    pruneIpRateMap();
    if (isIpRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many votes. Please wait a moment." },
        { status: 429 },
      );
    }
  }

  // Validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = voteBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid artist name." },
      { status: 400 },
    );
  }

  const { artist_name } = parsed.data;

  try {
    const supabase = getServerSupabaseClient();
    const { error: insertError } = await supabase
      .from("artist_votes")
      .insert({ artist_name });

    if (insertError) {
      console.error("[POST /api/poll] Insert failed", insertError);
      return NextResponse.json(
        { error: "Vote failed. Please try again." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[POST /api/poll] Unexpected error", err);
    return NextResponse.json(
      { error: "Vote failed. Please try again." },
      { status: 500 },
    );
  }

  // Set durable anti-spam cookie
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set(VOTE_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: VOTE_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

// --- GET /api/poll  (fetch vote totals) ---

type VoteTotalRow = { artist_name: string; vote_count: number | string };

export async function GET() {
  if (!hasServerSupabaseConfig()) {
    // Return zero counts so the widget renders in offline mode.
    const counts = Object.fromEntries(ARTISTS.map((a) => [a, 0]));
    return NextResponse.json({ counts, offline: true }, { status: 200 });
  }

  try {
    const supabase = getServerSupabaseClient();
    const counts = Object.fromEntries(ARTISTS.map((a) => [a, 0]));

    const { data, error: rpcError } = await supabase.rpc(
      "get_artist_vote_totals",
    );

    if (rpcError) {
      // Fallback: aggregate client-side from raw rows
      const { data: rows, error: selectError } = await supabase
        .from("artist_votes")
        .select("artist_name");

      if (selectError) throw selectError;

      (rows ?? []).forEach((row: { artist_name: string }) => {
        if (row.artist_name in counts) {
          counts[row.artist_name as Artist] += 1;
        }
      });

      return NextResponse.json({ counts }, { status: 200 });
    }

    (data ?? []).forEach((row: VoteTotalRow) => {
      if (row.artist_name in counts) {
        const value = Number(row.vote_count);
        counts[row.artist_name as Artist] = Number.isFinite(value) ? value : 0;
      }
    });

    return NextResponse.json({ counts }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/poll] Failed to fetch vote totals", err);
    return NextResponse.json(
      { error: "Unable to load votes." },
      { status: 500 },
    );
  }
}

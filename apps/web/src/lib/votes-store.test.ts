import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { existsSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const storagePath = join(tmpdir(), "qcs-poll-votes-store.test.json");
const auditPath = join(tmpdir(), "qcs-poll-votes-reset.test.log");

async function loadVoteStore() {
  process.env.POLL_STORAGE_ADAPTER = "local";
  process.env.POLL_RATE_LIMIT_MAX_VOTES = "0";
  process.env.POLL_STORAGE_FILE = storagePath;
  process.env.POLL_RESET_AUDIT_FILE = auditPath;
  vi.resetModules();
  return await import("./votes-store");
}

function cleanup() {
  if (existsSync(storagePath)) unlinkSync(storagePath);
  if (existsSync(auditPath)) unlinkSync(auditPath);
}

describe("votes-store", () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  it("allows repeated votes from the same IP when rate limiting is disabled", async () => {
    const { submitVote, getVoteTotalsForApi } = await loadVoteStore();

    const artist = "Ilegales";
    const firstVote = await submitVote({ artist, ipAddress: "127.0.0.1" });
    expect(firstVote.ok).toBe(true);
    expect(firstVote.totals[artist]).toBe(1);

    const secondVote = await submitVote({ artist, ipAddress: "127.0.0.1" });
    expect(secondVote.ok).toBe(true);
    expect(secondVote.totals[artist]).toBe(2);

    const totals = await getVoteTotalsForApi();
    expect(totals[artist]).toBe(2);
  });

  it("rejects invalid artists", async () => {
    const { submitVote } = await loadVoteStore();
    const result = await submitVote({ artist: "InvalidArtist", ipAddress: "127.0.0.1" });
    expect(result.ok).toBe(false);
    expect((result as { reason: string }).reason).toBe("invalid_artist");
  });
});

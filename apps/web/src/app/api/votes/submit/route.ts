import { NextResponse } from "next/server";
import { z } from "zod";
import { submitVote } from "@/lib/votes-store";

const voteSchema = z.object({
  artist: z.string().trim().min(1),
});

export const dynamic = "force-dynamic";

function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) {
    return fwd.split(",")[0]?.trim() ?? "unknown";
  }

  return headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const parsed = voteSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const result = await submitVote({
    artist: parsed.data.artist,
    ipAddress: getClientIp(request.headers),
  });

  if (!result.ok && result.reason === "invalid_artist") {
    return NextResponse.json({ error: "invalid_artist" }, { status: 400 });
  }

  if (!result.ok && result.reason === "rate_limited") {
    return NextResponse.json(
      { error: "rate_limited", retryAfterSeconds: result.retryAfterSeconds },
      {
        status: 429,
        headers: { "retry-after": String(result.retryAfterSeconds) },
      },
    );
  }

  return NextResponse.json({ totals: result.totals }, { status: 201 });
}

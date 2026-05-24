import { NextResponse } from "next/server";
import { recordResetAuditForApi, resetVoteTotalsForApi } from "@/lib/votes-store";

export const dynamic = "force-dynamic";

function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) {
    return fwd.split(",")[0]?.trim() ?? "unknown";
  }

  return headers.get("x-real-ip")?.trim() || "unknown";
}

function getUserAgent(headers: Headers): string {
  return headers.get("user-agent")?.trim() || "unknown";
}

function isAuthorized(request: Request): boolean {
  const configuredKey = process.env.POLL_ADMIN_KEY;
  if (!configuredKey) {
    return false;
  }

  const providedKey = request.headers.get("x-poll-admin-key") ?? "";
  return providedKey.length > 0 && providedKey === configuredKey;
}

export async function POST(request: Request) {
  const ipAddress = getClientIp(request.headers);
  const userAgent = getUserAgent(request.headers);

  if (!process.env.POLL_ADMIN_KEY) {
    await recordResetAuditForApi({
      outcome: "not_configured",
      ipAddress,
      userAgent,
    });
    return NextResponse.json(
      { error: "admin_key_not_configured" },
      { status: 503 },
    );
  }

  if (!isAuthorized(request)) {
    await recordResetAuditForApi({
      outcome: "unauthorized",
      ipAddress,
      userAgent,
    });
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const totals = await resetVoteTotalsForApi();
  await recordResetAuditForApi({
    outcome: "success",
    ipAddress,
    userAgent,
    totals,
  });
  return NextResponse.json({ ok: true, totals }, { status: 200 });
}

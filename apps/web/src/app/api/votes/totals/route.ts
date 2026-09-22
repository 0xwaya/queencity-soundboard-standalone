import { NextResponse } from "next/server";
import { getVoteTotalsForApi } from "@/lib/votes-store";
import { getActivePollArtists } from "@/lib/poll-artists";

export const dynamic = "force-dynamic";

export async function GET() {
  const totals = await getVoteTotalsForApi(await getActivePollArtists());
  return NextResponse.json({ totals }, { status: 200 });
}

import { NextResponse } from "next/server";
import { getVoteTotalsForApi } from "@/lib/votes-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const totals = await getVoteTotalsForApi();
  return NextResponse.json({ totals }, { status: 200 });
}

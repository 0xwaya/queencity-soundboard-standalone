import { NextResponse } from "next/server";
import { getVoteStorageStatusForApi } from "@/lib/votes-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    storage: getVoteStorageStatusForApi(),
  });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSupabaseClient, hasServerSupabaseConfig } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const submissionSchema = z.object({
  title: z.string().trim().min(1).max(200),
  artistName: z.string().trim().max(200).optional(),
  venueName: z.string().trim().max(200).optional(),
  eventDate: z.string().trim().optional(),
  category: z.string().trim().max(50).optional(),
  description: z.string().trim().max(2000).optional(),
  ticketUrl: z.string().trim().url().optional().or(z.literal("")),
  submitterName: z.string().trim().max(200).optional(),
  submitterEmail: z.string().trim().email(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (!hasServerSupabaseConfig()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { title, artistName, venueName, eventDate, category, description, ticketUrl, submitterName, submitterEmail } =
    parsed.data;

  const supabase = getServerSupabaseClient();
  const { error } = await supabase.from("event_submissions").insert({
    title,
    artist_name: artistName || null,
    venue_name: venueName || null,
    event_date: eventDate || null,
    category: category || null,
    description: description || null,
    ticket_url: ticketUrl || null,
    submitter_name: submitterName || null,
    submitter_email: submitterEmail,
  });

  if (error) {
    console.error("[api/events/submit] insert failed", error);
    return NextResponse.json({ error: "submission_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

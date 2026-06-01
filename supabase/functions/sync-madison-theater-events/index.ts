import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface MadisonEvent {
  title: string;
  date: string;
  venue: string;
  ticketUrl?: string;
  detailsUrl?: string;
}

/**
 * Sync Madison Theater events from their official website.
 * Runs weekly via scheduled invocation.
 * Upserts events to the database.
 */
export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("[madison-sync] Fetching events from madisontheater.com...");

    // Fetch Madison Theater's public events page
    const response = await fetch("https://madisontheater.com/api/events", {
      method: "GET",
      headers: {
        "accept": "application/json",
        "user-agent": "QueenCitySoundboard/1.0",
      },
    });

    if (!response.ok) {
      console.warn(
        `[madison-sync] Failed to fetch Madison Theater events: ${response.status}`,
      );
      return new Response(
        JSON.stringify({
          error: "fetch_failed",
          status: response.status,
          synced: 0,
        }),
        { status: 400, headers: { "content-type": "application/json" } },
      );
    }

    const data = (await response.json()) as { events?: MadisonEvent[] };
    const events = data.events || [];

    console.log(
      `[madison-sync] Fetched ${events.length} events from Madison Theater`,
    );

    if (events.length === 0) {
      console.warn("[madison-sync] No events found on Madison Theater website");
      return new Response(
        JSON.stringify({ message: "no_events_found", synced: 0 }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }

    // Get Madison Theater venue
    const { data: venues, error: venueError } = await supabase
      .from("venues")
      .select("id")
      .eq("name", "Madison Theater")
      .single();

    if (venueError || !venues?.id) {
      console.error("[madison-sync] Madison Theater venue not found in DB");
      return new Response(
        JSON.stringify({ error: "venue_not_found" }),
        { status: 400, headers: { "content-type": "application/json" } },
      );
    }

    const venueId = venues.id;

    // Upsert events
    const upsertPromises = events.map((event) => {
      const eventDate = new Date(event.date).toISOString();
      const artistName = event.title.split(" - ")[0] || event.title;

      return supabase.from("events").upsert(
        {
          title: event.title,
          artist_name: artistName,
          event_date: eventDate,
          venue_id: venueId,
          status: "published",
          description: event.venue || undefined,
          ticket_url: event.ticketUrl,
          // external_url for tracking source
          external_url: event.detailsUrl,
        },
        {
          onConflict: "title,event_date", // Avoid duplicates
        },
      );
    });

    const results = await Promise.all(upsertPromises);
    const failedCount = results.filter((r) => r.error).length;
    const syncedCount = results.length - failedCount;

    if (failedCount > 0) {
      console.error(
        `[madison-sync] ${failedCount} events failed to sync`,
        results.filter((r) => r.error),
      );
    }

    console.log(
      `[madison-sync] Successfully synced ${syncedCount}/${results.length} events`,
    );

    return new Response(
      JSON.stringify({
        message: "sync_completed",
        synced: syncedCount,
        failed: failedCount,
        total: results.length,
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  } catch (error) {
    console.error("[madison-sync] Unexpected error:", error);
    return new Response(
      JSON.stringify({
        error: "internal_server_error",
        message: error instanceof Error ? error.message : "unknown",
      }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}

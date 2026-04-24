import { getSupabaseBrowserClient, type EventItem, type MerchItem } from "@/lib/supabase";
import { normalizeHttpsUrl } from "@/lib/url";

export type QueryResult<T> = {
  data: T;
  error: string | null;
};

export async function getPublishedEvents(): Promise<QueryResult<EventItem[]>> {
  try {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("events")
      .select(
        "id,title,artist_name,description,hero_image_url,event_date,status,venue_id,ticket_url,venues(id,name,city,state)",
      )
      .eq("status", "published")
      .order("event_date", { ascending: true });

    if (error) {
      console.error("[getPublishedEvents] Supabase query failed", error);
      return { data: [], error: "Unable to load events right now." };
    }

    const rows = (data ?? []) as Array<EventItem & { venues?: EventItem["venues"] | EventItem["venues"][] }>;
    const normalizedRows = rows.map((row) => ({
      ...row,
      ticket_url: normalizeHttpsUrl(row.ticket_url),
      venues: Array.isArray(row.venues) ? row.venues[0] ?? null : row.venues ?? null,
    }));
    return { data: normalizedRows, error: null };
  } catch (err) {
    console.error("[getPublishedEvents] Unexpected failure", err);
    return { data: [], error: "Unable to load events right now." };
  }
}

export async function getActiveMerch(): Promise<QueryResult<MerchItem[]>> {
  try {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("merch")
      .select("id,name,description,price_cents,inventory_count,image_url,is_active")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getActiveMerch] Supabase query failed", error);
      return { data: [], error: "Unable to load merch right now." };
    }
    return { data: (data as MerchItem[]) ?? [], error: null };
  } catch (err) {
    console.error("[getActiveMerch] Unexpected failure", err);
    return { data: [], error: "Unable to load merch right now." };
  }
}

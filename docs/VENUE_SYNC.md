# Event Sync Automation

## Overview

QueenCity Soundboard pulls events from multiple sources into a single `events` table, tagged with
`source` (`sync` | `manual` | `submission`) and `category`. Priority order for onboarding a new venue:

1. **Aggregator API** (Ticketmaster Discovery API, SeatGeek) — covers most touring/mid-size venues with
   minimal maintenance and gives a "trending" signal for free.
2. **Direct venue scrape** — only for venues an aggregator doesn't cover but which expose a public
   JSON/API endpoint (see the Madison Theater sync below as the reference pattern).
3. **Manual entry / `/partners` submission** — everything else (small/indie rooms, one-off shows).

## Sync Functions

### `sync-ticketmaster-events`

- Queries the [Ticketmaster Discovery API](https://developer.ticketmaster.com/) (free tier) for
  Music/Comedy/Sports events within a 25-mile radius of Cincinnati.
- Maps Ticketmaster classifications to our `category` enum, upserts the venue by name if missing,
  and upserts events on `(title, event_date)`.
- Requires `TICKETMASTER_API_KEY` — without it the function returns `503 not_configured` instead of failing.
- Deploy: `cd supabase/functions/sync-ticketmaster-events && supabase functions deploy sync-ticketmaster-events --no-verify-jwt`

### `sync-madison-theater-events`

Automated weekly sync of events from [Madison Theater's official website](https://madisontheater.com/).
Kept as the reference implementation for scraping a venue that isn't covered by an aggregator.

1. **Supabase Edge Function** (`sync-madison-theater-events`)
   - Fetches event data from Madison Theater's public API
   - Upserts events to the `events` table (deduplicates by title + date)
   - Tags events with `external_url` for source tracking
   - Preserves existing ticket URLs

2. **Weekly Trigger**
   - Scheduled via Supabase Cron (Postgres pg_cron extension)
   - Runs every Sunday at 2 AM UTC
   - Sends webhook to Edge Function

## Setup Instructions

### 1. Deploy Edge Function

```bash
cd supabase/functions/sync-madison-theater-events
supabase functions deploy sync-madison-theater-events --no-verify-jwt
```

### 2. Create Weekly Cron Job


In Supabase SQL editor:

```sql
-- Enable pg_cron extension
create extension if not exists pg_cron;

-- Schedule weekly sync (Sundays at 2:00 AM UTC)
select cron.schedule(
  'madison-theater-sync-weekly',
  '0 2 * * 0',
  $$
  select net.http_post(
    url := (select concat(
      'https://',
      current_setting('app.supabase_url'),
      '/functions/v1/sync-madison-theater-events'
    )),
    headers := jsonb_build_object(
      'authorization', concat('Bearer ', current_setting('app.service_role_key')),
      'content-type', 'application/json'
    ),
    body := '{"event":"scheduled"}'::jsonb
  ) as request_id;
  $$
);
```

### 3. Test the Sync Manually

```bash
curl -X POST https://your-supabase-url/functions/v1/sync-madison-theater-events \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 4. Monitor Sync Logs

View function logs in Supabase dashboard:
- Navigate to **Functions** → **sync-madison-theater-events**
- Check the **Logs** tab for recent invocations

## Event Data Mapping

Events synced from Madison Theater are mapped as:

| Field | Source |
|-------|--------|
| `title` | Event name from Madison Theater |
| `artist_name` | First part of title (before " - ") |
| `event_date` | Event date/time from Madison Theater |
| `venue_id` | Madison Theater (UUID) |
| `status` | Published |
| `ticket_url` | Ticketweb or venue ticket link |
| `external_url` | Link to event page on madisontheater.com |

## Failure Handling

- Failed syncs are logged in Supabase function logs
- No events are deleted; only new/updated events are added
- If Madison Theater API is unavailable, the job silently fails and retries next week
- Check the **Functions** dashboard for error details

## Updating Event URLs

After events are synced, you can:

1. **Update ticket URLs** — manually edit `ticket_url` field if tickets move
2. **Archive old events** — set `status = 'archived'` for past events
3. **Add context** — extend `description` field with QCS-specific notes

Example update:

```sql
update public.events
set ticket_url = 'https://www.ticketweb.com/...'
where title = 'Event Name' and event_date > now();
```

## Manual Cross-Reference

For one-off updates before automation is live:

1. Visit https://madisontheater.com/events
2. Compare against `/madison-theater` page
3. Manually update any missing/outdated events in Supabase
4. Verify ticket URLs match official site

## Next Steps

- ✅ Deploy Edge Function
- ✅ Set up Cron job
- 📋 Monitor first sync (next Sunday 2 AM UTC)
- 🔄 Adjust sync schedule if needed (e.g., daily instead of weekly)

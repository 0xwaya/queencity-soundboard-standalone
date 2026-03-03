# QueenCity Soundboard — Deployment Steps (Patch 1)

## Objective
Ship web-first MVP using:
- Vercel (Next.js hosting)
- Supabase (DB/Auth/Storage)
- Ticket Tailor (hosted checkout/widget)
- GoDaddy (domain DNS)

## 1) Preflight (local)
1. Confirm app runs:
   ```bash
   cd queencity-soundboard/apps/web
   npm install
   npm run dev
   ```
2. Confirm env template exists: `.env.example`
3. Confirm at least one placeholder logo is selected for v0 launch.

## 2) Supabase setup
1. Create project: `queencitysoundboard-prod` (US East)
2. Run migration in SQL editor:
   - `queencity-soundboard/supabase/migrations/20260302_000001_init.sql`
3. Create storage bucket:
   - name: `images`
   - public: `true`
4. Save keys for Vercel env:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3) Seed launch data
1. Add at least one venue (if not seeded)
2. Add one event in `events` with `status='published'`
3. (Optional) add one merch item
4. (Recommended) set `events.ticket_url` per published event for direct checkout links

## 4) Ticket Tailor integration
1. Create event in Ticket Tailor
2. Copy public checkout URL / widget URL
3. Set Vercel env:
   - `NEXT_PUBLIC_TICKETING_WIDGET_URL=<ticket_tailor_url>` (global fallback)

## 5) Vercel deploy
1. Import repo into Vercel
2. Set root directory:
   - `queencity-soundboard/apps/web`
3. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_TICKETING_WIDGET_URL`
4. Deploy and verify preview URL

## 6) Domain cutover (GoDaddy -> Vercel)
DNS records:
- `A` record: `@` -> `76.76.21.21`
- `CNAME`: `www` -> `cname.vercel-dns.com`

In Vercel project:
- Add domains:
  - `queencitysoundboard.com`
  - `www.queencitysoundboard.com`
- Wait for SSL provisioning

## 7) Launch QA checklist
- [ ] Home renders properly on mobile + desktop
- [ ] `/events` lists published events
- [ ] Ticket button opens Ticket Tailor flow
- [ ] No secrets exposed in client code
- [ ] Basic performance sanity (no broken images/console errors)
- [ ] Domain + HTTPS active

## 8) Post-launch day-1 ops
- Track:
  - event page visits
  - ticket CTA clicks
  - conversion in Ticket Tailor dashboard
- Patch queue:
  - branding polish
  - admin UX improvements
  - analytics + attribution tuning

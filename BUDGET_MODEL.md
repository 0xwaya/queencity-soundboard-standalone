# QueenCity Soundboard — Budget Model (Patch 2)

## Current integrations (from repo)

- **Web hosting:** Vercel (Next.js)
- **Data/Auth/Storage:** Supabase
- **Ticketing:** Ticket Tailor widget + API/webhooks
- **Domain/DNS:** GoDaddy
- **Payments:** Ticket Tailor checkout (processor fees baked into provider flow)
- **Optional (future):** Direct Stripe (only if we move off Ticket Tailor checkout)

---

## Fixed monthly costs (baseline)

| Item | Est. Monthly | Notes |
| --- | ---:| --- |
| Vercel Pro (1 seat) | **$20** | Commercial use + team features |
| Supabase Pro (1 project) | **$25** | Core DB/Auth/Storage |
| Domain (GoDaddy) | **~$1–$2** | ~$12–$24/yr equivalent |

**Fixed infra baseline: ~$46–$47/month**

> Overages to watch: Supabase storage/egress/MAU, Vercel bandwidth/edge.

---

## Variable costs (ticketing + processing)

Let:

- `P` = average ticket price
- `N` = number of paid tickets/month
- `tt_fee` = Ticket Tailor fee per ticket (verify current plan)
- `proc_pct` = payment processor percent fee (e.g., 2.9%)
- `proc_fix` = payment processor fixed fee per order (e.g., $0.30)
- `orders` = number of checkout orders/month

**Estimated variable monthly cost:**

```
variable = (N * tt_fee) + (N * P * proc_pct) + (orders * proc_fix)
```

**Total monthly cost:**

```
total = fixed + variable
```

---

## Scenario table (example only — verify Ticket Tailor plan)

Assumptions:

- `P = $35`
- `tt_fee = $0.85` (placeholder)
- `proc_pct = 2.9%`
- `proc_fix = $0.30`
- `orders ~= N` (1 ticket/order)

### Lean launch (200 tickets/month)

- Fixed: $47
- Ticketing fee: 200 * 0.85 = $170
- Processing %: 200 *35* 0.029 = $203
- Processing fixed: 200 * 0.30 = $60
- **Total est.: ~$480/month**

### Growth (600 tickets/month)

- Fixed: $47
- Ticketing fee: $510
- Processing %: $609
- Processing fixed: $180
- **Total est.: ~$1,346/month**

### Scale (1500 tickets/month)

- Fixed: $47
- Ticketing fee: $1,275
- Processing %: $1,522.50
- Processing fixed: $450
- **Total est.: ~$3,295/month**

---

## Revenue sanity check (ticket-only)

At $35 average:

- 200 tickets = **$7,000 gross**
- 600 tickets = **$21,000 gross**
- 1500 tickets = **$52,500 gross**

Approx cost ratio under example assumptions:

- 200: ~6.9%
- 600: ~6.4%
- 1500: ~6.3%

*(Excludes event production, artist guarantees, and marketing spend.)*

---

## Notes / Next validation

1. Confirm Ticket Tailor pricing plan + per-ticket fee.
2. Confirm payment processor fees used in Ticket Tailor checkout.
3. Set usage alerts on Supabase/Vercel to avoid surprise overages.
4. If moving to direct Stripe, replace `tt_fee` with Stripe-only fees and add PCI scope review.

## 2026-04-23 implementation note

- SEO/local-SEO upgrades and test harness additions were implemented inside the existing Next.js stack and do not add new recurring SaaS cost by themselves.

import type { Metadata } from "next";
import PollWidget from "@/components/poll-widget";
import TrackedLink from "@/components/tracked-link";
import FeaturedEventsWidget from "@/components/featured-events-widget";
import { getLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { getPublishedEvents } from "@/lib/data";

export const metadata: Metadata = buildPageMetadata({
  title: "Cincinnati's Soundboard for the Hottest Events",
  description:
    "QueenCity Soundboard is Cincinnati and Northern Kentucky's discovery hub for the hottest live music, comedy, and cultural events — every genre, every neighborhood.",
  path: "/",
  keywords: [
    "Cincinnati events",
    "things to do Cincinnati",
    "concerts Cincinnati",
    "Northern Kentucky events",
    "Latin music Cincinnati",
    "live music Covington",
    "QueenCity Soundboard",
  ],
});

const GENRE_CHIPS = ["Live Music", "Latin", "Hip-Hop", "Rock", "EDM", "Comedy", "Community"];

export default async function Home() {
  const locale = await getLocale();
  const eventsResult = await getPublishedEvents();
  const events = eventsResult.data;

  return (
    <>
      {/* Ticketmaster/Impact affiliate verification tag (requires literal "value" attr, not in React's meta types) */}
      <meta name="impact-site-verification" {...({ value: "d7fec6ff-ceae-4bce-bdc2-f31621a65833" } as Record<string, string>)} />
    <div className="space-y-7">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="qcs-ambient-card rounded-3xl p-6 md:p-10">
          <div className="pointer-events-none absolute -left-10 top-8 h-44 w-44 rounded-full bg-cyan-400/10 blur-2xl" />
          <div className="pointer-events-none absolute right-8 top-14 h-36 w-36 rounded-full bg-fuchsia-400/12 blur-2xl" />
          <div className="pointer-events-none absolute bottom-12 right-20 h-28 w-28 rounded-full border border-amber-300/20" />
          <div className="qcs-card-content max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/90">Cincinnati + NKY</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-100 md:text-6xl">
              The Soundboard for the hottest events in the Queen City.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
              Discover, vote on, and follow the shows worth showing up for — Latin nights, hip-hop, rock,
              comedy, and everything trending across Cincinnati and Northern Kentucky, all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-200">
              {GENRE_CHIPS.map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/8 px-3 py-1">
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink
                href="/events"
                event="cta_click"
                label="home_explore_events"
                className="qcs-button-3d rounded-lg bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-400"
              >
                Explore events
              </TrackedLink>
              <TrackedLink
                href="/partners"
                event="cta_click"
                label="home_partner_with_us"
                className="rounded-lg border border-white/20 bg-white/8 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/12"
              >
                Partner with us
              </TrackedLink>
            </div>
          </div>
        </section>

        <PollWidget locale={locale} variant="compact" />
      </div>

      <FeaturedEventsWidget events={events} />

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-300/80">Events first</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">What&apos;s coming up</h2>
            <p className="mt-2 text-sm text-slate-300">
              The site puts confirmed events, dates, and upcoming announcements ahead of everything else.
            </p>
          </div>
          <TrackedLink
            href="/events"
            event="cta_click"
            label="home_view_all_events"
            className="qcs-button-3d inline-flex items-center justify-center rounded-lg bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-400"
          >
            View all events
          </TrackedLink>
        </div>
        <div className="qcs-card-content mt-6 grid gap-4 md:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <article key={event.id} className="qcs-glass-panel relative min-h-48 overflow-hidden rounded-2xl p-6">
              <div className="relative z-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">
                  {event.category ?? "Featured"}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{event.title}</h3>
                <p className="mt-2 text-base text-slate-300">
                  {event.artist_name}
                  {event.venues?.name ? ` • ${event.venues.name}` : ""}
                </p>
                <TrackedLink
                  href="/events"
                  event="cta_click"
                  label={`home_featured_${event.id}`}
                  className="qcs-button-3d mt-6 inline-flex rounded-md bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-400"
                >
                  View details
                </TrackedLink>
              </div>
            </article>
          ))}
          {events.length === 0 ? (
            <p className="text-sm text-slate-400">No published events yet — check back soon.</p>
          ) : null}
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">Contact Us</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Know about a show we&apos;re missing?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Submit an event, pitch a partnership, or flag a correction. Our team responds fast.
            </p>
          </div>
          <div className="qcs-glass-panel flex flex-col gap-3 rounded-2xl p-4">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Direct line</p>
              <a
                className="inline-flex w-full break-all text-sm font-semibold leading-5 text-white hover:text-cyan-200 sm:text-base"
                href="mailto:event@queencitysoundboard.com"
              >
                event@queencitysoundboard.com
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Service area</p>
              <p className="text-xs text-slate-300">Cincinnati, OH + Northern Kentucky</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <TrackedLink
                href="/partners"
                event="cta_click"
                label="home_partner_cta"
                className="qcs-button-3d inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#050816] hover:bg-cyan-400"
              >
                Submit an event
              </TrackedLink>
              <TrackedLink
                href="/events"
                event="cta_click"
                label="home_browse_events"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
              >
                Browse events
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/85">Local Hubs</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Cincinnati + Covington Event Guides
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Explore city-specific pages with local context, venue highlights, and direct links to active events.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <TrackedLink
              href="/cincinnati"
              event="cta_click"
              label="home_city_hub_cincinnati"
              className="qcs-button-3d rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#050816] hover:bg-cyan-400"
            >
              Cincinnati Hub
            </TrackedLink>
            <TrackedLink
              href="/covington"
              event="cta_click"
              label="home_city_hub_covington"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
            >
              Covington Hub
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

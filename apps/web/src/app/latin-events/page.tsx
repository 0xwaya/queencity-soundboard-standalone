import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n";
import { latinEvents, getFeaturedLatinEvents, getUpcomingLatinEvents, getEventsByCity } from "@/lib/latin-events";

export const metadata: Metadata = buildPageMetadata({
  title: "Latin Events Cincinnati & Northern Kentucky | Queen City Soundboard",
  description: "Discover the hottest Latin music and dance events in Cincinnati and Northern Kentucky - Salsa, Bachata, Latin Jazz, Cumbia, Reggaeton, and more.",
  path: "/latin-events",
  keywords: [
    "Latin events Cincinnati",
    "Salsa on the Square",
    "Cincinnati Latin Festival",
    "Bachata dancing Cincinnati",
    "Latin music Northern Kentucky",
    "Reggaeton Cincinnati",
    "Latin Jazz Cincinnati",
    "Cumbia festival",
    "Latin dance lessons",
    "DJ Latin nights",
  ],
});

export default async function LatinEventsPage() {
  const locale = await getLocale();
  const featured = getFeaturedLatinEvents();
  const upcoming = getUpcomingLatinEvents(90);
  const heroEvent = featured[0] || latinEvents[0];
  const cincyEvents = getEventsByCity("Cincinnati");
  const koventucky = getEventsByCity("Covington");
  const newportEvents = getEventsByCity("Newport");

  const genreColors: Record<string, string> = {
    Salsa: "bg-red-500/20 border-red-500/30 text-red-300",
    Bachata: "bg-pink-500/20 border-pink-500/30 text-pink-300",
    Reggaeton: "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    "Latin Jazz": "bg-blue-500/20 border-blue-500/30 text-blue-300",
    Cumbia: "bg-orange-500/20 border-orange-500/30 text-orange-300",
    Merengue: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    Festival: "bg-green-500/20 border-green-500/30 text-green-300",
    "Mixed Latin": "bg-violet-500/20 border-violet-500/30 text-violet-300",
  };

  const getGenreColor = (genre: string): string => {
    return genreColors[genre] || "bg-slate-500/20 border-slate-500/30 text-slate-300";
  };

  const EventCard = ({ event, featured = false }: { event: (typeof latinEvents)[0]; featured?: boolean }) => (
    <article
      className={`qcs-glass-panel rounded-2xl border p-5 transition-all hover:border-[#d4b87e]/40 ${
        featured ? "border-[#d4b87e]/40 bg-[#d4b87e]/5" : "border-[#d4b87e]/15"
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#f5efe1]">{event.title}</h3>
            {event.artist && <p className="mt-1 text-sm text-slate-300">{event.artist}</p>}
          </div>
          {featured && (
            <span className="shrink-0 rounded-full bg-[#d4b87e]/20 px-3 py-1 text-xs font-semibold text-[#d4b87e]">
              ⭐ Featured
            </span>
          )}
        </div>

        <p className="text-sm text-slate-300">{event.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${getGenreColor(event.genre)}`}>
            {event.genre}
          </span>
          <span className="rounded-full border border-[#d4b87e]/20 bg-white/6 px-2 py-1 text-xs text-slate-400">
            {event.eventType}
          </span>
          {event.ageRestriction && (
            <span className="rounded-full border border-[#d4b87e]/20 bg-white/6 px-2 py-1 text-xs text-slate-400">
              {event.ageRestriction}
            </span>
          )}
        </div>

        <div className="space-y-2 pt-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-[#d4b87e]">📍</span>
            <div>
              <p className="font-semibold text-slate-200">{event.venue}</p>
              <p className="text-xs text-slate-400">{event.venueCity}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#d4b87e]">📅</span>
            <p className="text-slate-300">{event.eventDate}</p>
          </div>

          {event.startTime && (
            <div className="flex items-center gap-2">
              <span className="text-[#d4b87e]">🕒</span>
              <p className="text-slate-300">
                {event.startTime}
                {event.endTime && ` - ${event.endTime}`}
              </p>
            </div>
          )}

          {event.ticketPrice && (
            <div className="flex items-center gap-2">
              <span className="text-[#d4b87e]">💰</span>
              <p className="text-slate-300">{event.ticketPrice}</p>
            </div>
          )}

          {event.notes && <p className="mt-2 rounded bg-slate-800/50 p-2 text-xs italic text-slate-400">{event.notes}</p>}
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="qcs-button-3d rounded-md bg-[#c6a15c] px-3 py-2 text-xs font-semibold text-[#0b1020] hover:bg-[#d4b87e]"
            >
              Get Tickets
            </a>
          )}
          {event.websiteUrl && (
            <a
              href={event.websiteUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-[#d4b87e]/40 bg-[#d4b87e]/10 px-3 py-2 text-xs font-semibold text-[#d4b87e] hover:bg-[#d4b87e]/20"
            >
              Learn More
            </a>
          )}
          {event.instagramHandle && (
            <a
              href={`https://instagram.com/${event.instagramHandle.replace("@", "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-pink-500/30 bg-pink-500/10 px-3 py-2 text-xs font-semibold text-pink-300 hover:bg-pink-500/20"
            >
              {event.instagramHandle}
            </a>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0f1428] to-[#0b1020] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-[#d4b87e] via-[#f4ecda] to-[#d4b87e] bg-clip-text text-transparent">
              Latin Events
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Discover the hottest Latin music and dance events across Cincinnati and Northern Kentucky
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Salsa • Bachata • Reggaeton • Latin Jazz • Cumbia • Festivals • Workshops
          </p>
        </section>

        <section className="mb-12">
          <div className="relative overflow-hidden rounded-3xl border border-[#d4b87e]/10 shadow-[0_30px_60px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-0 bg-[url('/proyecto-uno-live.jpg')] bg-cover bg-center opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02050f]/80 via-[#040912]/75 to-[#02050f]/80" />
            <div className="relative bg-[#101523]/70 p-8 backdrop-blur-sm lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#d4b87e]/90">Next Event</p>
                  <h2 className="mt-4 text-3xl font-extrabold text-[#f4ecda] md:text-4xl">
                    {heroEvent.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    {heroEvent.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full border border-[#d4b87e]/20 bg-[#d4b87e]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4b87e]">
                      Cincinnati + NKY
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                      Live music, dance, workshops
                    </span>
                    <span className="rounded-full border border-[#c6a15c]/20 bg-[#c6a15c]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4ecda]">
                      Updated June 2026
                    </span>
                  </div>
                </div>

              <div className="rounded-3xl border border-[#d4b87e]/15 bg-[#0f1726]/95 p-6 shadow-[inset_0_0_0_1px_rgba(212,184,126,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4b87e]">Next spotlight</p>
                <h3 className="mt-3 text-xl font-bold text-[#f4ecda]">{heroEvent.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{heroEvent.venue}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-[#d4b87e]/20 bg-white/5 px-2 py-1">{heroEvent.eventDate}</span>
                  <span className="rounded-full border border-[#d4b87e]/20 bg-white/5 px-2 py-1">{heroEvent.genre}</span>
                  <span className="rounded-full border border-[#d4b87e]/20 bg-white/5 px-2 py-1">{heroEvent.eventType}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{heroEvent.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/latin-events" className="rounded-full bg-[#d4b87e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0b1020] transition hover:bg-[#f4ea9f]">
                    Browse all events
                  </Link>
                  <a
                    href="#all-events"
                    className="rounded-full border border-[#d4b87e]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10"
                  >
                    Jump to listings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* Featured Events */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-extrabold text-[#f4ecda]">⭐ Featured Events</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map((event) => (
                <EventCard key={event.id} event={event} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* Cincinnati Events */}
        {cincyEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-extrabold text-[#f4ecda]">Cincinnati Events</h2>
            <div className="grid gap-5">
              {cincyEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Northern Kentucky Events */}
        {(koventucky.length > 0 || newportEvents.length > 0) && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-extrabold text-[#f4ecda]">Northern Kentucky Events</h2>
            <div className="grid gap-5">
              {[...koventucky, ...newportEvents].map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* All Events by Type */}
        <section id="all-events" className="mb-16">
          <h2 className="mb-6 text-2xl font-extrabold text-[#f4ecda]">All Latin Events</h2>
          <div className="grid gap-5">
            {latinEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="rounded-3xl border border-[#d4b87e]/15 bg-[#d4b87e]/5 p-8">
          <h3 className="mb-4 text-2xl font-bold text-[#f4ecda]">About Latin Events in Cincinnati</h3>
          <div className="space-y-4 text-slate-300">
            <p>
              Cincinnati has a vibrant and growing Latin community with year-round music and dance events. Whether you're a seasoned dancer or
              just looking to experience the energy of Latin culture, you'll find something for everyone.
            </p>
            <p>
              <strong className="text-[#d4b87e]">Salsa on the Square</strong> at Fountain Square is a beloved summer tradition offering free
              dancing every Friday evening. The <strong className="text-[#d4b87e]">Cincinnati Latin Festival</strong> celebrates Latin heritage
              with three days of music, food, and cultural performances.
            </p>
            <p>
              From intimate bachata nights to high-energy reggaeton parties in Over-the-Rhine, to family-friendly cumbia festivals across the
              river in Northern Kentucky – the Queen City's Latin scene keeps growing every year.
            </p>
            <p className="pt-4 text-sm italic text-slate-400">
              Events are curated from local venues, social media, and community recommendations. Information is accurate as of June 2026. Always
              check venue websites for the latest schedules and ticket information.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <p className="mb-6 text-slate-300">Know about an event we're missing?</p>
          <a
            href="mailto:hello@queencitysoundboard.com?subject=Latin%20Event%20Submission"
            className="qcs-button-3d rounded-lg bg-[#c6a15c] px-6 py-3 font-semibold text-[#0b1020] hover:bg-[#d4b87e]"
          >
            Submit an Event
          </a>
        </section>
      </div>
    </div>
  );
}

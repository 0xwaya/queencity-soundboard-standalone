import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n";
import { safeJsonLd } from "@/lib/json-ld";
import { getPublishedEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Madison Theater Covington KY — Events, FAQ, Contact",
  description:
    "Explore Madison Theater in Covington, KY: featured events, full listing, FAQ, contact, and ticket links for Greater Cincinnati live music nights.",
  path: "/madison-theater",
  keywords: [
    "Madison Theater events",
    "Madison Theater FAQ",
    "Madison Theater contact",
    "Covington KY venue",
    "ticket links",
    "live music Covington",
    "Cincinnati live music venue",
    "Northern Kentucky concerts",
  ],
});

type MadisonTheaterApiEvent = {
  title: string;
  date: string;
  venue: string;
  ticketUrl?: string;
  detailsUrl?: string;
};

async function fetchMadisonTheaterEvents(): Promise<MadisonTheaterApiEvent[]> {
  try {
    const response = await fetch("https://madisontheater.com/api/events", {
      method: "GET",
      next: { revalidate: 3600 },
      headers: {
        accept: "application/json",
        "user-agent": "QueenCitySoundboard/1.0",
      },
    });

    if (!response.ok) {
      console.warn("[madison-theater] failed to fetch Madison Theater events", response.status);
      return [];
    }

    const body = (await response.json()) as { events?: MadisonTheaterApiEvent[] };
    return body.events ?? [];
  } catch (error) {
    console.error("[madison-theater] fetch error", error);
    return [];
  }
}

export default async function MadisonTheaterPage() {
  const locale = await getLocale();

  const rawMadisonEvents = await fetchMadisonTheaterEvents();
  let madisonEvents = rawMadisonEvents
    .map((event) => ({
      title: event.title,
      support: event.title.split(" - ")[0] || event.title,
      venue: `@ ${event.venue || "Madison Theater"}`,
      eventDate: event.date,
      detailsUrl: event.detailsUrl || "https://madisontheater.com/events",
      buyUrl: event.ticketUrl || event.detailsUrl || "https://madisontheater.com/events",
    }))
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  if (madisonEvents.length === 0) {
    const eventsResult = await getPublishedEvents();
    const allEvents = eventsResult.data || [];
    madisonEvents = allEvents
      .filter((event) => event.venues?.name === "Madison Theater")
      .map((event) => ({
        title: event.title,
        support: event.artist_name || event.description || "Live Performance",
        venue: `@ ${event.venues?.name || "Madison Theater"}`,
        eventDate: event.event_date,
        detailsUrl: event.ticket_url || "https://madisontheater.com/events",
        buyUrl: event.ticket_url || "https://madisontheater.com/events",
      }))
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  }

  const featuredEvents = madisonEvents.slice(0, 2).map((event) => ({
    title: event.title,
    support: event.support,
    venue: event.venue,
    date: new Date(event.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    time: new Date(event.eventDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    price: "$TBA",
    detailsUrl: event.detailsUrl,
    buyUrl: event.buyUrl,
  }));

  const fullListing = madisonEvents.map((event) => ({
    date: new Date(event.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    title: event.title,
    support: event.support,
    venue: event.venue,
    time: new Date(event.eventDate).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    detailsUrl: event.detailsUrl,
    buyUrl: event.buyUrl,
  }));
  const t =
    locale === "es-ve"
      ? {
          heroEyebrow: "Sitio oficial",
          heroTitle: "Madison Theater",
          heroCopy:
            "Calendario de Madison Theater directamente desde su sitio oficial: eventos, lista completa, FAQ, contacto y links de tickets.",
          address: "730 Madison Ave, Covington, KY 41011",
          phone: "859.491.2444",
          quickLinksTitle: "Navegacion",
          quickLinks: [
            { label: "Events", href: "https://madisontheater.com/" },
            { label: "FAQ", href: "https://madisontheater.com/faq" },
            { label: "Contact", href: "https://madisontheater.com/contact" },
          ],
          featuredTitle: "Featured Events",
          listingTitle: "Full Event Listing",
          subscribe: "Subscribe",
          details: "Event Details",
          buy: "Buy Tickets",
          allAges: "All Ages",
          officialSite: "Official site",
          directions: "Get directions",
        }
      : {
          heroEyebrow: "Official Site",
          heroTitle: "Madison Theater",
          heroCopy:
            "Madison Theater schedule served directly from their official site: featured events, full listing, FAQ, contact, and ticket links.",
          address: "730 Madison Ave, Covington, KY 41011",
          phone: "859.491.2444",
          quickLinksTitle: "Navigation",
          quickLinks: [
            { label: "Events", href: "https://madisontheater.com/" },
            { label: "FAQ", href: "https://madisontheater.com/faq" },
            { label: "Contact", href: "https://madisontheater.com/contact" },
          ],
          featuredTitle: "Featured Events",
          listingTitle: "Full Event Listing",
          subscribe: "Subscribe",
          details: "Event Details",
          buy: "Buy Tickets",
          allAges: "All Ages",
          officialSite: "Official site",
          directions: "Get directions",
        };

  // Note: events are scraped from Madison Theater's official schedule API first.
  // Supabase is only used as a fallback source for older or promoted event data.

  const madisonTheaterJsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicVenue",
    "@id": "https://queencitysoundboard.com/madison-theater#venue",
    name: "Madison Theater",
    url: "https://queencitysoundboard.com/madison-theater",
    telephone: "+1-859-491-2444",
    address: {
      "@type": "PostalAddress",
      streetAddress: "730 Madison Ave",
      addressLocality: "Covington",
      addressRegion: "KY",
      postalCode: "41011",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.08332,
      longitude: -84.50827,
    },
    areaServed: [
      { "@type": "City", name: "Covington" },
      { "@type": "City", name: "Cincinnati" },
    ],
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://queencitysoundboard.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Madison Theater",
        item: "https://queencitysoundboard.com/madison-theater",
      },
    ],
  };

  return (
    <div className="space-y-7">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(madisonTheaterJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbsJsonLd) }}
      />
      <section className="qcs-ambient-card rounded-3xl p-6 md:p-10">
        <div className="absolute inset-0 bg-[url('/madison2.JPG')] bg-cover bg-position-[50%_42%] opacity-42 [filter:contrast(1.12)_saturate(1.04)_brightness(0.95)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a1020] via-[#0a1020]/92 to-[#0a1020]/48" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(212,184,126,0.22),transparent_28rem)]" />
        <div className="qcs-card-content max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d4b87e]">{t.heroEyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#f4ecda] md:text-6xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">{t.heroCopy}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <a
              href="https://maps.google.com/maps?q=Madison+Theater,+Madison+Avenue,+Covington,+KY&hl=en&sll=39.13634,-84.540401&sspn=0.350446,0.727158&hq=Madison+Theater,&hnear=Madison+Ave,+Covington,+Kentucky&t=m&z=14&iwloc=A"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-[#d4b87e]/35 bg-[#d4b87e]/10 px-3 py-1 text-[#f4ecda] hover:bg-[#d4b87e]/16"
            >
              {t.address}
            </a>
            <a
              href="tel:+1-859-491-2444"
              className="rounded-full border border-[#d4b87e]/35 bg-[#d4b87e]/10 px-3 py-1 text-[#f4ecda] hover:bg-[#d4b87e]/16"
            >
              {t.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4b87e]/90">{t.quickLinksTitle}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {t.quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="qcs-button-3d rounded-lg border border-[#d4b87e]/35 bg-linear-to-r from-[#101a33]/95 to-[#2a2330]/85 px-4 py-2.5 text-sm font-semibold text-[#f4ecda] hover:from-[#16213f] hover:to-[#342a3a]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#f4ecda] md:text-3xl">{t.featuredTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featuredEvents.map((event) => (
              <article key={event.title} className="qcs-glass-panel rounded-2xl border border-[#d4b87e]/20 p-6">
                <h3 className="text-xl font-bold tracking-tight text-[#f5efe1]">{event.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{event.support}</p>
                <p className="mt-1 text-sm text-[#d4b87e]">{event.venue}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-[#d4b87e]/30 bg-[#d4b87e]/10 px-3 py-1 text-[#f4ecda]">{event.date}</span>
                  <span className="rounded-full border border-[#d4b87e]/20 bg-white/6 px-3 py-1">Show: {event.time}</span>
                  <span className="rounded-full border border-[#d4b87e]/20 bg-white/6 px-3 py-1">{event.price}</span>
                  <span className="rounded-full border border-[#d4b87e]/20 bg-white/6 px-3 py-1">{t.allAges}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={event.detailsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-md border border-[#d4b87e]/35 bg-white/6 px-3 py-2 text-xs font-semibold text-[#efe4cd] hover:bg-[#d4b87e]/12"
                  >
                    {t.details}
                  </a>
                  <a
                    href={event.buyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="qcs-button-3d rounded-md bg-[#c6a15c] px-3 py-2 text-xs font-semibold text-[#0b1020] hover:bg-[#d4b87e]"
                  >
                    {t.buy}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#f4ecda] md:text-3xl">{t.listingTitle}</h2>
            <a
              href="webcal://madisontheater.com/calendar.ics"
              className="rounded-md border border-[#d4b87e]/35 bg-[#d4b87e]/10 px-3 py-2 text-xs font-semibold text-[#f4ecda] hover:bg-[#d4b87e]/16"
            >
              {t.subscribe}
            </a>
          </div>
          <div className="mt-5 space-y-3">
            {fullListing.map((event) => (
              <article key={`${event.date}-${event.title}`} className="qcs-glass-panel rounded-xl border border-[#d4b87e]/15 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d4b87e]">{event.date}</p>
                    <h3 className="mt-1 text-lg font-bold text-[#f4ecda]">{event.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{event.support}</p>
                    <p className="mt-1 text-sm text-slate-400">{event.time}</p>
                    <p className="mt-1 text-sm text-[#d4b87e]">{event.venue}</p>
                    <p className="mt-1 text-xs text-slate-400">{t.allAges}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <a
                      href={event.buyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="qcs-button-3d rounded-md bg-[#c6a15c] px-3 py-2 text-xs font-semibold text-[#0b1020] hover:bg-[#d4b87e]"
                    >
                      {t.buy}
                    </a>
                    <a
                      href={event.detailsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-md border border-[#d4b87e]/35 bg-white/6 px-3 py-2 text-xs font-semibold text-[#efe4cd] hover:bg-[#d4b87e]/12"
                    >
                      {t.details}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4b87e]">Madison Theater</p>
            <p className="mt-1 text-sm text-slate-300">{t.address}</p>
            <a href="tel:+1-859-491-2444" className="mt-1 inline-flex text-sm font-semibold text-[#f4ecda] hover:text-[#d4b87e]">
              {t.phone}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://madisontheater.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="qcs-button-3d rounded-md bg-[#c6a15c] px-4 py-2 text-sm font-semibold text-[#0b1020] hover:bg-[#d4b87e]"
            >
              {t.officialSite}
            </a>
            <a
              href="https://maps.google.com/maps?q=Madison+Theater,+Madison+Avenue,+Covington,+KY&hl=en&sll=39.13634,-84.540401&sspn=0.350446,0.727158&hq=Madison+Theater,&hnear=Madison+Ave,+Covington,+Kentucky&t=m&z=14&iwloc=A"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-[#d4b87e]/35 bg-white/6 px-4 py-2 text-sm font-semibold text-[#efe4cd] hover:bg-[#d4b87e]/12"
            >
              {t.directions}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

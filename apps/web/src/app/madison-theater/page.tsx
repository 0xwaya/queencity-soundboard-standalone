import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = buildPageMetadata({
  title: "Madison Theater — Events, FAQ, Contact",
  description:
    "Explore Madison Theater's public venue information: featured events, full event listing, FAQ, contact, and ticket links.",
  path: "/madison-theater",
  keywords: [
    "Madison Theater events",
    "Madison Theater FAQ",
    "Madison Theater contact",
    "Covington KY venue",
    "ticket links",
    "live music Covington",
  ],
});

export default async function MadisonTheaterPage() {
  const locale = await getLocale();
  const t =
    locale === "es-ve"
      ? {
          heroEyebrow: "Sitio oficial",
          heroTitle: "Madison Theater",
          heroCopy:
            "Resumen de la experiencia web actual: eventos destacados, listado completo, FAQ, contacto y links de tickets.",
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
            "A mirror of the current public web experience: featured events, full event listing, FAQ, contact, and ticket links.",
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

  const featuredEvents = [
    {
      title: "Graham Nash - Live on Tour 2026",
      support: "With Graham Nash",
      venue: "@ Madison Theater",
      date: "Jul 28",
      doors: "Doors: 6:30 PM",
      show: "Show: 7:30 PM",
      price: "$60 - $335",
      detailsUrl: "https://madisontheater.com/events/2026/07/graham-nash-live-on-tour-2026",
      buyUrl: "https://www.ticketweb.com/event/graham-nash-live-madison-theater-730-tickets/14795033",
    },
    {
      title: "Resonance Theory Presents: BOOGIE T",
      support: "With Boogie T",
      venue: "@ Madison Theater",
      date: "May 9",
      doors: "Doors: 8:00 PM",
      show: "Show: 8:00 PM",
      price: "$20 - $35",
      detailsUrl: "https://madisontheater.com/events/2026/05/resonance-theory-presents-boogie-t",
      buyUrl: "https://www.ticketweb.com/event/resonance-theory-presents-boogie-t-madison-theater-730-tickets/14096614",
    },
  ];

  const fullListing = [
    {
      date: "May 9",
      title: "Resonance Theory Presents: BOOGIE T",
      support: "With Boogie T",
      venue: "@ Madison Theater",
      time: "Doors 8:00PM / Show 8:00PM",
      detailsUrl: "https://madisontheater.com/events/2026/05/resonance-theory-presents-boogie-t",
      buyUrl: "https://www.ticketweb.com/event/resonance-theory-presents-boogie-t-madison-theater-730-tickets/14096614",
    },
    {
      date: "May 12",
      title: "Unprocessed",
      support: "With ALLT, Midwinter",
      venue: "@ Madison Live",
      time: "Doors 6:30PM / Show 7:30PM",
      detailsUrl: "https://madisontheater.com/events/2026/05/unprocessed",
      buyUrl: "https://www.ticketweb.com/event/unprocessed-allt-midwinter-madison-live-734-tickets/14673323",
    },
    {
      date: "May 15",
      title: "Boy Bandicoot - MULLIGAN Vinyl Release Show",
      support: "With Moonbeau, Feems",
      venue: "@ Madison Live",
      time: "Doors 6:00PM / Show 7:00PM",
      detailsUrl: "https://madisontheater.com/events/2026/05/boy-bandicoot-mulligan-vinyl-release-show-w-moonbeau-and-feems",
      buyUrl: "https://www.ticketweb.com/event/boy-bandicoot-mulligan-madison-live-734-tickets/14819523",
    },
    {
      date: "May 16",
      title: "False Hydra",
      support: "With Run Rabbit Run, Moneyball, R.A.A.W",
      venue: "@ The Rooftop",
      time: "Doors 6:00PM / Show 7:00PM",
      detailsUrl: "https://madisontheater.com/events/2026/05/false-hyrda",
      buyUrl: "https://www.ticketweb.com/event/false-hydra-run-rabbit-run-the-rooftop-madison-live-tickets/14824393",
    },
  ];

  return (
    <div className="space-y-7">
      <section className="qcs-ambient-card rounded-3xl p-6 md:p-10">
        <div className="absolute inset-0 bg-[url('/madison2.JPG')] bg-cover bg-position-[50%_42%] opacity-42 [filter:contrast(1.12)_saturate(1.04)_brightness(0.95)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#08111f] via-[#08111f]/90 to-[#08111f]/45" />
        <div className="qcs-card-content max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300/90">{t.heroEyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-6xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">{t.heroCopy}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <a
              href="https://maps.google.com/maps?q=Madison+Theater,+Madison+Avenue,+Covington,+KY&hl=en&sll=39.13634,-84.540401&sspn=0.350446,0.727158&hq=Madison+Theater,&hnear=Madison+Ave,+Covington,+Kentucky&t=m&z=14&iwloc=A"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-slate-100 hover:bg-white/12"
            >
              {t.address}
            </a>
            <a
              href="tel:+1-859-491-2444"
              className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-slate-100 hover:bg-white/12"
            >
              {t.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">{t.quickLinksTitle}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {t.quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="qcs-button-3d rounded-lg border border-white/20 bg-white/8 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/12"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content">
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{t.featuredTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featuredEvents.map((event) => (
              <article key={event.title} className="qcs-glass-panel rounded-2xl p-6">
                <h3 className="text-xl font-bold tracking-tight text-white">{event.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{event.support}</p>
                <p className="mt-1 text-sm text-cyan-200">{event.venue}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1">{event.date}</span>
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1">{event.doors}</span>
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1">{event.show}</span>
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1">{event.price}</span>
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1">{t.allAges}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={event.detailsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-md border border-white/20 bg-white/6 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/12"
                  >
                    {t.details}
                  </a>
                  <a
                    href={event.buyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="qcs-button-3d rounded-md bg-fuchsia-500 px-3 py-2 text-xs font-semibold text-white hover:bg-fuchsia-400"
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
            <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{t.listingTitle}</h2>
            <a
              href="webcal://madisontheater.com/calendar.ics"
              className="rounded-md border border-white/20 bg-white/6 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/12"
            >
              {t.subscribe}
            </a>
          </div>
          <div className="mt-5 space-y-3">
            {fullListing.map((event) => (
              <article key={`${event.date}-${event.title}`} className="qcs-glass-panel rounded-xl p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300/80">{event.date}</p>
                    <h3 className="mt-1 text-lg font-bold text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{event.support}</p>
                    <p className="mt-1 text-sm text-slate-400">{event.time}</p>
                    <p className="mt-1 text-sm text-cyan-200">{event.venue}</p>
                    <p className="mt-1 text-xs text-slate-400">{t.allAges}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <a
                      href={event.buyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="qcs-button-3d rounded-md bg-fuchsia-500 px-3 py-2 text-xs font-semibold text-white hover:bg-fuchsia-400"
                    >
                      {t.buy}
                    </a>
                    <a
                      href={event.detailsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-md border border-white/20 bg-white/6 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/12"
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
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/80">Madison Theater</p>
            <p className="mt-1 text-sm text-slate-300">{t.address}</p>
            <a href="tel:+1-859-491-2444" className="mt-1 inline-flex text-sm font-semibold text-white hover:text-cyan-200">
              {t.phone}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://madisontheater.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="qcs-button-3d rounded-md bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-400"
            >
              {t.officialSite}
            </a>
            <a
              href="https://maps.google.com/maps?q=Madison+Theater,+Madison+Avenue,+Covington,+KY&hl=en&sll=39.13634,-84.540401&sspn=0.350446,0.727158&hq=Madison+Theater,&hnear=Madison+Ave,+Covington,+Kentucky&t=m&z=14&iwloc=A"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-white/20 bg-white/6 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/12"
            >
              {t.directions}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

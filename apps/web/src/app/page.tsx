import type { Metadata } from "next";
import PollWidget from "@/components/poll-widget";
import TrackedExternalLink from "@/components/tracked-external-link";
import TrackedLink from "@/components/tracked-link";
import { getLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Latin Live Music Events in Cincinnati & Covington",
  description:
    "Discover culture-forward Latin acoustic nights, artist showcases, and premium ticket experiences from QueenCity Soundboard.",
  path: "/",
  keywords: [
    "Latin events Cincinnati",
    "Covington live music",
    "acoustic concerts Kentucky",
    "Madison Theater tickets",
    "QueenCity Soundboard events",
  ],
});

export default async function Home() {
  const locale = await getLocale();
  const t =
    locale === "es-ve"
      ? {
          eyebrow: "Próximo evento",
          hero: "90's Hiphop Merengue con Proyecto Uno.",
          heroCopy:
            "Proyecto Uno confirmó interés para presentarse en Cincinnati. Estamos cerrando fecha y venue para traer ese sonido merengue hiphop al Midwest.",
          heroBioEyebrow: "Bio rápida",
          heroBioTitle: "Proyecto Uno, NYC 1989 -> hoy",
          heroBioCopy:
            "Fundado en Nueva York por Nelson Zapata, Proyecto Uno ayudó a definir la fusión de merengue con hip-hop, dance y house para una generación completa.",
          heroBioFacts: [
            "Sonido pionero del merengue urbano hecho en la Gran Manzana.",
            "Catálogo emblemático: Brinca, El Tiburón, Latinos, Another Night.",
            "La banda reporta una gira global por su aniversario 35.",
          ],
          heroStats: ["Desde 1989", "35 años de trayectoria", "Tour global"],
          heroLinksLabel: "Conecta con Proyecto Uno",
          heroLinks: [
            { label: "Sitio oficial", href: "https://proyectouno.net", trackingLabel: "home_proyecto_uno_official_site_es" },
            {
              label: "Canal de videos",
              href: "https://www.youtube.com/channel/UCgP8lrtFxO905_hm1RvZ7fQ",
              trackingLabel: "home_proyecto_uno_video_channel_es",
            },
            { label: "Próximas fechas", href: "https://proyectouno.net/event/", trackingLabel: "home_proyecto_uno_dates_es" },
          ],
          explore: "Ver eventos",
          shop: "Comprar merch",
          chips: ["Proyecto Uno", "Cincinnati", "Fecha por anunciar"],
          eventStatus: "Confirmado: interés del artista",
          eventDate: "Fecha TBD",
          eventCta: "Recibir updates",
          venueEyebrow: "Foco de venue",
          venueTitle: "Madison Theater",
          venueCopy:
            "Nuestra casa en Covington, KY — un venue histórico con sonido brutal, visuales top y full vibra.",
          venueLocation: "Covington, KY",
          venueLinkLabel: "Link del venue",
          venueCta: "Explorar el venue",
          lineupEyebrow: "Eventos primero",
          lineupTitle: "Lineup en construcción",
          lineupCopy: "El sitio ahora prioriza eventos confirmados, fechas y próximos anuncios.",
          lineupCta: "Ver todos los eventos",
          featuredTag: "Destacado",
          buyTickets: "Ver detalles",
          contactEyebrow: "Contáctanos",
          contactTitle: "Armemos tu próxima noche sold-out.",
          contactCopy:
            "Reserva talento, asegura el venue o colabora en drops. Nuestro team responde rápido y deja todo fino.",
          directLine: "Línea directa",
          localLabel: "Presencia local",
          localAddress: "Madison Theater, 730 Madison Ave, Covington, KY 41011",
          maps: "Cómo llegar",
          contactCta: "Iniciar consulta",
          browseEvents: "Ver eventos",
        }
      : {
          eyebrow: "Next Event",
          hero: "90's Hiphop Merengue with Proyecto Uno.",
          heroCopy:
            "Proyecto Uno confirmed interest in performing in Cincinnati. We’re locking the date and venue to bring their merengue hiphop sound to the Midwest.",
          heroBioEyebrow: "Bio Snapshot",
          heroBioTitle: "Proyecto Uno, NYC 1989 -> now",
          heroBioCopy:
            "Founded in New York by Nelson Zapata, Proyecto Uno helped define a crossover lane blending merengue with hip-hop, dance, and house textures.",
          heroBioFacts: [
            "Pioneer energy in urban merengue from the New York scene.",
            "Signature-era catalog includes Brinca, El Tiburon, Latinos, and Another Night.",
            "The group highlights a global anniversary tour marking 35 years.",
          ],
          heroStats: ["Active since 1989", "35-year run", "Global tour"],
          heroLinksLabel: "Connect with Proyecto Uno",
          heroLinks: [
            { label: "Official site", href: "https://proyectouno.net", trackingLabel: "home_proyecto_uno_official_site_en" },
            {
              label: "Video channel",
              href: "https://www.youtube.com/channel/UCgP8lrtFxO905_hm1RvZ7fQ",
              trackingLabel: "home_proyecto_uno_video_channel_en",
            },
            { label: "Upcoming dates", href: "https://proyectouno.net/event/", trackingLabel: "home_proyecto_uno_dates_en" },
          ],
          explore: "Explore Events",
          shop: "Shop Merch",
          chips: ["Proyecto Uno", "Cincinnati", "Date TBD"],
          eventStatus: "Confirmed: artist interest",
          eventDate: "Date TBD",
          eventCta: "Get updates",
          venueEyebrow: "Venue Spotlight",
          venueTitle: "Madison Theater",
          venueCopy:
            "Our home stage in Covington, KY — a historic venue built for immersive sound, elevated visuals, and packed rooms.",
          venueLocation: "Covington, KY",
          venueLinkLabel: "Venue link",
          venueCta: "Explore the venue",
          lineupEyebrow: "Events first",
          lineupTitle: "Lineup in motion",
          lineupCopy: "The site now puts confirmed events, dates, and upcoming announcements ahead of the poll.",
          lineupCta: "View all events",
          featuredTag: "Featured",
          buyTickets: "View Details",
          contactEyebrow: "Contact Us",
          contactTitle: "Let’s build your next sold-out night.",
          contactCopy:
            "Book talent, secure the venue, or collaborate on branded drops. Our event team responds fast and keeps the flow seamless.",
          directLine: "Direct line",
          localLabel: "Local presence",
          localAddress: "Madison Theater, 730 Madison Ave, Covington, KY 41011",
          maps: "Get directions",
          contactCta: "Start an inquiry",
          browseEvents: "Browse events",
        };

  return (
    <div className="space-y-7">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="qcs-ambient-card rounded-3xl p-6 md:p-10">
          <div className="absolute inset-0 bg-[url('/madison2.JPG')] bg-cover bg-position-[50%_42%] opacity-40 filter-[contrast(1.14)_saturate(1.1)_brightness(1.03)]" />
          <div className="absolute inset-0 bg-linear-to-r from-[#08111f] via-[#08111f]/88 to-[#08111f]/38" />
          <div className="pointer-events-none absolute -left-10 top-8 h-44 w-44 rounded-full bg-cyan-400/10 blur-2xl" />
          <div className="pointer-events-none absolute right-8 top-14 h-36 w-36 rounded-full bg-fuchsia-400/12 blur-2xl" />
          <div className="pointer-events-none absolute bottom-12 right-20 h-28 w-28 rounded-full border border-amber-300/20" />
          <div className="qcs-card-content max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/90">{t.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-100 md:text-6xl">
              {t.hero}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">{t.heroCopy}</p>

            <div className="mt-6 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
              <div className="qcs-glass-panel rounded-xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200/90">{t.eventStatus}</p>
                <p className="mt-1 text-lg font-bold text-white">Proyecto Uno</p>
              </div>
              <div className="qcs-glass-panel rounded-xl p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-fuchsia-200/90">{t.eventDate}</p>
                <p className="mt-1 text-lg font-bold text-white">Cincinnati</p>
              </div>
            </div>

            <div className="qcs-glass-panel mt-5 rounded-2xl border border-white/15 p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200/90">{t.heroBioEyebrow}</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-tight text-white md:text-2xl">{t.heroBioTitle}</h2>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                  {t.heroStats.map((stat) => (
                    <span key={stat} className="rounded-full border border-white/20 bg-white/8 px-3 py-1">
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-200">{t.heroBioCopy}</p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-200 md:grid-cols-3">
                {t.heroBioFacts.map((fact) => (
                  <li key={fact} className="rounded-xl border border-white/10 bg-[#0e1831]/70 px-3 py-2">
                    {fact}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200/90">{t.heroLinksLabel}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {t.heroLinks.map((link) => (
                    <TrackedExternalLink
                      key={link.href}
                      href={link.href}
                      event="cta_click"
                      label={link.trackingLabel}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/14"
                    >
                      {link.label}
                    </TrackedExternalLink>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink
                href="/events"
                event="cta_click"
                label="home_explore_events"
                className="qcs-button-3d rounded-lg bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-400"
              >
                {t.eventCta}
              </TrackedLink>
              <TrackedLink
                href="/events"
                event="cta_click"
                label="home_browse_events_hero"
                className="rounded-lg border border-white/20 bg-white/8 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/12"
              >
                {t.explore}
              </TrackedLink>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-200">
              {t.chips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/8 px-3 py-1">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <PollWidget locale={locale} variant="compact" />
      </div>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="absolute inset-0 bg-[url('/madison3.JPG')] bg-cover bg-position-[50%_70%] opacity-40 filter-[contrast(1.14)_saturate(1.1)_brightness(1.03)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0b1228] via-[#0b1228]/80 to-transparent" />
        <div className="qcs-card-content flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/80">{t.venueEyebrow}</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">{t.venueTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">{t.venueCopy}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">{t.venueLocation}</p>
          </div>
          <div className="qcs-glass-panel flex flex-col gap-3 rounded-2xl p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{t.venueLinkLabel}</p>
            <a
              className="text-base font-semibold text-amber-200 hover:text-amber-100"
              href="https://madisontheater.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              madisontheater.com
            </a>
            <TrackedLink
              href="/madison-theater"
              event="cta_click"
              label="home_venue_spotlight_cta"
              className="inline-flex items-center justify-center rounded-lg bg-amber-400 px-4 py-2 text-xs font-semibold text-[#0b1020] hover:bg-amber-300"
            >
              {t.venueCta}
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-300/80">{t.lineupEyebrow}</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">{t.lineupTitle}</h2>
            <p className="mt-2 text-sm text-slate-300">{t.lineupCopy}</p>
          </div>
          <TrackedLink
            href="/events"
            event="cta_click"
            label="home_view_all_events"
            className="qcs-button-3d inline-flex items-center justify-center rounded-lg bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-400"
          >
            {t.lineupCta}
          </TrackedLink>
        </div>
        <div className="qcs-card-content mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "90's Hiphop Merengue",
              meta: "Proyecto Uno • Date TBD",
              heroImageClass: "bg-[url('/proyecto-uno-live.jpg')]",
            },
            { title: "Bolero Nights", meta: "Rudy La Escala • May 30", heroImageClass: null },
            { title: "Alma Acústica", meta: "Elena Rose • Jun 6", heroImageClass: null },
          ].map((item) => (
            <article
              key={item.title}
              className="qcs-glass-panel relative min-h-48 overflow-hidden rounded-2xl p-6"
            >
              {item.heroImageClass ? (
                <>
                  <div
                    className={`absolute inset-0 bg-cover bg-center opacity-45 filter-[contrast(1.18)_saturate(1.12)_brightness(1.03)] ${item.heroImageClass}`}
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#0e1732] via-[#0e1732]/84 to-[#0e1732]/58" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0e1732]/80 via-transparent to-transparent" />
                </>
              ) : null}
              <div className="relative z-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">{t.featuredTag}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 text-base text-slate-300">{item.meta}</p>
                <TrackedLink
                  href="/events"
                  event="cta_click"
                  label={`home_featured_${item.title.replace(/\s+/g, "_").toLowerCase()}`}
                  className="qcs-button-3d mt-6 inline-flex rounded-md bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-400"
                >
                  {t.buyTickets}
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">{t.contactEyebrow}</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">{t.contactTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">{t.contactCopy}</p>
          </div>
          <div className="qcs-glass-panel flex flex-col gap-3 rounded-2xl p-4">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{t.directLine}</p>
              <a
                className="inline-flex w-full break-all text-sm font-semibold leading-5 text-white hover:text-cyan-200 sm:text-base"
                href="mailto:event@queencitysoundboard.com"
              >
                event@queencitysoundboard.com
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{t.localLabel}</p>
              <p className="text-xs text-slate-300">{t.localAddress}</p>
              <a
                className="text-xs font-semibold text-cyan-200 hover:text-cyan-100"
                href="https://maps.google.com/?q=Madison+Theater+730+Madison+Ave+Covington+KY+41011"
                target="_blank"
                rel="noreferrer noopener"
              >
                {t.maps}
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                className="qcs-button-3d inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-[#050816] hover:bg-cyan-400"
                href="mailto:event@queencitysoundboard.com?subject=Event%20Inquiry"
              >
                {t.contactCta}
              </a>
              <TrackedLink
                href="/events"
                event="cta_click"
                label="home_browse_events"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
              >
                {t.browseEvents}
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
  );
}

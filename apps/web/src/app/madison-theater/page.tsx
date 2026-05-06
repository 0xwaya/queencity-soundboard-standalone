import type { Metadata } from "next";
import TrackedLink from "@/components/tracked-link";
import { buildPageMetadata } from "@/lib/seo";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = buildPageMetadata({
  title: "Madison Theater — A New Chapter. A New Partnership.",
  description:
    "QueenCity Soundboard is building Cincinnati's premium Latin cultural programming home at Madison Theater in Covington, KY. An invitation for partnership.",
  path: "/madison-theater",
  keywords: [
    "Madison Theater partnership",
    "Covington KY venue",
    "Latin events Cincinnati",
    "venue partnership",
    "live music programming",
    "QueenCity Soundboard Madison Theater",
  ],
});

export default async function MadisonTheaterPage() {
  const locale = await getLocale();
  const t =
    locale === "es-ve"
      ? {
          heroEyebrow: "Propuesta de asociación",
          heroTitle: "Una nueva era para Madison Theater.",
          heroCopy:
            "Somos QueenCity Soundboard — el operador de eventos culturales latinos de Cincinnati. Queremos construir nuestra casa permanente aquí.",
          heroCta: "Iniciemos la conversación",
          heroSecondaryCta: "Ver lo que estamos construyendo",
          visionEyebrow: "La visión",
          visionTitle: "Un partnership que llena butacas.",
          visionCopy:
            "Traemos el talento, el público y la producción. Tú traes la casa. Juntos construimos la noche cultural más esperada de Covington.",
          pillars: [
            {
              eyebrow: "Programación",
              title: "Noches vendidas.",
              body: "Temporadas de Latin acoustic, merengue hiphop, bolero y jazz. Calendarios confirmados, no ideas.",
            },
            {
              eyebrow: "Audiencia",
              title: "Comunidad ya construida.",
              body: "Nuestra lista de seguidores bilingüe crece activamente en Cincinnati y Covington. Lista de correo, redes, presencia local.",
            },
            {
              eyebrow: "Ingresos",
              title: "Modelo de reparto claro.",
              body: "Revenue sharing en taquilla, patrocinio y merch. Un acuerdo limpio, sin sorpresas.",
            },
          ],
          venueEyebrow: "El escenario",
          venueTitle: "730 Madison Ave. Covington, KY.",
          venueCopy:
            "Un venue histórico con capacidad, acústica y carácter. El tipo de espacio que un artista recuerda y un público busca repetir.",
          venueSpecs: [
            { label: "Capacidad", value: "~1,200" },
            { label: "Ubicación", value: "Covington, KY 41011" },
            { label: "Tipo", value: "Historic venue" },
            { label: "Infraestructura", value: "Full stage + PA" },
          ],
          weOfferEyebrow: "Qué traemos",
          weOfferTitle: "No somos promotores. Somos operadores.",
          weOfferCopy:
            "Producción de eventos completa, identidad de marca, marketing digital, relaciones con artistas y experiencia de ticketing integrada.",
          weOfferItems: [
            "Contactos confirmados con artistas latinos internacionales",
            "Marketing bilingüe con audiencia activa en Cincinnati y Covington",
            "Diseño de producción y experiencia de marca en cada evento",
            "Integración de ticketing (venta online + puerta)",
            "Presencia social y contenido documental de cada noche",
          ],
          proofEyebrow: "Por qué ahora",
          proofTitle: "El momentum es real.",
          proofCopy:
            "Proyecto Uno confirmó interés. La demanda de Latin music en Cincinnati no tiene venue a la altura. Madison Theater puede ser ese lugar.",
          proofPoints: [
            { stat: "1er artista", detail: "Proyecto Uno — interés confirmado" },
            { stat: "2 idiomas", detail: "Audiencia bilingüe EN / ES activa" },
            { stat: "Covington KY", detail: "Único venue posicionado para esta escena" },
          ],
          askEyebrow: "La propuesta",
          askTitle: "Una conversación. Sin compromiso.",
          askCopy:
            "30 minutos. Te mostramos el calendario de artistas, el plan de marketing y el modelo de ingresos. Tú decides si tiene sentido.",
          askCta: "Escribirnos",
          askSecondary: "Ver eventos actuales",
          trustEyebrow: "Presencia local",
          trustAddress: "Madison Theater, 730 Madison Ave, Covington, KY 41011",
          trustMaps: "Cómo llegar",
        }
      : {
          heroEyebrow: "Partnership Proposal",
          heroTitle: "A new era for Madison Theater.",
          heroCopy:
            "We're QueenCity Soundboard — Cincinnati's Latin cultural event operator. We want to build our permanent home here.",
          heroCta: "Start the conversation",
          heroSecondaryCta: "See what we're building",
          visionEyebrow: "The Vision",
          visionTitle: "A partnership that fills seats.",
          visionCopy:
            "We bring the talent, the audience, and the production. You bring the house. Together we build Covington's most anticipated cultural night.",
          pillars: [
            {
              eyebrow: "Programming",
              title: "Sold-out nights.",
              body: "Latin acoustic, merengue hiphop, bolero and jazz seasons. Confirmed calendars — not ideas.",
            },
            {
              eyebrow: "Audience",
              title: "Community already built.",
              body: "Our bilingual fanbase is actively growing in Cincinnati and Covington. Email list, social presence, local roots.",
            },
            {
              eyebrow: "Revenue",
              title: "Clean revenue share.",
              body: "Ticket splits, sponsorship, and merch. A clear, fair deal with no surprises.",
            },
          ],
          venueEyebrow: "The Stage",
          venueTitle: "730 Madison Ave. Covington, KY.",
          venueCopy:
            "A historic venue with the capacity, acoustics, and character that artists remember and audiences come back for.",
          venueSpecs: [
            { label: "Capacity", value: "~1,200" },
            { label: "Location", value: "Covington, KY 41011" },
            { label: "Type", value: "Historic venue" },
            { label: "Infrastructure", value: "Full stage + PA" },
          ],
          weOfferEyebrow: "What We Bring",
          weOfferTitle: "We're not promoters. We're operators.",
          weOfferCopy:
            "Full event production, brand identity, digital marketing, artist relations, and an integrated ticketing experience.",
          weOfferItems: [
            "Confirmed contacts with international Latin artists",
            "Bilingual marketing with an active Cincinnati & Covington audience",
            "Production design and brand experience at every event",
            "Integrated ticketing (online sales + door)",
            "Social presence and documentary content for every night",
          ],
          proofEyebrow: "Why Now",
          proofTitle: "The momentum is real.",
          proofCopy:
            "Proyecto Uno confirmed interest. The demand for Latin music in Cincinnati has no venue to match it. Madison Theater can be that place.",
          proofPoints: [
            { stat: "1st artist", detail: "Proyecto Uno — interest confirmed" },
            { stat: "2 languages", detail: "Active bilingual EN / ES audience" },
            { stat: "Covington KY", detail: "Sole venue positioned for this scene" },
          ],
          askEyebrow: "The Offer",
          askTitle: "One conversation. No commitment.",
          askCopy:
            "30 minutes. We show you the artist calendar, the marketing plan, and the revenue model. You decide if it makes sense.",
          askCta: "Write to us",
          askSecondary: "Browse current events",
          trustEyebrow: "Local presence",
          trustAddress: "Madison Theater, 730 Madison Ave, Covington, KY 41011",
          trustMaps: "Get directions",
        };

  return (
    <div className="space-y-7">
      {/* ── Hero ── */}
      <section className="qcs-ambient-card rounded-3xl p-6 md:p-12">
        <div className="absolute inset-0 bg-[url('/madison1.JPG')] bg-cover bg-center opacity-50 [filter:contrast(1.1)_saturate(0.8)_brightness(0.88)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#040810] via-[#040810]/92 to-[#040810]/48" />
        <div className="absolute inset-0 bg-linear-to-t from-[#040810]/65 via-transparent to-transparent" />
        <div className="qcs-card-content max-w-3xl py-6 md:py-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400/90">
            {t.heroEyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
            {t.heroCopy}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:event@queencitysoundboard.com?subject=Madison%20Theater%20Partnership"
              className="qcs-button-3d rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-[#07090f] hover:bg-amber-400"
            >
              {t.heroCta}
            </a>
            <TrackedLink
              href="#vision"
              event="cta_click"
              label="madison_hero_see_vision"
              className="rounded-lg border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/12"
            >
              {t.heroSecondaryCta}
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── Vision + Pillars ── */}
      <section id="vision" className="qcs-ambient-card rounded-3xl p-6 md:p-10">
        <div className="qcs-card-content">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400/80">
            {t.visionEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {t.visionTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
            {t.visionCopy}
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {t.pillars.map((p) => (
              <div key={p.title} className="qcs-glass-panel rounded-2xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/70">
                  {p.eyebrow}
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Venue ── */}
      <section className="qcs-ambient-card rounded-3xl p-6 md:p-10">
        <div className="absolute inset-0 bg-[url('/madison3.JPG')] bg-cover bg-position-[50%_55%] opacity-40 [filter:contrast(1.1)_saturate(0.8)_brightness(0.88)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#040810] via-[#040810]/90 to-[#040810]/52" />
        <div className="qcs-card-content">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400/80">
            {t.venueEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {t.venueTitle}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
            {t.venueCopy}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {t.venueSpecs.map((s) => (
              <div key={s.label} className="qcs-glass-panel rounded-xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {s.label}
                </p>
                <p className="mt-1.5 text-base font-extrabold text-white">{s.value}</p>
              </div>
            ))}
          </div>
          <a
            href="https://maps.google.com/?q=Madison+Theater+730+Madison+Ave+Covington+KY+41011"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200"
          >
            {t.trustMaps} ↗
          </a>
        </div>
      </section>

      {/* ── What We Bring ── */}
      <section className="qcs-ambient-card rounded-3xl p-6 md:p-10">
        <div className="qcs-card-content md:grid md:grid-cols-2 md:gap-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400/80">
              {t.weOfferEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              {t.weOfferTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">{t.weOfferCopy}</p>
          </div>
          <ul className="mt-6 space-y-3 md:mt-0">
            {t.weOfferItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-[10px] font-bold text-amber-300">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Proof Points ── */}
      <section className="qcs-ambient-card rounded-3xl p-6 md:p-10">
        <div className="absolute inset-0 bg-[url('/proyecto-uno-live.jpg')] bg-cover bg-center opacity-20 [filter:contrast(1.1)_saturate(0.7)_brightness(0.85)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#040810] via-[#040810]/90 to-[#040810]/58" />
        <div className="qcs-card-content">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300/80">
            {t.proofEyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {t.proofTitle}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
            {t.proofCopy}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {t.proofPoints.map((pt) => (
              <div key={pt.stat} className="qcs-glass-panel rounded-2xl p-5">
                <p className="text-2xl font-extrabold tracking-tight text-white">{pt.stat}</p>
                <p className="mt-1 text-sm text-slate-300">{pt.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Ask ── */}
      <section className="qcs-ambient-card rounded-3xl p-6 md:p-12">
        <div className="absolute inset-0 bg-linear-to-br from-amber-900/10 via-transparent to-transparent" />
        <div className="qcs-card-content max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400/80">
            {t.askEyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {t.askTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-200">{t.askCopy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:event@queencitysoundboard.com?subject=Madison%20Theater%20Partnership"
              className="qcs-button-3d rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-[#07090f] hover:bg-amber-400"
            >
              {t.askCta}
            </a>
            <TrackedLink
              href="/events"
              event="cta_click"
              label="madison_ask_browse_events"
              className="rounded-lg border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/12"
            >
              {t.askSecondary}
            </TrackedLink>
          </div>
          <div className="mt-8 flex flex-col gap-1.5 border-t border-white/8 pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.trustEyebrow}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">{t.trustAddress}</p>
            <a
              href="mailto:event@queencitysoundboard.com"
              className="text-sm font-semibold text-amber-300 hover:text-amber-200"
            >
              event@queencitysoundboard.com
            </a>
            <a
              href="https://maps.google.com/?q=Madison+Theater+730+Madison+Ave+Covington+KY+41011"
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              {t.trustMaps} ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

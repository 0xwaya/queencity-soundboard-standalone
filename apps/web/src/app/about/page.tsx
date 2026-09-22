import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About QueenCity Soundboard",
  description:
    "QueenCity Soundboard is Cincinnati and Northern Kentucky's discovery hub for the hottest live events, across every genre.",
  path: "/about",
  keywords: ["about QueenCity Soundboard", "Cincinnati events platform", "Northern Kentucky live events"],
});

export default async function AboutPage() {
  const locale = await getLocale();
  const t =
    locale === "es-ve"
      ? {
          eyebrow: "¿Quiénes somos?",
          title: "El soundboard de la Queen City",
          body:
            "QueenCity Soundboard conecta a la comunidad con los eventos que realmente están sonando en Cincinnati y el norte de Kentucky — música en vivo, comedia y cultura en todos los géneros, curados en un solo lugar.",
          cards: [
            { title: "Descubre eventos", body: "Un calendario cruzado por género, venue y vecindario — no otro copy-paste de un solo promotor." },
            { title: "Vota y participa", body: "Encuestas de interés que ayudan a traer los shows que la ciudad realmente quiere ver." },
            { title: "Conecta con promotores", body: "Venues y artistas pueden enviar eventos o asociarse directamente con nosotros." },
          ],
        }
      : {
          eyebrow: "About Queen City",
          title: "The soundboard for the Queen City",
          body:
            "QueenCity Soundboard connects the community with the events actually trending across Cincinnati and Northern Kentucky — live music, comedy, and culture in every genre, curated in one place.",
          cards: [
            { title: "Discover events", body: "A calendar cross-checked by genre, venue, and neighborhood — not another single-promoter feed." },
            { title: "Vote and participate", body: "Interest polls that help bring the shows the city is actually asking for." },
            { title: "Connect with promoters", body: "Venues and artists can submit events or partner with us directly." },
          ],
        };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-linear-to-br from-[#0f1630] via-[#0b1228] to-[#070b17] p-6 md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">{t.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-100 md:text-4xl">{t.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{t.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {t.cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-bold text-slate-100">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{card.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

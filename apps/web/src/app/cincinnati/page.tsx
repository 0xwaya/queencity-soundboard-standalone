import type { Metadata } from "next";
import TrackedLink from "@/components/tracked-link";
import { safeJsonLd } from "@/lib/json-ld";
import { buildPageMetadata, SEO } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cincinnati Latin Concerts and Live Music Nights",
  description:
    "Discover Cincinnati Latin concerts, acoustic showcases, and ticketed nightlife experiences from QueenCity Soundboard.",
  path: "/cincinnati",
  keywords: [
    "Cincinnati Latin concerts",
    "Cincinnati live music",
    "Cincinnati nightlife events",
    "QueenCity Soundboard Cincinnati",
  ],
});

export default function CincinnatiPage() {
  const localJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cincinnati Latin Concerts and Live Music",
    url: `${SEO.baseUrl}/cincinnati`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SEO.baseUrl}/#website`,
    },
    about: {
      "@type": "City",
      name: "Cincinnati",
      containedInPlace: { "@type": "State", name: "Ohio" },
    },
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(localJsonLd) }}
      />

      <section className="qcs-ambient-card rounded-3xl p-7 md:p-10">
        <div className="absolute inset-0 bg-[url('/madison2.JPG')] bg-cover bg-position-[50%_42%] opacity-35 [filter:contrast(1.08)_saturate(1.03)_brightness(0.96)]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0b1228] via-[#0b1228]/88 to-[#0b1228]/45" />
        <div className="qcs-card-content max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">City Guide</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Cincinnati Live Music, Curated Through a Latin Lens
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-200 md:text-base">
            QueenCity Soundboard programs nights for Cincinnati audiences who want rhythm, musicianship, and a premium room energy.
            Expect curated acoustic sessions, throwback Latin dance eras, and artist-first showcases with clear ticket paths.
          </p>
        </div>
      </section>

      <section className="qcs-ambient-card rounded-3xl p-6 md:p-8">
        <div className="qcs-card-content">
          <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">Where Cincinnati Fans Start</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Use these pages to find active dates, venue details, and direct ticket flow for Greater Cincinnati events.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink
              href="/events"
              event="cta_click"
              label="cincinnati_view_events"
              className="qcs-button-3d rounded-lg bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-400"
            >
              Browse Events
            </TrackedLink>
            <TrackedLink
              href="/madison-theater"
              event="cta_click"
              label="cincinnati_view_venue"
              className="rounded-lg border border-white/20 bg-white/6 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10"
            >
              Madison Theater Guide
            </TrackedLink>
            <TrackedLink
              href="/covington"
              event="cta_click"
              label="cincinnati_view_covington_hub"
              className="rounded-lg border border-cyan-300/35 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/20"
            >
              Explore Covington Hub
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
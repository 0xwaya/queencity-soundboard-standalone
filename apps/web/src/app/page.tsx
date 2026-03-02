import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-7">
      <section className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-7 md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Clean • Pro • Edgy
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
          Live culture. Clean checkout. Sold-out energy.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600 md:text-base">
          A web-first music experience connecting Venezuelan artists and Midwest roots audiences.
          Fast mobile UX, premium event pages, and frictionless ticket handoff.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/events" className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white">
            Explore Events
          </Link>
          <Link href="/merch" className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold">
            Shop Merch
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h3 className="text-xl font-bold tracking-tight">Roots x Caracas Night</h3>
          <p className="mt-1 text-sm text-neutral-500">Madison Theater • Mar 14 • 8:00 PM</p>
          <p className="mt-3 text-sm text-neutral-700">
            Curated cross-cultural showcase with live sets, exclusive drops, and immersive visuals.
          </p>
          <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">Ticket Tailor</p>
            <button className="mt-2 rounded-md bg-black px-3 py-2 text-xs font-semibold text-white">Buy Tickets</button>
          </div>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h3 className="text-xl font-bold tracking-tight">Latin Acoustic Sessions</h3>
          <p className="mt-1 text-sm text-neutral-500">Madison Theater • Apr 05 • 7:30 PM</p>
          <p className="mt-3 text-sm text-neutral-700">
            Intimate story-driven performances with a boutique fan experience and limited seating.
          </p>
          <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">Ticket Tailor</p>
            <button className="mt-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold">See Details</button>
          </div>
        </article>
      </section>
    </div>
  );
}

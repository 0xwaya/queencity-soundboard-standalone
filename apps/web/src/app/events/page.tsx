import TicketWidget from "@/components/ticket-widget";
import { getPublishedEvents } from "@/lib/data";

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Live lineup</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Events</h1>
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-neutral-600">No published events yet. Add and publish from admin.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
              <h2 className="text-xl font-bold tracking-tight">{event.title}</h2>
              <p className="text-sm text-neutral-500">{event.artist_name}</p>
              <p className="text-sm text-neutral-700">{new Date(event.event_date).toLocaleString()}</p>
              {event.description ? <p className="text-sm text-neutral-700">{event.description}</p> : null}
              <TicketWidget eventTitle={event.title} />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

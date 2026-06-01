"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getFeaturedLatinEvents } from "@/lib/latin-events";

export function FeaturedLatinEventsWidget() {
  const [events, setEvents] = useState(getFeaturedLatinEvents().slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [events.length]);

  const currentEvent = events[currentIndex];

  if (!currentEvent) return null;

  return (
    <Link href="/latin-events">
      <div className="group qcs-ambient-card rounded-2xl border border-[#d4b87e]/20 p-6 transition-all hover:border-[#d4b87e]/40 cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎵</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4b87e]">Featured Latin Event</span>
            </div>

            <h3 className="mt-3 text-xl font-bold text-[#f5efe1] group-hover:text-[#d4b87e] transition-colors">
              {currentEvent.title}
            </h3>

            <p className="mt-2 text-sm text-slate-300 line-clamp-2">{currentEvent.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#d4b87e]/30 bg-[#d4b87e]/10 px-2 py-1 text-xs font-semibold text-[#d4b87e]">
                {currentEvent.genre}
              </span>
              <span className="rounded-full border border-[#d4b87e]/20 bg-white/6 px-2 py-1 text-xs text-slate-400">
                {currentEvent.eventType}
              </span>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <p className="text-slate-300">
                <span className="font-semibold">📍</span> {currentEvent.venue}, {currentEvent.venueCity}
              </p>
              <p className="text-slate-300">
                <span className="font-semibold">📅</span> {currentEvent.eventDate}
              </p>
            </div>

            <div className="mt-4 flex gap-2 pt-2">
              <span className="text-xs text-slate-400">
                Event {currentIndex + 1} of {events.length}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3">
            <span className="text-3xl">💃</span>
            <div className="flex gap-1">
              {events.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-[#d4b87e] w-4" : "bg-[#d4b87e]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs text-slate-400">Browse all {events.length}+ Latin events</div>
          <div className="text-[#d4b87e] group-hover:translate-x-1 transition-transform">→</div>
        </div>
      </div>
    </Link>
  );
}

export function LatinEventsPreview() {
  const events = getFeaturedLatinEvents().slice(0, 3);

  if (events.length === 0) return null;

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Link key={event.id} href="/latin-events#" className="block">
          <div className="qcs-glass-panel rounded-lg border border-[#d4b87e]/15 p-3 transition-all hover:border-[#d4b87e]/40">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#f5efe1] text-sm line-clamp-1">{event.title}</h4>
                <p className="mt-1 text-xs text-slate-400">
                  {event.eventDate} • {event.venueCity}
                </p>
              </div>
              <span className="shrink-0 text-lg">🎉</span>
            </div>
          </div>
        </Link>
      ))}
      <Link href="/latin-events" className="block">
        <div className="text-center rounded-lg border border-[#d4b87e]/30 bg-[#d4b87e]/5 p-3 text-xs font-semibold text-[#d4b87e] hover:bg-[#d4b87e]/10 transition-colors">
          View All Latin Events
        </div>
      </Link>
    </div>
  );
}

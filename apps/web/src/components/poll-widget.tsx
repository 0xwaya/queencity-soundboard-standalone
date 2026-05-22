"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

const ARTISTS = [
  "Rudy La Escala",
  "Elena Rose",
  "José Feliciano",
  "Servando y Florentino",
];

type VoteCounts = Record<string, number>;

type PollWidgetProps = {
  locale: Locale;
  variant?: "full" | "compact";
};

export default function PollWidget({ locale, variant = "full" }: PollWidgetProps) {
  const [counts, setCounts] = useState<VoteCounts>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);

  const totalVotes = useMemo(() => Object.values(counts).reduce((sum, val) => sum + val, 0), [counts]);

  const copy =
    locale === "es-ve"
      ? {
          eyebrow: "Pulso del público",
          title: "¿Quién va después?",
          body: "Vota por el artista que quieres sumar al próximo showcase.",
          tally: "Conteo en vivo",
          total: "votos totales",
          votes: "votos",
          thanks: "Gracias por votar",
          vote: "Votar",
          offline: "Votación disponible pronto.",
          loadError: "No se pudieron cargar los votos todavía.",
          voteError: "La votación falló. Intenta de nuevo.",
        }
      : {
          eyebrow: "Fan Signal",
          title: "Who should follow?",
          body: "Vote for the artist you want added to the next showcase.",
          tally: "Live tally",
          total: "total votes",
          votes: "votes",
          thanks: "Thanks for voting",
          vote: "Vote",
          offline: "Voting will be available soon.",
          loadError: "Unable to load votes yet.",
          voteError: "Vote failed. Please try again.",
        };
  const isCompact = variant === "compact";

  const loadVotes = useCallback(async () => {
    const nextCounts: VoteCounts = {};
    ARTISTS.forEach((artist) => (nextCounts[artist] = 0));

    try {
      const res = await fetch("/api/poll", { cache: "no-store" });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setCounts(nextCounts);
        setError(json.error ?? copy.loadError);
        return;
      }

      const json = (await res.json()) as {
        counts?: Record<string, number>;
        offline?: boolean;
        error?: string;
      };

      if (json.offline) {
        setCounts(nextCounts);
        setError(copy.offline);
        return;
      }

      if (json.counts) {
        ARTISTS.forEach((artist) => {
          const value = json.counts![artist];
          nextCounts[artist] = typeof value === "number" && Number.isFinite(value) ? value : 0;
        });
      }

      setCounts(nextCounts);
      setError(null);
    } catch (err) {
      console.error("[PollWidget] Failed to load vote totals", err);
      setCounts(nextCounts);
      setError(copy.loadError);
    }
  }, [copy.loadError, copy.offline]);

  const handleVote = async (artist: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artist_name: artist }),
      });

      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!res.ok) {
        // 429 from the cookie guard means the browser already voted
        if (res.status === 429 && !json.error?.includes("wait")) {
          setVoted(true);
        } else {
          setError(json.error ?? copy.voteError);
        }
        return;
      }

      setVoted(true);
      await loadVotes();
    } catch (err) {
      console.error("[PollWidget] Failed to submit vote", err);
      setError(copy.voteError);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadVotes();
  }, [loadVotes]);

  // Live tally: refresh vote counts every 30 s
  useEffect(() => {
    const id = setInterval(() => {
      loadVotes();
    }, 30_000);
    return () => clearInterval(id);
  }, [loadVotes]);

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-[#09111f] shadow-[0_18px_50px_rgba(0,0,0,0.18)] ${
        isCompact ? "p-4" : "p-6 md:p-8"
      }`}
    >
      <div className={`flex flex-col ${isCompact ? "gap-3" : "gap-4 md:flex-row md:items-start md:justify-between"}`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-300/80">{copy.eyebrow}</p>
          <h2 className={`${isCompact ? "mt-1 text-lg" : "mt-2 text-2xl md:text-3xl"} font-extrabold tracking-tight text-white`}>
            {copy.title}
          </h2>
          <p className={`${isCompact ? "mt-1" : "mt-2 max-w-2xl"} text-sm text-slate-300`}>{copy.body}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
          <p className="font-semibold text-slate-200">{isCompact ? copy.total : copy.tally}</p>
          <p>
            {totalVotes} {isCompact ? "" : copy.total}
          </p>
        </div>
      </div>

      <div className={`${isCompact ? "mt-4" : "mt-5"} grid gap-2.5`}>
        {ARTISTS.map((artist) => {
          const count = counts[artist] ?? 0;
          const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

          return (
            <div key={artist} className="rounded-xl border border-white/10 bg-[#0c142a] p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{artist}</p>
                  <p className="text-xs text-slate-400">
                    {count} {copy.votes}
                  </p>
                </div>
                <button
                  disabled={loading || voted}
                  onClick={() => handleVote(artist)}
                  className="shrink-0 rounded-lg bg-fuchsia-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {voted ? copy.thanks : copy.vote}
                </button>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-fuchsia-400" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {error ? <p className="mt-3 text-xs text-amber-300">{error}</p> : null}
    </section>
  );
}

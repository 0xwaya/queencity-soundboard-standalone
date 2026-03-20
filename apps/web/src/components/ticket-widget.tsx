"use client";

import { track } from "@vercel/analytics";

type Props = {
  eventTitle: string;
  eventTicketUrl?: string | null;
  locale?: "en" | "es-ve";
};

export default function TicketWidget({ eventTitle, eventTicketUrl, locale = "en" }: Props) {
  const provider = "tickettailor";
  const widgetUrl = process.env.NEXT_PUBLIC_TICKETING_WIDGET_URL;
  const checkoutUrl = eventTicketUrl || widgetUrl;
  const copy =
    locale === "es-ve"
      ? {
          title: "Checkout de entradas",
          cta: "Comprar entradas",
          missing: "Falta el link de tickets. Agrega",
        }
      : {
          title: "Ticket Checkout",
          cta: "Buy Tickets",
          missing: "Missing ticket URL. Add",
        };

  return (
    <section className="rounded-xl border border-white/10 bg-[#0c142a] p-4 shadow-[0_0_30px_rgba(88,28,135,0.12)] transition hover:border-fuchsia-400/40">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-100">{copy.title}</h3>
        <span className="rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-fuchsia-200">
          {provider}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{eventTitle}</p>
      <div className="mt-4">
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => track("checkout_click", { title: eventTitle, url: checkoutUrl, provider })}
            className="qcs-button-3d inline-flex w-full items-center justify-center rounded-lg bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-fuchsia-400"
          >
            {copy.cta}
          </a>
        ) : (
          <p className="text-sm text-amber-300">
            {copy.missing} <code>NEXT_PUBLIC_TICKETING_WIDGET_URL</code> {locale === "es-ve" ? "o define" : "or set"} {" "}
            <code>events.ticket_url</code>.
          </p>
        )}
      </div>
    </section>
  );
}

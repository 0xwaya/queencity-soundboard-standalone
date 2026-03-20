"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
};

export default function Header({ locale }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const nav = [
    { href: "/events", label: locale === "es-ve" ? "Eventos" : "Events" },
    { href: "/merch", label: locale === "es-ve" ? "Merch" : "Merch" },
    { href: "/about", label: locale === "es-ve" ? "Nosotros" : "About" },
  ];

  const toggleLocale = () => {
    const next = locale === "es-ve" ? "en" : "es-ve";
    document.cookie = `qcs_locale=${next}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1020]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-extrabold tracking-tight text-slate-100 sm:text-base md:text-xl">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5">
            <video
              className="h-full w-full object-cover"
              src="/qcs-logo-animated.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Queen City Soundboard logo"
            />
          </span>
          <span>QueenCity Soundboard</span>
        </Link>

        <nav className="hidden items-center gap-3 text-sm font-medium text-slate-300 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-white/30 hover:bg-white/10"
            aria-label={locale === "es-ve" ? "Switch to English" : "Cambiar a español de Venezuela"}
          >
            <span className="text-base">🇻🇪</span>
            <span>{locale === "es-ve" ? "EN" : "ES"}</span>
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex items-center justify-center rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/10 md:hidden"
            aria-label={locale === "es-ve" ? "Switch to English" : "Cambiar a español de Venezuela"}
          >
            🇻🇪
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-slate-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`md:hidden ${isOpen ? "block" : "hidden"} border-t border-white/10 bg-[#0b1020]/95 px-4 pb-4 pt-2`}
        aria-label="Mobile"
      >
        <ul className="flex flex-col gap-2 text-sm font-medium text-slate-300">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-full border border-white/10 px-3 py-2 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

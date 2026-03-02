import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight md:text-xl">
          QueenCity Soundboard
        </Link>
        <nav className="flex gap-4 text-sm font-medium text-neutral-700 md:gap-6">
          <Link href="/events">Events</Link>
          <Link href="/merch">Merch</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}

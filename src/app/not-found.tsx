import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Ramayan Farm",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-cream via-blush/50 to-cream px-4 py-20">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-2xl font-bold text-white shadow-glow-rose">
          <span>G</span>
        </div>

        <div className="mt-8 font-display text-7xl font-semibold text-gradient-rose sm:text-8xl">404</div>

        <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">Page Not Found</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-rose-gold px-6 py-3.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl border border-rose-gold/25 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-blush/50"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Gallery", href: "/gallery" },
            { label: "Packages", href: "/packages" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-rose-gold/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink/80 transition hover:border-rose-gold/40 hover:text-rose-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

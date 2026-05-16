"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cream via-blush/40 to-cream px-4">
      <div className="max-w-md rounded-2xl border border-rose-gold/15 bg-white/95 p-10 text-center shadow-luxury backdrop-blur-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-2xl font-bold text-white shadow-glow-rose">
          !
        </div>

        <h1 className="mt-8 font-display text-2xl font-semibold text-ink">Something Went Wrong</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-2xl bg-rose-gold px-6 py-3 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-2xl border border-rose-gold/25 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-blush/50"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

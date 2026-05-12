"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a332b] to-[#2a5245] flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-400/40 flex items-center justify-center mx-auto mb-8">
          <span className="text-red-400 text-3xl">!</span>
        </div>

        <h1 className="text-white font-serif text-2xl font-bold mb-3">
          Something Went Wrong
        </h1>
        <p className="text-white/60 mb-8">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c6a94c] to-[#dcc875] text-[#1a332b] font-semibold hover:shadow-lg transition-shadow"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

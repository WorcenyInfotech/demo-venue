"use client";

import { Bell, Search } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-rose-gold/10 bg-cream/90 px-4 py-5 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-ink/60">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-rose-gold/15 bg-white/90 px-3 py-2 text-sm text-ink/45 sm:flex">
            <Search size={14} className="text-rose-gold/60" />
            <span>Search...</span>
          </div>
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-rose-gold/15 bg-white text-ink transition hover:border-rose-gold/30 hover:bg-blush/50"
            aria-label="Notifications"
          >
            <Bell size={16} className="text-rose-gold" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-gold shadow-sm" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-sm font-bold text-white shadow-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

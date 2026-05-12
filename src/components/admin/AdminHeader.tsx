"use client";

import { Bell, Search } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="font-serif font-bold text-xl text-[#1a332b]">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Search hint */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 text-sm w-48">
          <Search size={14} />
          <span>Search...</span>
        </div>
        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c6a94c]" />
        </button>
        {/* Avatar */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2a5245] to-[#4d8b73] flex items-center justify-center text-white font-bold text-sm shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}

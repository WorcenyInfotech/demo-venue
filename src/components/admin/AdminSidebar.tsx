"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  MessageSquare,
  Images,
  Star,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { VENUE_IDENTITY } from "@/data/venueData";

const NAV_ITEMS = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/inquiries", icon: MessageSquare, label: "Inquiries" },
  { href: "/admin/gallery", icon: Images, label: "Gallery" },
  { href: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { href: "/admin/banners", icon: ImageIcon, label: "Banners" },
];

type SidebarBodyProps = {
  pathname: string;
  onNavClick?: () => void;
  onLogout: () => void | Promise<void>;
  loggingOut: boolean;
};

function SidebarBody({ pathname, onNavClick, onLogout, loggingOut }: SidebarBodyProps) {
  return (
    <div className="flex h-full flex-col border-r border-rose-gold/10 bg-white/95 backdrop-blur-md">
      <div className="border-b border-rose-gold/10 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-lg font-bold text-white shadow-glow-rose">
            <span>G</span>
          </div>
          <div>
            <div className="font-display text-lg font-semibold text-ink">{VENUE_IDENTITY.name}</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-gold">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-rose-gold to-rose-gold-deep text-white shadow-md"
                  : "text-ink/75 hover:bg-blush/60 hover:text-rose-gold-deep"
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight size={14} className="opacity-80" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-rose-gold/10 p-4">
        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl border border-rose-gold/15 bg-cream/80 px-4 py-3 text-sm font-semibold text-ink transition hover:border-rose-gold/30 hover:bg-blush disabled:opacity-50"
        >
          <LogOut size={18} className="text-rose-gold" />
          <span>{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
        <div className="mt-3 rounded-xl bg-blush/50 px-3 py-2 text-center text-xs text-ink/65">
          <div className="font-semibold text-ink">Admin</div>
          <div className="truncate">admin@greenlandfarm.com</div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <aside className="fixed top-0 left-0 z-40 hidden h-screen w-64 lg:block">
        <SidebarBody pathname={pathname} onLogout={handleLogout} loggingOut={loggingOut} />
      </aside>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-rose-gold/15 bg-white/95 shadow-md backdrop-blur-md lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} className="text-ink" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 z-50 h-full w-[min(100%,280px)] shadow-luxury lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-rose-gold/15 bg-white text-ink"
              >
                <X size={16} />
              </button>
              <SidebarBody
                pathname={pathname}
                onNavClick={() => setMobileOpen(false)}
                onLogout={handleLogout}
                loggingOut={loggingOut}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

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
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c6a94c] to-[#dcc875] flex items-center justify-center shadow-lg">
            <span className="text-[#1a332b] font-bold text-lg font-serif">G</span>
          </div>
          <div>
            <div className="text-white font-serif font-bold text-base leading-tight">
              Green Land Farm
            </div>
            <div className="text-[#c6a94c] text-[10px] tracking-widest uppercase">
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-[#c6a94c] text-[#1a332b] shadow-md"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#1a332b]" : "text-white/60 group-hover:text-white"} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto text-[#1a332b]/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-red-500/20 transition-all duration-200 group"
        >
          <LogOut size={18} className="text-white/60 group-hover:text-red-400" />
          <span>{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
        <div className="mt-3 px-4 py-2 rounded-lg bg-white/5 text-white/40 text-xs">
          <div className="font-medium text-white/60">Admin</div>
          <div>admin@greenlandfarm.com</div>
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
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-[#1a332b] to-[#2a5245] min-h-screen fixed left-0 top-0 bottom-0 z-40 shadow-2xl">
        <SidebarBody pathname={pathname} onLogout={handleLogout} loggingOut={loggingOut} />
      </aside>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-[#2a5245] text-white flex items-center justify-center shadow-lg"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#1a332b] to-[#2a5245] z-50 shadow-2xl lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/utils/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    queueMicrotask(() => setIsOpen(false));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /** Top promo bar: slightly softer when over home hero at top */
  const topBarSolid = !isHome || isScrolled;

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -120 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className={`hidden border-b transition-colors md:block ${
            topBarSolid
              ? "border-rose-gold/15 bg-rose-gold text-white"
              : "border-white/10 bg-rose-gold/85 text-white backdrop-blur-md"
          }`}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-medium tracking-wide">
              <Sparkles size={12} className="text-blush" />
              <span>{"Surat's Premier Luxury Wedding Destination"}</span>
            </div>
            <div className="flex items-center gap-3 text-white/95">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-1.5 transition hover:text-blush"
              >
                <Phone size={11} />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <span className="text-white/40">|</span>
              <span className="text-white/85">{SITE_CONFIG.workingHours}</span>
            </div>
          </div>
        </div>

        <div className="border-b border-rose-gold/10 bg-white shadow-sm backdrop-blur-xl transition-all duration-300">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-gold via-rose-gold-muted to-rose-gold-deep shadow-glow-rose ring-2 ring-white/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                  <span className="relative font-display text-xl font-bold text-white">G</span>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-blush ring-2 ring-cream"
                />
              </div>
              <div className="min-w-0">
                <div className="font-display text-lg font-semibold tracking-tight text-ink transition-colors sm:text-xl">
                  Green Land Farm
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-gold">
                  Luxury Venue
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition hover:bg-blush/60 hover:text-rose-gold"
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-rose-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/contact#inquiry"
                className="hidden items-center gap-2 rounded-full bg-rose-gold px-5 py-2.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep hover:shadow-luxury-hover sm:inline-flex"
              >
                <span>Book Now</span>
                <Sparkles size={14} className="opacity-90" />
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-2xl border border-rose-gold/15 bg-blush/50 p-2.5 text-ink transition hover:bg-blush lg:hidden"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-rose-gold/35 to-transparent opacity-100" />
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 z-50 flex h-full w-[min(100%,380px)] flex-col border-l border-rose-gold/15 bg-cream shadow-luxury lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="h-1.5 bg-gradient-to-r from-blush via-rose-gold to-blush" />

              <div className="flex items-center justify-between border-b border-rose-gold/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-lg font-bold text-white shadow-md">
                    <span>G</span>
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold text-ink">Green Land Farm</div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-gold">
                      Luxury Venue
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-rose-gold/20 p-2 text-ink transition hover:bg-blush"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.12 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition ${
                        isActive(link.href)
                          ? "bg-blush text-rose-gold-deep shadow-sm"
                          : "text-ink/85 hover:bg-blush/50 hover:text-rose-gold"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.href) && (
                        <span className="h-2 w-2 rounded-full bg-rose-gold shadow-glow-rose" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-3 border-t border-rose-gold/10 p-5">
                <Link
                  href="/contact#inquiry"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-rose-gold py-3.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
                >
                  <Sparkles size={16} />
                  Book Your Dream Wedding
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/25 bg-white py-3 text-sm font-semibold text-ink transition hover:border-rose-gold/50 hover:bg-blush/40"
                >
                  <Phone size={16} className="text-rose-gold" />
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

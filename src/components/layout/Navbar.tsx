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
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-[#d4af37]/10"
            : "bg-gradient-to-b from-black/30 to-transparent"
        }`}
      >
        {/* Elegant top bar */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="bg-gradient-to-r from-[#1a2e28] via-[#2a5245] to-[#1a2e28] text-white/90 text-xs py-2 border-b border-white/5">
            <div className="container-custom flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-2 text-[#d4af37]/90">
                <Sparkles size={12} className="animate-pulse" />
                <span className="font-medium tracking-wide">{"Surat's Premier Luxury Wedding Destination"}</span>
              </div>
              <div className="flex items-center gap-6 text-white/70 ml-auto">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
                >
                  <Phone size={11} />
                  <span className="font-medium">{SITE_CONFIG.phone}</span>
                </a>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="hidden sm:inline text-white/50">{SITE_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #1a2e28 0%, #2a5245 50%, #3d7a68 100%)",
                  }}
                >
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <span className="text-[#d4af37] font-bold text-xl md:text-2xl font-serif relative z-10">G</span>
                </motion.div>
                {/* Gold accent dot */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                  style={{ background: "linear-gradient(135deg, #d4af37, #e8c966)" }}
                />
              </div>
              <div>
                <div
                  className={`font-serif font-bold text-lg md:text-xl tracking-tight leading-tight transition-colors duration-300 ${
                    isScrolled ? "text-[#1a2e28]" : "text-white"
                  }`}
                >
                  Green Land Farm
                </div>
                <div
                  className={`text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                    isScrolled ? "text-[#d4af37]" : "text-[#d4af37]/90"
                  }`}
                >
                  Luxury Venue
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 group ${
                    isActive(link.href)
                      ? isScrolled
                        ? "text-[#1a2e28] bg-[#d4af37]/10"
                        : "text-[#d4af37]"
                      : isScrolled
                      ? "text-[#64605a] hover:text-[#1a2e28] hover:bg-gray-100/80"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d4af37]"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact#inquiry"
                className={`hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-[#d4af37] to-[#e8c966] text-[#1a2e28] shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)] hover:-translate-y-0.5"
                    : "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 hover:border-white/50"
                }`}
              >
                <span>Book Now</span>
                <Sparkles size={14} />
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "text-[#1a2e28] hover:bg-gray-100"
                    : "text-white hover:bg-white/15"
                }`}
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

        {/* Decorative bottom border when scrolled */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)",
          }}
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[min(90vw,360px)] bg-white z-50 lg:hidden shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Decorative header gradient */}
              <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#1a2e28] via-[#2a5245] to-transparent pointer-events-none" />

              {/* Drawer header */}
              <div className="relative p-6 pb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{ background: "linear-gradient(135deg, #d4af37, #e8c966)" }}
                    >
                      <span className="text-[#1a2e28] font-bold text-xl font-serif">G</span>
                    </div>
                    <div>
                      <div className="text-white font-serif font-bold text-lg">Green Land Farm</div>
                      <div className="text-[#d4af37]/80 text-xs tracking-widest uppercase">Luxury Venue</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.15 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between px-5 py-4 rounded-xl mb-1 text-base font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? "text-[#1a2e28] bg-gradient-to-r from-[#d4af37]/15 to-[#d4af37]/5 border-l-3 border-[#d4af37]"
                          : "text-[#64605a] hover:text-[#1a2e28] hover:bg-gray-50"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.href) && (
                        <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                <Link
                  href="/contact#inquiry"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#e8c966] text-[#1a2e28] shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                >
                  <Sparkles size={16} />
                  Book Your Dream Wedding
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 mt-3 rounded-xl border-2 border-[#1a2e28] text-[#1a2e28] font-semibold text-sm hover:bg-[#1a2e28] hover:text-white transition-all duration-300"
                >
                  <Phone size={16} />
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

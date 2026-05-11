"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/utils/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 80);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 80);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu open
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
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gold-200/30"
            : "bg-transparent"
        }`}
      >
        {/* Top bar */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
          }`}
        >
          <div className="bg-[#0f3d1e] text-white/80 text-xs py-1.5">
            <div className="container-custom flex items-center justify-between">
              <span className="hidden sm:block">
                ✨ Surat&apos;s Most Luxurious Wedding Venue &amp; Event Farm
              </span>
              <div className="flex items-center gap-4 ml-auto">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-1 hover:text-[#c9a84c] transition-colors"
                >
                  <Phone size={11} />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
                <span className="text-white/30">|</span>
                <span>{SITE_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center shadow-lg group-hover:shadow-[0_4px_20px_rgba(26,92,46,0.4)] transition-shadow">
                  <span className="text-[#c9a84c] font-bold text-lg md:text-xl font-serif">G</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#c9a84c]" />
              </div>
              <div>
                <div
                  className={`font-serif font-bold text-lg md:text-xl leading-tight transition-colors duration-300 ${
                    isScrolled ? "text-[#1a5c2e]" : "text-white"
                  }`}
                >
                  Green Land Farm
                </div>
                <div
                  className={`text-[10px] md:text-xs tracking-widest uppercase transition-colors duration-300 ${
                    isScrolled ? "text-[#c9a84c]" : "text-[#c9a84c]/90"
                  }`}
                >
                  Luxury Wedding Venue
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive(link.href)
                      ? isScrolled
                        ? "text-[#1a5c2e]"
                        : "text-[#c9a84c]"
                      : isScrolled
                      ? "text-gray-700 hover:text-[#1a5c2e]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#c9a84c] rounded-full transition-all duration-300 ${
                      isActive(link.href) ? "w-6" : "w-0 group-hover:w-4"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact#inquiry"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#0f3d1e] hover:shadow-[0_4px_20px_rgba(201,168,76,0.5)] hover:-translate-y-0.5"
              >
                Book Inquiry
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
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
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-[#0f3d1e] to-[#1a5c2e]">
                <div>
                  <div className="text-white font-serif font-bold text-lg">
                    Green Land Farm
                  </div>
                  <div className="text-[#c9a84c] text-xs tracking-widest uppercase">
                    Luxury Wedding Venue
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between px-6 py-4 text-base font-medium border-b border-gray-50 transition-colors ${
                        isActive(link.href)
                          ? "text-[#1a5c2e] bg-green-50"
                          : "text-gray-700 hover:text-[#1a5c2e] hover:bg-gray-50"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.href) && (
                        <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="p-5 border-t border-gray-100 space-y-3">
                <Link
                  href="/contact#inquiry"
                  className="btn-primary w-full justify-center text-sm"
                >
                  Book Inquiry
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-[#1a5c2e] text-[#1a5c2e] font-semibold text-sm hover:bg-green-50 transition-colors"
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

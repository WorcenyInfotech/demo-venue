"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Clock,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Sparkles,
} from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/utils/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    "Grand Wedding Ceremony",
    "Elegant Reception",
    "Romantic Engagement",
    "Sangeet Night",
    "Destination Wedding",
    "Corporate Events",
  ];

  const socialLinks = [
    { icon: Instagram, href: SITE_CONFIG.socialLinks.instagram, label: "Instagram" },
    { icon: Facebook, href: SITE_CONFIG.socialLinks.facebook, label: "Facebook" },
    { icon: Youtube, href: SITE_CONFIG.socialLinks.youtube, label: "YouTube" },
    { icon: Twitter, href: SITE_CONFIG.socialLinks.twitter, label: "Twitter" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Top gold accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#d4af37] via-[#e8c966] to-[#d4af37]" />

      {/* Main footer */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(180deg, #0a1410 0%, #0f1c18 50%, #1a2e28 100%)",
        }}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 mandala-pattern opacity-30" />

        {/* Decorative gradient orb */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-3xl -translate-y-1/2" />

        <div className="container-custom relative z-10">
          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20">
            {/* Brand column */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3.5 mb-6 group">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  style={{
                    background: "linear-gradient(135deg, #d4af37 0%, #e8c966 50%, #d4af37 100%)",
                  }}
                >
                  <span className="text-[#1a2e28] font-bold text-2xl font-serif">G</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-xl text-white">
                    Green Land Farm
                  </div>
                  <div className="text-[#d4af37] text-xs tracking-[0.2em] uppercase">
                    Luxury Venue
                  </div>
                </div>
              </Link>

              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                {"Surat's most prestigious wedding venue & event farm. Creating unforgettable memories for over 15 years with 500+ successful celebrations."}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-[#d4af37] transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif font-semibold text-lg text-white mb-6 flex items-center gap-3">
                <span
                  className="w-8 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }}
                />
                Quick Links
              </h3>
              <ul className="space-y-3.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2.5 text-white/50 hover:text-[#d4af37] transition-colors text-sm"
                    >
                      <ArrowRight
                        size={14}
                        className="text-[#d4af37]/40 group-hover:translate-x-1 transition-transform"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact#inquiry"
                    className="group flex items-center gap-2.5 text-white/50 hover:text-[#d4af37] transition-colors text-sm"
                  >
                    <ArrowRight
                      size={14}
                      className="text-[#d4af37]/40 group-hover:translate-x-1 transition-transform"
                    />
                    Book Inquiry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-serif font-semibold text-lg text-white mb-6 flex items-center gap-3">
                <span
                  className="w-8 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }}
                />
                Our Services
              </h3>
              <ul className="space-y-3.5">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="group flex items-center gap-2.5 text-white/50 hover:text-[#d4af37] transition-colors text-sm"
                    >
                      <ArrowRight
                        size={14}
                        className="text-[#d4af37]/40 group-hover:translate-x-1 transition-transform"
                      />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-serif font-semibold text-lg text-white mb-6 flex items-center gap-3">
                <span
                  className="w-8 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }}
                />
                Contact Us
              </h3>
              <ul className="space-y-5">
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="group flex items-start gap-4 text-white/50 hover:text-white transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        border: "1px solid rgba(212,175,55,0.2)",
                      }}
                    >
                      <Phone size={16} className="text-[#d4af37]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/30 mb-1 uppercase tracking-wider">Call Us</div>
                      <div className="text-sm">{SITE_CONFIG.phone}</div>
                      <div className="text-sm">{SITE_CONFIG.phone2}</div>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="group flex items-start gap-4 text-white/50 hover:text-white transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        border: "1px solid rgba(212,175,55,0.2)",
                      }}
                    >
                      <Mail size={16} className="text-[#d4af37]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/30 mb-1 uppercase tracking-wider">Email Us</div>
                      <div className="text-sm">{SITE_CONFIG.email}</div>
                    </div>
                  </a>
                </li>

                <li>
                  <div className="flex items-start gap-4 text-white/50">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        border: "1px solid rgba(212,175,55,0.2)",
                      }}
                    >
                      <MapPin size={16} className="text-[#d4af37]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/30 mb-1 uppercase tracking-wider">Address</div>
                      <div className="text-sm leading-relaxed">{SITE_CONFIG.address}</div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-4 text-white/50">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        border: "1px solid rgba(212,175,55,0.2)",
                      }}
                    >
                      <Clock size={16} className="text-[#d4af37]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/30 mb-1 uppercase tracking-wider">Hours</div>
                      <div className="text-sm">{SITE_CONFIG.workingHours}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm text-center sm:text-left">
              &copy; {currentYear} Green Land Farm. All rights reserved.
            </p>
            <p className="text-white/30 text-sm flex items-center gap-1.5">
              Crafted with{" "}
              <Heart size={14} className="text-[#d4af37] fill-[#d4af37]" />{" "}
              in Surat, Gujarat
            </p>
            <div className="flex items-center gap-6 text-xs text-white/30">
              <Link href="/privacy-policy" className="hover:text-[#d4af37] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-white/15">|</span>
              <Link href="/terms" className="hover:text-[#d4af37] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

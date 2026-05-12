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
} from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/utils/constants";

// Custom social media icons since lucide-react doesn't have brand icons
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

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
    { icon: InstagramIcon, href: SITE_CONFIG.socialLinks.instagram, label: "Instagram" },
    { icon: FacebookIcon, href: SITE_CONFIG.socialLinks.facebook, label: "Facebook" },
    { icon: YoutubeIcon, href: SITE_CONFIG.socialLinks.youtube, label: "YouTube" },
    { icon: TwitterIcon, href: SITE_CONFIG.socialLinks.twitter, label: "Twitter" },
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

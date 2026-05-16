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
import { VENUE_IDENTITY, VENUE_CONTACT } from "@/data/venueData";

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
    <footer className="relative border-t border-rose-gold/20">
      <div className="h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent" />

      <div className="relative overflow-hidden bg-gradient-to-b from-footer via-[#352e30] to-footer text-cream/90">
        <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-rose-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-blush/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Link href="/" className="group inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold via-rose-gold-muted to-rose-gold-deep font-display text-xl font-bold text-white shadow-glow-rose">
                  <span>G</span>
                </div>
                <div>
                  <div className="font-display text-xl font-semibold text-cream">{VENUE_IDENTITY.name}</div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-gold-muted">
                    Luxury Venue
                  </div>
                </div>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
                {"Surat's most prestigious wedding venue & event farm. Creating unforgettable memories for over 15 years with 500+ successful celebrations."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cream transition hover:border-rose-gold/40 hover:bg-rose-gold/15 hover:text-blush"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="relative pb-3 font-display text-lg font-semibold text-cream">
                <span className="absolute bottom-0 left-0 h-0.5 w-12 rounded-full bg-gradient-to-r from-rose-gold to-transparent" />
                Quick Links
              </h3>
              <ul className="mt-6 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-cream/75 transition hover:text-rose-gold-muted"
                    >
                      <ArrowRight size={14} className="text-rose-gold/60 transition group-hover:translate-x-0.5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact#inquiry"
                    className="group inline-flex items-center gap-2 text-sm text-cream/75 transition hover:text-rose-gold-muted"
                  >
                    <ArrowRight size={14} className="text-rose-gold/60 transition group-hover:translate-x-0.5" />
                    Book Inquiry
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="relative pb-3 font-display text-lg font-semibold text-cream">
                <span className="absolute bottom-0 left-0 h-0.5 w-12 rounded-full bg-gradient-to-r from-rose-gold to-transparent" />
                Our Services
              </h3>
              <ul className="mt-6 space-y-2.5">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="group inline-flex items-center gap-2 text-sm text-cream/75 transition hover:text-rose-gold-muted"
                    >
                      <ArrowRight size={14} className="text-rose-gold/60 transition group-hover:translate-x-0.5" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="relative pb-3 font-display text-lg font-semibold text-cream">
                <span className="absolute bottom-0 left-0 h-0.5 w-12 rounded-full bg-gradient-to-r from-rose-gold to-transparent" />
                Contact Us
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="flex gap-3 transition hover:text-blush">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-gold/25 bg-rose-gold/10 text-rose-gold-muted">
                      <Phone size={16} />
                    </div>
                    <div className="text-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">Call Us</div>
                      <div>{SITE_CONFIG.phone}</div>
                      <div className="text-cream/70">{SITE_CONFIG.phone2}</div>
                    </div>
                  </a>
                </li>

                <li>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="flex gap-3 transition hover:text-blush">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-gold/25 bg-rose-gold/10 text-rose-gold-muted">
                      <Mail size={16} />
                    </div>
                    <div className="text-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">Email Us</div>
                      <div className="break-all">{SITE_CONFIG.email}</div>
                    </div>
                  </a>
                </li>

                <li>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-gold/25 bg-rose-gold/10 text-rose-gold-muted">
                      <MapPin size={16} />
                    </div>
                    <div className="text-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">Address</div>
                      <div className="text-cream/80">{SITE_CONFIG.address}</div>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-gold/25 bg-rose-gold/10 text-rose-gold-muted">
                      <Clock size={16} />
                    </div>
                    <div className="text-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">Hours</div>
                      <div className="text-cream/80">{SITE_CONFIG.workingHours}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-sm text-cream/55 md:flex-row md:text-left">
            <p>&copy; {currentYear} {VENUE_IDENTITY.name}. All rights reserved.</p>
            <p className="inline-flex items-center gap-1.5">
              Crafted with <Heart size={14} className="fill-rose-gold text-rose-gold" /> in {VENUE_CONTACT.city}, {VENUE_CONTACT.state}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/privacy-policy" className="transition hover:text-rose-gold-muted">
                Privacy Policy
              </Link>
              <span className="text-cream/30">|</span>
              <Link href="/terms" className="transition hover:text-rose-gold-muted">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

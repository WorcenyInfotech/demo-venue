import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Clock,
  ArrowRight,
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

  return (
    <footer className="bg-[#0a2e14] text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 w-full bg-gradient-to-r from-[#c9a84c] via-[#e8c96a] to-[#c9a84c]" />

      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center border-2 border-[#c9a84c]/30">
                <span className="text-[#c9a84c] font-bold text-xl font-serif">G</span>
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-white">
                  Green Land Farm
                </div>
                <div className="text-[#c9a84c] text-xs tracking-widest uppercase">
                  Luxury Wedding Venue
                </div>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Surat&apos;s most prestigious wedding venue & event farm. Creating
              unforgettable memories for over 15 years with 500+ successful
              weddings.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { label: "IG", href: SITE_CONFIG.socialLinks.instagram, title: "Instagram" },
                { label: "FB", href: SITE_CONFIG.socialLinks.facebook, title: "Facebook" },
                { label: "YT", href: SITE_CONFIG.socialLinks.youtube, title: "YouTube" },
                { label: "TW", href: SITE_CONFIG.socialLinks.twitter, title: "Twitter" },
              ].map(({ label, href, title }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#c9a84c] hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/10 transition-all duration-200 text-xs font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#c9a84c]" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-white/60 hover:text-[#c9a84c] transition-colors text-sm group"
                  >
                    <ArrowRight
                      size={14}
                      className="text-[#c9a84c]/50 group-hover:translate-x-1 transition-transform"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact#inquiry"
                  className="flex items-center gap-2 text-white/60 hover:text-[#c9a84c] transition-colors text-sm group"
                >
                  <ArrowRight
                    size={14}
                    className="text-[#c9a84c]/50 group-hover:translate-x-1 transition-transform"
                  />
                  Book Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-semibold text-lg text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#c9a84c]" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-white/60 hover:text-[#c9a84c] transition-colors text-sm group"
                  >
                    <ArrowRight
                      size={14}
                      className="text-[#c9a84c]/50 group-hover:translate-x-1 transition-transform"
                    />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-lg text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#c9a84c]" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-3 text-white/60 hover:text-[#c9a84c] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#c9a84c]/20 transition-colors">
                    <Phone size={14} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">Call Us</div>
                    <div className="text-sm">{SITE_CONFIG.phone}</div>
                    <div className="text-sm">{SITE_CONFIG.phone2}</div>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-white/60 hover:text-[#c9a84c] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#c9a84c]/20 transition-colors">
                    <Mail size={14} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">Email Us</div>
                    <div className="text-sm">{SITE_CONFIG.email}</div>
                  </div>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-white/60">
                  <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">Address</div>
                    <div className="text-sm leading-relaxed">
                      {SITE_CONFIG.address}
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3 text-white/60">
                  <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={14} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">Hours</div>
                    <div className="text-sm">{SITE_CONFIG.workingHours}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {currentYear} Green Land Farm. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart size={12} className="text-[#c9a84c] fill-[#c9a84c]" /> in Surat, Gujarat
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/privacy-policy" className="hover:text-[#c9a84c] transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#c9a84c] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

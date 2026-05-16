"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/utils/constants";
import { VENUE_IDENTITY } from "@/data/venueData";
import { getWhatsAppUrl } from "@/utils/helpers";

export default function CTASection() {
  const whatsappUrl = getWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hello! I'd like to book ${VENUE_IDENTITY.name} for my wedding. Please share availability and packages.`
  );

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-footer via-ink to-footer" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-rose-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blush/10 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23faf7f2' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-rose-gold/35 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blush backdrop-blur-md"
          >
            <Calendar size={16} className="text-rose-gold-muted" />
            <span>Limited Dates Available for 2026</span>
          </motion.div>

          <motion.h2
            className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            Begin Your{" "}
            <span className="text-gradient-rose [text-shadow:0_2px_24px_rgba(183,110,121,0.35)]">
              Forever Story
            </span>
          </motion.h2>

          <motion.div
            className="mx-auto mt-8 h-1 max-w-xs rounded-full bg-gradient-to-r from-transparent via-rose-gold to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
          />

          <motion.p
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            Contact us today to check availability, receive a customized quote, and begin planning the most memorable
            celebration of your life.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 }}
          >
            <Link
              href="/contact#inquiry"
              className="inline-flex w-full min-w-[200px] items-center justify-center gap-2 rounded-2xl bg-rose-gold px-7 py-4 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-muted hover:shadow-luxury-hover sm:w-auto"
            >
              <Calendar size={20} />
              <span>Book Your Date</span>
              <Sparkles size={16} />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full min-w-[200px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-cream backdrop-blur-md transition hover:border-rose-gold/50 hover:bg-blush/15 sm:w-auto"
            >
              <MessageCircle size={20} />
              <span>WhatsApp Us</span>
              <ArrowRight size={16} />
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex w-full min-w-[200px] items-center justify-center gap-2 rounded-2xl border border-rose-gold/40 bg-transparent px-7 py-4 text-sm font-semibold text-cream transition hover:bg-rose-gold/20 sm:w-auto"
            >
              <Phone size={20} />
              <span>Call Now</span>
            </a>
          </motion.div>

          <motion.p
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-cream/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75 }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-gold" />
              Free Site Visit
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-gold" />
              No Booking Fees
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-gold" />
              Flexible Packages
            </span>
          </motion.p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent" />
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/utils/constants";
import { getWhatsAppUrl } from "@/utils/helpers";

export default function CTASection() {
  const whatsappUrl = getWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    "Hello! I'd like to book Green Land Farm for my wedding. Please share availability and packages."
  );

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f1c18 0%, #1a2e28 30%, #2a5245 70%, #1a2e28 100%)",
        }}
      />

      {/* Decorative pattern */}
      <div className="absolute inset-0 mandala-pattern" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full -translate-y-1/2 translate-x-1/3"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full translate-y-1/2 -translate-x-1/3"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <Calendar size={16} className="text-[#d4af37]" />
            <span className="text-[#d4af37] text-sm font-semibold tracking-[0.1em] uppercase">
              Limited Dates Available for 2025
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Begin Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #e8c966 40%, #d4af37 60%, #b8941f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Forever Story
            </span>
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-0.5 mx-auto rounded-full mb-8"
            style={{
              background: "linear-gradient(90deg, transparent, #d4af37, #e8c966, #d4af37, transparent)",
            }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Contact us today to check availability, receive a customized quote, and begin planning the most memorable celebration of your life.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <Link
              href="/contact#inquiry"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#e8c966] text-[#1a2e28] shadow-[0_8px_32px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_48px_rgba(212,175,55,0.5)] hover:-translate-y-1"
            >
              <Calendar size={20} />
              <span>Book Your Date</span>
              <Sparkles size={16} className="group-hover:animate-pulse" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 bg-[#25D366] text-white shadow-[0_8px_32px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.4)] hover:-translate-y-1"
            >
              <MessageCircle size={20} />
              <span>WhatsApp Us</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/25 hover:bg-white/20 hover:border-white/40 hover:-translate-y-1"
            >
              <Phone size={20} />
              <span>Call Now</span>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-10 text-white/40 text-sm flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              Free Site Visit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              No Booking Fees
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              Flexible Packages
            </span>
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
    </section>
  );
}

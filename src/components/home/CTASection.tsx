"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/utils/constants";
import { getWhatsAppUrl } from "@/utils/helpers";

export default function CTASection() {
  const whatsappUrl = getWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    "Hello! I'd like to book Green Land Farm for my wedding. Please share availability and packages."
  );

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a332b] via-[#2a5245] to-[#1a332b]" />

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#c6a94c]/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#c6a94c]/5 translate-y-1/2 -translate-x-1/2" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a84c' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c6a94c]/20 border border-[#c6a94c]/40 mb-6">
            <Calendar size={14} className="text-[#c6a94c]" />
            <span className="text-[#c6a94c] text-xs font-semibold tracking-widest uppercase">
              Limited Dates Available
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to Plan Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c6a94c 0%, #dcc875 50%, #c6a94c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dream Wedding?
            </span>
          </h2>

          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Contact us today to check availability, get a customized quote, and
            begin planning the most memorable day of your life at Green Land Farm.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact#inquiry"
              className="btn-primary text-base px-8 py-4 w-full sm:w-auto"
            >
              <Calendar size={18} />
              Book Inquiry Now
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#25D366] text-white font-semibold text-base hover:bg-[#1da851] transition-colors shadow-lg w-full sm:w-auto"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all w-full sm:w-auto"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>

          {/* Trust note */}
          <p className="mt-8 text-white/40 text-sm">
            ✓ Free site visit &nbsp;·&nbsp; ✓ No booking fee &nbsp;·&nbsp; ✓ Flexible packages
          </p>
        </motion.div>
      </div>
    </section>
  );
}

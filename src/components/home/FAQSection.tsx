"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Phone, MessageSquare, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/utils/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 pattern-overlay" />

      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial opacity-50 translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Header + decorative */}
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              badge="FAQ"
              title="Frequently Asked"
              titleHighlight="Questions"
              subtitle="Everything you need to know about booking and hosting your dream event at Green Land Farm."
              align="left"
            />

            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a2e28 0%, #2a5245 100%)",
              }}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 mandala-pattern opacity-30" />

              <div className="relative">
                <div className="flex items-center gap-2 text-[#d4af37] mb-4">
                  <Sparkles size={20} />
                  <span className="text-sm font-semibold tracking-wide uppercase">Need More Help?</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                  Still have questions?
                </h3>
                <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
                  Our team is available 7 days a week to answer all your queries and help you plan your perfect celebration.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+919876543210"
                    className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#e8c966] text-[#1a2e28] shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
                  >
                    <Phone size={16} />
                    <span>Call Us Now</span>
                  </a>
                  <a
                    href="/contact"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <MessageSquare size={16} />
                    <span>Send Message</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`rounded-2xl transition-all duration-400 overflow-hidden ${
                  openIndex === i
                    ? "shadow-lg"
                    : ""
                }`}
                style={{
                  background: openIndex === i
                    ? "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,248,245,0.95) 100%)"
                    : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  border: openIndex === i
                    ? "1px solid rgba(212, 175, 55, 0.3)"
                    : "1px solid rgba(212, 175, 55, 0.1)",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span
                    className={`font-semibold text-base md:text-lg transition-colors duration-300 pr-4 ${
                      openIndex === i ? "text-[#1a2e28]" : "text-[#64605a]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400 ${
                      openIndex === i
                        ? "text-[#1a2e28]"
                        : "bg-gray-100 text-[#64605a]"
                    }`}
                    style={
                      openIndex === i
                        ? { background: "linear-gradient(135deg, #d4af37 0%, #e8c966 100%)" }
                        : undefined
                    }
                  >
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="px-6 pb-6 text-[#64605a] text-sm md:text-base leading-relaxed border-t border-[#d4af37]/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/utils/constants";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Header + decorative */}
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              badge="FAQ"
              title="Frequently Asked"
              titleHighlight="Questions"
              subtitle="Everything you need to know about booking and hosting your event at Green Land Farm."
              align="left"
            />

            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#0f3d1e] to-[#1a5c2e] text-white"
            >
              <div className="text-[#c9a84c] font-serif text-4xl font-bold mb-2">
                Still have questions?
              </div>
              <p className="text-white/70 text-sm mb-5">
                Our team is available 7 days a week to answer all your queries
                and help you plan your perfect event.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#c9a84c] text-[#0f3d1e] font-semibold text-sm hover:bg-[#e8c96a] transition-colors"
                >
                  Call Us Now
                </a>
                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  Send Message
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "border-[#c9a84c]/40 shadow-md"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span
                    className={`font-semibold text-sm md:text-base transition-colors ${
                      openIndex === i ? "text-[#1a5c2e]" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === i
                        ? "bg-[#c9a84c] text-[#0f3d1e]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
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

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
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blush/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              badge="FAQ"
              title="Frequently Asked"
              titleHighlight="Questions"
              subtitle="Everything you need to know about booking and hosting your dream event at Green Land Farm."
              align="left"
            />

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="relative mt-8 overflow-hidden rounded-2xl border border-rose-gold/20 bg-gradient-to-br from-rose-gold via-rose-gold-deep to-footer p-8 text-cream shadow-luxury md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 opacity-20">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
              </div>
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles size={18} className="text-blush" />
                  <span>Need More Help?</span>
                </div>
                <h3 className="font-display text-2xl font-semibold">Still have questions?</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/85">
                  Our team is available 7 days a week to answer all your queries and help you plan your perfect celebration.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:+919876543210"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-cream px-4 py-3 text-sm font-semibold text-rose-gold transition hover:bg-blush"
                  >
                    <Phone size={16} />
                    <span>Call Us Now</span>
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/10 px-4 py-3 text-sm font-semibold text-cream backdrop-blur-md transition hover:bg-white/20"
                  >
                    <MessageSquare size={16} />
                    <span>Send Message</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border backdrop-blur-md transition ${
                  openIndex === i
                    ? "border-rose-gold/35 bg-white shadow-luxury-hover"
                    : "border-rose-gold/12 bg-white/75 hover:border-rose-gold/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base font-semibold text-ink sm:text-lg">{faq.question}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white transition ${
                      openIndex === i ? "bg-rose-gold shadow-glow-rose" : "bg-blush text-rose-gold"
                    }`}
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
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="border-t border-rose-gold/10 px-5 py-4 text-sm leading-relaxed text-ink/75">
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

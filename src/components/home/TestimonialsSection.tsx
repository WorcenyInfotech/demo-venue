"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { DEFAULT_TESTIMONIALS } from "@/utils/constants";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % DEFAULT_TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + DEFAULT_TESTIMONIALS.length) % DEFAULT_TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush/35 via-cream to-cream py-20 md:py-28">
      <div className="pointer-events-none absolute top-16 right-0 h-56 w-56 rounded-full bg-rose-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="Love Stories From"
          titleHighlight="Our Couples"
          subtitle="Real stories from real couples who celebrated their most cherished moments with us."
        />

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 text-rose-gold/10">
            <Quote size={100} strokeWidth={0} fill="currentColor" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-rose-gold/15 bg-white/95 p-8 shadow-luxury backdrop-blur-xl sm:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent" />

              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: DEFAULT_TESTIMONIALS[current].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Star size={22} className="fill-rose-gold text-rose-gold" />
                  </motion.div>
                ))}
              </div>

              <blockquote className="text-center font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                <span className="text-rose-gold/40">&ldquo;</span>
                {DEFAULT_TESTIMONIALS[current].review}
                <span className="text-rose-gold/40">&rdquo;</span>
              </blockquote>

              <div className="mt-10 flex flex-col items-center gap-4 border-t border-rose-gold/10 pt-8 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-xl font-semibold text-white shadow-glow-rose">
                    <span>{DEFAULT_TESTIMONIALS[current].name.charAt(0)}</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-display text-lg font-semibold text-ink">{DEFAULT_TESTIMONIALS[current].name}</div>
                    <div className="text-sm text-rose-gold">{DEFAULT_TESTIMONIALS[current].eventType}</div>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-gold/20 bg-blush/50 text-rose-gold">
                  <Quote size={22} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-gold/20 bg-white text-ink shadow-sm transition hover:border-rose-gold/40 hover:bg-blush"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex gap-2">
              {DEFAULT_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current ? "w-8 bg-rose-gold shadow-glow-rose" : "w-2.5 bg-rose-gold/25 hover:bg-rose-gold/45"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-gold/20 bg-white text-ink shadow-sm transition hover:border-rose-gold/40 hover:bg-blush"
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <motion.div
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          {DEFAULT_TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`rounded-2xl border px-4 py-4 text-left transition hover:-translate-y-1 ${
                i === current
                  ? "border-rose-gold/40 bg-gradient-to-br from-rose-gold to-rose-gold-deep text-white shadow-glow-rose"
                  : "border-rose-gold/12 bg-white/90 shadow-sm hover:border-rose-gold/30 hover:shadow-md"
              }`}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    className={i === current ? "fill-white text-white" : "fill-rose-gold text-rose-gold"}
                  />
                ))}
              </div>
              <div className={`mt-2 font-display text-sm font-semibold ${i === current ? "text-white" : "text-ink"}`}>
                {t.name.split(" & ")[0]}
              </div>
              <div className={`text-xs ${i === current ? "text-white/85" : "text-ink/60"}`}>{t.eventType}</div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

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
    setCurrent(
      (prev) => (prev - 1 + DEFAULT_TESTIMONIALS.length) % DEFAULT_TESTIMONIALS.length
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5]" />
      <div className="absolute inset-0 pattern-overlay" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[#d4af37]/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#2a5245]/5 blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          badge="Testimonials"
          title="Love Stories From"
          titleHighlight="Our Couples"
          subtitle="Real stories from real couples who celebrated their most cherished moments with us."
        />

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Large decorative quote */}
          <div className="absolute -top-6 left-4 md:left-8 text-[#d4af37]/10 pointer-events-none">
            <Quote size={100} className="fill-[#d4af37]/10" strokeWidth={0} />
          </div>

          {/* Main testimonial card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative rounded-3xl p-8 md:p-12 lg:p-14 overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(212,175,55,0.1)",
              }}
            >
              {/* Top gold accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#e8c966] to-[#d4af37]" />

              {/* Stars */}
              <div className="flex items-center gap-1.5 mb-8">
                {Array.from({ length: DEFAULT_TESTIMONIALS[current].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star size={22} className="text-[#d4af37] fill-[#d4af37]" />
                  </motion.div>
                ))}
              </div>

              {/* Review text */}
              <blockquote className="text-[#1a2e28] text-lg md:text-xl lg:text-2xl leading-relaxed font-serif mb-10">
                <span className="text-[#d4af37] text-3xl font-serif">&ldquo;</span>
                {DEFAULT_TESTIMONIALS[current].review}
                <span className="text-[#d4af37] text-3xl font-serif">&rdquo;</span>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-5">
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1a2e28 0%, #2a5245 50%, #3d7a68 100%)",
                    boxShadow: "0 8px 24px rgba(42, 82, 69, 0.25)",
                  }}
                >
                  <span className="text-white font-bold text-2xl font-serif">
                    {DEFAULT_TESTIMONIALS[current].name.charAt(0)}
                  </span>
                </div>

                <div>
                  <div className="font-serif font-bold text-[#1a2e28] text-lg md:text-xl">
                    {DEFAULT_TESTIMONIALS[current].name}
                  </div>
                  <div className="text-[#d4af37] text-sm font-semibold tracking-wide">
                    {DEFAULT_TESTIMONIALS[current].eventType}
                  </div>
                </div>

                {/* Decorative quote icon */}
                <div className="ml-auto hidden sm:flex w-14 h-14 rounded-full items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)",
                    border: "1px solid rgba(212,175,55,0.2)",
                  }}
                >
                  <Quote size={22} className="text-[#d4af37]" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center text-[#1a2e28] transition-all duration-300 hover:bg-[#1a2e28] hover:text-white hover:shadow-lg"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "2px solid rgba(26,46,40,0.15)",
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {DEFAULT_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-400 rounded-full ${
                    i === current
                      ? "w-10 h-3 bg-gradient-to-r from-[#d4af37] to-[#e8c966] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "w-3 h-3 bg-[#e0dcd5] hover:bg-[#d4af37]/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center text-[#1a2e28] transition-all duration-300 hover:bg-[#1a2e28] hover:text-white hover:shadow-lg"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "2px solid rgba(26,46,40,0.15)",
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Mini testimonial cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
        >
          {DEFAULT_TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`p-5 rounded-2xl text-left transition-all duration-400 ${
                i === current
                  ? "bg-gradient-to-br from-[#1a2e28] to-[#2a5245] text-white shadow-xl -translate-y-1"
                  : "bg-white hover:shadow-lg hover:-translate-y-0.5"
              }`}
              style={{
                border: i === current ? "none" : "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    className="text-[#d4af37] fill-[#d4af37]"
                  />
                ))}
              </div>
              <div
                className={`font-semibold text-sm mb-1 ${
                  i === current ? "text-white" : "text-[#1a2e28]"
                }`}
              >
                {t.name.split(" & ")[0]}
              </div>
              <div
                className={`text-xs ${
                  i === current ? "text-white/70" : "text-[#64605a]"
                }`}
              >
                {t.eventType}
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

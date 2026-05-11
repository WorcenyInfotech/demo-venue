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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section className="section-padding bg-[#fdf6e3] overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          badge="Testimonials"
          title="What Our Couples"
          titleHighlight="Say About Us"
          subtitle="Real stories from real couples who celebrated their most special moments at Green Land Farm."
        />

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Large quote icon */}
          <div className="absolute -top-4 left-8 text-[#c9a84c]/20">
            <Quote size={80} className="fill-[#c9a84c]/20" />
          </div>

          {/* Testimonial card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#c9a84c]/15"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: DEFAULT_TESTIMONIALS[current].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-[#c9a84c] fill-[#c9a84c]"
                    />
                  )
                )}
              </div>

              {/* Review text */}
              <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed font-serif italic mb-8">
                &ldquo;{DEFAULT_TESTIMONIALS[current].review}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white font-bold text-xl font-serif">
                    {DEFAULT_TESTIMONIALS[current].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-serif font-bold text-[#0f3d1e] text-lg">
                    {DEFAULT_TESTIMONIALS[current].name}
                  </div>
                  <div className="text-[#c9a84c] text-sm font-medium">
                    {DEFAULT_TESTIMONIALS[current].eventType}
                  </div>
                </div>

                {/* Decorative gold accent */}
                <div className="ml-auto hidden sm:block">
                  <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
                    <Quote size={20} className="text-[#c9a84c]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border-2 border-[#1a5c2e]/20 flex items-center justify-center text-[#1a5c2e] hover:bg-[#1a5c2e] hover:text-white hover:border-[#1a5c2e] transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {DEFAULT_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-8 h-2.5 bg-[#c9a84c]"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border-2 border-[#1a5c2e]/20 flex items-center justify-center text-[#1a5c2e] hover:bg-[#1a5c2e] hover:text-white hover:border-[#1a5c2e] transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini testimonial cards below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {DEFAULT_TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                i === current
                  ? "bg-[#1a5c2e] border-[#1a5c2e] text-white shadow-lg"
                  : "bg-white border-gray-100 hover:border-[#c9a84c]/30 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    className={i === current ? "text-[#c9a84c] fill-[#c9a84c]" : "text-[#c9a84c] fill-[#c9a84c]"}
                  />
                ))}
              </div>
              <div
                className={`font-semibold text-sm mb-0.5 ${
                  i === current ? "text-white" : "text-[#0f3d1e]"
                }`}
              >
                {t.name.split(" & ")[0]}
              </div>
              <div
                className={`text-xs ${
                  i === current ? "text-white/70" : "text-gray-400"
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

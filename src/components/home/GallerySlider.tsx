"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, X, ZoomIn, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { PLACEHOLDER_IMAGES } from "@/utils/constants";

const GALLERY_ITEMS = PLACEHOLDER_IMAGES.gallery.map((url, i) => ({
  id: i,
  url,
  title: [
    "Grand Wedding Ceremony",
    "Elegant Reception Hall",
    "Romantic Engagement",
    "Sangeet Night",
    "Outdoor Lawn Setup",
    "Floral Decoration",
    "Bridal Portrait",
    "Venue Overview",
  ][i],
  category: ["Wedding", "Reception", "Engagement", "Sangeet", "Venue", "Decoration", "Wedding", "Venue"][i],
}));

export default function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % GALLERY_ITEMS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || lightbox !== null) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, lightbox, next]);

  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightbox((p) => p !== null ? (p + 1) % GALLERY_ITEMS.length : null);
      if (e.key === "ArrowLeft") setLightbox((p) => p !== null ? (p - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (current + i + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      slides.push({ ...GALLERY_ITEMS[idx], offset: i });
    }
    return slides;
  };

  return (
    <>
      <section className="section-padding overflow-hidden relative">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0f1c18 0%, #1a2e28 40%, #2a5245 100%)",
          }}
        />

        {/* Decorative pattern */}
        <div className="absolute inset-0 mandala-pattern" />

        {/* Decorative gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)" }}
        />

        <div className="container-custom relative z-10">
          <SectionHeader
            badge="Our Gallery"
            title="Moments That Last"
            titleHighlight="Forever"
            subtitle="A glimpse into the magical weddings and celebrations we&apos;ve hosted at Green Land Farm."
            light
          />

          {/* Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Desktop: 3-card slider */}
            <div className="hidden md:flex items-center justify-center gap-3 lg:gap-5 w-full max-w-6xl mx-auto min-h-[320px] lg:min-h-[450px] px-2">
              {getVisibleSlides().map(({ id, url, title, category, offset }) => (
                <motion.div
                  key={id}
                  animate={{
                    scale: offset === 0 ? 1 : 0.82,
                    opacity: offset === 0 ? 1 : 0.5,
                    zIndex: offset === 0 ? 10 : 5,
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className={`group relative overflow-hidden cursor-pointer min-w-0 ${
                    offset === 0
                      ? "w-[40%] max-w-[500px] aspect-[5/4]"
                      : "w-[25%] max-w-[300px] aspect-[4/5]"
                  }`}
                  style={{ borderRadius: "1.25rem" }}
                  onClick={() => {
                    if (offset === 0) setLightbox(id);
                    else setCurrent(GALLERY_ITEMS.findIndex((g) => g.id === id));
                  }}
                >
                  <Image
                    src={url}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      offset === 0
                        ? "bg-gradient-to-t from-[#0f1c18]/80 via-[#0f1c18]/20 to-transparent"
                        : "bg-[#0f1c18]/40"
                    }`}
                  />

                  {offset === 0 && (
                    <>
                      {/* Info */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <span className="text-[#d4af37] text-xs font-semibold tracking-[0.15em] uppercase">
                          {category}
                        </span>
                        <h3 className="text-white font-serif font-semibold text-xl mt-1.5">
                          {title}
                        </h3>
                      </div>

                      {/* Zoom icon */}
                      <div className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                        style={{
                          background: "rgba(255, 255, 255, 0.15)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <ZoomIn size={18} className="text-white" />
                      </div>

                      {/* Gold corner accent */}
                      <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
                        <div
                          className="absolute -left-8 -top-8 w-16 h-16 rotate-45"
                          style={{ background: "linear-gradient(135deg, #d4af37 0%, transparent 60%)" }}
                        />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile: single card */}
            <div className="md:hidden relative h-[350px] overflow-hidden" style={{ borderRadius: "1.25rem" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                  onClick={() => setLightbox(current)}
                >
                  <Image
                    src={GALLERY_ITEMS[current].url}
                    alt={GALLERY_ITEMS[current].title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c18]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span className="text-[#d4af37] text-xs font-semibold tracking-[0.15em] uppercase">
                      {GALLERY_ITEMS[current].category}
                    </span>
                    <h3 className="text-white font-serif font-semibold text-xl mt-1">
                      {GALLERY_ITEMS[current].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 z-20 hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 z-20 hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8 mb-10">
            {GALLERY_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-400 rounded-full ${
                  i === current
                    ? "w-8 h-2.5 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"
                }`}
                style={i === current ? { background: "linear-gradient(90deg, #d4af37, #e8c966)" } : undefined}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white hover:text-[#1a2e28] hover:border-white"
            >
              <span>View Full Gallery</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(15, 28, 24, 0.98)" }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
              style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(8px)" }}
              onClick={() => setLightbox(null)}
            >
              <X size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-[4/3] overflow-hidden"
              style={{ borderRadius: "1.5rem" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_ITEMS[lightbox].url}
                alt={GALLERY_ITEMS[lightbox].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />

              {/* Info bar */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(15,28,24,0.9) 0%, transparent 100%)" }}
              >
                <p className="text-[#d4af37] text-sm font-semibold tracking-wide uppercase">{GALLERY_ITEMS[lightbox].category}</p>
                <p className="text-white font-serif font-semibold text-xl mt-1">{GALLERY_ITEMS[lightbox].title}</p>
              </div>
            </motion.div>

            {/* Lightbox nav */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
              style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(8px)" }}
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => p !== null ? (p - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null);
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
              style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(8px)" }}
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => p !== null ? (p + 1) % GALLERY_ITEMS.length : null);
              }}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

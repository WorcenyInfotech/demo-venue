"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, X, ZoomIn } from "lucide-react";
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
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, lightbox, next]);

  // Keyboard navigation for lightbox
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

  // Visible slides (show 3 at a time on desktop)
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
      <section className="section-padding bg-gradient-to-b from-[#1a332b] to-[#2a5245] overflow-hidden">
        <div className="container-custom">
          <SectionHeader
            badge="Our Gallery"
            title="Moments That Last"
            titleHighlight="Forever"
            subtitle="A glimpse into the magical weddings and events we've hosted at Green Land Farm."
            light
          />

          {/* Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Desktop / tablet: 3-card slider — fluid widths to avoid horizontal overflow */}
            <div className="hidden md:flex items-center justify-center gap-2 lg:gap-4 w-full max-w-6xl mx-auto min-h-[280px] lg:min-h-[420px] px-1">
              {getVisibleSlides().map(({ id, url, title, category, offset }) => (
                <motion.div
                  key={id}
                  animate={{
                    scale: offset === 0 ? 1 : 0.85,
                    opacity: offset === 0 ? 1 : 0.6,
                    zIndex: offset === 0 ? 10 : 5,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer min-w-0 ${
                    offset === 0
                      ? "w-[38%] max-w-[480px] aspect-[6/5] max-h-[400px]"
                      : "w-[26%] max-w-[320px] aspect-[16/17] max-h-[340px]"
                  }`}
                  onClick={() => {
                    if (offset === 0) setLightbox(id);
                    else setCurrent(GALLERY_ITEMS.findIndex((g) => g.id === id));
                  }}
                >
                  <Image
                    src={url}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      offset === 0
                        ? "bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        : "bg-black/30"
                    }`}
                  />
                  {offset === 0 && (
                    <>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[#c6a94c] text-xs font-semibold tracking-widest uppercase">
                          {category}
                        </span>
                        <h3 className="text-white font-serif font-semibold text-lg mt-1">
                          {title}
                        </h3>
                      </div>
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn size={16} className="text-white" />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile: single card */}
            <div className="md:hidden relative h-[300px] rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[#c6a94c] text-xs font-semibold tracking-widest uppercase">
                      {GALLERY_ITEMS[current].category}
                    </span>
                    <h3 className="text-white font-serif font-semibold text-lg mt-1">
                      {GALLERY_ITEMS[current].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#c6a94c] hover:border-[#c6a94c] transition-all duration-200 z-20"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#c6a94c] hover:border-[#c6a94c] transition-all duration-200 z-20"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 mb-8">
            {GALLERY_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 h-2 bg-[#c6a94c]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-[#c6a94c] hover:border-[#c6a94c] hover:text-[#1a332b] transition-all duration-300"
            >
              View Full Gallery
              <ArrowRight size={18} />
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
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_ITEMS[lightbox].url}
                alt={GALLERY_ITEMS[lightbox].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </motion.div>

            {/* Lightbox nav */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => p !== null ? (p - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null);
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => p !== null ? (p + 1) % GALLERY_ITEMS.length : null);
              }}
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

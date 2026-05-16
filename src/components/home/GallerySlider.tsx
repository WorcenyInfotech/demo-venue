"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, X, ZoomIn } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { PLACEHOLDER_IMAGES } from "@/utils/constants";
import { VENUE_IDENTITY } from "@/data/venueData";

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
      if (e.key === "ArrowRight")
        setLightbox((p) => (p !== null ? (p + 1) % GALLERY_ITEMS.length : null));
      if (e.key === "ArrowLeft")
        setLightbox((p) => (p !== null ? (p - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
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
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-footer via-[#3a3234] to-footer" />
        <div className="pointer-events-none absolute top-20 right-10 h-72 w-72 rounded-full bg-rose-gold/15 blur-3xl" />
        <motion.div
          className="pointer-events-none absolute bottom-10 left-10 h-64 w-64 rounded-full bg-blush/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Gallery"
            title="Moments That Last"
            titleHighlight="Forever"
            subtitle={`A glimpse into the magical weddings and celebrations we've hosted at ${VENUE_IDENTITY.name}.`}
            light
          />

          <div
            className="relative mt-4"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="relative hidden min-h-[420px] items-center justify-center gap-4 pb-12 md:flex">
              {getVisibleSlides().map(({ id, url, title, category, offset }) => (
                <motion.div
                  key={`${id}-${offset}`}
                  className="relative h-[380px] w-[280px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-luxury lg:h-[420px] lg:w-[320px]"
                  animate={{
                    scale: offset === 0 ? 1 : 0.82,
                    opacity: offset === 0 ? 1 : 0.45,
                    zIndex: offset === 0 ? 10 : 5,
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => {
                    if (offset === 0) setLightbox(id);
                    else setCurrent(GALLERY_ITEMS.findIndex((g) => g.id === id));
                  }}
                >
                  <Image src={url} alt={title} fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                  {offset === 0 && (
                    <>
                      <div className="absolute right-5 bottom-6 left-5 z-10">
                        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blush backdrop-blur-md">
                          {category}
                        </span>
                        <h3 className="mt-3 font-display text-xl font-semibold text-cream lg:text-2xl">{title}</h3>
                      </div>
                      <div className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-cream backdrop-blur-md">
                        <ZoomIn size={18} />
                      </div>
                      <div className="absolute top-0 left-0 h-24 w-24 bg-gradient-to-br from-rose-gold/50 to-transparent opacity-80" />
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="relative mx-auto aspect-[4/5] max-h-[70vh] overflow-hidden rounded-2xl border border-white/10 shadow-luxury md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightbox(current)}
                >
                  <Image
                    src={GALLERY_ITEMS[current].url}
                    alt={GALLERY_ITEMS[current].title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-cream/10" />
                  <div className="absolute right-4 bottom-5 left-4">
                    <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blush backdrop-blur-md">
                      {GALLERY_ITEMS[current].category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-cream">
                      {GALLERY_ITEMS[current].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={prev}
              className="absolute top-1/2 left-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-cream backdrop-blur-md transition hover:bg-rose-gold/40 md:left-0"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute top-1/2 right-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-cream backdrop-blur-md transition hover:bg-rose-gold/40 md:right-0"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {GALLERY_ITEMS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-9 bg-gradient-to-r from-rose-gold to-rose-gold-muted shadow-glow-rose" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-2xl bg-rose-gold px-8 py-4 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-muted hover:shadow-luxury-hover"
            >
              <span>View Full Gallery</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cream backdrop-blur-md transition hover:bg-rose-gold/30"
              onClick={() => setLightbox(null)}
            >
              <X size={22} />
            </button>

            <motion.div
              className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-luxury"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={GALLERY_ITEMS[lightbox].url}
                  alt={GALLERY_ITEMS[lightbox].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-gold-muted">
                  {GALLERY_ITEMS[lightbox].category}
                </p>
                <p className="font-display text-lg text-cream">{GALLERY_ITEMS[lightbox].title}</p>
              </div>
            </motion.div>

            <button
              type="button"
              className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cream backdrop-blur-md transition hover:bg-rose-gold/30 md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => (p !== null ? (p - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cream backdrop-blur-md transition hover:bg-rose-gold/30 md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((p) => (p !== null ? (p + 1) % GALLERY_ITEMS.length : null));
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

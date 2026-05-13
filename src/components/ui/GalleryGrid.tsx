"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from "lucide-react";
import { GALLERY_CATEGORIES } from "@/utils/constants";

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory);

  const lightboxImg = lightbox !== null ? filtered[lightbox] : null;

  const prevLightbox = () =>
    setLightbox((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : null));
  const nextLightbox = () =>
    setLightbox((p) => (p !== null ? (p + 1) % filtered.length : null));

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeCategory === cat.id
                ? "bg-gradient-to-r from-rose-gold to-rose-gold-deep text-white shadow-glow-rose"
                : "border border-rose-gold/20 bg-white/90 text-ink/80 shadow-sm hover:border-rose-gold/40 hover:bg-blush/60"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      >
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-rose-gold/10 bg-blush/30 shadow-sm"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                <motion.div
                  initial={{ scale: 0.85 }}
                  whileHover={{ scale: 1.08 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-white backdrop-blur-md"
                >
                  <ZoomIn size={22} />
                </motion.div>
              </div>

              <div className="absolute right-0 bottom-0 left-0 translate-y-full p-4 transition duration-300 group-hover:translate-y-0">
                <p className="font-display text-sm font-semibold text-cream">{img.title}</p>
                <p className="text-xs uppercase tracking-wider text-rose-gold-muted">{img.category}</p>
              </div>

              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                <Sparkles size={16} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-rose-gold/25 bg-blush/40 py-16 text-center">
          <p className="text-sm font-medium text-ink/65">No images in this category yet.</p>
        </div>
      )}

      <AnimatePresence>
        {lightbox !== null && lightboxImg && (
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

            <div className="absolute top-6 left-6 z-10 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-cream backdrop-blur-md">
              {lightbox + 1} / {filtered.length}
            </div>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-luxury"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={lightboxImg.url}
                  alt={lightboxImg.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent px-6 py-5">
                <p className="font-display text-lg text-cream">{lightboxImg.title}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-gold-muted">
                  {lightboxImg.category}
                </p>
              </div>
            </motion.div>

            <button
              type="button"
              className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cream backdrop-blur-md transition hover:bg-rose-gold/30 md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cream backdrop-blur-md transition hover:bg-rose-gold/30 md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
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

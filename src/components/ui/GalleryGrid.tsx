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
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const lightboxImg = lightbox !== null ? filtered[lightbox] : null;

  const prevLightbox = () =>
    setLightbox((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : null));
  const nextLightbox = () =>
    setLightbox((p) => (p !== null ? (p + 1) % filtered.length : null));

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat.id
                ? "text-[#1a2e28] shadow-lg -translate-y-0.5"
                : "text-[#64605a] hover:text-[#1a2e28]"
            }`}
            style={
              activeCategory === cat.id
                ? {
                    background: "linear-gradient(135deg, #d4af37 0%, #e8c966 100%)",
                    boxShadow: "0 4px 20px rgba(212, 175, 55, 0.35)",
                  }
                : {
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                  }
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
      >
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={`relative group cursor-pointer overflow-hidden ${
                i % 7 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
              style={{ borderRadius: "1rem" }}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c18]/80 via-[#0f1c18]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                  }}
                >
                  <ZoomIn size={22} className="text-white" />
                </motion.div>
              </div>

              {/* Title on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <p className="text-white text-sm font-semibold truncate">{img.title}</p>
                <p className="text-white/60 text-xs capitalize">{img.category}</p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <Sparkles size={16} className="text-[#d4af37]" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#a8a29e]">
          <p className="text-lg">No images in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(15, 28, 24, 0.98)" }}
            onClick={() => setLightbox(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setLightbox(null)}
            >
              <X size={22} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-wider">
              {lightbox + 1} / {filtered.length}
            </div>

            {/* Main image */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden"
              style={{ borderRadius: "1.5rem" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={lightboxImg.url}
                  alt={lightboxImg.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
              </div>

              {/* Info bar */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{
                  background: "linear-gradient(to top, rgba(15,28,24,0.9) 0%, transparent 100%)",
                }}
              >
                <p className="text-white font-serif font-semibold text-lg">{lightboxImg.title}</p>
                <p className="text-[#d4af37] text-sm capitalize">{lightboxImg.category}</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
              }}
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
              }}
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

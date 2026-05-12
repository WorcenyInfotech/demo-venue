"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Star, Sparkles, Calendar } from "lucide-react";
import { PLACEHOLDER_IMAGES } from "@/utils/constants";

const HERO_SLIDES = [
  {
    image: PLACEHOLDER_IMAGES.hero,
    title: "Where Dreams",
    titleHighlight: "Come Alive",
    subtitle:
      "Experience the grandeur of your perfect wedding at Green Land Farm, where every moment is crafted into a timeless memory.",
  },
  {
    image: PLACEHOLDER_IMAGES.hero2,
    title: "Your Royal",
    titleHighlight: "Celebration",
    subtitle:
      "5 acres of pristine paradise, world-class amenities, and dedicated experts to orchestrate your dream celebration.",
  },
  {
    image: PLACEHOLDER_IMAGES.hero3,
    title: "Luxury Beyond",
    titleHighlight: "Imagination",
    subtitle:
      "Discover Gujarat's most prestigious wedding destination, where traditional elegance meets modern sophistication.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const scrollToNext = () => {
    const nextSection = document.getElementById("highlights");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[100svh] min-h-[700px] max-h-[1000px] overflow-hidden">
      {/* Background slides with parallax effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_SLIDES[currentSlide].image}
            alt={`Green Land Farm - ${HERO_SLIDES[currentSlide].title}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Premium gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c18]/95 via-[#1a2e28]/80 to-[#1a2e28]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c18]/90 via-transparent to-[#0f1c18]/30" />

      {/* Decorative mandala pattern */}
      <div className="absolute inset-0 mandala-pattern" />

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#d4af37]/40"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#d4af37]/30"
        />
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-white/20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl">
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 backdrop-blur-md border border-[#d4af37]/30"
              style={{
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)",
              }}
            >
              <Star size={14} className="text-[#d4af37] fill-[#d4af37]" />
              <span className="text-[#d4af37] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase">
                {"Surat's #1 Luxury Wedding Venue"}
              </span>
              <Star size={14} className="text-[#d4af37] fill-[#d4af37]" />
            </motion.div>

            {/* Animated heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6">
                  {HERO_SLIDES[currentSlide].title}
                  <br />
                  <span
                    className="inline-block"
                    style={{
                      background: "linear-gradient(135deg, #d4af37 0%, #e8c966 40%, #d4af37 60%, #b8941f 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {HERO_SLIDES[currentSlide].titleHighlight}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Gold divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-0.5 bg-gradient-to-r from-[#d4af37] via-[#e8c966] to-transparent rounded-full mb-6"
            />

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/75 text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 max-w-2xl font-light"
              >
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <Link
                href="/contact#inquiry"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#e8c966] text-[#1a2e28] shadow-[0_8px_32px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_48px_rgba(212,175,55,0.5)] hover:-translate-y-1"
              >
                <Calendar size={18} />
                <span>Book Your Date</span>
                <Sparkles size={16} className="group-hover:animate-pulse" />
              </Link>
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:border-white/50 hover:-translate-y-1"
              >
                <Play size={18} className="fill-white" />
                <span>Explore Gallery</span>
              </Link>
            </motion.div>

            {/* Trust indicators with glassmorphism */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {[
                { value: "500+", label: "Grand Weddings" },
                { value: "15+", label: "Years Legacy" },
                { value: "1000+", label: "Guest Capacity" },
                { value: "5", label: "Star Rating" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl backdrop-blur-md border border-white/10"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <div className="text-[#d4af37] font-bold text-xl sm:text-2xl font-serif">
                    {stat.value}
                    {stat.label === "Star Rating" && <Star size={14} className="inline ml-1 fill-[#d4af37]" />}
                  </div>
                  <div className="text-white/60 text-xs sm:text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide indicators - modern pill design */}
      <div className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentSlide(i);
              setIsAutoPlaying(false);
            }}
            className={`transition-all duration-500 rounded-full ${
              i === currentSlide
                ? "w-10 h-2.5 bg-gradient-to-r from-[#d4af37] to-[#e8c966] shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll down indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Discover</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 group-hover:border-[#d4af37]/50 transition-colors">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[#d4af37]"
          />
        </div>
      </motion.button>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
    </section>
  );
}

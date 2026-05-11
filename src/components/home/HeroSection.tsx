"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Star } from "lucide-react";
import { PLACEHOLDER_IMAGES } from "@/utils/constants";

const HERO_SLIDES = [
  {
    image: PLACEHOLDER_IMAGES.hero,
    title: "Luxury Wedding",
    titleHighlight: "Venue in Surat",
    subtitle:
      "Create unforgettable wedding memories at Green Land Farm — where every moment becomes a timeless story.",
  },
  {
    image: PLACEHOLDER_IMAGES.hero2,
    title: "Your Dream Wedding",
    titleHighlight: "Starts Here",
    subtitle:
      "5 acres of lush green paradise, world-class amenities, and dedicated event management for your perfect day.",
  },
  {
    image: PLACEHOLDER_IMAGES.hero3,
    title: "Destination Wedding",
    titleHighlight: "Farm in Surat",
    subtitle:
      "Experience the grandeur of a royal wedding surrounded by nature's beauty at Gujarat's most prestigious venue.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const scrollToNext = () => {
    const nextSection = document.getElementById("highlights");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f3d1e]/90 via-[#1a5c2e]/70 to-[#0f3d1e]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d1e]/80 via-transparent to-transparent" />

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 backdrop-blur-sm mb-6"
            >
              <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase">
                Surat&apos;s #1 Luxury Wedding Venue
              </span>
              <Star size={12} className="text-[#c9a84c] fill-[#c9a84c]" />
            </motion.div>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="heading-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
                  {HERO_SLIDES[currentSlide].title}{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%)",
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

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
              >
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link href="/contact#inquiry" className="btn-primary text-base px-7 py-3.5">
                Book Inquiry
              </Link>
              <Link href="/gallery" className="btn-secondary text-base px-7 py-3.5 flex items-center gap-2">
                <Play size={16} className="fill-white" />
                View Gallery
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { value: "500+", label: "Weddings" },
                { value: "15+", label: "Years" },
                { value: "1000+", label: "Capacity" },
                { value: "5★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-[#c9a84c] font-bold text-xl font-serif">
                    {stat.value}
                  </span>
                  <span className="text-white/60 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentSlide(i);
              setIsAutoPlaying(false);
            }}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? "w-8 h-2 bg-[#c9a84c]"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll down indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} />
      </motion.button>
    </section>
  );
}

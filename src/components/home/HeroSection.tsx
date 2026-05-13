"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Star, Sparkles, Calendar, MapPin } from "lucide-react";
import { PLACEHOLDER_IMAGES } from "@/utils/constants";

const easeLux = [0.4, 0, 0.2, 1] as const;

const HERO_SLIDES = [
  {
    frameImage: PLACEHOLDER_IMAGES.venue1,
    title: "Where Dreams",
    titleHighlight: "Come Alive",
    subtitle:
      "Experience the grandeur of your perfect wedding at Green Land Farm, where every moment is crafted into a timeless memory.",
  },
  {
    frameImage: PLACEHOLDER_IMAGES.venue2,
    title: "Your Royal",
    titleHighlight: "Celebration",
    subtitle:
      "Five acres of pristine lawns, elegant halls, and a devoted team to orchestrate your dream celebration from first visit to farewell.",
  },
  {
    frameImage: PLACEHOLDER_IMAGES.about,
    title: "Luxury Beyond",
    titleHighlight: "Imagination",
    subtitle:
      "Gujarat's most prestigious wedding destination — where timeless tradition meets refined modern hospitality.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const scrollToNext = () => {
    document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-cream via-blush/50 to-cream">
      {/* Soft decorative washes (no photos) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(183,110,121,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_70%,rgba(245,230,232,0.9),transparent_45%)]" />
      <div className="pointer-events-none absolute top-20 right-[-5%] h-72 w-72 rounded-full bg-rose-gold/15 blur-3xl md:h-96 md:w-96" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center gap-10 px-4 pb-28 pt-28 sm:gap-12 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:pb-20 lg:pt-32 xl:gap-16">
        {/* Left: copy */}
        <div className="flex w-full flex-1 flex-col justify-center lg:max-w-xl lg:flex-none xl:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: easeLux }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-gold/25 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-gold-deep shadow-sm sm:text-xs"
          >
            <Star size={13} className="fill-rose-gold text-rose-gold" />
            <span>{"Surat's #1 Luxury Wedding Venue"}</span>
            <Star size={13} className="fill-rose-gold text-rose-gold" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`head-${currentSlide}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: easeLux }}
              className="mt-6"
            >
              <h1 className="font-display text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                {slide.title}{" "}
                <span className="text-gradient-rose">{slide.titleHighlight}</span>
              </h1>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="mt-6 h-1 w-0 max-w-[7rem] rounded-full bg-gradient-to-r from-rose-gold via-rose-gold-muted to-blush"
            initial={{ width: 0 }}
            animate={{ width: "7rem" }}
            transition={{ delay: 0.35, duration: 0.65, ease: easeLux }}
          />

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/78 sm:text-lg"
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-2 flex items-center gap-2 text-sm text-ink/55"
          >
            <MapPin size={15} className="shrink-0 text-rose-gold" />
            <span>Surat–Navsari Highway · Gujarat</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link
              href="/contact#inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-gold px-8 py-4 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep hover:shadow-luxury-hover"
            >
              <Calendar size={18} />
              <span>Book Your Date</span>
              <Sparkles size={16} />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-rose-gold/35 bg-white px-8 py-4 text-sm font-semibold text-ink shadow-sm transition hover:border-rose-gold hover:bg-blush/90"
            >
              <Play size={18} className="text-rose-gold" />
              <span>Explore Gallery</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3"
          >
            {[
              { value: "500+", label: "Weddings" },
              { value: "15+", label: "Years" },
              { value: "1000+", label: "Guests" },
              { value: "5★", label: "Rated" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.06 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-rose-gold/15 bg-white px-3 py-3 text-center shadow-sm transition hover:border-rose-gold/35"
              >
                <div className="font-display text-lg font-semibold text-gradient-rose sm:text-xl">{stat.value}</div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink/55">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCurrentSlide(i);
                    setIsAutoPlaying(false);
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "w-9 bg-rose-gold shadow-glow-rose" : "w-2 bg-rose-gold/25 hover:bg-rose-gold/45"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-ink/45">Tap dots to pause &amp; browse</span>
          </div>

          <motion.button
            type="button"
            onClick={scrollToNext}
            className="mt-8 hidden items-center gap-2 text-ink/60 transition hover:text-rose-gold md:inline-flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            aria-label="Scroll to next section"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Discover</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-gold/25 bg-white">
              <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <ChevronDown size={18} className="text-rose-gold" />
              </motion.div>
            </div>
          </motion.button>
        </div>

        {/* Right: large framed image only */}
        <div className="relative flex w-full flex-[1.2] justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.75, ease: easeLux }}
            className="relative w-full max-w-[min(100%,26rem)] sm:max-w-[min(100%,32rem)] lg:mx-0 lg:ml-auto lg:max-w-none lg:w-[min(92%,min(720px,52vw))] xl:w-[min(92%,min(800px,50vw))] 2xl:w-[min(92%,860px)]"
          >
            <div className="absolute -inset-[3px] rounded-[2.25rem] bg-gradient-to-br from-rose-gold via-rose-gold-muted to-rose-gold-deep p-[2px] shadow-luxury">
              <div className="h-full w-full rounded-[2.125rem] bg-white" />
            </div>

            <div className="relative w-full overflow-hidden rounded-[2rem] shadow-[0_32px_90px_rgba(51,51,51,0.16)] ring-1 ring-rose-gold/10">
              {/* Taller / bigger image area */}
              <div className="relative aspect-[3/4] w-full lg:aspect-auto lg:h-[min(78dvh,760px)] lg:min-h-[520px] lg:max-h-[min(88dvh,820px)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`frame-${currentSlide}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: easeLux }}
                  >
                    <Image
                      src={slide.frameImage}
                      alt={`${slide.titleHighlight} at Green Land Farm`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 860px"
                      className="object-cover"
                      priority={currentSlide === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-white/10" />

                <div className="pointer-events-none absolute top-6 right-6 h-20 w-20 rounded-br-[2.5rem] border-t-2 border-r-2 border-white/45 lg:top-8 lg:right-8 lg:h-24 lg:w-24" />
                <div className="pointer-events-none absolute bottom-6 left-6 h-20 w-20 rounded-tl-[2.5rem] border-b-2 border-l-2 border-white/35 lg:bottom-8 lg:left-8" />

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/45 bg-white/92 p-4 shadow-lg backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-6 sm:p-5"
                >
                  <p className="font-display text-base font-semibold text-ink sm:text-lg">Green Land Farm</p>
                  <p className="mt-1 text-sm text-ink/60">Luxury lawns &amp; banquet spaces for your finest day.</p>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute -left-1 top-[16%] z-10 hidden rounded-2xl border border-rose-gold/20 bg-white px-5 py-4 shadow-md sm:block lg:-left-10 xl:-left-12"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-rose-gold">Trusted</p>
              <p className="font-display text-2xl font-semibold text-ink xl:text-3xl">500+</p>
              <p className="text-xs text-ink/55">celebrations hosted</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{ opacity: { delay: 0.8 }, y: { duration: 2, repeat: Infinity } }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/50">Discover</span>
        <ChevronDown size={20} className="text-rose-gold" />
      </motion.button>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent" />
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home, Sparkles } from "lucide-react";
import { HERO_IMAGES } from "@/data/venueData";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  image?: string;
  breadcrumbs?: Breadcrumb[];
  badge?: string;
}

export default function PageHero({
  title,
  titleHighlight,
  subtitle,
  image = HERO_IMAGES.slide1,
  breadcrumbs = [],
  badge,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pt-28 pb-16 md:min-h-[58vh] md:pt-32 md:pb-20">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-cream/95 via-blush/55 to-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-cream/30" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs.length > 0 && (
          <motion.nav
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-gold/20 bg-cream/80 px-3 py-1 text-ink/80 backdrop-blur-md transition hover:border-rose-gold/40 hover:text-rose-gold"
            >
              <Home size={14} />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2 text-ink/50">
                <ChevronRight size={14} className="text-rose-gold/60" />
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-rose-gold">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-ink">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {badge && (
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-gold/30 bg-blush/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-rose-gold-deep shadow-sm backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles size={14} className="text-rose-gold" />
            <span>{badge}</span>
          </motion.div>
        )}

        <motion.h1
          className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75 }}
        >
          {title}{" "}
          {titleHighlight && (
            <span className="text-gradient-rose">{titleHighlight}</span>
          )}
        </motion.h1>

        <motion.div
          className="mt-6 h-1 w-0 max-w-[5rem] rounded-full bg-gradient-to-r from-rose-gold via-rose-gold-muted to-blush"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.55, duration: 0.65 }}
        />

        {subtitle && (
          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent" />
    </section>
  );
}

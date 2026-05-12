"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home, Sparkles } from "lucide-react";

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
  image = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  breadcrumbs = [],
  badge,
}: PageHeroProps) {
  return (
    <section className="relative h-[340px] sm:h-[420px] md:h-[500px] overflow-hidden flex items-end">
      {/* Background image with parallax */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Premium gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c18]/95 via-[#1a2e28]/85 to-[#1a2e28]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c18]/90 via-transparent to-[#0f1c18]/20" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 mandala-pattern opacity-50" />

      {/* Content */}
      <div className="relative z-10 container-custom w-full pb-14 md:pb-18">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-5"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors"
            >
              <Home size={14} />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={14} className="text-white/30" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#d4af37] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 backdrop-blur-sm mb-5"
          >
            <Sparkles size={14} className="text-[#d4af37]" />
            <span className="text-[#d4af37] text-xs font-semibold tracking-[0.15em] uppercase">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="heading-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4"
        >
          {title}{" "}
          {titleHighlight && (
            <span
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #e8c966 40%, #d4af37 60%, #b8941f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {titleHighlight}
            </span>
          )}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-0.5 rounded-full mb-4 relative"
          style={{
            background: "linear-gradient(90deg, #d4af37, #e8c966, #d4af37)",
          }}
        >
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white/70 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
    </section>
  );
}

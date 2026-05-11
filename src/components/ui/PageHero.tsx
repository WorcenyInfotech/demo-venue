"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

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
    <section className="relative h-[380px] md:h-[460px] overflow-hidden flex items-end">
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f3d1e]/92 via-[#1a5c2e]/80 to-[#0f3d1e]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d1e]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-custom w-full pb-12 md:pb-16">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 text-white/60 text-sm mb-4"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[#c9a84c] transition-colors flex items-center gap-1">
              <Home size={13} />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={13} className="text-white/30" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#c9a84c] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#c9a84c]">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="heading-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3"
        >
          {title}{" "}
          {titleHighlight && (
            <span
              style={{
                background: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%)",
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
          animate={{ width: 64 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] rounded-full mb-3"
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white/75 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

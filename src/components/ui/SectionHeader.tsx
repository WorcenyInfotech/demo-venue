"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <motion.div
      className={`mb-12 flex max-w-3xl flex-col gap-5 md:mb-16 ${alignClass} ${align === "center" ? "mx-auto" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
    >
      {badge && (
        <motion.div
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
            light
              ? "border-white/25 bg-white/10 text-cream backdrop-blur-md"
              : "border-rose-gold/25 bg-blush/80 text-rose-gold-deep backdrop-blur-sm"
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Sparkles size={14} className={light ? "text-blush" : "text-rose-gold"} />
          <span>{badge}</span>
          <Sparkles size={14} className={light ? "text-blush" : "text-rose-gold"} />
        </motion.div>
      )}

      <h2
        className={`font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="text-gradient-rose">{titleHighlight}</span>
        )}
      </h2>

      <motion.div
        className={`h-1 rounded-full ${
          align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
        } bg-gradient-to-r from-transparent via-rose-gold to-transparent`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="sr-only">Section divider</span>
      </motion.div>

      {subtitle && (
        <motion.p
          className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
            light ? "text-cream/85" : "text-ink/75"
          } ${align === "center" ? "mx-auto" : ""}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

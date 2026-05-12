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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={`flex flex-col ${alignClass} mb-14 md:mb-20`}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 border ${
            light
              ? "bg-white/10 border-white/20 backdrop-blur-sm"
              : "bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 border-[#d4af37]/25"
          }`}
        >
          <Sparkles size={14} className={light ? "text-[#d4af37]" : "text-[#d4af37]"} />
          <span
            className={`text-xs font-semibold tracking-[0.2em] uppercase ${
              light ? "text-white/90" : "text-[#d4af37]"
            }`}
          >
            {badge}
          </span>
          <Sparkles size={14} className={light ? "text-[#d4af37]" : "text-[#d4af37]"} />
        </motion.div>
      )}

      {/* Title */}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5 text-balance tracking-tight ${
          light ? "text-white" : "text-[#1a2e28]"
        }`}
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
      </h2>

      {/* Elegant gold divider */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`relative h-0.5 mb-6 ${align === "center" ? "mx-auto" : ""}`}
        style={{
          background: "linear-gradient(90deg, #d4af37, #e8c966, #d4af37)",
        }}
      >
        {/* Decorative dots */}
        <span
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "#d4af37" }}
        />
        <span
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "#d4af37" }}
        />
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed ${
            light ? "text-white/70" : "text-[#64605a]"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

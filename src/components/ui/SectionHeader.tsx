"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean; // for dark backgrounds
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignClass} mb-12 md:mb-16`}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c6a94c]/40 bg-[#c6a94c]/10 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c6a94c]" />
          <span className="text-[#c6a94c] text-xs font-semibold tracking-widest uppercase">
            {badge}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c6a94c]" />
        </motion.div>
      )}

      {/* Title */}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance px-1 sm:px-0 ${
          light ? "text-white" : "text-[#1a332b]"
        }`}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="text-gold-gradient">{titleHighlight}</span>
        )}
      </h2>

      {/* Gold divider */}
      <div
        className={`h-0.5 w-16 bg-gradient-to-r from-[#c6a94c] to-[#dcc875] rounded-full mb-4 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed ${
            light ? "text-white/70" : "text-gray-500"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

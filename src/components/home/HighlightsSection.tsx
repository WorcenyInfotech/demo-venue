"use client";

import { motion } from "framer-motion";
import { Trees, Users, Award, Clock, MapPin, Utensils } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { VENUE_STATS } from "@/utils/constants";

const HIGHLIGHTS = [
  {
    icon: Trees,
    title: "5-Acre Paradise",
    description:
      "Sprawling manicured gardens and lush green lawns creating the perfect backdrop for your dream celebration.",
    accent: "#2a5245",
  },
  {
    icon: Users,
    title: "1000+ Guests",
    description:
      "Versatile indoor and outdoor spaces designed to host intimate gatherings or grand royal celebrations.",
    accent: "#d4af37",
  },
  {
    icon: Utensils,
    title: "Premium Catering",
    description:
      "World-class multi-cuisine culinary experiences crafted by master chefs to delight every palate.",
    accent: "#c77b4a",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description:
      "Recognized as Gujarat's finest wedding venue with multiple accolades for hospitality excellence.",
    accent: "#8b6914",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description:
      "Strategically located on Surat-Navsari Highway with convenient access and ample parking facilities.",
    accent: "#4a7c9b",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Dedicated event coordinators available round the clock ensuring every detail is perfectly executed.",
    accent: "#9b4a6a",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function HighlightsSection() {
  return (
    <section id="highlights" className="section-padding relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5]" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 pattern-overlay" />

      {/* Decorative circles */}
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-[#d4af37]/5 blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-[#2a5245]/5 blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          badge="Why Choose Us"
          title="Experience Unparalleled"
          titleHighlight="Luxury & Elegance"
          subtitle="Every detail at Green Land Farm is crafted to perfection, creating an unforgettable experience for you and your guests."
        />

        {/* Stats row with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20"
        >
          {VENUE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative text-center p-6 md:p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
                border: "1px solid rgba(212, 175, 55, 0.15)",
              }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#d4af37]/10 to-transparent" />

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#e8c966] to-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              <div className="relative">
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2e28] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[#64605a] text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group relative p-7 md:p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(212, 175, 55, 0.1)",
                }}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${item.accent}08 0%, transparent 60%)`,
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${item.accent}, ${item.accent}80, transparent)`,
                  }}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${item.accent} 0%, ${item.accent}cc 100%)`,
                      boxShadow: `0 8px 24px ${item.accent}30`,
                    }}
                  >
                    <Icon size={26} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="font-serif font-bold text-xl text-[#1a2e28] mb-3 group-hover:text-[#2a5245] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#64605a] text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: item.accent }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

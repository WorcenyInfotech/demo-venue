"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Gem,
  Music,
  Briefcase,
  MapPin,
  ArrowRight,
  Check,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/utils/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Star,
  Gem,
  Music,
  Briefcase,
  MapPin,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export default function ServicesSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-50" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial opacity-40" />

      <div className="container-custom relative z-10">
        <SectionHeader
          badge="Our Services"
          title="Comprehensive Wedding"
          titleHighlight="& Event Solutions"
          subtitle="From intimate ceremonies to grand celebrations, we offer tailored services to bring your vision to life with perfection."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] || Heart;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,248,245,0.95) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(212, 175, 55, 0.1)",
                }}
              >
                {/* Top gradient accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#1a2e28] via-[#2a5245] to-[#d4af37]" />

                <div className="p-7 md:p-8">
                  {/* Icon with floating animation on hover */}
                  <motion.div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-500 group-hover:shadow-xl"
                    style={{
                      background: "linear-gradient(135deg, #1a2e28 0%, #2a5245 50%, #3d7a68 100%)",
                    }}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                  >
                    <Icon size={28} className="text-[#d4af37]" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: "0 0 30px rgba(42, 82, 69, 0.4)" }}
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-xl md:text-[1.35rem] text-[#1a2e28] mb-3 group-hover:text-[#2a5245] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#64605a] text-sm md:text-[0.95rem] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-[#64605a]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#d4af37]/15 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-[#d4af37]" />
                        </span>
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs text-[#d4af37] font-semibold pl-8 tracking-wide">
                        +{service.features.length - 3} more included
                      </li>
                    )}
                  </ul>

                  {/* CTA Link */}
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2e28] hover:text-[#d4af37] transition-colors duration-300 group/link"
                  >
                    <span>View Details</span>
                    <ArrowRight
                      size={16}
                      className="group-hover/link:translate-x-1.5 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Bottom corner decoration */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-[#d4af37]/5 group-hover:bg-[#d4af37]/10 transition-colors duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#1a2e28] via-[#2a5245] to-[#3d7a68] text-white shadow-[0_8px_30px_rgba(42,82,69,0.3)] hover:shadow-[0_12px_40px_rgba(42,82,69,0.4)] hover:-translate-y-1"
          >
            <span>Explore All Services</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

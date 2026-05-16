"use client";

import { motion } from "framer-motion";
import { Trees, Users, Award, Clock, MapPin, Utensils } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { VENUE_STATS } from "@/utils/constants";
import { VENUE_IDENTITY } from "@/data/venueData";

const easeLux = [0.4, 0, 0.2, 1] as const;

const HIGHLIGHTS = [
  {
    icon: Trees,
    title: "5-Acre Paradise",
    description:
      "Sprawling manicured gardens and lush green lawns creating the perfect backdrop for your dream celebration.",
    accent: "#B76E79",
  },
  {
    icon: Users,
    title: "1000+ Guests",
    description:
      "Versatile indoor and outdoor spaces designed to host intimate gatherings or grand royal celebrations.",
    accent: "#c98a93",
  },
  {
    icon: Utensils,
    title: "Premium Catering",
    description:
      "World-class multi-cuisine culinary experiences crafted by master chefs to delight every palate.",
    accent: "#955c65",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description:
      "Recognized as Gujarat's finest wedding venue with multiple accolades for hospitality excellence.",
    accent: "#d4a0a8",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description:
      "Strategically located on Surat-Navsari Highway with convenient access and ample parking facilities.",
    accent: "#a85c68",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Dedicated event coordinators available round the clock ensuring every detail is perfectly executed.",
    accent: "#B76E79",
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
    transition: { duration: 0.6, ease: easeLux },
  },
};

export default function HighlightsSection() {
  return (
    <section
      id="highlights"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/40 to-cream py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />

      <div className="pointer-events-none absolute top-20 right-0 h-64 w-64 rounded-full bg-rose-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-0 h-72 w-72 rounded-full bg-blush/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Choose Us"
          title="Experience Unparalleled"
          titleHighlight="Luxury & Elegance"
          subtitle={`Every detail at ${VENUE_IDENTITY.name} is crafted to perfection, creating an unforgettable experience for you and your guests.`}
        />

        <motion.div
          className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          {VENUE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-rose-gold/15 bg-white/80 p-6 shadow-luxury backdrop-blur-xl transition hover:border-rose-gold/35 hover:shadow-luxury-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/[0.04] to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute top-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-transparent via-rose-gold/50 to-transparent" />
              <div className="relative text-center">
                <div className="font-display text-3xl font-semibold text-gradient-rose sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink/65">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-rose-gold/12 bg-white/90 p-8 shadow-luxury backdrop-blur-xl transition duration-300 hover:border-rose-gold/30 hover:shadow-luxury-hover"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${item.accent}14 0%, transparent 55%)`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r opacity-80"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${item.accent}, ${item.accent}99, transparent)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="mb-5 inline-flex rounded-2xl p-3.5 text-white shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${item.accent} 0%, ${item.accent}cc 100%)`,
                      boxShadow: `0 12px 28px ${item.accent}35`,
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.description}</p>
                </div>
                <div
                  className="absolute -right-1 -bottom-1 h-16 w-16 rounded-tl-3xl opacity-10 transition group-hover:opacity-20"
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

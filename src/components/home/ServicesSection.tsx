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

const easeLux = [0.4, 0, 0.2, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeLux } },
};

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="pointer-events-none absolute top-24 left-1/4 h-48 w-48 rounded-full bg-blush/80 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-56 w-56 rounded-full bg-rose-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Services"
          title="Comprehensive Wedding"
          titleHighlight="& Event Solutions"
          subtitle="From intimate ceremonies to grand celebrations, we offer tailored services to bring your vision to life with perfection."
        />

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] || Heart;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-rose-gold/12 bg-gradient-to-br from-white to-blush/30 p-8 shadow-luxury backdrop-blur-xl transition hover:border-rose-gold/28 hover:shadow-luxury-hover"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-rose-gold/50 to-transparent opacity-70" />

                <div className="relative">
                  <motion.div
                    className="relative mb-6 inline-flex rounded-2xl bg-gradient-to-br from-rose-gold via-rose-gold-muted to-rose-gold-deep p-4 text-white shadow-glow-rose"
                    whileHover={{ scale: 1.05, rotate: 3 }}
                  >
                    <Icon size={28} />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition group-hover:opacity-100" />
                  </motion.div>

                  <h3 className="font-display text-2xl font-semibold text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{service.description}</p>

                  <ul className="mt-6 space-y-2.5">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blush text-rose-gold">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-sm font-medium text-rose-gold">
                        +{service.features.length - 3} more included
                      </li>
                    )}
                  </ul>

                  <Link
                    href="/services"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-gold transition hover:gap-3 hover:text-rose-gold-deep"
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-rose-gold/5 blur-2xl transition group-hover:bg-rose-gold/10" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-rose-gold px-8 py-4 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep hover:shadow-luxury-hover"
          >
            <span>Explore All Services</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

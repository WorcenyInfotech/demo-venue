"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import MapEmbed, { GetDirectionsButton } from "@/components/ui/MapEmbed";
import { SITE_CONFIG } from "@/utils/constants";
import { VENUE_IDENTITY, VENUE_CONTACT } from "@/data/venueData";

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: "Our Address",
    lines: [SITE_CONFIG.address],
    cta: <GetDirectionsButton variant="ghost" size="sm" />,
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [SITE_CONFIG.phone, SITE_CONFIG.phone2],
    cta: (
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        className="mt-2 inline-flex text-sm font-semibold text-rose-gold transition hover:text-rose-gold-deep"
      >
        Call Now →
      </a>
    ),
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [SITE_CONFIG.email],
    cta: (
      <a
        href={`mailto:${SITE_CONFIG.email}`}
        className="mt-2 inline-flex text-sm font-semibold text-rose-gold transition hover:text-rose-gold-deep"
      >
        Send Email →
      </a>
    ),
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday – Sunday", "9:00 AM – 9:00 PM"],
    cta: null,
  },
];

export default function MapSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/25 to-cream py-20 md:py-28">
      <div className="pointer-events-none absolute top-20 left-10 h-48 w-48 rounded-full bg-rose-gold/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Find Us"
          title={`Visit ${VENUE_IDENTITY.name}`}
          titleHighlight={`in ${VENUE_CONTACT.city}`}
          subtitle={`Conveniently located on the ${VENUE_CONTACT.street} with easy access from all parts of the city.`}
        />

        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-4 lg:col-span-5">
            {CONTACT_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-4 rounded-2xl border border-rose-gold/12 bg-white/90 p-5 shadow-sm backdrop-blur-md transition hover:border-rose-gold/28 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blush text-rose-gold">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-base font-semibold text-ink">{item.title}</div>
                    {item.lines.map((line, j) => (
                      <div key={j} className="text-sm text-ink/70">
                        {line}
                      </div>
                    ))}
                    {item.cta}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <MapEmbed height="h-[400px] lg:h-[480px]" showDirectionsButton />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

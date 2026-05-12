"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import MapEmbed, { GetDirectionsButton } from "@/components/ui/MapEmbed";
import { SITE_CONFIG } from "@/utils/constants";

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
        className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#2a5245] hover:text-[#c6a94c] transition-colors"
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
        className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#2a5245] hover:text-[#c6a94c] transition-colors"
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
    <section className="section-padding bg-[#f7f3ec]">
      <div className="container-custom">
        <SectionHeader
          badge="Find Us"
          title="Visit Green Land Farm"
          titleHighlight="in Surat"
          subtitle="Conveniently located on the Surat-Navsari Highway with easy access from all parts of the city."
        />

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Contact info cards */}
          <div className="space-y-4">
            {CONTACT_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-[#c6a94c]/15 shadow-sm hover:shadow-md hover:border-[#c6a94c]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a5245] to-[#4d8b73] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#c6a94c]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#1a332b] text-sm mb-1">{item.title}</div>
                    {item.lines.map((line, j) => (
                      <div key={j} className="text-gray-600 text-sm leading-relaxed">{line}</div>
                    ))}
                    {item.cta}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Map — no API key needed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <MapEmbed height="h-[400px] lg:h-[480px]" showDirectionsButton />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

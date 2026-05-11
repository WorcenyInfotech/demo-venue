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
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/utils/constants";

// Map icon string to component
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
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Our Services"
          title="Everything You Need for"
          titleHighlight="Your Perfect Wedding"
          subtitle="From intimate ceremonies to grand celebrations, we offer comprehensive wedding and event services tailored to your vision."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] || Heart;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white hover:border-[#c9a84c]/30 hover:shadow-xl transition-all duration-400 p-6"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1a5c2e] to-[#c9a84c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center mb-5 shadow-lg group-hover:shadow-[0_8px_25px_rgba(26,92,46,0.3)] transition-shadow duration-300">
                  <Icon size={24} className="text-[#c9a84c]" />
                </div>

                <h3 className="font-serif font-bold text-xl text-[#0f3d1e] mb-3 group-hover:text-[#1a5c2e] transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-1.5 mb-5">
                  {service.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-xs text-[#c9a84c] font-medium pl-3.5">
                      +{service.features.length - 3} more features
                    </li>
                  )}
                </ul>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a5c2e] hover:text-[#c9a84c] transition-colors group/link"
                >
                  Learn More
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link href="/services" className="btn-green inline-flex">
            View All Services
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

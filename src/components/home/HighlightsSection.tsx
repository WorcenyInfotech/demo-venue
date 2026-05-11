"use client";

import { motion } from "framer-motion";
import { Trees, Users, Award, Clock, MapPin, Utensils } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { VENUE_STATS } from "@/utils/constants";

const HIGHLIGHTS = [
  {
    icon: Trees,
    title: "5-Acre Green Farm",
    description:
      "Sprawling lush green lawns and manicured gardens perfect for outdoor ceremonies and photo sessions.",
    color: "from-green-500 to-green-700",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: Users,
    title: "1000+ Guest Capacity",
    description:
      "Multiple indoor and outdoor spaces that can be configured to host intimate gatherings or grand celebrations.",
    color: "from-[#c9a84c] to-[#a07830]",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Utensils,
    title: "Premium Catering",
    description:
      "World-class in-house catering with multi-cuisine menus crafted by experienced chefs for every palate.",
    color: "from-orange-500 to-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: Award,
    title: "Award-Winning Venue",
    description:
      "Recognized as Surat's best wedding venue with multiple awards for excellence in hospitality and events.",
    color: "from-purple-500 to-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description:
      "Conveniently located on the Surat-Navsari Highway with easy access and ample parking for all guests.",
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Clock,
    title: "24/7 Event Support",
    description:
      "Dedicated event coordinators available round the clock to ensure every detail of your event is perfect.",
    color: "from-rose-500 to-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HighlightsSection() {
  return (
    <section id="highlights" className="section-padding bg-[#fdf6e3]">
      <div className="container-custom">
        <SectionHeader
          badge="Why Choose Us"
          title="Surat's Most Prestigious"
          titleHighlight="Wedding Destination"
          subtitle="Every detail at Green Land Farm is crafted to perfection — from our lush green surroundings to our world-class amenities and dedicated team."
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {VENUE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white border border-[#c9a84c]/15 shadow-sm hover:shadow-md hover:border-[#c9a84c]/30 transition-all duration-300"
            >
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#1a5c2e] mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className={`group p-6 rounded-2xl ${item.bg} border ${item.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className="text-white" />
                </div>

                <h3 className="font-serif font-semibold text-lg text-[#0f3d1e] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

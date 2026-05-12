import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import CTASection from "@/components/home/CTASection";
import { SERVICES } from "@/utils/constants";
import {
  Heart, Star, Gem, Music, Briefcase, MapPin,
  CheckCircle2, ArrowRight, Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Wedding Services | Green Land Farm - Luxury Venue Surat",
  description:
    "Explore our comprehensive wedding and event services at Green Land Farm, Surat. Grand wedding ceremonies, receptions, engagements, sangeet nights, destination weddings & corporate events.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Wedding Services | Green Land Farm Surat",
    description:
      "Complete wedding services — ceremonies, receptions, engagements, sangeet, destination weddings & more at Surat's premier luxury venue.",
    url: "/services",
  },
};

const ICON_MAP: Record<string, React.ElementType> = {
  Heart, Star, Gem, Music, Briefcase, MapPin,
};

const SERVICE_IMAGES: Record<string, string> = {
  wedding: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  reception: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  engagement: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  sangeet: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  corporate: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
  destination: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
};

const AMENITIES = [
  "5-Acre Lush Green Lawns",
  "Air-Conditioned Banquet Halls",
  "Luxury Bridal Suite",
  "Professional Sound System",
  "LED & Cinematic Lighting",
  "Valet Parking (200+ cars)",
  "In-House Catering Team",
  "Dedicated Event Coordinator",
  "Photography Support Area",
  "Backup Power (100% DG)",
  "CCTV Security",
  "Wi-Fi Throughout Venue",
  "Accommodation (20 rooms)",
  "Helicopter Landing Pad",
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Wedding"
        titleHighlight="Services"
        subtitle="Comprehensive event services tailored to make every celebration extraordinary."
        image="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=80"
        breadcrumbs={[{ label: "Services" }]}
        badge="What We Offer"
      />

      {/* Services list */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Our Services"
            title="Everything for Your"
            titleHighlight="Perfect Celebration"
            subtitle="From intimate ceremonies to grand destination weddings, we offer end-to-end event management with unmatched attention to detail."
          />

          <div className="space-y-20">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Heart;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={service.id}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${!isEven ? "lg:order-2" : ""}`}>
                    <div className="relative h-[340px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={SERVICE_IMAGES[service.id] || SERVICE_IMAGES.wedding}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a332b]/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c6a94c] to-[#dcc875] flex items-center justify-center shadow-lg">
                          <Icon size={22} className="text-[#1a332b]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={!isEven ? "lg:order-1" : ""}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a94c]/10 border border-[#c6a94c]/30 mb-4">
                      <span className="text-[#c6a94c] text-xs font-semibold tracking-widest uppercase">
                        Service {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a332b] mb-3">
                      {service.title}
                    </h2>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#c6a94c] to-[#dcc875] rounded-full mb-4" />
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={16} className="text-[#2a5245] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <Link href="/contact#inquiry" className="btn-primary text-sm px-6 py-3">
                        Book This Service
                        <ArrowRight size={16} />
                      </Link>
                      <a href="tel:+919876543210" className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#2a5245] text-[#2a5245] font-semibold text-sm hover:bg-[#2a5245] hover:text-white transition-all">
                        <Phone size={16} />
                        Call for Details
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-padding bg-gradient-to-br from-[#1a332b] to-[#2a5245]">
        <div className="container-custom">
          <SectionHeader
            badge="Amenities"
            title="World-Class"
            titleHighlight="Facilities"
            subtitle="Every amenity you need for a flawless event — all under one roof at Green Land Farm."
            light
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {AMENITIES.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-3 py-3 text-white/90 text-sm hover:bg-white/15 hover:border-[#c6a94c]/40 transition-all duration-200"
              >
                <CheckCircle2 size={14} className="text-[#c6a94c] flex-shrink-0" />
                <span className="text-xs leading-tight">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-[#f7f3ec]">
        <div className="container-custom">
          <SectionHeader
            badge="How It Works"
            title="Our Simple"
            titleHighlight="Booking Process"
            subtitle="From your first inquiry to your wedding day — we make every step easy and stress-free."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Send Inquiry", desc: "Fill out our inquiry form or call us to check availability for your date." },
              { step: "02", title: "Site Visit", desc: "Schedule a free site visit to tour the venue and discuss your requirements." },
              { step: "03", title: "Customize Package", desc: "Work with our team to customize a package that fits your vision and budget." },
              { step: "04", title: "Celebrate!", desc: "Relax and enjoy your perfect day while our team handles every detail." },
            ].map((step) => (
              <div key={step.step} className="relative text-center p-6 bg-white rounded-2xl border border-[#c6a94c]/15 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2a5245] to-[#4d8b73] flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-[#c6a94c] font-bold text-lg font-serif">{step.step}</span>
                </div>
                <h3 className="font-serif font-bold text-[#1a332b] text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

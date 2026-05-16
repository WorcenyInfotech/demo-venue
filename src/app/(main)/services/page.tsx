import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import CTASection from "@/components/home/CTASection";
import { SERVICES } from "@/utils/constants";
import { VENUE_IDENTITY, VENUE_CONTACT, PAGE_HERO_IMAGES, SERVICE_IMAGES } from "@/data/venueData";
import { Heart, Star, Gem, Music, Briefcase, MapPin, CheckCircle2, ArrowRight, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: `Wedding Services | ${VENUE_IDENTITY.name} - Luxury Venue ${VENUE_CONTACT.city}`,
  description: `Explore our comprehensive wedding and event services at ${VENUE_IDENTITY.name}, ${VENUE_CONTACT.city}. Grand wedding ceremonies, receptions, engagements, sangeet nights, destination weddings & corporate events.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Wedding Services | ${VENUE_IDENTITY.name} ${VENUE_CONTACT.city}`,
    description: `Complete wedding services — ceremonies, receptions, engagements, sangeet, destination weddings & more at ${VENUE_CONTACT.city}'s premier luxury venue.`,
    url: "/services",
  },
};

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Star,
  Gem,
  Music,
  Briefcase,
  MapPin,
};

const SERVICE_IMAGE_MAP: Record<string, string> = {
  wedding: SERVICE_IMAGES.wedding,
  reception: SERVICE_IMAGES.reception,
  engagement: SERVICE_IMAGES.engagement,
  sangeet: SERVICE_IMAGES.sangeet,
  corporate: SERVICE_IMAGES.corporate,
  destination: SERVICE_IMAGES.destination,
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
        image={PAGE_HERO_IMAGES.services}
        breadcrumbs={[{ label: "Services" }]}
        badge="What We Offer"
      />

      <section className="relative bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Services"
            title="Everything for Your"
            titleHighlight="Perfect Celebration"
            subtitle="From intimate ceremonies to grand destination weddings, we offer end-to-end event management with unmatched attention to detail."
          />

          <div className="mt-4 space-y-16 md:space-y-24">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Heart;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={service.id}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={`relative ${!isEven ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-rose-gold/15 shadow-luxury">
                      <Image
                        src={SERVICE_IMAGE_MAP[service.id] || SERVICE_IMAGE_MAP.wedding}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-rose-gold shadow-md backdrop-blur-md">
                        <Icon size={22} />
                      </div>
                    </div>
                  </div>

                  <div className={!isEven ? "lg:order-1" : ""}>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-rose-gold">
                      Service {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">{service.title}</h2>
                    <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-rose-gold to-blush" />
                    <p className="mt-6 text-sm leading-relaxed text-ink/75 sm:text-base">{service.description}</p>

                    <ul className="mt-8 space-y-2.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-ink/80">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-rose-gold" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/contact#inquiry"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-gold px-6 py-3.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
                      >
                        Book This Service
                        <ArrowRight size={16} />
                      </Link>
                      <a
                        href={`tel:${VENUE_CONTACT.phone}`}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/25 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-blush/50"
                      >
                        <Phone size={16} className="text-rose-gold" />
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

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-footer via-[#3a3234] to-footer" />
        <div className="pointer-events-none absolute top-20 right-10 h-64 w-64 rounded-full bg-rose-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Amenities"
            title="World-Class"
            titleHighlight="Facilities"
            subtitle={`Every amenity you need for a flawless event — all under one roof at ${VENUE_IDENTITY.name}.`}
            light
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream/90 backdrop-blur-sm transition hover:border-rose-gold/30 hover:bg-white/10"
              >
                <CheckCircle2 size={14} className="shrink-0 text-rose-gold-muted" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blush/35 to-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="How It Works"
            title="Our Simple"
            titleHighlight="Booking Process"
            subtitle="From your first inquiry to your wedding day — we make every step easy and stress-free."
          />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Send Inquiry", desc: "Fill out our inquiry form or call us to check availability for your date." },
              { step: "02", title: "Site Visit", desc: "Schedule a free site visit to tour the venue and discuss your requirements." },
              { step: "03", title: "Customize Package", desc: "Work with our team to customize a package that fits your vision and budget." },
              { step: "04", title: "Celebrate!", desc: "Relax and enjoy your perfect day while our team handles every detail." },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-rose-gold/12 bg-white/95 p-6 shadow-luxury transition hover:-translate-y-1 hover:border-rose-gold/28"
              >
                <div className="font-display text-3xl font-semibold text-gradient-rose">{s.step}</div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

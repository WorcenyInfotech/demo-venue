import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CTASection from "@/components/home/CTASection";
import MapEmbed, { GetDirectionsButton } from "@/components/ui/MapEmbed";
import {
  CheckCircle2, Leaf, Award, Users, Heart, Star, MapPin, Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Green Land Farm - Luxury Wedding Venue Surat",
  description:
    "Learn about Green Land Farm — Surat's most prestigious luxury wedding venue with 15+ years of experience, 500+ weddings hosted, and a dedicated team committed to making your dream wedding a reality.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Green Land Farm | Luxury Wedding Venue Surat",
    description:
      "15+ years of creating magical weddings in Surat. Discover our story, our team, and our commitment to excellence.",
    url: "/about",
  },
};

const VALUES = [
  {
    icon: Heart,
    title: "Passion for Perfection",
    description:
      "Every wedding we host is treated as our own. We pour our heart into every detail, from the grandest décor to the smallest finishing touch.",
  },
  {
    icon: Star,
    title: "Excellence in Service",
    description:
      "Our team of experienced professionals ensures world-class hospitality and seamless event management from planning to execution.",
  },
  {
    icon: Leaf,
    title: "Natural Beauty",
    description:
      "Our 5-acre green farm provides a breathtaking natural backdrop that no artificial setting can replicate — pure, lush, and magical.",
  },
  {
    icon: Users,
    title: "Family-Oriented",
    description:
      "We treat every couple and their family as our own. Your joy is our joy, and your celebration is our celebration.",
  },
];

const TEAM = [
  {
    name: "Rajesh Patel",
    role: "Founder & Managing Director",
    experience: "20+ Years",
    description: "Visionary behind Green Land Farm with two decades of experience in luxury hospitality.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Events",
    experience: "12+ Years",
    description: "Expert event coordinator who has orchestrated 300+ weddings with flawless precision.",
  },
  {
    name: "Amit Desai",
    role: "Executive Chef",
    experience: "15+ Years",
    description: "Award-winning chef specializing in multi-cuisine wedding menus that delight every palate.",
  },
  {
    name: "Kavita Mehta",
    role: "Décor & Design Head",
    experience: "10+ Years",
    description: "Creative genius who transforms spaces into breathtaking wedding wonderlands.",
  },
];

const MILESTONES = [
  { year: "2009", title: "Founded", desc: "Green Land Farm established with a vision to create Surat's finest wedding venue." },
  { year: "2012", title: "First Expansion", desc: "Expanded to 5 acres with new banquet halls and outdoor lawn spaces." },
  { year: "2016", title: "Award Recognition", desc: "Received 'Best Wedding Venue in Gujarat' award for the first time." },
  { year: "2019", title: "100th Wedding", desc: "Celebrated our 100th wedding milestone with a grand ceremony." },
  { year: "2022", title: "Premium Upgrade", desc: "Complete renovation with luxury suites, premium décor, and modern amenities." },
  { year: "2024", title: "500+ Weddings", desc: "Proudly crossed 500 successful weddings, cementing our legacy in Surat." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About"
        titleHighlight="Green Land Farm"
        subtitle="15+ years of creating magical wedding memories in the heart of Surat, Gujarat."
        image="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80"
        breadcrumbs={[{ label: "About Us" }]}
        badge="Our Story"
      />

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Images */}
            <div className="relative">
              <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
                  alt="Green Land Farm Wedding Venue"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-[#c9a84c]/20 max-w-[200px]">
                <div className="text-[#1a5c2e] font-serif font-bold text-3xl mb-1">
                  <AnimatedCounter value={500} suffix="+" />
                </div>
                <div className="text-gray-500 text-sm">Happy Couples</div>
                <div className="flex mt-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} className="text-[#c9a84c] fill-[#c9a84c]" />
                  ))}
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] rounded-2xl p-4 shadow-lg text-white text-center">
                <div className="font-serif font-bold text-2xl">15+</div>
                <div className="text-xs text-white/80">Years</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase">Our Story</span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0f3d1e] mb-4 leading-tight">
                Where Every Wedding Becomes a{" "}
                <span style={{ background: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Timeless Memory
                </span>
              </h2>

              <div className="w-16 h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] rounded-full mb-5" />

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2009 by Rajesh Patel, Green Land Farm was born from a simple yet powerful dream — to create a wedding venue in Surat that combines the grandeur of luxury hospitality with the natural beauty of lush green surroundings.
                </p>
                <p>
                  What started as a modest 2-acre farm has grown into Surat&apos;s most prestigious wedding destination — a sprawling 5-acre paradise that has hosted over 500 weddings, receptions, engagements, and destination celebrations.
                </p>
                <p>
                  Today, Green Land Farm stands as a testament to our unwavering commitment to excellence, personalized service, and the belief that every couple deserves a wedding that exceeds their wildest dreams.
                </p>
              </div>

              {/* Key points */}
              <ul className="mt-6 space-y-3">
                {[
                  "5-acre lush green farm in prime Surat location",
                  "Indoor & outdoor spaces for 50 to 1000+ guests",
                  "Award-winning in-house catering team",
                  "Dedicated event coordinators for every wedding",
                  "Luxury bridal suite and accommodation",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={18} className="text-[#1a5c2e] flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact#inquiry" className="btn-primary">
                  Book a Site Visit
                </Link>
                <Link href="/packages" className="btn-green">
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-[#0f3d1e] to-[#1a5c2e]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 500, suffix: "+", label: "Weddings Hosted", icon: Heart },
              { value: 15, suffix: "+", label: "Years Experience", icon: Award },
              { value: 1000, suffix: "+", label: "Guest Capacity", icon: Users },
              { value: 5, suffix: " Acres", label: "Green Land", icon: Leaf },
            ].map(({ value, suffix, label, icon: Icon }) => (
              <div key={label} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-[#c9a84c]" />
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <div className="text-white/60 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#fdf6e3]">
        <div className="container-custom">
          <SectionHeader
            badge="Our Values"
            title="What Makes Us"
            titleHighlight="Different"
            subtitle="Our core values guide everything we do — from how we plan your event to how we treat every guest."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="text-center p-6 rounded-2xl bg-white border border-[#c9a84c]/15 shadow-sm hover:shadow-lg hover:border-[#c9a84c]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon size={24} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#0f3d1e] mb-2">{val.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Our Journey"
            title="15 Years of"
            titleHighlight="Excellence"
            subtitle="From a humble beginning to Surat's most prestigious wedding venue — our journey of growth and dedication."
          />
          <div className="relative max-w-3xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a84c] to-[#1a5c2e] -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                    <div className="bg-white border border-[#c9a84c]/20 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-[#c9a84c] font-bold text-sm mb-1">{m.year}</div>
                      <h3 className="font-serif font-bold text-[#0f3d1e] text-lg mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm">{m.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c96a] items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <span className="text-[#0f3d1e] font-bold text-xs">{i + 1}</span>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#fdf6e3]">
        <div className="container-custom">
          <SectionHeader
            badge="Our Team"
            title="The People Behind"
            titleHighlight="Your Perfect Day"
            subtitle="Our experienced team of professionals is dedicated to making your wedding day absolutely flawless."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group bg-white rounded-2xl overflow-hidden border border-[#c9a84c]/15 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Avatar */}
                <div className="h-48 bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center relative overflow-hidden">
                  <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-[#c9a84c]/50 flex items-center justify-center">
                    <span className="text-white font-serif font-bold text-3xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#c9a84c] text-[#0f3d1e] text-xs font-bold px-2 py-1 rounded-full">
                    {member.experience}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-[#0f3d1e] text-lg mb-0.5">{member.name}</h3>
                  <div className="text-[#c9a84c] text-xs font-semibold tracking-wide uppercase mb-3">{member.role}</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location highlight */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeader
                badge="Location"
                title="Perfectly Located in"
                titleHighlight="Surat, Gujarat"
                align="left"
                subtitle="Situated on the Surat-Navsari Highway, Green Land Farm is easily accessible from all parts of Surat and neighboring cities."
              />
              <div className="space-y-4 mt-2">
                {[
                  { icon: MapPin, text: "Near NH-48, Surat-Navsari Highway, Surat" },
                  { icon: Clock, text: "30 minutes from Surat Railway Station" },
                  { icon: Users, text: "Ample parking for 200+ vehicles" },
                  { icon: Award, text: "Helicopter landing facility available" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-[#1a5c2e]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#1a5c2e]" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <GetDirectionsButton variant="primary" size="md" />
              </div>
            </div>
            <MapEmbed height="h-[350px]" showDirectionsButton={false} className="rounded-2xl" />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

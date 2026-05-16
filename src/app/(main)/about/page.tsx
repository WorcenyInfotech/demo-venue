import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CTASection from "@/components/home/CTASection";
import MapEmbed, { GetDirectionsButton } from "@/components/ui/MapEmbed";
import {
  CheckCircle2,
  Leaf,
  Award,
  Users,
  Heart,
  Star,
  MapPin,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Ramayan Farm - Luxury Wedding Venue Surat",
  description:
    "Learn about Ramayan Farm — Surat's most prestigious luxury wedding venue with 15+ years of experience, 500+ weddings hosted, and a dedicated team committed to making your dream wedding a reality.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Ramayan Farm | Luxury Wedding Venue Surat",
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
    description: "Visionary behind Ramayan Farm with two decades of experience in luxury hospitality.",
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
  { year: "2009", title: "Founded", desc: "Ramayan Farm established with a vision to create Surat's finest wedding venue." },
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
        titleHighlight="Ramayan Farm"
        subtitle="15+ years of creating magical wedding memories in the heart of Surat, Gujarat."
        image="https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=1920&q=80"
        breadcrumbs={[{ label: "About Us" }]}
        badge="Our Story"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/25 to-cream py-16 md:py-24">
        <div className="pointer-events-none absolute top-20 right-0 h-64 w-64 rounded-full bg-rose-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-rose-gold/15 shadow-luxury sm:aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1587271636175-90d58cdad458?w=800&q=80"
                  alt="Ramayan Farm Wedding Venue"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              </div>

              <div className="absolute right-4 bottom-24 left-4 rounded-2xl border border-white/30 bg-cream/95 p-4 shadow-luxury backdrop-blur-md sm:right-6 sm:bottom-28 sm:left-6">
                <div className="font-display text-3xl font-semibold text-gradient-rose">
                  <AnimatedCounter value={500} suffix="+" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-ink/60">Happy Couples</div>
                <div className="mt-2 flex gap-0.5 text-rose-gold">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-rose-gold" />
                  ))}
                </div>
              </div>

              <div className="absolute top-6 right-6 rounded-2xl border border-rose-gold/25 bg-gradient-to-br from-rose-gold to-rose-gold-deep px-4 py-3 text-center text-white shadow-glow-rose">
                <div className="font-display text-2xl font-bold">15+</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-white/90">Years</div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-gold/20 bg-blush/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-rose-gold-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-gold" />
                <span>Our Story</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Where Every Wedding Becomes a <span className="text-gradient-rose">Timeless Memory</span>
              </h2>

              <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-rose-gold to-blush" />

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/75 sm:text-base">
                <p>
                  Founded in 2009 by Rajesh Patel, Ramayan Farm was born from a simple yet powerful dream — to create a
                  wedding venue in Surat that combines the grandeur of luxury hospitality with the natural beauty of lush
                  green surroundings.
                </p>
                <p>
                  What started as a modest 2-acre farm has grown into Surat&apos;s most prestigious wedding destination — a
                  sprawling 5-acre paradise that has hosted over 500 weddings, receptions, engagements, and destination
                  celebrations.
                </p>
                <p>
                  Today, Ramayan Farm stands as a testament to our unwavering commitment to excellence, personalized
                  service, and the belief that every couple deserves a wedding that exceeds their wildest dreams.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "5-acre lush green farm in prime Surat location",
                  "Indoor & outdoor spaces for 50 to 1000+ guests",
                  "Award-winning in-house catering team",
                  "Dedicated event coordinators for every wedding",
                  "Luxury bridal suite and accommodation",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-ink/80">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-rose-gold" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact#inquiry"
                  className="inline-flex items-center justify-center rounded-2xl bg-rose-gold px-6 py-3.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
                >
                  Book a Site Visit
                </Link>
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center rounded-2xl border border-rose-gold/25 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-rose-gold/45 hover:bg-blush/50"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-footer py-16 text-cream md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(183,110,121,0.15),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: 500, suffix: "+", label: "Weddings Hosted", icon: Heart },
              { value: 15, suffix: "+", label: "Years Experience", icon: Award },
              { value: 1000, suffix: "+", label: "Guest Capacity", icon: Users },
              { value: 5, suffix: " Acres", label: "Ramayan", icon: Leaf },
            ].map(({ value, suffix, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition hover:border-rose-gold/35 hover:bg-white/10"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-gold/20 text-rose-gold-muted">
                  <Icon size={22} />
                </div>
                <div className="font-display text-3xl font-semibold text-cream">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-cream/65">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Values"
            title="What Makes Us"
            titleHighlight="Different"
            subtitle="Our core values guide everything we do — from how we plan your event to how we treat every guest."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl border border-rose-gold/12 bg-white/95 p-8 shadow-luxury transition hover:-translate-y-1 hover:border-rose-gold/25 hover:shadow-luxury-hover"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-deep p-3 text-white shadow-md">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">{val.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-blush/35 to-cream py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Journey"
            title="15 Years of"
            titleHighlight="Excellence"
            subtitle="From a humble beginning to Surat's most prestigious wedding venue — our journey of growth and dedication."
          />

          <div className="relative mt-12">
            <div className="absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-rose-gold/20 via-rose-gold/50 to-rose-gold/20 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center ${
                    i % 2 === 0 ? "" : ""
                  }`}
                >
                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2"}`}>
                    <div className="inline-block rounded-2xl border border-rose-gold/15 bg-white/95 p-6 shadow-md backdrop-blur-md">
                      <div className="text-xs font-bold uppercase tracking-widest text-rose-gold">{m.year}</div>
                      <h3 className="mt-2 font-display text-lg font-semibold text-ink">{m.title}</h3>
                      <p className="mt-2 text-sm text-ink/70">{m.desc}</p>
                    </div>
                  </div>

                  <div className="absolute top-6 left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-sm font-bold text-white shadow-glow-rose md:left-1/2 md:-translate-x-1/2">
                    {i + 1}
                  </div>

                  <div className="hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Team"
            title="The People Behind"
            titleHighlight="Your Perfect Day"
            subtitle="Our experienced team of professionals is dedicated to making your wedding day absolutely flawless."
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex gap-5 rounded-2xl border border-rose-gold/12 bg-white/95 p-6 shadow-luxury transition hover:border-rose-gold/25 md:p-8"
              >
                <div className="relative shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-deep font-display text-xl font-bold text-white shadow-md">
                    <span>{member.name.charAt(0)}</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blush px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-gold-deep">
                    {member.experience}
                  </div>
                </div>
                <div className="min-w-0 pt-1">
                  <h3 className="font-display text-lg font-semibold text-ink">{member.name}</h3>
                  <div className="text-sm font-medium text-rose-gold">{member.role}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rose-gold/10 bg-gradient-to-b from-cream to-blush/30 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <SectionHeader
                badge="Location"
                title="Perfectly Located in"
                titleHighlight="Surat, Gujarat"
                align="left"
                subtitle="Situated on the Surat-Navsari Highway, Ramayan Farm is easily accessible from all parts of Surat and neighboring cities."
              />
              <div className="mt-8 space-y-3">
                {[
                  { icon: MapPin, text: "Near NH-48, Surat-Navsari Highway, Surat" },
                  { icon: Clock, text: "30 minutes from Surat Railway Station" },
                  { icon: Users, text: "Ample parking for 200+ vehicles" },
                  { icon: Award, text: "Helicopter landing facility available" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 rounded-2xl border border-rose-gold/12 bg-white/90 px-4 py-3 text-sm text-ink/80 shadow-sm"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blush text-rose-gold">
                      <Icon size={16} />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <GetDirectionsButton variant="primary" size="md" />
              </div>
            </div>
            <MapEmbed height="h-[350px]" showDirectionsButton={false} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

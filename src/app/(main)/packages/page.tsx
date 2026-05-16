import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import CTASection from "@/components/home/CTASection";
import { WEDDING_PACKAGES } from "@/utils/constants";
import { VENUE_IDENTITY, VENUE_CONTACT, PAGE_HERO_IMAGES } from "@/data/venueData";
import { CheckCircle2, Star, ArrowRight, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Wedding Packages & Pricing | ${VENUE_IDENTITY.name} ${VENUE_CONTACT.city}`,
  description: `Explore our luxury wedding packages at ${VENUE_IDENTITY.name}, ${VENUE_CONTACT.city}. Silver Elegance, Gold Royale & Platinum Grand packages starting from ₹2,50,000. Customizable for all budgets.`,
  alternates: { canonical: "/packages" },
  openGraph: {
    title: `Wedding Packages | ${VENUE_IDENTITY.name} ${VENUE_CONTACT.city}`,
    description: `Luxury wedding packages starting from ₹2,50,000. Silver, Gold & Platinum packages with complete event management.`,
    url: "/packages",
  },
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        title="Wedding"
        titleHighlight="Packages"
        subtitle="Transparent pricing, premium experiences. Choose the package that matches your dream wedding."
        image={PAGE_HERO_IMAGES.packages}
        breadcrumbs={[{ label: "Packages" }]}
        badge="Pricing"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/25 to-cream py-16 md:py-24">
        <div className="pointer-events-none absolute top-20 right-0 h-72 w-72 rounded-full bg-rose-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Packages"
            title="Choose Your"
            titleHighlight="Perfect Package"
            subtitle="All packages are fully customizable. Contact us to create a bespoke package tailored to your exact requirements."
          />

          <div className="mt-4 grid gap-8 lg:grid-cols-3">
            {WEDDING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white/95 shadow-luxury backdrop-blur-md transition hover:-translate-y-1 hover:shadow-luxury-hover ${
                  pkg.isPopular
                    ? "border-rose-gold/45 ring-2 ring-rose-gold/20"
                    : "border-rose-gold/12 hover:border-rose-gold/25"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-gold to-rose-gold-deep px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    <Star size={12} className="fill-white" />
                    Popular
                    <Star size={12} className="fill-white" />
                  </div>
                )}

                <div className="border-b border-rose-gold/10 bg-gradient-to-br from-blush/50 to-cream/80 p-8">
                  <h3 className="font-display text-2xl font-semibold text-ink">{pkg.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{pkg.description}</p>
                  <div className="mt-6">
                    <span className="font-display text-3xl font-semibold text-gradient-rose">{pkg.price}</span>
                    <div className="mt-1 text-xs font-medium text-ink/55">{pkg.priceNote}</div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <ul className="flex-1 space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-ink/80">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-rose-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href="/contact#inquiry"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-gold py-3.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
                    >
                      Book This Package
                      <ArrowRight size={16} />
                    </Link>
                    <a
                      href={`tel:${VENUE_CONTACT.phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/25 py-3 text-sm font-semibold text-ink transition hover:bg-blush/50"
                    >
                      <Phone size={15} />
                      Call for Custom Quote
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-rose-gold/15 bg-white/95 p-8 text-center shadow-md backdrop-blur-md md:p-10">
            <h3 className="font-display text-2xl font-semibold text-ink">Need a Custom Package?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
              Every wedding is unique. Contact us to create a fully bespoke package tailored to your specific requirements,
              guest count, and budget.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact#inquiry"
                className="inline-flex items-center justify-center rounded-2xl bg-rose-gold px-6 py-3.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
              >
                Request Custom Quote
              </Link>
              <a
                href={`https://wa.me/${VENUE_CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/25 bg-blush/50 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-rose-gold/40"
              >
                <MessageCircle size={18} className="text-rose-gold" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Inclusions"
            title="What's Always"
            titleHighlight="Included"
            subtitle={`Regardless of the package you choose, these essentials are always part of your ${VENUE_IDENTITY.name} experience.`}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "Dedicated Event Coordinator", desc: "A personal coordinator assigned to your event from booking to execution." },
              { title: "Venue Setup & Cleanup", desc: "Complete setup before your event and thorough cleanup after — no extra charges." },
              { title: "Security & Valet", desc: "Professional security team and valet parking for all your guests." },
              { title: "Backup Power", desc: "100% DG backup ensures your event never faces a power interruption." },
              { title: "Bridal Changing Room", desc: "Private, well-equipped bridal room for the bride and her entourage." },
              { title: "Free Site Visit", desc: "Complimentary venue tour before booking — see the magic for yourself." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-rose-gold/12 bg-white/95 p-6 shadow-sm transition hover:border-rose-gold/25 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blush text-rose-gold">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-rose-gold/10 bg-gradient-to-b from-blush/30 to-cream py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Simple & Transparent <span className="text-gradient-rose">Payment Terms</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { step: "30%", label: "Advance to Confirm Booking", gradient: "from-rose-gold to-rose-gold-deep" },
              { step: "40%", label: "30 Days Before Event", gradient: "from-rose-gold-muted to-rose-gold" },
              { step: "30%", label: "On Event Day", gradient: "from-blush to-rose-gold-muted" },
            ].map((t, i) => (
              <div
                key={`${t.step}-${i}`}
                className="rounded-2xl border border-rose-gold/12 bg-white/95 p-6 shadow-luxury transition hover:-translate-y-1"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${t.gradient} font-display text-xl font-bold text-white shadow-md`}
                >
                  <span>{t.step}</span>
                </div>
                <p className="mt-4 text-sm font-medium leading-snug text-ink/80">{t.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-ink/65">
            We accept Bank Transfer, UPI, NEFT/RTGS, and all major credit/debit cards.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}

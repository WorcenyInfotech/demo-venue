import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import CTASection from "@/components/home/CTASection";
import { WEDDING_PACKAGES } from "@/utils/constants";
import { CheckCircle2, Star, ArrowRight, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Wedding Packages & Pricing | Green Land Farm Surat",
  description:
    "Explore our luxury wedding packages at Green Land Farm, Surat. Silver Elegance, Gold Royale & Platinum Grand packages starting from ₹2,50,000. Customizable for all budgets.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Wedding Packages | Green Land Farm Surat",
    description:
      "Luxury wedding packages starting from ₹2,50,000. Silver, Gold & Platinum packages with complete event management.",
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
        image="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80"
        breadcrumbs={[{ label: "Packages" }]}
        badge="Pricing"
      />

      {/* Packages */}
      <section className="section-padding bg-[#f7f3ec]">
        <div className="container-custom">
          <SectionHeader
            badge="Our Packages"
            title="Choose Your"
            titleHighlight="Perfect Package"
            subtitle="All packages are fully customizable. Contact us to create a bespoke package tailored to your exact requirements."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start overflow-x-clip">
            {WEDDING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${
                  pkg.isPopular
                    ? "border-[#c6a94c] shadow-[0_20px_60px_rgba(198,169,76,0.25)] md:scale-105 z-10"
                    : "border-gray-200 shadow-lg hover:shadow-xl hover:border-[#c6a94c]/40"
                }`}
              >
                {/* Popular badge */}
                {pkg.isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#c6a94c] to-[#dcc875] text-[#1a332b] text-center py-2 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                    <Star size={12} className="fill-[#1a332b]" />
                    Most Popular Choice
                    <Star size={12} className="fill-[#1a332b]" />
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-br ${pkg.color} p-8 ${pkg.isPopular ? "pt-12" : ""}`}>
                  <h3 className="font-serif font-bold text-2xl text-white mb-1">{pkg.name}</h3>
                  <p className="text-white/70 text-sm mb-5">{pkg.description}</p>
                  <div className="text-white">
                    <span className="font-serif font-bold text-4xl">{pkg.price}</span>
                    <div className="text-white/60 text-xs mt-1">{pkg.priceNote}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-white p-8">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle2
                          size={17}
                          className={`flex-shrink-0 mt-0.5 ${
                            pkg.isPopular ? "text-[#c6a94c]" : "text-[#2a5245]"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link
                      href="/contact#inquiry"
                      className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        pkg.isPopular
                          ? "bg-gradient-to-r from-[#c6a94c] to-[#dcc875] text-[#1a332b] hover:shadow-[0_4px_20px_rgba(198,169,76,0.4)] hover:-translate-y-0.5"
                          : "bg-gradient-to-br from-[#2a5245] to-[#4d8b73] text-white hover:shadow-lg hover:-translate-y-0.5"
                      }`}
                    >
                      Book This Package
                      <ArrowRight size={16} />
                    </Link>
                    <a
                      href="tel:+919876543210"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-[#2a5245] hover:text-[#2a5245] transition-all"
                    >
                      <Phone size={15} />
                      Call for Custom Quote
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom package note */}
          <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-[#1a332b] to-[#2a5245] text-white">
            <h3 className="font-serif text-2xl font-bold mb-2">
              Need a Custom Package?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Every wedding is unique. Contact us to create a fully bespoke package tailored to your specific requirements, guest count, and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact#inquiry" className="btn-primary">
                Request Custom Quote
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1da851] transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Inclusions"
            title="What's Always"
            titleHighlight="Included"
            subtitle="Regardless of the package you choose, these essentials are always part of your Green Land Farm experience."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Dedicated Event Coordinator", desc: "A personal coordinator assigned to your event from booking to execution." },
              { title: "Venue Setup & Cleanup", desc: "Complete setup before your event and thorough cleanup after — no extra charges." },
              { title: "Security & Valet", desc: "Professional security team and valet parking for all your guests." },
              { title: "Backup Power", desc: "100% DG backup ensures your event never faces a power interruption." },
              { title: "Bridal Changing Room", desc: "Private, well-equipped bridal room for the bride and her entourage." },
              { title: "Free Site Visit", desc: "Complimentary venue tour before booking — see the magic for yourself." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-[#f7f3ec] border border-[#c6a94c]/15 hover:border-[#c6a94c]/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a5245] to-[#4d8b73] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={18} className="text-[#c6a94c]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a332b] text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment terms */}
      <section className="py-14 bg-[#f7f3ec]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a332b] mb-4">
              Simple & Transparent{" "}
              <span style={{ background: "linear-gradient(135deg, #c6a94c 0%, #dcc875 50%, #c6a94c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Payment Terms
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { step: "30%", label: "Advance to Confirm Booking", color: "from-[#2a5245] to-[#4d8b73]" },
                { step: "40%", label: "30 Days Before Event", color: "from-[#c6a94c] to-[#8b6914]" },
                { step: "30%", label: "On Event Day", color: "from-[#1a332b] to-[#2a5245]" },
              ].map((t) => (
                <div key={t.step} className="p-6 rounded-2xl bg-white border border-[#c6a94c]/15 shadow-sm text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                    <span className="text-white font-bold text-xl font-serif">{t.step}</span>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{t.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-500 text-sm">
              We accept Bank Transfer, UPI, NEFT/RTGS, and all major credit/debit cards.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

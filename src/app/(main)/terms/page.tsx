import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service | Ramayan Farm",
  description: "Terms of Service for Ramayan Farm — Luxury Wedding Venue in Surat, Gujarat.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of"
        titleHighlight="Service"
        breadcrumbs={[{ label: "Terms of Service" }]}
        badge="Legal"
      />
      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="rounded-2xl border border-rose-gold/15 bg-white/90 px-4 py-2 text-center text-sm text-ink/65 shadow-sm">
            Last updated: January 2026
          </p>

          <div className="mt-10 space-y-10">
            {[
              {
                title: "Booking & Confirmation",
                content:
                  "All bookings are confirmed only upon receipt of the advance payment (30% of total package cost). Verbal or written agreements without payment do not constitute a confirmed booking.",
              },
              {
                title: "Cancellation Policy",
                content:
                  "Cancellations made 90+ days before the event: 80% refund. 60-89 days: 50% refund. 30-59 days: 25% refund. Less than 30 days: No refund. All cancellations must be made in writing.",
              },
              {
                title: "Venue Rules",
                content:
                  "Guests are expected to maintain decorum and respect the venue property. Any damage caused to the venue or its property will be charged to the booking party. Outside alcohol is not permitted.",
              },
              {
                title: "Catering",
                content:
                  "Outside food and beverages are not permitted without prior written approval. Our in-house catering team provides premium multi-cuisine menus. Special dietary requirements must be communicated at least 7 days in advance.",
              },
              {
                title: "Force Majeure",
                content:
                  "Ramayan Farm shall not be liable for any failure to perform its obligations due to circumstances beyond its reasonable control, including natural disasters, government restrictions, or other force majeure events.",
              },
              {
                title: "Contact",
                content:
                  "For any queries regarding these terms, please contact us at info@greenlandfarm.in or call +91 98765 43210.",
              },
            ].map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-rose-gold/12 bg-white/95 p-8 shadow-sm transition hover:border-rose-gold/25 hover:shadow-md"
              >
                <h2 className="font-display text-xl font-semibold text-ink">{section.title}</h2>
                <div className="mt-3 h-px w-12 bg-gradient-to-r from-rose-gold to-transparent" />
                <p className="mt-4 text-sm leading-relaxed text-ink/75">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

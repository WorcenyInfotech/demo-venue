import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service | Green Land Farm",
  description: "Terms of Service for Green Land Farm — Luxury Wedding Venue in Surat, Gujarat.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of"
        titleHighlight="Service"
        breadcrumbs={[{ label: "Terms of Service" }]}
      />
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="prose prose-green max-w-none">
            <p className="text-gray-500 text-sm mb-8">Last updated: January 2025</p>

            {[
              {
                title: "Booking & Confirmation",
                content: "All bookings are confirmed only upon receipt of the advance payment (30% of total package cost). Verbal or written agreements without payment do not constitute a confirmed booking.",
              },
              {
                title: "Cancellation Policy",
                content: "Cancellations made 90+ days before the event: 80% refund. 60-89 days: 50% refund. 30-59 days: 25% refund. Less than 30 days: No refund. All cancellations must be made in writing.",
              },
              {
                title: "Venue Rules",
                content: "Guests are expected to maintain decorum and respect the venue property. Any damage caused to the venue or its property will be charged to the booking party. Outside alcohol is not permitted.",
              },
              {
                title: "Catering",
                content: "Outside food and beverages are not permitted without prior written approval. Our in-house catering team provides premium multi-cuisine menus. Special dietary requirements must be communicated at least 7 days in advance.",
              },
              {
                title: "Force Majeure",
                content: "Green Land Farm shall not be liable for any failure to perform its obligations due to circumstances beyond its reasonable control, including natural disasters, government restrictions, or other force majeure events.",
              },
              {
                title: "Contact",
                content: "For any queries regarding these terms, please contact us at info@greenlandfarm.in or call +91 98765 43210.",
              },
            ].map((section) => (
              <div key={section.title} className="mb-8">
                <h2 className="font-serif text-xl font-bold text-[#0f3d1e] mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

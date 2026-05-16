import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Ramayan Farm",
  description: "Privacy Policy for Ramayan Farm — Luxury Wedding Venue in Surat, Gujarat.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy"
        titleHighlight="Policy"
        breadcrumbs={[{ label: "Privacy Policy" }]}
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
                title: "Information We Collect",
                content:
                  "We collect information you provide directly to us, such as your name, email address, phone number, and event details when you submit an inquiry or contact form. We also collect usage data to improve our website.",
              },
              {
                title: "How We Use Your Information",
                content:
                  "We use the information we collect to respond to your inquiries, provide our services, send you relevant information about our venue and packages, and improve our website and services.",
              },
              {
                title: "Information Sharing",
                content:
                  "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to provide our services.",
              },
              {
                title: "Data Security",
                content:
                  "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
              },
              {
                title: "Contact Us",
                content:
                  "If you have any questions about this Privacy Policy, please contact us at info@greenlandfarm.in or call +91 98765 43210.",
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

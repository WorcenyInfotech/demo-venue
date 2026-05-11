import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Green Land Farm",
  description: "Privacy Policy for Green Land Farm — Luxury Wedding Venue in Surat, Gujarat.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy"
        titleHighlight="Policy"
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="prose prose-green max-w-none">
            <p className="text-gray-500 text-sm mb-8">Last updated: January 2025</p>

            {[
              {
                title: "Information We Collect",
                content: "We collect information you provide directly to us, such as your name, email address, phone number, and event details when you submit an inquiry or contact form. We also collect usage data to improve our website.",
              },
              {
                title: "How We Use Your Information",
                content: "We use the information we collect to respond to your inquiries, provide our services, send you relevant information about our venue and packages, and improve our website and services.",
              },
              {
                title: "Information Sharing",
                content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to provide our services.",
              },
              {
                title: "Data Security",
                content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
              },
              {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy, please contact us at info@greenlandfarm.in or call +91 98765 43210.",
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

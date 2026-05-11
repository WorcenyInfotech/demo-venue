import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import HighlightsSection from "@/components/home/HighlightsSection";
import ServicesSection from "@/components/home/ServicesSection";
import GallerySlider from "@/components/home/GallerySlider";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import MapSection from "@/components/home/MapSection";
import CTASection from "@/components/home/CTASection";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { FAQS } from "@/utils/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenlandfarm.in";

// ============================================
// Page-level SEO metadata
// ============================================
export const metadata: Metadata = {
  title: "Green Land Farm | Luxury Wedding Venue in Surat, Gujarat",
  description:
    "Green Land Farm — Surat's most luxurious wedding venue & event farm. 5-acre green paradise, 1000+ guest capacity, premium catering & world-class amenities. Book your dream wedding, reception & engagement in Surat, Gujarat.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Green Land Farm | Luxury Wedding Venue in Surat, Gujarat",
    description:
      "Create unforgettable wedding memories at Green Land Farm. Surat's premier luxury wedding venue with 5-acre green lawns, elegant banquet halls & world-class hospitality.",
    url: "/",
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

// Page-specific schemas
const homeFaqSchema = faqSchema(FAQS);
const homeBreadcrumb = breadcrumbSchema([
  { name: "Home", url: siteUrl },
]);

// ============================================
// Home Page
// ============================================
export default function HomePage() {
  return (
    <>
      {/* Page-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }}
      />

      {/* Page sections */}
      <HeroSection />
      <HighlightsSection />
      <ServicesSection />
      <GallerySlider />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <MapSection />
    </>
  );
}

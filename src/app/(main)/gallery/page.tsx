import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Gallery | Green Land Farm - Wedding Venue Photos Surat",
  description:
    "Browse our stunning gallery of weddings, receptions, engagements and events at Green Land Farm, Surat. See why we're Gujarat's most beautiful wedding venue.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Green Land Farm Wedding Venue Surat",
    description:
      "Beautiful wedding photos from Green Land Farm — Surat's premier luxury wedding venue.",
    url: "/gallery",
  },
};

const GALLERY_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1587271636175-90d58cdad458?w=800&q=80", title: "Grand Wedding Ceremony", category: "wedding" },
  { id: 2, url: "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?w=800&q=80", title: "Elegant Reception Hall", category: "reception" },
  { id: 3, url: "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?w=800&q=80", title: "Romantic Engagement", category: "engagement" },
  { id: 4, url: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=800&q=80", title: "Sangeet Night", category: "wedding" },
  { id: 5, url: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=800&q=80", title: "Outdoor Lawn Setup", category: "venue" },
  { id: 6, url: "https://images.unsplash.com/photo-1587271315307-eaebc181c749?w=800&q=80", title: "Floral Decoration", category: "decoration" },
  { id: 7, url: "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?w=800&q=80", title: "Bridal Portrait", category: "wedding" },
  { id: 8, url: "https://images.unsplash.com/photo-1583878545126-2f1ca0142714?w=800&q=80", title: "Venue Overview", category: "venue" },
  { id: 9, url: "https://images.unsplash.com/photo-1587271636175-90d58cdad458?w=800&q=80", title: "Wedding Mandap", category: "decoration" },
  { id: 10, url: "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?w=800&q=80", title: "Reception Dinner", category: "reception" },
  { id: 11, url: "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?w=800&q=80", title: "Ring Ceremony", category: "engagement" },
  { id: 12, url: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=800&q=80", title: "Dance Floor", category: "reception" },
  { id: 13, url: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=800&q=80", title: "Garden Ceremony", category: "venue" },
  { id: 14, url: "https://images.unsplash.com/photo-1587271315307-eaebc181c749?w=800&q=80", title: "Stage Decoration", category: "decoration" },
  { id: 15, url: "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?w=800&q=80", title: "Couple Portrait", category: "wedding" },
  { id: 16, url: "https://images.unsplash.com/photo-1583878545126-2f1ca0142714?w=800&q=80", title: "Banquet Hall", category: "venue" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our"
        titleHighlight="Gallery"
        subtitle="A visual journey through the magical weddings and events we've had the privilege of hosting."
        image="https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?w=1920&q=80"
        breadcrumbs={[{ label: "Gallery" }]}
        badge="Photo Gallery"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/20 to-cream py-16 md:py-24">
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-rose-gold/8 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Work"
            title="Moments We've"
            titleHighlight="Captured"
            subtitle="Every image tells a story of love, joy, and celebration. Browse through our collection of beautiful weddings and events."
          />
          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </section>

      <section className="border-t border-rose-gold/10 bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Video Gallery"
            title="Watch Our"
            titleHighlight="Wedding Films"
            subtitle="Experience the magic of Green Land Farm through our cinematic wedding films."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-rose-gold/12 bg-gradient-to-br from-footer to-[#3a3234] shadow-luxury"
              >
                <div className="aspect-video bg-gradient-to-br from-rose-gold/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition group-hover:bg-rose-gold/25">
                    <div className="ml-1 h-0 w-0 border-y-8 border-y-transparent border-l-[14px] border-l-cream" />
                  </div>
                  <p className="font-display text-lg font-semibold text-cream">Wedding Film {i}</p>
                  <p className="text-xs uppercase tracking-wider text-rose-gold-muted">Green Land Farm</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ink/70">
            Full video gallery available on our{" "}
            <a
              href="https://youtube.com/@greenlandfarm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose-gold underline-offset-4 transition hover:text-rose-gold-deep hover:underline"
            >
              YouTube Channel
            </a>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}

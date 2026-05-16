import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import GalleryGrid from "@/components/ui/GalleryGrid";
import CTASection from "@/components/home/CTASection";
import {
  VENUE_IDENTITY,
  VENUE_SOCIAL,
  PAGE_HERO_IMAGES,
  GALLERY_IMAGES as VENUE_GALLERY_IMAGES,
  VENUE_VIDEOS,
} from "@/data/venueData";

export const metadata: Metadata = {
  title: "Gallery | Ramayan Farm - Wedding Venue Photos Surat",
  description:
    "Browse our stunning gallery of weddings, receptions, engagements and events at Ramayan Farm, Surat. See why we're Gujarat's most beautiful wedding venue.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Ramayan Farm Wedding Venue Surat",
    description:
      "Beautiful wedding photos from Ramayan Farm — Surat's premier luxury wedding venue.",
    url: "/gallery",
  },
};

const GALLERY_IMAGES = VENUE_GALLERY_IMAGES.map((img, i) => ({ id: i + 1, url: img.src, title: img.title, category: img.category }));

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our"
        titleHighlight="Gallery"
        subtitle="A visual journey through the magical weddings and events we've had the privilege of hosting."
        image={PAGE_HERO_IMAGES.gallery}
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
            subtitle={`Experience the magic of ${VENUE_IDENTITY.name} through our cinematic wedding films.`}
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
                  <p className="text-xs uppercase tracking-wider text-rose-gold-muted">{VENUE_IDENTITY.name}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ink/70">
            Full video gallery available on our{" "}
            <a
              href={VENUE_VIDEOS.youtubeChannel}
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

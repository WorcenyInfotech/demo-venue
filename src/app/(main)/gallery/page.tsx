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

// Placeholder gallery images with categories
const GALLERY_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", title: "Grand Wedding Ceremony", category: "wedding" },
  { id: 2, url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", title: "Elegant Reception Hall", category: "reception" },
  { id: 3, url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", title: "Romantic Engagement", category: "engagement" },
  { id: 4, url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", title: "Sangeet Night", category: "wedding" },
  { id: 5, url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80", title: "Outdoor Lawn Setup", category: "venue" },
  { id: 6, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", title: "Floral Decoration", category: "decoration" },
  { id: 7, url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", title: "Bridal Portrait", category: "wedding" },
  { id: 8, url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", title: "Venue Overview", category: "venue" },
  { id: 9, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", title: "Wedding Mandap", category: "decoration" },
  { id: 10, url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", title: "Reception Dinner", category: "reception" },
  { id: 11, url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", title: "Ring Ceremony", category: "engagement" },
  { id: 12, url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", title: "Dance Floor", category: "reception" },
  { id: 13, url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80", title: "Garden Ceremony", category: "venue" },
  { id: 14, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", title: "Stage Decoration", category: "decoration" },
  { id: 15, url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", title: "Couple Portrait", category: "wedding" },
  { id: 16, url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", title: "Banquet Hall", category: "venue" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our"
        titleHighlight="Gallery"
        subtitle="A visual journey through the magical weddings and events we've had the privilege of hosting."
        image="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&q=80"
        breadcrumbs={[{ label: "Gallery" }]}
        badge="Photo Gallery"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Our Work"
            title="Moments We've"
            titleHighlight="Captured"
            subtitle="Every image tells a story of love, joy, and celebration. Browse through our collection of beautiful weddings and events."
          />

          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </section>

      {/* Video section placeholder */}
      <section className="section-padding bg-[#f7f3ec]">
        <div className="container-custom">
          <SectionHeader
            badge="Video Gallery"
            title="Watch Our"
            titleHighlight="Wedding Films"
            subtitle="Experience the magic of Green Land Farm through our cinematic wedding films."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a332b] to-[#2a5245] flex items-center justify-center group cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-white ml-1" />
                  </div>
                  <p className="text-white/80 text-sm font-medium">Wedding Film {i}</p>
                  <p className="text-[#c6a94c] text-xs mt-1">Green Land Farm</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a332b]/40 to-transparent" />
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            Full video gallery available on our{" "}
            <a href="https://youtube.com/@greenlandfarm" target="_blank" rel="noopener noreferrer" className="text-[#2a5245] font-semibold hover:text-[#c6a94c] transition-colors">
              YouTube Channel
            </a>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}

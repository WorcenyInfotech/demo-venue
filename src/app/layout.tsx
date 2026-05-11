import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";

// ============================================
// Font Configuration — optimized with display:swap
// ============================================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: false, // secondary font, lazy
});

// ============================================
// Site Metadata
// ============================================
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenlandfarm.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Green Land Farm | Luxury Wedding Venue in Surat, Gujarat",
    template: "%s | Green Land Farm",
  },
  description:
    "Green Land Farm — Surat's most luxurious wedding venue & event farm. 5-acre green paradise, 1000+ guest capacity, premium catering & world-class amenities. Book your dream wedding, reception, engagement & destination wedding in Surat, Gujarat.",
  keywords: [
    "Best Wedding Farm in Surat",
    "Luxury Wedding Venue Surat",
    "Wedding Lawn Surat",
    "Marriage Garden Surat",
    "Top Wedding Farm Surat",
    "Wedding Event Venue Gujarat",
    "Destination Wedding Farm Surat",
    "Engagement Venue Surat",
    "Reception Venue Surat",
    "Wedding Banquet Hall Surat",
    "Outdoor Wedding Venue Surat",
    "Farm Wedding Surat",
    "Green Land Farm Surat",
    "Wedding Venue Gujarat",
    "Best Marriage Garden Surat",
    "Luxury Wedding Farm Gujarat",
    "Wedding Hall Surat",
    "Sangeet Venue Surat",
  ],
  authors: [{ name: "Green Land Farm", url: siteUrl }],
  creator: "Green Land Farm",
  publisher: "Green Land Farm",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Green Land Farm",
    title: "Green Land Farm | Luxury Wedding Venue in Surat, Gujarat",
    description:
      "Create unforgettable wedding memories at Green Land Farm — Surat's premier luxury wedding venue & event farm. Stunning green lawns, elegant banquet halls & world-class hospitality.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Green Land Farm - Luxury Wedding Venue in Surat, Gujarat",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@greenlandfarm",
    creator: "@greenlandfarm",
    title: "Green Land Farm | Luxury Wedding Venue in Surat",
    description:
      "Surat's most luxurious wedding venue & event farm. 500+ weddings hosted. Book your dream wedding today.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        alt: "Green Land Farm Wedding Venue Surat",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-IN": siteUrl,
    },
  },
  category: "Wedding Venue",
  classification: "Wedding & Events",
  referrer: "origin-when-cross-origin",
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Surat, Gujarat, India",
    "geo.position": "21.1702;72.8311",
    ICBM: "21.1702, 72.8311",
    "DC.title": "Green Land Farm - Luxury Wedding Venue Surat",
    "DC.description": "Luxury Wedding Venue & Event Farm in Surat, Gujarat",
    "DC.subject": "Wedding Venue, Event Farm, Surat, Gujarat",
    "DC.language": "en-IN",
    "DC.coverage": "Surat, Gujarat, India",
    "rating": "general",
    "revisit-after": "7 days",
    "language": "English",
    "distribution": "global",
    "target": "all",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a5c2e" },
    { media: "(prefers-color-scheme: dark)", color: "#0f3d1e" },
  ],
};

// ============================================
// Root Layout
// ============================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Global JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1a5c2e",
              color: "#fff",
              borderRadius: "0.5rem",
              padding: "0.875rem 1.25rem",
              fontSize: "0.9375rem",
              fontWeight: "500",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            },
            success: {
              iconTheme: { primary: "#c9a84c", secondary: "#fff" },
            },
            error: {
              style: { background: "#dc2626" },
            },
          }}
        />
      </body>
    </html>
  );
}

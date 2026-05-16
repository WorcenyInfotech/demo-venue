import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { VENUE_IDENTITY, VENUE_CONTACT, VENUE_MAP, VENUE_SOCIAL } from "@/data/venueData";
import "./globals.css";

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// ============================================
// Site Metadata — sourced from venueData.tsx
// ============================================
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || VENUE_IDENTITY.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${VENUE_IDENTITY.name} | ${VENUE_IDENTITY.tagline}, ${VENUE_CONTACT.state}`,
    template: `%s | ${VENUE_IDENTITY.name}`,
  },
  description: VENUE_IDENTITY.description,
  keywords: [
    `Best Wedding Farm in ${VENUE_CONTACT.city}`,
    `Luxury Wedding Venue ${VENUE_CONTACT.city}`,
    `Wedding Lawn ${VENUE_CONTACT.city}`,
    `Marriage Garden ${VENUE_CONTACT.city}`,
    `Top Wedding Farm ${VENUE_CONTACT.city}`,
    `Wedding Event Venue ${VENUE_CONTACT.state}`,
    `Destination Wedding Farm ${VENUE_CONTACT.city}`,
    `Engagement Venue ${VENUE_CONTACT.city}`,
    `Reception Venue ${VENUE_CONTACT.city}`,
    `Wedding Banquet Hall ${VENUE_CONTACT.city}`,
    `Outdoor Wedding Venue ${VENUE_CONTACT.city}`,
    `Farm Wedding ${VENUE_CONTACT.city}`,
    VENUE_IDENTITY.name,
    `Wedding Venue ${VENUE_CONTACT.state}`,
    `Best Marriage Garden ${VENUE_CONTACT.city}`,
    `Luxury Wedding Farm ${VENUE_CONTACT.state}`,
    `Wedding Hall ${VENUE_CONTACT.city}`,
    `Sangeet Venue ${VENUE_CONTACT.city}`,
  ],
  authors: [{ name: VENUE_IDENTITY.name, url: siteUrl }],
  creator: VENUE_IDENTITY.name,
  publisher: VENUE_IDENTITY.name,
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
    siteName: VENUE_IDENTITY.name,
    title: `${VENUE_IDENTITY.name} | ${VENUE_IDENTITY.tagline}, ${VENUE_CONTACT.state}`,
    description: VENUE_IDENTITY.description,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${VENUE_IDENTITY.name} - ${VENUE_IDENTITY.tagline} in ${VENUE_CONTACT.city}, ${VENUE_CONTACT.state}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `@${VENUE_SOCIAL.twitter.split("twitter.com/")[1]}`,
    creator: `@${VENUE_SOCIAL.twitter.split("twitter.com/")[1]}`,
    title: `${VENUE_IDENTITY.name} | ${VENUE_IDENTITY.tagline}`,
    description: VENUE_IDENTITY.description,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        alt: `${VENUE_IDENTITY.name} Wedding Venue ${VENUE_CONTACT.city}`,
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
    "geo.region": `IN-GJ`,
    "geo.placename": `${VENUE_CONTACT.city}, ${VENUE_CONTACT.state}, ${VENUE_CONTACT.country}`,
    "geo.position": `${VENUE_MAP.lat};${VENUE_MAP.lng}`,
    ICBM: `${VENUE_MAP.lat}, ${VENUE_MAP.lng}`,
    "DC.title": `${VENUE_IDENTITY.name} - ${VENUE_IDENTITY.tagline}`,
    "DC.description": `${VENUE_IDENTITY.tagline} & Event Farm in ${VENUE_CONTACT.city}, ${VENUE_CONTACT.state}`,
    "DC.subject": `Wedding Venue, Event Farm, ${VENUE_CONTACT.city}, ${VENUE_CONTACT.state}`,
    "DC.language": "en-IN",
    "DC.coverage": `${VENUE_CONTACT.city}, ${VENUE_CONTACT.state}, ${VENUE_CONTACT.country}`,
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
    { media: "(prefers-color-scheme: light)", color: "#B76E79" },
    { media: "(prefers-color-scheme: dark)", color: "#2a2426" },
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
      className={`${fontSans.variable} ${fontDisplay.variable}`}
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
      <body className="min-h-screen bg-cream font-sans text-ink">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333333",
              color: "#FAF7F2",
              borderRadius: "1rem",
              padding: "0.875rem 1.25rem",
              fontSize: "0.9375rem",
              fontWeight: "500",
              boxShadow: "0 18px 48px rgba(51,51,51,0.15)",
              border: "1px solid rgba(183,110,121,0.35)",
            },
            success: {
              iconTheme: { primary: "#B76E79", secondary: "#FAF7F2" },
            },
            error: {
              style: { background: "#5c2a2f", color: "#FAF7F2" },
            },
          }}
        />
      </body>
    </html>
  );
}

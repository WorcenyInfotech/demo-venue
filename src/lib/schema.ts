/**
 * JSON-LD Structured Data Schemas
 * Used across pages for rich search results
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenlandfarm.in";

// ============================================
// Local Business + Event Venue Schema
// ============================================
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EventVenue", "WeddingVenue"],
  "@id": `${siteUrl}/#business`,
  name: "Green Land Farm",
  alternateName: [
    "Green Land Farm Surat",
    "Green Land Wedding Farm",
    "GLF Wedding Venue",
  ],
  description:
    "Green Land Farm is Surat's most luxurious wedding venue & event farm. 5-acre green paradise with premium banquet halls, outdoor lawns, world-class catering and dedicated event management for weddings, receptions, engagements and destination weddings.",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.svg`,
    width: 100,
    height: 100,
  },
  image: [
    `${siteUrl}/og-image.jpg`,
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  ],
  telephone: ["+91-98765-43210", "+91-87654-32109"],
  email: "info@greenlandfarm.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near NH-48, Surat-Navsari Highway",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "395009",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.1702,
    longitude: 72.8311,
  },
  hasMap: "https://maps.google.com/?q=Green+Land+Farm+Surat",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Bank Transfer",
  areaServed: [
    { "@type": "City", name: "Surat" },
    { "@type": "State", name: "Gujarat" },
    { "@type": "Country", name: "India" },
  ],
  sameAs: [
    "https://instagram.com/greenlandfarm",
    "https://facebook.com/greenlandfarm",
    "https://youtube.com/@greenlandfarm",
    "https://twitter.com/greenlandfarm",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Outdoor Lawn", value: true },
    { "@type": "LocationFeatureSpecification", name: "Indoor Banquet Hall", value: true },
    { "@type": "LocationFeatureSpecification", name: "Catering Service", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
    { "@type": "LocationFeatureSpecification", name: "Bridal Suite", value: true },
    { "@type": "LocationFeatureSpecification", name: "Valet Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Backup Power", value: true },
    { "@type": "LocationFeatureSpecification", name: "Accommodation", value: true },
  ],
  numberOfRooms: 20,
  maximumAttendeeCapacity: 1000,
  foundingDate: "2009",
  slogan: "Create Unforgettable Wedding Memories",
};

// ============================================
// Website Schema
// ============================================
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Green Land Farm",
  url: siteUrl,
  description: "Luxury Wedding Venue & Event Farm in Surat, Gujarat",
  publisher: {
    "@id": `${siteUrl}/#business`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/gallery?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-IN",
};

// ============================================
// BreadcrumbList Schema
// ============================================
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// FAQ Schema
// ============================================
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ============================================
// Service Schema
// ============================================
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@id": `${siteUrl}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: "Surat",
    },
    serviceType: "Wedding & Event Services",
  };
}

// ============================================
// Review Schema
// ============================================
export function reviewSchema(reviews: Array<{
  author: string;
  rating: number;
  text: string;
  datePublished?: string;
}>) {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    reviewBody: review.text,
    datePublished: review.datePublished || new Date().toISOString().split("T")[0],
    itemReviewed: {
      "@id": `${siteUrl}/#business`,
    },
  }));
}

// ============================================
// Event Schema (for specific wedding events)
// ============================================
export function eventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    image: event.image || `${siteUrl}/og-image.jpg`,
    location: {
      "@type": "Place",
      name: "Green Land Farm",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Near NH-48, Surat-Navsari Highway",
        addressLocality: "Surat",
        addressRegion: "Gujarat",
        postalCode: "395009",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@id": `${siteUrl}/#business`,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };
}

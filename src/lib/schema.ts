/**
 * JSON-LD Structured Data Schemas
 * Used across pages for rich search results
 *
 * ⚠️  All venue-specific values are sourced from src/data/venueData.tsx
 */

import {
  VENUE_IDENTITY,
  VENUE_CONTACT,
  VENUE_MAP,
  VENUE_SOCIAL,
  VENUE_HOURS,
  HERO_IMAGES,
} from "@/data/venueData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || VENUE_IDENTITY.siteUrl;

// ============================================
// Local Business + Event Venue Schema
// ============================================
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EventVenue", "WeddingVenue"],
  "@id": `${siteUrl}/#business`,
  name: VENUE_IDENTITY.name,
  alternateName: VENUE_IDENTITY.alternateNames,
  description: VENUE_IDENTITY.description,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.svg`,
    width: 100,
    height: 100,
  },
  image: [
    `${siteUrl}/og-image.jpg`,
    HERO_IMAGES.slide1,
  ],
  telephone: [VENUE_CONTACT.phone, VENUE_CONTACT.phone2],
  email: VENUE_CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: VENUE_CONTACT.street,
    addressLocality: VENUE_CONTACT.city,
    addressRegion: VENUE_CONTACT.state,
    postalCode: VENUE_CONTACT.pincode,
    addressCountry: VENUE_CONTACT.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: VENUE_MAP.lat,
    longitude: VENUE_MAP.lng,
  },
  hasMap: VENUE_MAP.googleMapsSchemaUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: VENUE_HOURS.daysOpen,
      opens: VENUE_HOURS.opens,
      closes: VENUE_HOURS.closes,
    },
  ],
  priceRange: VENUE_IDENTITY.priceRange,
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Bank Transfer",
  areaServed: [
    { "@type": "City", name: VENUE_CONTACT.city },
    { "@type": "State", name: VENUE_CONTACT.state },
    { "@type": "Country", name: VENUE_CONTACT.country },
  ],
  sameAs: [
    VENUE_SOCIAL.instagram,
    VENUE_SOCIAL.facebook,
    VENUE_SOCIAL.youtube,
    VENUE_SOCIAL.twitter,
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
  numberOfRooms: VENUE_IDENTITY.accommodationRooms,
  maximumAttendeeCapacity: VENUE_IDENTITY.maxCapacity,
  foundingDate: VENUE_IDENTITY.foundingYear,
  slogan: VENUE_IDENTITY.slogan,
};

// ============================================
// Website Schema
// ============================================
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: VENUE_IDENTITY.name,
  url: siteUrl,
  description: `${VENUE_IDENTITY.tagline} & Event Farm in ${VENUE_CONTACT.city}, ${VENUE_CONTACT.state}`,
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
      name: VENUE_CONTACT.city,
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
      name: VENUE_IDENTITY.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: VENUE_CONTACT.street,
        addressLocality: VENUE_CONTACT.city,
        addressRegion: VENUE_CONTACT.state,
        postalCode: VENUE_CONTACT.pincode,
        addressCountry: VENUE_CONTACT.countryCode,
      },
    },
    organizer: {
      "@id": `${siteUrl}/#business`,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };
}

/**
 * Site-wide Constants & Static Data
 *
 * ⚠️  All venue-specific values now live in src/data/venueData.tsx
 *     This file re-exports them so existing imports keep working.
 */

import type { NavLink, Service, WeddingPackage, FAQ } from "@/types";
import {
  VENUE_IDENTITY,
  VENUE_CONTACT,
  VENUE_MAP,
  VENUE_SOCIAL,
  VENUE_HOURS,
  HERO_IMAGES,
  GALLERY_THUMBNAILS,
  SERVICE_IMAGES as SERVICE_IMAGES_DATA,
  SERVICES as VENUE_SERVICES,
  WEDDING_PACKAGES as VENUE_PACKAGES,
  FAQS as VENUE_FAQS,
  GALLERY_CATEGORIES as VENUE_GALLERY_CATEGORIES,
  DEFAULT_TESTIMONIALS as VENUE_TESTIMONIALS,
  VENUE_STATS as VENUE_STATS_DATA,
} from "@/data/venueData";

// ============================================
// Site Info — sourced from venueData.tsx
// ============================================
export const SITE_CONFIG = {
  name: VENUE_IDENTITY.name,
  tagline: VENUE_IDENTITY.tagline,
  description: VENUE_IDENTITY.description,
  phone: VENUE_CONTACT.phone,
  phone2: VENUE_CONTACT.phone2,
  email: VENUE_CONTACT.email,
  email2: VENUE_CONTACT.emailBookings,
  address: VENUE_CONTACT.address,
  city: VENUE_CONTACT.city,
  state: VENUE_CONTACT.state,
  country: VENUE_CONTACT.country,
  pincode: VENUE_CONTACT.pincode,
  whatsapp: VENUE_CONTACT.whatsapp,
  mapUrl: VENUE_MAP.googleMapsUrl,
  directionsUrl: VENUE_MAP.directionsUrl,
  socialLinks: {
    instagram: VENUE_SOCIAL.instagram,
    facebook: VENUE_SOCIAL.facebook,
    youtube: VENUE_SOCIAL.youtube,
    twitter: VENUE_SOCIAL.twitter,
  },
  workingHours: VENUE_HOURS.display,
};

// ============================================
// Navigation Links
// ============================================
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

// ============================================
// Re-exports from venueData.tsx
// (keeps all existing imports working)
// ============================================
export const VENUE_STATS = VENUE_STATS_DATA;
export const SERVICES: Service[] = VENUE_SERVICES as Service[];
export const WEDDING_PACKAGES: WeddingPackage[] = VENUE_PACKAGES as WeddingPackage[];
export const FAQS: FAQ[] = VENUE_FAQS as FAQ[];
export const GALLERY_CATEGORIES = VENUE_GALLERY_CATEGORIES;
export const DEFAULT_TESTIMONIALS = VENUE_TESTIMONIALS;

// ============================================
// Placeholder Images — sourced from venueData.tsx
// ============================================
export const PLACEHOLDER_IMAGES = {
  hero: HERO_IMAGES.slide1,
  hero2: HERO_IMAGES.slide2,
  hero3: HERO_IMAGES.slide3,
  about: SERVICE_IMAGES_DATA.about,
  venue1: SERVICE_IMAGES_DATA.venue1,
  venue2: SERVICE_IMAGES_DATA.venue2,
  gallery: GALLERY_THUMBNAILS,
};

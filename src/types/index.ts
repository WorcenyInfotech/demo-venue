/**
 * Global TypeScript Types & Interfaces
 */

// ============================================
// Inquiry Types
// ============================================
export interface InquiryStep1 {
  mobile: string;
  email: string;
}

export interface InquiryStep2 {
  name: string;
  eventType: string;
  guestCount: string;
  functionDate: string;
  message: string;
}

export type InquiryFormData = InquiryStep1 & InquiryStep2;

export interface Inquiry {
  _id: string;
  mobile: string;
  email: string;
  name: string;
  eventType: string;
  guestCount: string;
  functionDate: string;
  message: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Gallery Types
// ============================================
export interface GalleryImage {
  _id: string;
  publicId: string;
  url: string;
  title: string;
  category: GalleryCategory;
  alt: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export type GalleryCategory =
  | "wedding"
  | "reception"
  | "engagement"
  | "decoration"
  | "venue"
  | "all";

// ============================================
// Testimonial Types
// ============================================
export interface Testimonial {
  _id: string;
  name: string;
  eventType: string;
  rating: number;
  review: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

// ============================================
// Banner Types
// ============================================
export interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  publicId: string;
  ctaText?: string;
  ctaLink?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

// ============================================
// Admin Types
// ============================================
export interface AdminUser {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

export interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  contactedInquiries: number;
  confirmedInquiries: number;
  totalGalleryImages: number;
  totalTestimonials: number;
  recentInquiries: Inquiry[];
}

// ============================================
// API Response Types
// ============================================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ============================================
// Navigation Types
// ============================================
export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

// ============================================
// Service Types
// ============================================
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

// ============================================
// Package Types
// ============================================
export interface WeddingPackage {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  color: string;
}

// ============================================
// FAQ Types
// ============================================
export interface FAQ {
  question: string;
  answer: string;
}

// ============================================
// Event Types
// ============================================
export const EVENT_TYPES = [
  "Wedding Ceremony",
  "Reception",
  "Engagement",
  "Sangeet",
  "Mehendi",
  "Haldi",
  "Birthday Party",
  "Corporate Event",
  "Anniversary",
  "Other",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

// ============================================
// Guest Count Options
// ============================================
export const GUEST_COUNT_OPTIONS = [
  "50-100",
  "100-200",
  "200-300",
  "300-500",
  "500-750",
  "750-1000",
  "1000+",
] as const;

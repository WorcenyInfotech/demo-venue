/**
 * Zod Validation Schemas
 */

import { z } from "zod";

// ============================================
// Inquiry Schemas
// ============================================

export const inquiryStep1Schema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const inquiryStep2Schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  eventType: z.string().min(1, "Please select an event type"),
  guestCount: z.string().min(1, "Please select expected guest count"),
  functionDate: z
    .string()
    .min(1, "Please select a function date")
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected > today;
    }, "Function date must be in the future"),
  message: z
    .string()
    .max(1000, "Message cannot exceed 1000 characters")
    .optional()
    .default(""),
});

export const inquirySchema = inquiryStep1Schema.merge(inquiryStep2Schema);

// ============================================
// Admin Schemas
// ============================================

export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

// ============================================
// Gallery Schema
// ============================================

export const galleryUploadSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  category: z.enum(["wedding", "reception", "engagement", "decoration", "venue"]),
  alt: z.string().max(200, "Alt text cannot exceed 200 characters").optional(),
});

// ============================================
// Testimonial Schema
// ============================================

export const testimonialSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  eventType: z.string().min(1, "Event type is required"),
  rating: z.number().min(1).max(5),
  review: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review cannot exceed 1000 characters"),
});

// ============================================
// Contact Schema
// ============================================

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
  subject: z.string().min(1, "Subject is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

// ============================================
// Type Exports
// ============================================

export type InquiryStep1Input = z.infer<typeof inquiryStep1Schema>;
export type InquiryStep2Input = z.infer<typeof inquiryStep2Schema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type GalleryUploadInput = z.infer<typeof galleryUploadSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { User, Mail, Phone, MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";

const SUBJECTS = [
  "Wedding Inquiry",
  "Reception Booking",
  "Engagement Ceremony",
  "Destination Wedding",
  "Corporate Event",
  "Site Visit Request",
  "Package Information",
  "Other",
];

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      // For now, simulate API call — will be wired to API in Part 7
      await new Promise((r) => setTimeout(r, 1200));
      setIsSuccess(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again or call us directly.");
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle2 size={28} className="text-[#c9a84c]" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#0f3d1e] mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm mb-6">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-[#1a5c2e] font-semibold text-sm hover:text-[#c9a84c] transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              {...register("name")}
              type="text"
              placeholder="Your name"
              className={`form-input pl-10 ${errors.name ? "error" : ""}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="form-label">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              {...register("mobile")}
              type="tel"
              placeholder="98765 43210"
              maxLength={10}
              className={`form-input pl-10 ${errors.mobile ? "error" : ""}`}
            />
          </div>
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className={`form-input pl-10 ${errors.email ? "error" : ""}`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="form-label">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          {...register("subject")}
          className={`form-input ${errors.subject ? "error" : ""}`}
        >
          <option value="">Select a subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="form-label">
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MessageSquare size={16} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Tell us about your event, requirements, or any questions you have..."
            className={`form-input pl-10 resize-none ${errors.message ? "error" : ""}`}
          />
        </div>
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

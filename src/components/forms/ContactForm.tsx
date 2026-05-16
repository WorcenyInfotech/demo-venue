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

const fieldWrap = "space-y-2";
const labelCls = "text-sm font-semibold text-ink";
const inputShell =
  "flex items-center gap-3 rounded-2xl border border-rose-gold/20 bg-cream/80 px-4 py-3 shadow-sm transition focus-within:border-rose-gold focus-within:ring-2 focus-within:ring-rose-gold/20";
const inputCls =
  "w-full min-w-0 border-0 bg-transparent text-sm text-ink placeholder:text-ink/40 outline-none";
const errCls = "text-xs font-medium text-rose-gold-deep";

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
    void data;
    try {
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
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-rose-gold/20 bg-white/90 p-10 text-center shadow-luxury backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blush text-rose-gold">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">Message Sent!</h3>
        <p className="mt-2 text-sm text-ink/70">We&apos;ll get back to you within 24 hours.</p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-8 rounded-2xl border border-rose-gold/25 bg-transparent px-6 py-3 text-sm font-semibold text-rose-gold transition hover:bg-blush"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className={fieldWrap}>
          <label className={labelCls}>
            Full Name <span className="text-rose-gold">*</span>
          </label>
          <div className={inputShell}>
            <User size={16} className="shrink-0 text-rose-gold/70" />
            <input {...register("name")} type="text" placeholder="Your name" className={inputCls} />
          </div>
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>

        <div className={fieldWrap}>
          <label className={labelCls}>
            Mobile Number <span className="text-rose-gold">*</span>
          </label>
          <div className={inputShell}>
            <Phone size={16} className="shrink-0 text-rose-gold/70" />
            <input
              {...register("mobile")}
              type="tel"
              placeholder="98765 43210"
              maxLength={10}
              className={inputCls}
            />
          </div>
          {errors.mobile && <p className={errCls}>{errors.mobile.message}</p>}
        </div>
      </div>

      <div className={fieldWrap}>
        <label className={labelCls}>
          Email Address <span className="text-rose-gold">*</span>
        </label>
        <div className={inputShell}>
          <Mail size={16} className="shrink-0 text-rose-gold/70" />
          <input {...register("email")} type="email" placeholder="your@email.com" className={inputCls} />
        </div>
        {errors.email && <p className={errCls}>{errors.email.message}</p>}
      </div>

      <div className={fieldWrap}>
        <label className={labelCls}>
          Subject <span className="text-rose-gold">*</span>
        </label>
        <select
          {...register("subject")}
          className="w-full rounded-2xl border border-rose-gold/20 bg-cream/80 px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
        >
          <option value="">Select a subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.subject && <p className={errCls}>{errors.subject.message}</p>}
      </div>

      <div className={fieldWrap}>
        <label className={labelCls}>
          Message <span className="text-rose-gold">*</span>
        </label>
        <div className={`${inputShell} items-start`}>
          <MessageSquare size={16} className="mt-0.5 shrink-0 text-rose-gold/70" />
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Tell us about your event, requirements, or any questions you have..."
            className={`${inputCls} resize-none py-1`}
          />
        </div>
        {errors.message && <p className={errCls}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-gold px-6 py-4 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep hover:shadow-luxury-hover disabled:cursor-not-allowed disabled:opacity-60"
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

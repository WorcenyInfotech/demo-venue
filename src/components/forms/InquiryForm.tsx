"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Phone,
  Mail,
  User,
  Calendar,
  Users,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  inquiryStep1Schema,
  inquiryStep2Schema,
  type InquiryStep1Input,
  type InquiryStep2Input,
} from "@/lib/validations";
import { EVENT_TYPES, GUEST_COUNT_OPTIONS } from "@/types";
import { getMinBookingDate } from "@/utils/helpers";

const fieldWrap = "space-y-2";
const labelCls = "text-sm font-semibold text-ink";
const inputShell =
  "flex items-center gap-3 rounded-2xl border border-rose-gold/20 bg-cream/80 px-4 py-3 shadow-sm transition focus-within:border-rose-gold focus-within:ring-2 focus-within:ring-rose-gold/20";
const inputCls =
  "w-full min-w-0 border-0 bg-transparent text-sm text-ink placeholder:text-ink/40 outline-none";
const errCls = "text-xs font-medium text-rose-gold-deep";

export default function InquiryForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<InquiryStep1Input | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const step1Form = useForm<InquiryStep1Input>({
    resolver: zodResolver(inquiryStep1Schema),
    defaultValues: { mobile: "", email: "" },
  });

  const step2Form = useForm<InquiryStep2Input>({
    resolver: zodResolver(inquiryStep2Schema) as never,
    defaultValues: {
      name: "",
      eventType: "",
      guestCount: "",
      functionDate: "",
      message: "",
    },
  });

  const handleStep1 = step1Form.handleSubmit((data) => {
    setStep1Data(data);
    setStep(2);
  });

  const handleStep2 = step2Form.handleSubmit(async (data) => {
    if (!step1Data) return;
    setIsSubmitting(true);

    try {
      const payload = { ...step1Data, ...data };
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Something went wrong");

      setIsSuccess(true);
      toast.success("Inquiry submitted successfully! We'll contact you soon.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  });

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-rose-gold/20 bg-white/95 p-10 text-center shadow-luxury backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold-deep text-white shadow-glow-rose"
        >
          <CheckCircle2 size={36} />
        </motion.div>
        <h3 className="mt-8 font-display text-2xl font-semibold text-ink">Thank You!</h3>
        <p className="mt-2 text-sm text-ink/75">Your inquiry has been submitted successfully.</p>
        <p className="mt-1 text-sm text-ink/65">Our team will contact you within 24 hours to discuss your requirements.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/25 px-5 py-3 text-sm font-semibold text-rose-gold transition hover:bg-blush"
          >
            <Phone size={16} />
            Call Us Now
          </a>
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setStep(1);
              step1Form.reset();
              step2Form.reset();
              setStep1Data(null);
            }}
            className="inline-flex items-center justify-center rounded-2xl bg-rose-gold px-5 py-3 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
          >
            Submit Another Inquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold transition ${
                  s === step
                    ? "bg-gradient-to-br from-rose-gold to-rose-gold-deep text-white shadow-glow-rose"
                    : s < step
                      ? "bg-blush text-rose-gold"
                      : "border border-rose-gold/20 bg-cream text-ink/50"
                }`}
              >
                {s < step ? <CheckCircle2 size={18} /> : s}
              </div>
              <span className="text-center text-[11px] font-semibold uppercase tracking-wider text-ink/60">
                {s === 1 ? "Contact Info" : "Event Details"}
              </span>
            </div>
            {s < 2 && (
              <div
                className={`mx-2 h-0.5 w-10 rounded-full sm:w-16 ${
                  step > s ? "bg-rose-gold" : "bg-rose-gold/20"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.32 }}
            onSubmit={handleStep1}
            className="space-y-6"
          >
            <div className={fieldWrap}>
              <label className={labelCls}>
                Mobile Number <span className="text-rose-gold">*</span>
              </label>
              <div className={inputShell}>
                <div className="flex shrink-0 items-center gap-1 border-r border-rose-gold/15 pr-3 text-sm font-semibold text-rose-gold">
                  <Phone size={18} />
                  <span>+91</span>
                </div>
                <input
                  {...step1Form.register("mobile")}
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  className={inputCls}
                />
              </div>
              {step1Form.formState.errors.mobile && (
                <p className={errCls}>{step1Form.formState.errors.mobile.message}</p>
              )}
            </div>

            <div className={fieldWrap}>
              <label className={labelCls}>
                Email Address <span className="text-rose-gold">*</span>
              </label>
              <div className={inputShell}>
                <Mail size={18} className="shrink-0 text-rose-gold/70" />
                <input {...step1Form.register("email")} type="email" placeholder="your@email.com" className={inputCls} />
              </div>
              {step1Form.formState.errors.email && (
                <p className={errCls}>{step1Form.formState.errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-gold py-4 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-xs text-ink/55">Your information is secure and will never be shared.</p>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.32 }}
            onSubmit={handleStep2}
            className="space-y-6"
          >
            <div className={fieldWrap}>
              <label className={labelCls}>
                Full Name <span className="text-rose-gold">*</span>
              </label>
              <div className={inputShell}>
                <User size={18} className="shrink-0 text-rose-gold/70" />
                <input {...step2Form.register("name")} type="text" placeholder="Your full name" className={inputCls} />
              </div>
              {step2Form.formState.errors.name && (
                <p className={errCls}>{step2Form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className={fieldWrap}>
                <label className={labelCls}>
                  Event Type <span className="text-rose-gold">*</span>
                </label>
                <select
                  {...step2Form.register("eventType")}
                  className="w-full rounded-2xl border border-rose-gold/20 bg-cream/80 px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20"
                >
                  <option value="">Select event type</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {step2Form.formState.errors.eventType && (
                  <p className={errCls}>{step2Form.formState.errors.eventType.message}</p>
                )}
              </div>

              <div className={fieldWrap}>
                <label className={labelCls}>
                  Expected Guests <span className="text-rose-gold">*</span>
                </label>
                <div className={inputShell}>
                  <Users size={18} className="shrink-0 text-rose-gold/70" />
                  <select {...step2Form.register("guestCount")} className={`${inputCls} cursor-pointer`}>
                    <option value="">Select count</option>
                    {GUEST_COUNT_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g} guests
                      </option>
                    ))}
                  </select>
                </div>
                {step2Form.formState.errors.guestCount && (
                  <p className={errCls}>{step2Form.formState.errors.guestCount.message}</p>
                )}
              </div>
            </div>

            <div className={fieldWrap}>
              <label className={labelCls}>
                Function Date <span className="text-rose-gold">*</span>
              </label>
              <div className={inputShell}>
                <Calendar size={18} className="shrink-0 text-rose-gold/70" />
                <input
                  {...step2Form.register("functionDate")}
                  type="date"
                  min={getMinBookingDate()}
                  className={inputCls}
                />
              </div>
              {step2Form.formState.errors.functionDate && (
                <p className={errCls}>{step2Form.formState.errors.functionDate.message}</p>
              )}
            </div>

            <div className={fieldWrap}>
              <label className={labelCls}>Message (Optional)</label>
              <div className={`${inputShell} items-start`}>
                <MessageSquare size={18} className="mt-0.5 shrink-0 text-rose-gold/70" />
                <textarea
                  {...step2Form.register("message")}
                  rows={3}
                  placeholder="Tell us about your dream wedding, special requirements, or any questions..."
                  className={`${inputCls} resize-none py-1`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-gold/25 px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-blush"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-rose-gold px-6 py-3.5 text-sm font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-xs sm:flex-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Sparkles size={16} />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

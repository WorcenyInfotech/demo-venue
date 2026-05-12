"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Phone, Mail, User, Calendar, Users, MessageSquare,
  ArrowRight, ArrowLeft, CheckCircle2, Loader2, Sparkles,
} from "lucide-react";
import {
  inquiryStep1Schema,
  inquiryStep2Schema,
  type InquiryStep1Input,
  type InquiryStep2Input,
} from "@/lib/validations";
import { EVENT_TYPES, GUEST_COUNT_OPTIONS } from "@/types";
import { getMinBookingDate } from "@/utils/helpers";

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

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{
            background: "linear-gradient(135deg, #1a2e28 0%, #2a5245 100%)",
            boxShadow: "0 12px 40px rgba(42, 82, 69, 0.3)",
          }}
        >
          <CheckCircle2 size={36} className="text-[#d4af37]" />
        </motion.div>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1a2e28] mb-4">
          Thank You!
        </h3>
        <p className="text-[#64605a] mb-2 text-lg">
          Your inquiry has been submitted successfully.
        </p>
        <p className="text-[#a8a29e] text-sm mb-10">
          Our team will contact you within 24 hours to discuss your requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#e8c966] text-[#1a2e28] shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
          >
            <Phone size={16} />
            Call Us Now
          </a>
          <button
            onClick={() => {
              setIsSuccess(false);
              setStep(1);
              step1Form.reset();
              step2Form.reset();
              setStep1Data(null);
            }}
            className="px-6 py-3.5 rounded-full border-2 border-[#1a2e28] text-[#1a2e28] font-semibold text-sm hover:bg-[#1a2e28] hover:text-white transition-all duration-300"
          >
            Submit Another Inquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-400 ${
                  s === step
                    ? "text-white shadow-lg"
                    : s < step
                    ? "bg-[#d4af37] text-[#1a2e28]"
                    : "bg-gray-100 text-gray-400"
                }`}
                style={
                  s === step
                    ? { background: "linear-gradient(135deg, #1a2e28 0%, #2a5245 100%)" }
                    : undefined
                }
              >
                {s < step ? <CheckCircle2 size={18} /> : s}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${s === step ? "text-[#1a2e28]" : "text-gray-400"}`}>
                {s === 1 ? "Contact Info" : "Event Details"}
              </span>
            </div>
            {s < 2 && (
              <div
                className={`w-16 h-0.5 transition-colors duration-400 ${
                  step > 1 ? "bg-[#d4af37]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Forms */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleStep1}
            className="space-y-6"
          >
            <div>
              <label className="form-label">
                Mobile Number <span className="text-[#dc2626]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[#a8a29e] pointer-events-none">
                  <Phone size={18} />
                  <span className="text-sm border-r border-gray-200 pr-2 font-medium">+91</span>
                </div>
                <input
                  {...step1Form.register("mobile")}
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  className={`form-input pl-[5.5rem] ${step1Form.formState.errors.mobile ? "error" : ""}`}
                />
              </div>
              {step1Form.formState.errors.mobile && (
                <p className="text-[#dc2626] text-xs mt-1.5 flex items-center gap-1">
                  {step1Form.formState.errors.mobile.message}
                </p>
              )}
            </div>

            <div>
              <label className="form-label">
                Email Address <span className="text-[#dc2626]">*</span>
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a29e] pointer-events-none" />
                <input
                  {...step1Form.register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className={`form-input pl-12 ${step1Form.formState.errors.email ? "error" : ""}`}
                />
              </div>
              {step1Form.formState.errors.email && (
                <p className="text-[#dc2626] text-xs mt-1.5">{step1Form.formState.errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#e8c966] text-[#1a2e28] shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
            >
              <span>Continue</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-[#a8a29e] text-xs">
              Your information is secure and will never be shared.
            </p>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleStep2}
            className="space-y-5"
          >
            <div>
              <label className="form-label">
                Full Name <span className="text-[#dc2626]">*</span>
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a29e] pointer-events-none" />
                <input
                  {...step2Form.register("name")}
                  type="text"
                  placeholder="Your full name"
                  className={`form-input pl-12 ${step2Form.formState.errors.name ? "error" : ""}`}
                />
              </div>
              {step2Form.formState.errors.name && (
                <p className="text-[#dc2626] text-xs mt-1.5">{step2Form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Event Type <span className="text-[#dc2626]">*</span>
                </label>
                <select
                  {...step2Form.register("eventType")}
                  className={`form-input ${step2Form.formState.errors.eventType ? "error" : ""}`}
                >
                  <option value="">Select event type</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {step2Form.formState.errors.eventType && (
                  <p className="text-[#dc2626] text-xs mt-1.5">{step2Form.formState.errors.eventType.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  Expected Guests <span className="text-[#dc2626]">*</span>
                </label>
                <div className="relative">
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a29e] pointer-events-none" />
                  <select
                    {...step2Form.register("guestCount")}
                    className={`form-input pl-12 ${step2Form.formState.errors.guestCount ? "error" : ""}`}
                  >
                    <option value="">Select count</option>
                    {GUEST_COUNT_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g} guests</option>
                    ))}
                  </select>
                </div>
                {step2Form.formState.errors.guestCount && (
                  <p className="text-[#dc2626] text-xs mt-1.5">{step2Form.formState.errors.guestCount.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="form-label">
                Function Date <span className="text-[#dc2626]">*</span>
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a29e] pointer-events-none" />
                <input
                  {...step2Form.register("functionDate")}
                  type="date"
                  min={getMinBookingDate()}
                  className={`form-input pl-12 ${step2Form.formState.errors.functionDate ? "error" : ""}`}
                />
              </div>
              {step2Form.formState.errors.functionDate && (
                <p className="text-[#dc2626] text-xs mt-1.5">{step2Form.formState.errors.functionDate.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Message (Optional)</label>
              <div className="relative">
                <MessageSquare size={18} className="absolute left-4 top-4 text-[#a8a29e] pointer-events-none" />
                <textarea
                  {...step2Form.register("message")}
                  rows={3}
                  placeholder="Tell us about your dream wedding, special requirements, or any questions..."
                  className="form-input pl-12 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-200 text-[#64605a] font-semibold text-sm hover:border-[#1a2e28] hover:text-[#1a2e28] transition-all duration-300"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#e8c966] text-[#1a2e28] shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Sparkles size={16} className="group-hover:animate-pulse" />
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

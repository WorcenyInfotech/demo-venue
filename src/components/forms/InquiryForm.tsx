"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Phone, Mail, User, Calendar, Users, MessageSquare,
  ArrowRight, ArrowLeft, CheckCircle2, Loader2,
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

  // Step 1 form
  const step1Form = useForm<InquiryStep1Input>({
    resolver: zodResolver(inquiryStep1Schema),
    defaultValues: { mobile: "", email: "" },
  });

  // Step 2 form — use the merged schema so message is always string
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle2 size={36} className="text-[#c9a84c]" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#0f3d1e] mb-3">
          Inquiry Submitted!
        </h3>
        <p className="text-gray-600 mb-2">
          Thank you for your interest in Green Land Farm.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Our team will contact you within 24 hours to discuss your requirements and check availability.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:+919876543210" className="btn-primary text-sm px-6 py-3">
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
            className="px-6 py-3 rounded-lg border-2 border-[#1a5c2e] text-[#1a5c2e] font-semibold text-sm hover:bg-[#1a5c2e] hover:text-white transition-all"
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
      <div className="flex items-center justify-center gap-3 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                s === step
                  ? "bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] text-white shadow-md"
                  : s < step
                  ? "bg-[#c9a84c] text-[#0f3d1e]"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {s < step ? <CheckCircle2 size={18} /> : s}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${s === step ? "text-[#1a5c2e]" : "text-gray-400"}`}>
              {s === 1 ? "Contact Info" : "Event Details"}
            </span>
            {s < 2 && <div className={`w-12 h-0.5 ${step > 1 ? "bg-[#c9a84c]" : "bg-gray-200"} transition-colors`} />}
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
            transition={{ duration: 0.3 }}
            onSubmit={handleStep1}
            className="space-y-5"
          >
            <div>
              <label className="form-label">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-400 pointer-events-none">
                  <Phone size={16} />
                  <span className="text-sm border-r border-gray-200 pr-2">+91</span>
                </div>
                <input
                  {...step1Form.register("mobile")}
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  className={`form-input pl-20 ${step1Form.formState.errors.mobile ? "error" : ""}`}
                />
              </div>
              {step1Form.formState.errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{step1Form.formState.errors.mobile.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  {...step1Form.register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className={`form-input pl-10 ${step1Form.formState.errors.email ? "error" : ""}`}
                />
              </div>
              {step1Form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">{step1Form.formState.errors.email.message}</p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full justify-center mt-2">
              Continue
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-gray-400 text-xs">
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
            transition={{ duration: 0.3 }}
            onSubmit={handleStep2}
            className="space-y-5"
          >
            <div>
              <label className="form-label">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  {...step2Form.register("name")}
                  type="text"
                  placeholder="Your full name"
                  className={`form-input pl-10 ${step2Form.formState.errors.name ? "error" : ""}`}
                />
              </div>
              {step2Form.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1">{step2Form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Event Type <span className="text-red-500">*</span>
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
                  <p className="text-red-500 text-xs mt-1">{step2Form.formState.errors.eventType.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  Expected Guests <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    {...step2Form.register("guestCount")}
                    className={`form-input pl-10 ${step2Form.formState.errors.guestCount ? "error" : ""}`}
                  >
                    <option value="">Select count</option>
                    {GUEST_COUNT_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g} guests</option>
                    ))}
                  </select>
                </div>
                {step2Form.formState.errors.guestCount && (
                  <p className="text-red-500 text-xs mt-1">{step2Form.formState.errors.guestCount.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="form-label">
                Function Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  {...step2Form.register("functionDate")}
                  type="date"
                  min={getMinBookingDate()}
                  className={`form-input pl-10 ${step2Form.formState.errors.functionDate ? "error" : ""}`}
                />
              </div>
              {step2Form.formState.errors.functionDate && (
                <p className="text-red-500 text-xs mt-1">{step2Form.formState.errors.functionDate.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Message (Optional)</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
                <textarea
                  {...step2Form.register("message")}
                  rows={3}
                  placeholder="Tell us about your dream wedding, special requirements, or any questions..."
                  className="form-input pl-10 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-3 rounded-lg border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-[#1a5c2e] hover:text-[#1a5c2e] transition-all"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1 justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <ArrowRight size={18} />
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

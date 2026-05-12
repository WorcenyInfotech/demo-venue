"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUp, X, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/utils/constants";
import { getWhatsAppUrl } from "@/utils/helpers";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = getWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    "Hello! I'm interested in booking Green Land Farm for my wedding. Please share more details."
  );

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-3 no-print"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        right: "max(1.25rem, env(safe-area-inset-right))",
      }}
    >
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#1a2e28] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expandable action buttons */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Call button */}
            <motion.a
              href={`tel:${SITE_CONFIG.phone}`}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.1, type: "spring", damping: 20 }}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #1a2e28 0%, #2a5245 100%)",
              }}
              aria-label="Call us"
            >
              <Phone size={18} className="text-[#d4af37]" />
              <span className="text-white text-sm font-semibold">Call Now</span>
            </motion.a>

            {/* WhatsApp button */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0.05, type: "spring", damping: 20 }}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1 bg-[#25D366]"
              aria-label="WhatsApp us"
            >
              <MessageCircle size={18} className="text-white" />
              <span className="text-white text-sm font-semibold">WhatsApp</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: isExpanded
            ? "linear-gradient(135deg, #1a2e28 0%, #2a5245 100%)"
            : "linear-gradient(135deg, #d4af37 0%, #e8c966 50%, #d4af37 100%)",
          boxShadow: isExpanded
            ? "0 8px 32px rgba(42, 82, 69, 0.4)"
            : "0 8px 32px rgba(212, 175, 55, 0.5)",
        }}
        aria-label="Contact options"
      >
        {/* Pulse ring when not expanded */}
        {!isExpanded && (
          <span
            className="absolute inset-0 rounded-full animate-pulse-gold"
            style={{ boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.5)" }}
          />
        )}

        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? (
            <X size={24} className="text-white" />
          ) : (
            <div className="relative">
              <Phone size={22} className="text-[#1a2e28]" />
              <Sparkles size={10} className="absolute -top-1 -right-1 text-[#1a2e28]/60" />
            </div>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}

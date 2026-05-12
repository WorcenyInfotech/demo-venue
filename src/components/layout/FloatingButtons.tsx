"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "@/utils/constants";
import { getWhatsAppUrl } from "@/utils/helpers";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
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
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        right: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-[#2a5245] hover:bg-[#2a5245] hover:text-white hover:border-[#2a5245] transition-all duration-200"
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
              transition={{ delay: 0.05 }}
              className="flex items-center gap-2 bg-[#2a5245] text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-[#1a332b] transition-colors text-sm font-medium"
              aria-label="Call us"
            >
              <Phone size={16} />
              <span>Call Now</span>
            </motion.a>

            {/* WhatsApp button */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: 0 }}
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-[#1da851] transition-colors text-sm font-medium"
              aria-label="WhatsApp us"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c6a94c] to-[#dcc875] text-[#1a332b] shadow-[0_4px_20px_rgba(198,169,76,0.5)] flex items-center justify-center hover:shadow-[0_6px_30px_rgba(198,169,76,0.6)] transition-shadow animate-pulse-gold"
        aria-label="Contact options"
      >
        {isExpanded ? (
          <span className="text-2xl font-light">×</span>
        ) : (
          <Phone size={22} />
        )}
      </motion.button>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUp, X, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/utils/constants";
import { getWhatsAppUrl } from "@/utils/helpers";
import { VENUE_IDENTITY } from "@/data/venueData";

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
    `Hello! I'm interested in booking ${VENUE_IDENTITY.name} for my wedding. Please share more details.`
  );

  return (
    <div className="fixed z-40 flex flex-col items-end gap-3" style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))", right: "max(1.25rem, env(safe-area-inset-right))" }}>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-gold/20 bg-cream/95 text-rose-gold shadow-luxury backdrop-blur-md transition hover:border-rose-gold/40 hover:bg-blush"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.a
              href={`tel:${SITE_CONFIG.phone}`}
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.85 }}
              transition={{ delay: 0.1, type: "spring", damping: 20 }}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-gold-deep to-rose-gold px-4 py-3 text-sm font-semibold text-white shadow-glow-rose"
              aria-label="Call us"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </motion.a>

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.85 }}
              transition={{ delay: 0.05, type: "spring", damping: 20 }}
              className="flex items-center gap-2 rounded-2xl border border-rose-gold/35 bg-blush px-4 py-3 text-sm font-semibold text-ink shadow-md backdrop-blur-md"
              aria-label="WhatsApp us"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition ${
          isExpanded
            ? "bg-gradient-to-br from-rose-gold-deep to-footer"
            : "bg-gradient-to-br from-rose-gold via-rose-gold-muted to-rose-gold-deep shadow-glow-rose"
        }`}
        aria-label="Contact options"
      >
        {!isExpanded && (
          <span className="absolute inset-0 animate-ping rounded-2xl bg-rose-gold/35 opacity-40" />
        )}
        <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {isExpanded ? (
            <X size={24} />
          ) : (
            <div className="relative flex items-center justify-center">
              <Phone size={22} />
              <Sparkles size={10} className="absolute -top-1 -right-1 text-blush" />
            </div>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}

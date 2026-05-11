"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after 1.8s
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0f3d1e] via-[#1a5c2e] to-[#0f3d1e]"
        >
          {/* Decorative rings */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border-2 border-[#c9a84c]/20 border-t-[#c9a84c]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-16 h-16 rounded-full border border-[#c9a84c]/30 border-b-[#c9a84c]/60"
            />

            {/* Center logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c96a] flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.4)]"
            >
              <span className="text-[#0f3d1e] font-bold text-xl font-serif">G</span>
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h1 className="text-white font-serif text-2xl font-bold mb-1">
              Green Land Farm
            </h1>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase">
              Luxury Wedding Venue
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] rounded-full"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-white/50 text-xs"
          >
            Creating Unforgettable Memories...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

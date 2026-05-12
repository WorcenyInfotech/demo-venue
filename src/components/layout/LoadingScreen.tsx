"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f1c18 0%, #1a2e28 40%, #2a5245 100%)",
          }}
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0 mandala-pattern opacity-30" />

          {/* Animated glow circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center">
            {/* Animated rings */}
            <div className="relative flex items-center justify-center mb-10">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 rounded-full border border-[#d4af37]/20"
                style={{
                  borderTopColor: "rgba(212,175,55,0.6)",
                }}
              />

              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 rounded-full border border-[#d4af37]/15"
                style={{
                  borderBottomColor: "rgba(212,175,55,0.5)",
                }}
              />

              {/* Inner ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute w-16 h-16 rounded-full border border-[#d4af37]/10"
                style={{
                  borderTopColor: "rgba(212,175,55,0.4)",
                }}
              />

              {/* Center logo */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                className="relative w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #d4af37 0%, #e8c966 50%, #d4af37 100%)",
                  boxShadow: "0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.2)",
                }}
              >
                <span className="text-[#1a2e28] font-bold text-2xl font-serif">G</span>
              </motion.div>
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-white font-serif text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Green Land Farm
              </h1>
              <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">
                Luxury Wedding Venue
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 w-56 h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #d4af37, #e8c966, #d4af37)",
                }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
              className="mt-6 text-white/50 text-sm font-light tracking-wide"
            >
              Creating Timeless Memories...
            </motion.p>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#d4af37]/20 rounded-tl-lg" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#d4af37]/20 rounded-tr-lg" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#d4af37]/20 rounded-bl-lg" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#d4af37]/20 rounded-br-lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

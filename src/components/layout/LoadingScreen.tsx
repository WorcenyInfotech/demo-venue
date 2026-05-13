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
          className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-cream via-blush to-rose-gold/25"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(183,110,121,0.2)_0%,transparent_70%)]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative flex flex-col items-center px-6">
            <div className="relative flex h-36 w-36 items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-rose-gold/70"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-rose-gold-muted/60"
                animate={{ rotate: -360 }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-transparent border-t-rose-gold-deep/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 15 }}
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold via-rose-gold-muted to-rose-gold-deep font-display text-2xl font-bold text-white shadow-glow-rose"
              >
                <span>G</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="mt-8 text-center"
            >
              <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Green Land Farm</h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-rose-gold">Luxury Wedding Venue</p>
            </motion.div>

            <motion.div
              className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-rose-gold/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-gold via-rose-gold-muted to-rose-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.45, delay: 0.75, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ delay: 1 }}
              className="mt-6 text-sm text-ink/55"
            >
              Creating Timeless Memories...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

// ─── Configuration ────────────────────────────────────────────────────────────
// Replace these with your actual venue coordinates & Google Maps Place ID
const VENUE = {
  name: "Green Land Farm",
  address: "Near NH-48, Surat-Navsari Highway, Surat, Gujarat 395009",
  lat: 21.1702,
  lng: 72.8311,
  // Direct Google Maps search URL — no API key needed
  googleMapsUrl: "https://www.google.com/maps/search/Green+Land+Farm+Surat+Gujarat/@21.1702,72.8311,15z",
  // Directions URL
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Green+Land+Farm+Surat+Gujarat&destination_place_id=",
  // Static map image from OpenStreetMap (completely free, no key)
  staticMapUrl: `https://www.openstreetmap.org/export/embed.html?bbox=72.8111%2C21.1502%2C72.8511%2C21.1902&layer=mapnik&marker=21.1702%2C72.8311`,
};

interface MapEmbedProps {
  height?: string;
  showDirectionsButton?: boolean;
  className?: string;
}

export default function MapEmbed({
  height = "h-[420px]",
  showDirectionsButton = true,
  className = "",
}: MapEmbedProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Map container */}
      <div className={`relative ${height} rounded-2xl overflow-hidden border border-[#c9a84c]/20 shadow-xl bg-gray-100`}>
        {/* OpenStreetMap embed — completely free, no API key */}
        <iframe
          src={VENUE.staticMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title={`${VENUE.name} Location Map`}
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
        />

        {/* Overlay pin card */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#c9a84c]/20">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1a5c2e] to-[#2d8a4e] flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-[#c9a84c]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif font-bold text-[#0f3d1e] text-sm">{VENUE.name}</div>
                <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{VENUE.address}</div>
              </div>
            </div>

            {showDirectionsButton && (
              <a
                href={VENUE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-[#1a5c2e] to-[#2d8a4e] text-white text-xs font-semibold hover:shadow-md transition-shadow"
              >
                <Navigation size={13} />
                Open in Google Maps
                <ExternalLink size={11} className="opacity-70" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Standalone "Get Directions" button ───────────────────────────────────────
export function GetDirectionsButton({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#1a5c2e] to-[#2d8a4e] text-white hover:shadow-[0_4px_20px_rgba(26,92,46,0.4)] hover:-translate-y-0.5",
    outline:
      "border-2 border-[#1a5c2e] text-[#1a5c2e] hover:bg-[#1a5c2e] hover:text-white",
    ghost:
      "text-[#1a5c2e] hover:text-[#c9a84c] underline-offset-2 hover:underline",
  };

  return (
    <motion.a
      href={VENUE.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center font-semibold rounded-xl transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <Navigation size={size === "sm" ? 13 : size === "lg" ? 18 : 15} />
      Get Directions
      <ExternalLink size={size === "sm" ? 11 : 13} className="opacity-60" />
    </motion.a>
  );
}

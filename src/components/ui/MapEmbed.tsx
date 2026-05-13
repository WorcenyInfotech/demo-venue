"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

const VENUE = {
  name: "Green Land Farm",
  address: "Near NH-48, Surat-Navsari Highway, Surat, Gujarat 395009",
  lat: 21.1702,
  lng: 72.8311,
  googleMapsUrl: "https://www.google.com/maps/search/Green+Land+Farm+Surat+Gujarat/@21.1702,72.8311,15z",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Green+Land+Farm+Surat+Gujarat&destination_place_id=",
  staticMapUrl: `https://www.openstreetmap.org/export/embed.html?bbox=72.8111%2C21.1502%2C72.8511%2C21.1902&layer=mapnik&marker=21.1702%2C72.8311`,
};

interface MapEmbedProps {
  height?: string;
  showDirectionsButton?: boolean;
}

export default function MapEmbed({
  height = "h-[400px]",
  showDirectionsButton = true,
}: MapEmbedProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-rose-gold/15 bg-white shadow-luxury">
      <div className={`relative w-full overflow-hidden ${height}`}>
        <iframe
          src={VENUE.staticMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title={`${VENUE.name} Location Map`}
          sandbox="allow-scripts allow-same-origin"
          className="absolute inset-0 h-full w-full grayscale-[15%] contrast-[1.02]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/40 via-transparent to-blush/20" />

        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-sm">
          <div className="rounded-2xl border border-white/40 bg-cream/95 p-4 shadow-luxury backdrop-blur-xl">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blush text-rose-gold">
                <MapPin size={16} />
              </div>
              <div className="min-w-0">
                <div className="font-display text-sm font-semibold text-ink">{VENUE.name}</div>
                <div className="mt-0.5 text-xs leading-relaxed text-ink/70">{VENUE.address}</div>
              </div>
            </div>

            {showDirectionsButton && (
              <a
                href={VENUE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-gold py-2.5 text-xs font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep"
              >
                <Navigation size={13} />
                Open in Google Maps
                <ExternalLink size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GetDirectionsButton({
  size = "md",
}: {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  const pad =
    size === "sm" ? "px-4 py-2 text-xs" : size === "lg" ? "px-7 py-3.5 text-sm" : "px-5 py-2.5 text-sm";
  return (
    <motion.a
      href={VENUE.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-gold font-semibold text-white shadow-glow-rose transition hover:bg-rose-gold-deep ${pad}`}
    >
      <Navigation size={size === "sm" ? 13 : size === "lg" ? 18 : 15} />
      Get Directions
      <ExternalLink size={size === "sm" ? 11 : 13} />
    </motion.a>
  );
}

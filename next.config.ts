import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // Image Optimization
  // ============================================
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ============================================
  // Performance
  // ============================================
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@hookform/resolvers",
    ],
  },

  // ============================================
  // Compression
  // ============================================
  compress: true,

  // ============================================
  // Security Headers
  // ============================================
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  // ============================================
  // Redirects
  // ============================================
  async redirects() {
    return [
      // Redirect www to non-www (configure in Vercel too)
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/inquiry",
        destination: "/contact#inquiry",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/contact#inquiry",
        permanent: true,
      },
    ];
  },

  // ============================================
  // Turbopack root fix
  // ============================================
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

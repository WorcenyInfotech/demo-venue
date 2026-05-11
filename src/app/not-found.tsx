import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Green Land Farm",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f3d1e] to-[#1a5c2e] flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        {/* Logo */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c96a] flex items-center justify-center mx-auto mb-8 shadow-xl">
          <span className="text-[#0f3d1e] font-bold text-3xl font-serif">G</span>
        </div>

        {/* 404 */}
        <div
          className="text-8xl font-serif font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>

        <h1 className="text-white font-serif text-2xl font-bold mb-3">
          Page Not Found
        </h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#0f3d1e] font-semibold hover:shadow-lg transition-shadow"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-white/50">
          {[
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Gallery", href: "/gallery" },
            { label: "Packages", href: "/packages" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#c9a84c] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

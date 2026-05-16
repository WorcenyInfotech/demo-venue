import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | Ramayan Farm",
    template: "%s | Admin — Ramayan Farm",
  },
  description: "Ramayan Farm Admin Panel",
  robots: { index: false, follow: false },
};

/**
 * Admin layout — no Navbar/Footer, isolated from public site
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-blush/25 to-cream text-ink antialiased">
      {children}
    </div>
  );
}

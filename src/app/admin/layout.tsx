import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | Green Land Farm",
    template: "%s | Admin — Green Land Farm",
  },
  description: "Green Land Farm Admin Panel",
  robots: { index: false, follow: false },
};

/**
 * Admin layout — no Navbar/Footer, isolated from public site
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

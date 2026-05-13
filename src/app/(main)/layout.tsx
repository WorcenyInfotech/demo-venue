import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import LoadingScreen from "@/components/layout/LoadingScreen";

/**
 * Public-facing pages layout
 * Wraps all main website pages with Navbar, Footer, and floating elements
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="min-h-screen bg-cream text-ink">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

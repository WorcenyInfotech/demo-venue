import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import InquiryForm from "@/components/forms/InquiryForm";
import ContactForm from "@/components/forms/ContactForm";
import MapEmbed, { GetDirectionsButton } from "@/components/ui/MapEmbed";
import { SITE_CONFIG } from "@/utils/constants";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Calendar,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Green Land Farm - Book Wedding Venue Surat",
  description:
    "Contact Green Land Farm to book Surat's most luxurious wedding venue. Call +91 98765 43210, email us, or fill out our inquiry form. Free site visits available.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Green Land Farm | Book Wedding Venue Surat",
    description:
      "Get in touch to book your dream wedding at Green Land Farm, Surat. Call, WhatsApp, or fill our inquiry form.",
    url: "/contact",
  },
};

const CONTACT_DETAILS = [
  {
    icon: Phone,
    title: "Call Us",
    lines: [SITE_CONFIG.phone, SITE_CONFIG.phone2],
    action: { label: "Call Now", href: `tel:${SITE_CONFIG.phone}` },
    gradient: "from-rose-gold to-rose-gold-deep",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+91 98765 43210", "Available 9AM – 9PM"],
    action: {
      label: "Chat Now",
      href: `https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello! I'm interested in booking Green Land Farm.`,
    },
    gradient: "from-rose-gold-muted to-rose-gold",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [SITE_CONFIG.email, SITE_CONFIG.email2],
    action: { label: "Send Email", href: `mailto:${SITE_CONFIG.email}` },
    gradient: "from-blush to-rose-gold-muted",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Near NH-48, Surat-Navsari Highway", "Surat, Gujarat - 395009"],
    action: {
      label: "Get Directions",
      href: "https://maps.google.com/?q=Green+Land+Farm+Surat",
    },
    gradient: "from-rose-gold-deep to-footer",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        titleHighlight="Us"
        subtitle="We'd love to hear from you. Reach out to plan your perfect wedding at Green Land Farm."
        image="https://images.unsplash.com/photo-1583878545126-2f1ca0142714?w=1920&q=80"
        breadcrumbs={[{ label: "Contact" }]}
        badge="Get In Touch"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/30 to-cream py-16 md:py-20">
        <div className="pointer-events-none absolute top-10 right-10 h-48 w-48 rounded-full bg-rose-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_DETAILS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-rose-gold/12 bg-white/95 p-6 shadow-luxury backdrop-blur-md transition hover:-translate-y-1 hover:border-rose-gold/25 hover:shadow-luxury-hover"
                >
                  <div
                    className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${item.gradient} p-3.5 text-white shadow-md`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="mt-1 text-sm text-ink/70">
                      {line}
                    </p>
                  ))}
                  <a
                    href={item.action.href}
                    target={item.action.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-gold transition hover:gap-3 hover:text-rose-gold-deep"
                  >
                    <ExternalLink size={13} />
                    {item.action.label}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="inquiry" className="relative bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-2xl border border-rose-gold/15 bg-white/95 p-8 shadow-luxury backdrop-blur-md md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-gold/20 bg-blush/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-rose-gold-deep">
                <Calendar size={14} />
                <span>Book Your Date</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">Send an Inquiry</h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-rose-gold to-blush" />
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Fill out our 2-step inquiry form and our team will get back to you within 24 hours with availability and
                package details.
              </p>
              <div className="mt-8">
                <InquiryForm />
              </div>
            </div>

            <div className="rounded-2xl border border-rose-gold/15 bg-white/95 p-8 shadow-luxury backdrop-blur-md md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-gold/20 bg-blush/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-rose-gold-deep">
                <MessageCircle size={14} />
                <span>General Enquiry</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">Send a Message</h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-rose-gold to-blush" />
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Have a general question? Send us a message and we&apos;ll respond promptly.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>

              <div className="mt-10 rounded-2xl border border-rose-gold/15 bg-blush/40 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Clock size={18} className="text-rose-gold" />
                  <span>Working Hours</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-ink/75">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-rose-gold">Mon – Fri</div>
                    <span>9:00 AM – 9:00 PM</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-rose-gold">Sat – Sun</div>
                    <span>8:00 AM – 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-blush/25 to-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Location"
            title="Find Us on"
            titleHighlight="the Map"
            subtitle="Easily accessible from Surat city center and neighboring areas."
          />
          <MapEmbed height="h-[450px]" showDirectionsButton />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GetDirectionsButton variant="primary" size="md" />
            <a
              href="https://www.google.com/maps/search/Green+Land+Farm+Surat+Gujarat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-rose-gold/25 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-rose-gold/45 hover:bg-blush/50"
            >
              <MapPin size={15} className="text-rose-gold" />
              View on Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import InquiryForm from "@/components/forms/InquiryForm";
import ContactForm from "@/components/forms/ContactForm";
import MapEmbed, { GetDirectionsButton } from "@/components/ui/MapEmbed";
import { SITE_CONFIG } from "@/utils/constants";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Calendar, ExternalLink,
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
    color: "from-[#2a5245] to-[#4d8b73]",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+91 98765 43210", "Available 9AM – 9PM"],
    action: {
      label: "Chat Now",
      href: `https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello! I'm interested in booking Green Land Farm.`,
    },
    color: "from-[#25D366] to-[#1da851]",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [SITE_CONFIG.email, SITE_CONFIG.email2],
    action: { label: "Send Email", href: `mailto:${SITE_CONFIG.email}` },
    color: "from-[#c6a94c] to-[#8b6914]",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Near NH-48, Surat-Navsari Highway", "Surat, Gujarat - 395009"],
    action: {
      label: "Get Directions",
      href: "https://maps.google.com/?q=Green+Land+Farm+Surat",
    },
    color: "from-[#1a332b] to-[#2a5245]",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        titleHighlight="Us"
        subtitle="We'd love to hear from you. Reach out to plan your perfect wedding at Green Land Farm."
        image="https://images.unsplash.com/photo-1529636798458-92182e662485?w=1920&q=80"
        breadcrumbs={[{ label: "Contact" }]}
        badge="Get In Touch"
      />

      {/* Contact cards */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_DETAILS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#c6a94c]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-[#1a332b] text-lg mb-2">{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-gray-600 text-sm">{line}</p>
                  ))}
                  <a
                    href={item.action.href}
                    target={item.action.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-[#2a5245] hover:text-[#c6a94c] transition-colors"
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

      {/* Main content: Inquiry + Contact forms */}
      <section id="inquiry" className="section-padding bg-[#f7f3ec]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Inquiry Form */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c6a94c]/10 border border-[#c6a94c]/30 mb-5">
                <Calendar size={14} className="text-[#c6a94c]" />
                <span className="text-[#c6a94c] text-xs font-semibold tracking-widest uppercase">Book Your Date</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a332b] mb-2">
                Send an Inquiry
              </h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#c6a94c] to-[#dcc875] rounded-full mb-4" />
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Fill out our 2-step inquiry form and our team will get back to you within 24 hours with availability and package details.
              </p>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#c6a94c]/15">
                <InquiryForm />
              </div>
            </div>

            {/* Contact Form + Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a5245]/10 border border-[#2a5245]/20 mb-5">
                <MessageCircle size={14} className="text-[#2a5245]" />
                <span className="text-[#2a5245] text-xs font-semibold tracking-widest uppercase">General Enquiry</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a332b] mb-2">
                Send a Message
              </h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#2a5245] to-[#4d8b73] rounded-full mb-4" />
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Have a general question? Send us a message and we&apos;ll respond promptly.
              </p>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <ContactForm />
              </div>

              {/* Working hours */}
              <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-[#1a332b] to-[#2a5245] text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={18} className="text-[#c6a94c]" />
                  <span className="font-semibold">Working Hours</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
                  <span>Monday – Friday</span>
                  <span className="text-white">9:00 AM – 9:00 PM</span>
                  <span>Saturday – Sunday</span>
                  <span className="text-white">8:00 AM – 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Location"
            title="Find Us on"
            titleHighlight="the Map"
            subtitle="Easily accessible from Surat city center and neighboring areas."
          />
          <MapEmbed height="h-[450px]" showDirectionsButton />
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <GetDirectionsButton variant="primary" size="md" />
            <a
              href="https://www.google.com/maps/search/Green+Land+Farm+Surat+Gujarat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#2a5245] text-[#2a5245] font-semibold text-sm hover:bg-[#2a5245] hover:text-white transition-all"
            >
              <MapPin size={15} />
              View on Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

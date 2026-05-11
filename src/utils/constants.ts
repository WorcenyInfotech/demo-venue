/**
 * Site-wide Constants & Static Data
 */

import type { NavLink, Service, WeddingPackage, FAQ } from "@/types";

// ============================================
// Site Info
// ============================================
export const SITE_CONFIG = {
  name: "Green Land Farm",
  tagline: "Luxury Wedding Venue in Surat",
  description:
    "Create unforgettable wedding memories at Green Land Farm — Surat's premier luxury wedding venue & event farm.",
  phone: "+91 98765 43210",
  phone2: "+91 87654 32109",
  email: "info@greenlandfarm.in",
  email2: "bookings@greenlandfarm.in",
  address: "Green Land Farm, Near NH-48, Surat-Navsari Highway, Surat, Gujarat - 395009",
  city: "Surat",
  state: "Gujarat",
  country: "India",
  pincode: "395009",
  whatsapp: "919876543210",
  mapUrl: "https://www.google.com/maps/search/Green+Land+Farm+Surat+Gujarat/@21.1702,72.8311,15z",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Green+Land+Farm+Surat+Gujarat",
  socialLinks: {
    instagram: "https://instagram.com/greenlandfarm",
    facebook: "https://facebook.com/greenlandfarm",
    youtube: "https://youtube.com/@greenlandfarm",
    twitter: "https://twitter.com/greenlandfarm",
  },
  workingHours: "Open Daily: 9:00 AM – 9:00 PM",
};

// ============================================
// Navigation Links
// ============================================
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

// ============================================
// Venue Highlights / Stats
// ============================================
export const VENUE_STATS = [
  { value: 500, suffix: "+", label: "Weddings Hosted" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 1000, suffix: "+", label: "Guest Capacity" },
  { value: 5, suffix: " Acres", label: "Lush Green Land" },
];

// ============================================
// Services
// ============================================
export const SERVICES: Service[] = [
  {
    id: "wedding",
    title: "Grand Wedding Ceremony",
    description:
      "Experience a royal wedding ceremony amidst lush green surroundings with our premium mandap setups, floral decorations, and world-class hospitality.",
    icon: "Heart",
    features: [
      "Customized Mandap Decoration",
      "Floral Arrangements",
      "Lighting & Sound",
      "Catering Services",
      "Photography Support",
    ],
  },
  {
    id: "reception",
    title: "Elegant Reception",
    description:
      "Host a memorable reception party with our stunning banquet halls, outdoor lawns, and premium amenities for up to 1000+ guests.",
    icon: "Star",
    features: [
      "Indoor & Outdoor Options",
      "Premium Catering",
      "DJ & Entertainment",
      "Valet Parking",
      "Bridal Suite",
    ],
  },
  {
    id: "engagement",
    title: "Romantic Engagement",
    description:
      "Begin your forever journey with an intimate and romantic engagement ceremony at our beautifully decorated venue.",
    icon: "Gem",
    features: [
      "Intimate Setup",
      "Floral Decor",
      "Photography",
      "Catering",
      "Personalized Experience",
    ],
  },
  {
    id: "sangeet",
    title: "Vibrant Sangeet Night",
    description:
      "Celebrate the joy of music and dance with a spectacular Sangeet night featuring professional sound systems and dance floors.",
    icon: "Music",
    features: [
      "Professional Sound System",
      "Dance Floor",
      "Stage Setup",
      "Lighting Effects",
      "Live Music Options",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Events",
    description:
      "Host professional corporate events, conferences, and team celebrations in our premium event spaces.",
    icon: "Briefcase",
    features: [
      "Conference Facilities",
      "AV Equipment",
      "Catering",
      "Parking",
      "Wi-Fi",
    ],
  },
  {
    id: "destination",
    title: "Destination Wedding",
    description:
      "Make your wedding a destination experience with our sprawling 5-acre farm, luxury accommodations, and complete event management.",
    icon: "MapPin",
    features: [
      "5-Acre Farm",
      "Accommodation",
      "Complete Event Management",
      "Helicopter Landing",
      "Luxury Transport",
    ],
  },
];

// ============================================
// Wedding Packages
// ============================================
export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: "silver",
    name: "Silver Elegance",
    price: "₹2,50,000",
    priceNote: "Starting price for 200 guests",
    description:
      "Perfect for intimate weddings with essential amenities and elegant décor.",
    color: "from-gray-400 to-gray-600",
    features: [
      "Venue for up to 200 guests",
      "Basic floral decoration",
      "Catering (veg menu)",
      "Sound system",
      "Basic lighting",
      "Parking for 50 cars",
      "Bridal changing room",
      "8-hour venue access",
    ],
  },
  {
    id: "gold",
    name: "Gold Royale",
    price: "₹5,00,000",
    priceNote: "Starting price for 500 guests",
    description:
      "Our most popular package with premium décor, catering, and complete event management.",
    color: "from-yellow-500 to-amber-600",
    isPopular: true,
    features: [
      "Venue for up to 500 guests",
      "Premium floral decoration",
      "Catering (veg + non-veg)",
      "Professional DJ & sound",
      "Premium lighting & effects",
      "Parking for 150 cars",
      "Bridal suite",
      "12-hour venue access",
      "Event coordinator",
      "Photography support",
      "Welcome drinks",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Grand",
    price: "₹10,00,000",
    priceNote: "Starting price for 1000 guests",
    description:
      "The ultimate luxury wedding experience with all-inclusive premium services.",
    color: "from-slate-600 to-slate-800",
    features: [
      "Venue for up to 1000+ guests",
      "Luxury floral & theme decoration",
      "Premium multi-cuisine catering",
      "Live music + DJ",
      "Cinematic lighting",
      "Valet parking",
      "Luxury bridal suite",
      "24-hour venue access",
      "Dedicated event manager",
      "Professional photography & video",
      "Welcome cocktails",
      "Fireworks display",
      "Helicopter arrival option",
      "Accommodation for 20 rooms",
    ],
  },
];

// ============================================
// FAQ
// ============================================
export const FAQS: FAQ[] = [
  {
    question: "What is the capacity of Green Land Farm?",
    answer:
      "Green Land Farm can accommodate up to 1000+ guests for large weddings and events. We have multiple spaces including indoor banquet halls and outdoor lawns that can be configured based on your requirements.",
  },
  {
    question: "Do you provide catering services?",
    answer:
      "Yes, we offer premium in-house catering services with a wide variety of vegetarian and non-vegetarian menus. Our experienced chefs specialize in Gujarati, North Indian, South Indian, and Continental cuisines.",
  },
  {
    question: "Is the venue available for destination weddings?",
    answer:
      "Absolutely! Green Land Farm is perfect for destination weddings. We have accommodation facilities and can arrange complete event management including transportation, décor, catering, and entertainment.",
  },
  {
    question: "How far in advance should I book the venue?",
    answer:
      "We recommend booking at least 6-12 months in advance, especially for peak wedding season (October to March). However, we do accommodate last-minute bookings based on availability.",
  },
  {
    question: "Do you allow outside decorators and caterers?",
    answer:
      "We have preferred vendor partnerships for the best experience, but we do allow outside decorators and caterers with prior approval. Additional charges may apply.",
  },
  {
    question: "What is the parking facility available?",
    answer:
      "We have ample parking space for 200+ vehicles. Valet parking services are available for premium packages. The venue is easily accessible from Surat city center.",
  },
  {
    question: "Can I visit the venue before booking?",
    answer:
      "Yes, we encourage site visits! You can schedule a free venue tour by calling us or filling out our inquiry form. Our team will be happy to show you around and discuss your requirements.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We require a 30% advance payment to confirm the booking, with the remaining balance due 15 days before the event. We accept all major payment methods including bank transfer, UPI, and cards.",
  },
];

// ============================================
// Gallery Categories
// ============================================
export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "reception", label: "Reception" },
  { id: "engagement", label: "Engagement" },
  { id: "decoration", label: "Decoration" },
  { id: "venue", label: "Venue" },
];

// ============================================
// Placeholder Images (Unsplash)
// ============================================
export const PLACEHOLDER_IMAGES = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  hero2: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=80",
  hero3: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  venue1: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
  venue2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",
    "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
  ],
};

// ============================================
// Default Testimonials
// ============================================
export const DEFAULT_TESTIMONIALS = [
  {
    name: "Priya & Rahul Sharma",
    eventType: "Wedding Ceremony",
    rating: 5,
    review:
      "Green Land Farm made our wedding day absolutely magical! The venue is breathtakingly beautiful, the staff is incredibly professional, and every detail was perfect. Our guests are still talking about how stunning everything was. Highly recommend!",
  },
  {
    name: "Anita & Vikram Patel",
    eventType: "Reception",
    rating: 5,
    review:
      "We hosted our reception at Green Land Farm and it exceeded all our expectations. The lush green surroundings, the elegant décor, and the exceptional catering made it an unforgettable evening. Thank you for making our special day perfect!",
  },
  {
    name: "Meera & Arjun Desai",
    eventType: "Engagement",
    rating: 5,
    review:
      "The most beautiful venue in Surat! Our engagement ceremony was intimate, romantic, and exactly what we dreamed of. The team was so helpful and accommodating. We're already planning to book for our wedding!",
  },
  {
    name: "Kavya & Rohan Mehta",
    eventType: "Destination Wedding",
    rating: 5,
    review:
      "We chose Green Land Farm for our destination wedding and it was the best decision we made. The 5-acre farm is stunning, the accommodation was luxurious, and the entire event management team was exceptional. A truly royal experience!",
  },
];

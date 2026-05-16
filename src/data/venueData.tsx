/**
 * ============================================================
 *  VENUE DATA — Single Source of Truth
 * ============================================================
 *  To switch this website to a different venue, update ONLY
 *  this file. Every page, component, and schema pulls from here.
 *
 *  Sections:
 *   1. Venue Identity
 *   2. Contact & Location
 *   3. Map & Coordinates
 *   4. Social Media
 *   5. Working Hours
 *   6. Hero / Slider Images
 *   7. Page Hero Images
 *   8. Service Images
 *   9. Gallery Images
 *  10. Video URLs
 *  11. Venue Stats
 *  12. Services
 *  13. Wedding Packages
 *  14. FAQs
 *  15. Default Testimonials
 *  16. Gallery Categories
 * ============================================================
 */

// ============================================================
// 1. VENUE IDENTITY
// ============================================================
export const VENUE_IDENTITY = {
  /** Full display name of the venue */
  name: "Ramayan Farm",

  /** Short tagline shown in browser tab / meta */
  tagline: "Luxury Wedding Venue in Surat",

  /** Meta description used for SEO */
  description:
    "Create unforgettable wedding memories at Ramayan Farm — Surat's premier luxury wedding venue & event farm.",

  /** Slogan shown on hero / about sections */
  slogan: "Create Unforgettable Wedding Memories",

  /** Alternate names used in structured data / SEO */
  alternateNames: [
    "Ramayan Farm Surat",
    "Ramayan Wedding Farm",
    "RF Wedding Venue",
  ],

  /** Year the venue was established */
  foundingYear: "2009",

  /** Total land area (used in stats / descriptions) */
  landArea: "5 Acres",

  /** Maximum guest capacity */
  maxCapacity: 1000,

  /** Number of accommodation rooms */
  accommodationRooms: 20,

  /** Price range indicator for structured data */
  priceRange: "₹₹₹",

  /** Production website URL */
  siteUrl: "https://ramayanfarm.in",
};

// ============================================================
// 2. CONTACT & LOCATION
// ============================================================
export const VENUE_CONTACT = {
  /** Primary phone number (display format) */
  phone: "+91 98247 73000",

  /** Secondary / alternate phone number */
  phone2: "+91 98247 73000",

  /** Primary email for general inquiries */
  email: "info@ramayanfarm.in",

  /** Email for booking requests */
  emailBookings: "bookings@ramayanfarm.in",

  /**
   * WhatsApp number — country code + number, NO spaces, NO "+"
   * Used to build: https://wa.me/{whatsapp}
   */
  whatsapp: "919824773000",

  /** Full address string (used in footer, contact page, schema) */
  address: "Ramayan Farm, Puna-Valthan Canal Road,Near Nayra Petrol pump, Kosmada Gam, Surat.",

  /** Street / locality portion of the address */
  street: "Puna-Valthan Canal Road,Near Nayra Petrol pump, Kosmada Gam, Surat.",

  /** City */
  city: "Surat",

  /** State */
  state: "Gujarat",

  /** Country */
  country: "India",

  /** ISO country code (used in schema) */
  countryCode: "IN",

  /** Postal / PIN code */
  pincode: "395009",
};

// ============================================================
// 3. MAP & COORDINATES
// ============================================================
export const VENUE_MAP = {
  /** Decimal latitude of the venue */
  lat: 21.1702,

  /** Decimal longitude of the venue */
  lng: 72.8311,

  /**
   * Google Maps search URL — opens the venue pin in Google Maps.
   * Replace the name and coordinates to match the new venue.
   */
  googleMapsUrl:
    "https://www.google.com/maps/place/Ramayan+Farm/@21.2142452,72.9262899,812m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3be045963e01d895:0xcd11bdb8f0b8a9be!8m2!3d21.2142452!4d72.9262899!16s%2Fg%2F11khvhjvsh!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",

  /**
   * Google Maps directions URL — used on "Get Directions" buttons.
   */
  directionsUrl:
    "https://maps.app.goo.gl/nQySLH8WL35Ab3oDA",

  /**
   * OpenStreetMap embed URL — used inside the <iframe> on the map component.
   * bbox format: west,south,east,north  (lng-0.02, lat-0.02, lng+0.02, lat+0.02)
   * marker format: lat,lng
   */
  openStreetMapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=72.8111%2C21.1502%2C72.8511%2C21.1902&layer=mapnik&marker=21.1702%2C72.8311",

  /**
   * Simple Google Maps search link (used on contact page card)
   */
  googleMapsSimpleUrl:
    "https://www.google.com/maps/search/Ramayan+Farm+Surat+Gujarat",

  /**
   * Google Maps query string for schema hasMap field
   */
  googleMapsSchemaUrl: "https://maps.google.com/?q=Ramayan+Farm+Surat",
};

// ============================================================
// 4. SOCIAL MEDIA
// ============================================================
export const VENUE_SOCIAL = {
  /** Instagram profile URL */
  instagram: "https://instagram.com/ramayanfarm",

  /** Facebook page URL */
  facebook: "https://facebook.com/ramayanfarm",

  /** YouTube channel URL */
  youtube: "https://youtube.com/@ramayanfarm",

  /** Twitter / X profile URL */
  twitter: "https://twitter.com/ramayanfarm",
};

// ============================================================
// 5. WORKING HOURS
// ============================================================
export const VENUE_HOURS = {
  /** Display string shown in footer / contact page */
  display: "Open Daily: 9:00 AM – 9:00 PM",

  /** 24-hour opening time (used in schema) */
  opens: "09:00",

  /** 24-hour closing time (used in schema) */
  closes: "21:00",

  /** Days open (used in schema) */
  daysOpen: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

// ============================================================
// 6. HERO / SLIDER IMAGES  (1920 × 1080, high quality)
// ============================================================
/**
 * These three images rotate in the homepage hero slider.
 * Replace with your own Cloudinary / CDN URLs for the new venue.
 */
export const HERO_IMAGES = {
  slide1: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-3_dlhccq.webp",
  slide2: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-7_mfke4e.webp",
  slide3: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-1_z9hcqq.webp",
};

// ============================================================
// 7. PAGE HERO IMAGES  (1920px wide, used at top of each page)
// ============================================================
export const PAGE_HERO_IMAGES = {
  /** /about page hero */
  about: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-4_nwirfw.jpg",

  /** /contact page hero */
  contact: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-5_jatmp4.webp",

  /** /gallery page hero */
  gallery: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-5_jatmp4.webp",

  /** /services page hero */
  services: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-4_nwirfw.jpg",

  /** /packages page hero */
  packages: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-5_jatmp4.webp",
};

// ============================================================
// 8. SERVICE IMAGES  (800px wide, one per service card)
// ============================================================
export const SERVICE_IMAGES = {
  /** Grand Wedding Ceremony */
  wedding: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-3_hz460v.jpg",

  /** Elegant Reception */
  reception: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-4_nwirfw.jpg",

  /** Romantic Engagement */
  engagement: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-1_z9hcqq.webp",

  /** Vibrant Sangeet Night */
  sangeet: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-5_jatmp4.webp",

  /** Corporate Events */
  corporate: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-6_qsrcvo.webp",

  /** Destination Wedding */
  destination: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-7_mfke4e.webp",

  /** About section feature image */
  about: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-4_nwirfw.jpg",

  /** Venue overview image 1 */
  venue1: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-3_dlhccq.webp",

  /** Venue overview image 2 */
  venue2: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-2_p3om9d.webp",
};

// ============================================================
// 9. GALLERY IMAGES
// ============================================================

/**
 * Full-size gallery images (800px) — shown in the gallery grid.
 * Each entry: { src, title, category }
 * Categories must match GALLERY_CATEGORIES ids below.
 */
export const GALLERY_IMAGES = [
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-3_hz460v.jpg",
    title: "Grand Wedding Ceremony",
    category: "wedding",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-4_nwirfw.jpg",
    title: "Elegant Reception Hall",
    category: "reception",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-1_z9hcqq.webp",
    title: "Romantic Engagement",
    category: "engagement",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-5_jatmp4.webp",
    title: "Sangeet Night",
    category: "wedding",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-3_dlhccq.webp",
    title: "Outdoor Lawn Setup",
    category: "venue",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-2_p3om9d.webp",
    title: "Floral Decoration",
    category: "decoration",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-6_qsrcvo.webp",
    title: "Bridal Portrait",
    category: "wedding",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-7_mfke4e.webp",
    title: "Venue Overview",
    category: "venue",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-3_hz460v.jpg",
    title: "Wedding Mandap",
    category: "decoration",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-4_nwirfw.jpg",
    title: "Reception Dinner",
    category: "reception",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-1_z9hcqq.webp",
    title: "Ring Ceremony",
    category: "engagement",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-5_jatmp4.webp",
    title: "Dance Floor",
    category: "reception",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-3_dlhccq.webp",
    title: "Garden Ceremony",
    category: "venue",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-2_p3om9d.webp",
    title: "Stage Decoration",
    category: "decoration",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-6_qsrcvo.webp",
    title: "Couple Portrait",
    category: "wedding",
  },
  {
    src: "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-7_mfke4e.webp",
    title: "Aerial View",
    category: "venue",
  },
];

/**
 * Thumbnail images (600px) — used in homepage gallery slider preview strip.
 */
export const GALLERY_THUMBNAILS = [
  "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-3_hz460v.jpg",
  "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778936169/n-4_nwirfw.jpg",
  "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-2_p3om9d.webp",
  "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-5_jatmp4.webp",
  "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-6_qsrcvo.webp",
  "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933695/r-7_mfke4e.webp",
  "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-1_z9hcqq.webp",
  "https://res.cloudinary.com/durfyiqpt/image/upload/q_auto/f_auto/v1778933694/r-3_dlhccq.webp",
];

// ============================================================
// 10. VIDEO URLs
// ============================================================
/**
 * Replace these with actual YouTube embed URLs or Cloudinary video URLs
 * for the new venue.
 * YouTube embed format: https://www.youtube.com/embed/{VIDEO_ID}
 */
export const VENUE_VIDEOS = {
  /**
   * YouTube channel link — used as fallback / "Watch More" button
   */
  youtubeChannel: "https://www.youtube.com/@Ramayan_Farm",

  /**
   * Highlight / promo video embed URL (YouTube or Cloudinary)
   * Example: "https://www.youtube.com/embed/dQw4w9WgXcQ"
   * Leave empty string "" if no video is available yet.
   */
  promoVideo: "https://youtu.be/h-ca7ZGSnoU?si=pb-NXp8eWET2Z1cA",

  /**
   * Wedding highlight reel embed URL
   */
  weddingHighlight: "",

  /**
   * Venue tour video embed URL
   */
  venueTour: "",
};

// ============================================================
// 11. VENUE STATS  (shown as animated counters on homepage)
// ============================================================
export const VENUE_STATS = [
  { value: 500, suffix: "+", label: "Weddings Hosted" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 1000, suffix: "+", label: "Guest Capacity" },
  { value: 5, suffix: " Acres", label: "Lush Ramayan" },
];

// ============================================================
// 12. SERVICES
// ============================================================
export const SERVICES = [
  {
    id: "wedding",
    title: "Grand Wedding Ceremony",
    description:
      "Experience a royal wedding ceremony amidst lush green surroundings with our premium mandap setups, floral decorations, and world-class hospitality.",
    icon: "Heart",
    image: SERVICE_IMAGES.wedding,
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
    image: SERVICE_IMAGES.reception,
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
    image: SERVICE_IMAGES.engagement,
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
    image: SERVICE_IMAGES.sangeet,
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
    image: SERVICE_IMAGES.corporate,
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
    image: SERVICE_IMAGES.destination,
    features: [
      "5-Acre Farm",
      "Accommodation",
      "Complete Event Management",
      "Helicopter Landing",
      "Luxury Transport",
    ],
  },
];

// ============================================================
// 13. WEDDING PACKAGES
// ============================================================
export const WEDDING_PACKAGES = [
  {
    id: "silver",
    name: "Silver Elegance",
    price: "₹2,50,000",
    priceNote: "Starting price for 200 guests",
    description:
      "Perfect for intimate weddings with essential amenities and elegant décor.",
    color: "from-gray-400 to-gray-600",
    isPopular: false,
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
    isPopular: false,
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

// ============================================================
// 14. FAQs
// ============================================================
export const FAQS = [
  {
    question: `What is the capacity of ${VENUE_IDENTITY.name}?`,
    answer:
      `${VENUE_IDENTITY.name} can accommodate up to 1000+ guests for large weddings and events. We have multiple spaces including indoor banquet halls and outdoor lawns that can be configured based on your requirements.`,
  },
  {
    question: "Do you provide catering services?",
    answer:
      "Yes, we offer premium in-house catering services with a wide variety of vegetarian and non-vegetarian menus. Our experienced chefs specialize in Gujarati, North Indian, South Indian, and Continental cuisines.",
  },
  {
    question: "Is the venue available for destination weddings?",
    answer:
      `Absolutely! ${VENUE_IDENTITY.name} is perfect for destination weddings. We have accommodation facilities and can arrange complete event management including transportation, décor, catering, and entertainment.`,
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
      `We have ample parking space for 200+ vehicles. Valet parking services are available for premium packages. The venue is easily accessible from ${VENUE_CONTACT.city} city center.`,
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

// ============================================================
// 15. DEFAULT TESTIMONIALS
// ============================================================
export const DEFAULT_TESTIMONIALS = [
  {
    name: "Priya & Rahul Sharma",
    eventType: "Wedding Ceremony",
    rating: 5,
    review:
      `${VENUE_IDENTITY.name} made our wedding day absolutely magical! The venue is breathtakingly beautiful, the staff is incredibly professional, and every detail was perfect. Our guests are still talking about how stunning everything was. Highly recommend!`,
  },
  {
    name: "Anita & Vikram Patel",
    eventType: "Reception",
    rating: 5,
    review:
      `We hosted our reception at ${VENUE_IDENTITY.name} and it exceeded all our expectations. The lush green surroundings, the elegant décor, and the exceptional catering made it an unforgettable evening. Thank you for making our special day perfect!`,
  },
  {
    name: "Meera & Arjun Desai",
    eventType: "Engagement",
    rating: 5,
    review:
      `The most beautiful venue in ${VENUE_CONTACT.city}! Our engagement ceremony was intimate, romantic, and exactly what we dreamed of. The team was so helpful and accommodating. We're already planning to book for our wedding!`,
  },
  {
    name: "Kavya & Rohan Mehta",
    eventType: "Destination Wedding",
    rating: 5,
    review:
      `We chose ${VENUE_IDENTITY.name} for our destination wedding and it was the best decision we made. The ${VENUE_IDENTITY.landArea} farm is stunning, the accommodation was luxurious, and the entire event management team was exceptional. A truly royal experience!`,
  },
];

// ============================================================
// 16. GALLERY CATEGORIES
// ============================================================
export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "reception", label: "Reception" },
  { id: "engagement", label: "Engagement" },
  { id: "decoration", label: "Decoration" },
  { id: "venue", label: "Venue" },
];

// ============================================================
// CONVENIENCE RE-EXPORTS
// ============================================================
/**
 * A flat object combining the most-used fields for quick access
 * in components that only need basic venue info.
 */
export const VENUE = {
  name: VENUE_IDENTITY.name,
  tagline: VENUE_IDENTITY.tagline,
  address: VENUE_CONTACT.address,
  phone: VENUE_CONTACT.phone,
  phone2: VENUE_CONTACT.phone2,
  email: VENUE_CONTACT.email,
  emailBookings: VENUE_CONTACT.emailBookings,
  whatsapp: VENUE_CONTACT.whatsapp,
  city: VENUE_CONTACT.city,
  state: VENUE_CONTACT.state,
  pincode: VENUE_CONTACT.pincode,
  lat: VENUE_MAP.lat,
  lng: VENUE_MAP.lng,
  googleMapsUrl: VENUE_MAP.googleMapsUrl,
  directionsUrl: VENUE_MAP.directionsUrl,
  openStreetMapEmbedUrl: VENUE_MAP.openStreetMapEmbedUrl,
  workingHours: VENUE_HOURS.display,
  instagram: VENUE_SOCIAL.instagram,
  facebook: VENUE_SOCIAL.facebook,
  youtube: VENUE_SOCIAL.youtube,
  twitter: VENUE_SOCIAL.twitter,
  siteUrl: VENUE_IDENTITY.siteUrl,
};

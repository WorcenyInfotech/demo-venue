# 🌿 Ramayan Farm — Luxury Wedding Venue Website

> **Surat's most prestigious wedding venue & event farm** — built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and MongoDB.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://mongodb.com)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Cloudinary Setup](#cloudinary-setup)
- [Vercel Deployment](#vercel-deployment)
- [Admin Panel](#admin-panel)
- [SEO](#seo)
- [Performance](#performance)

---

## ✨ Features

### Public Website

- 🏠 **Home Page** — Hero slider, highlights, services, gallery, testimonials, FAQ, map
- 📖 **About Page** — Story, team, timeline, values, location
- 🎯 **Services Page** — 6 wedding services with detailed descriptions
- 💎 **Packages Page** — 3 pricing tiers (Silver/Gold/Platinum) with payment terms
- 🖼️ **Gallery Page** — Filterable grid with lightbox, video section
- 📞 **Contact Page** — 2-step inquiry form + general contact form + map

### Admin Panel (`/admin`)

- 🔐 **Secure Login** — JWT authentication, HTTP-only cookies
- 📊 **Dashboard** — Live stats, recent inquiries, quick actions
- 📬 **Inquiries** — Search, filter, paginate, update status, delete, call/email/WhatsApp
- 🖼️ **Gallery Management** — Upload via Cloudinary, toggle visibility, delete
- ⭐ **Testimonials** — Add, toggle, delete with star rating
- 🎨 **Banners** — Upload hero banners, manage visibility

### SEO & Performance

- 🔍 Full JSON-LD structured data (LocalBusiness, EventVenue, FAQ, BreadcrumbList)
- 🗺️ Auto-generated sitemap.xml
- 🤖 robots.txt with AI bot blocking
- 📱 PWA manifest with shortcuts
- ⚡ Image optimization (AVIF/WebP), lazy loading
- 🔒 Security headers (CSP, X-Frame-Options, etc.)

---

## 🛠️ Tech Stack

| Category      | Technology              |
| ------------- | ----------------------- |
| Framework     | Next.js 16 (App Router) |
| Language      | TypeScript 5            |
| Styling       | Tailwind CSS 4          |
| Animations    | Framer Motion           |
| Database      | MongoDB + Mongoose      |
| Auth          | JWT + bcryptjs          |
| Images        | Cloudinary + next/image |
| Forms         | React Hook Form + Zod   |
| Icons         | Lucide React            |
| Notifications | React Hot Toast         |
| Deployment    | Vercel                  |

---

## 📁 Project Structure

```
green-land-farm/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── icon.svg               # SVG favicon
│   ├── favicon.ico            # ICO favicon
│   └── icons/                 # PWA icons (add manually)
│
├── src/
│   ├── app/
│   │   ├── (main)/            # Public website route group
│   │   │   ├── layout.tsx     # Navbar + Footer wrapper
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── packages/
│   │   │   ├── gallery/
│   │   │   ├── contact/
│   │   │   ├── privacy-policy/
│   │   │   └── terms/
│   │   │
│   │   ├── admin/             # Admin panel (no public nav)
│   │   │   ├── page.tsx       # Login
│   │   │   ├── dashboard/
│   │   │   ├── inquiries/
│   │   │   ├── gallery/
│   │   │   ├── testimonials/
│   │   │   └── banners/
│   │   │
│   │   ├── api/
│   │   │   ├── inquiry/       # POST — public inquiry
│   │   │   └── admin/
│   │   │       ├── login/
│   │   │       ├── logout/
│   │   │       ├── seed/
│   │   │       ├── stats/
│   │   │       ├── inquiries/
│   │   │       ├── gallery/
│   │   │       ├── testimonials/
│   │   │       └── banners/
│   │   │
│   │   ├── sitemap.ts         # Auto sitemap.xml
│   │   ├── robots.ts          # Auto robots.txt
│   │   ├── not-found.tsx      # 404 page
│   │   ├── error.tsx          # Global error boundary
│   │   ├── layout.tsx         # Root layout + fonts + SEO
│   │   └── globals.css        # Design system
│   │
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, FloatingButtons, LoadingScreen
│   │   ├── home/              # HeroSection, HighlightsSection, ServicesSection...
│   │   ├── admin/             # AdminSidebar, AdminHeader, StatCard, StatusBadge
│   │   ├── forms/             # InquiryForm, ContactForm
│   │   └── ui/                # SectionHeader, PageHero, GalleryGrid, AnimatedCounter
│   │
│   ├── lib/
│   │   ├── mongodb.ts         # DB connection with caching
│   │   ├── auth.ts            # JWT + bcrypt utilities
│   │   ├── cloudinary.ts      # Image upload/delete
│   │   ├── validations.ts     # Zod schemas
│   │   ├── schema.ts          # JSON-LD structured data
│   │   └── seed.ts            # Admin user seeder
│   │
│   ├── models/                # Mongoose models
│   │   ├── Inquiry.ts
│   │   ├── Admin.ts
│   │   ├── Gallery.ts
│   │   ├── Testimonial.ts
│   │   └── Banner.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useScrollPosition.ts
│   │   ├── useInView.ts
│   │   └── useCounter.ts
│   │
│   ├── types/index.ts         # TypeScript interfaces
│   ├── utils/
│   │   ├── constants.ts       # Site config, nav, services, packages, FAQs
│   │   └── helpers.ts         # Utility functions
│   │
│   └── proxy.ts               # Route protection middleware
│
├── .env.local                 # Environment variables
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind theme
└── tsconfig.json
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Cloudinary account

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

### 3. Create admin account

```bash
# Start dev server first
npm run dev

# Then in another terminal or browser:
curl -X POST http://localhost:3000/api/admin/seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔑 Environment Variables

Create `.env.local` with these values:

```env
# ─── MongoDB ───────────────────────────────────────────────
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/greenlandfarm

# ─── Authentication ────────────────────────────────────────
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://yourdomain.com

# ─── Cloudinary ────────────────────────────────────────────
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# ─── Admin Seed ────────────────────────────────────────────
ADMIN_EMAIL=admin@greenlandfarm.com
ADMIN_PASSWORD=YourSecurePassword123!

# ─── Site ──────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://greenlandfarm.in
NEXT_PUBLIC_SITE_NAME=Ramayan Farm
NEXT_PUBLIC_WHATSAPP_NUMBER=918140398723
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
```

---

## 🍃 Database Setup (MongoDB Atlas)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free cluster
2. **Database Access** → Add user with read/write permissions
3. **Network Access** → Add `0.0.0.0/0` (or Vercel IPs for production)
4. **Connect** → Copy connection string → paste in `MONGODB_URI`
5. Replace `<password>` with your actual password

### Collections created automatically:

- `inquiries` — Wedding inquiry submissions
- `admins` — Admin users
- `galleries` — Gallery images
- `testimonials` — Customer reviews
- `banners` — Hero banner images

---

## ☁️ Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier: 25GB)
2. Dashboard → Copy **Cloud Name**, **API Key**, **API Secret**
3. Paste into `.env.local`
4. Create upload presets (optional):
   - `greenlandfarm/gallery` — for gallery images
   - `greenlandfarm/banners` — for hero banners

---

## 🚀 Vercel Deployment

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Ramayan Farm website"
git remote add origin https://github.com/yourusername/green-land-farm.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Root Directory: `./` (default)

### Step 3 — Add Environment Variables

In Vercel dashboard → **Settings** → **Environment Variables**, add all variables from `.env.local`:

| Variable                            | Value                            |
| ----------------------------------- | -------------------------------- |
| `MONGODB_URI`                       | Your Atlas connection string     |
| `JWT_SECRET`                        | Strong random string (32+ chars) |
| `NEXTAUTH_SECRET`                   | Strong random string             |
| `NEXTAUTH_URL`                      | `https://yourdomain.com`         |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your cloud name                  |
| `CLOUDINARY_API_KEY`                | Your API key                     |
| `CLOUDINARY_API_SECRET`             | Your API secret                  |
| `NEXT_PUBLIC_SITE_URL`              | `https://yourdomain.com`         |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`       | `918140398723`                   |
| `ADMIN_EMAIL`                       | `admin@yourdomain.com`           |
| `ADMIN_PASSWORD`                    | Strong password                  |

### Step 4 — Deploy

Click **Deploy** — Vercel builds and deploys automatically.

### Step 5 — Custom Domain

1. Vercel → **Settings** → **Domains**
2. Add `greenlandfarm.in` and `www.greenlandfarm.in`
3. Update DNS records at your registrar:
   ```
   A     @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```

### Step 6 — Create Admin Account

After deployment:

```bash
curl -X POST https://yourdomain.com/api/admin/seed
```

Or visit: `https://yourdomain.com/api/admin/seed` in browser (POST request)

---

## 🔐 Admin Panel

**URL:** `https://yourdomain.com/admin`

> ⚠️ The admin link is **never shown** on the public website. Access it directly.

**Default credentials** (after seeding):

- Email: `admin@greenlandfarm.com`
- Password: `Admin@123456`

**Change password immediately after first login!**

### Admin Features:

| Feature      | Description                                     |
| ------------ | ----------------------------------------------- |
| Dashboard    | Live stats, recent inquiries                    |
| Inquiries    | View, search, filter, update status, delete     |
| Gallery      | Upload images via Cloudinary, toggle visibility |
| Testimonials | Add/edit/delete customer reviews                |
| Banners      | Manage hero banner images                       |

---

## 🔍 SEO

### Implemented:

- ✅ Dynamic `<title>` and `<meta description>` per page
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ JSON-LD: LocalBusiness, EventVenue, WeddingVenue, FAQPage, BreadcrumbList, WebSite
- ✅ Geo meta tags (region, placename, coordinates)
- ✅ Canonical URLs
- ✅ Auto-generated `sitemap.xml`
- ✅ `robots.txt` with AI bot blocking
- ✅ Hreflang for en-IN
- ✅ Dublin Core metadata

### Target Keywords:

- Best Wedding Farm in Surat
- Luxury Wedding Venue Surat
- Wedding Lawn Surat
- Marriage Garden Surat
- Destination Wedding Farm Surat
- Engagement Venue Surat
- Reception Venue Surat

### Submit to Google:

1. [Google Search Console](https://search.google.com/search-console) → Add property
2. Verify ownership via DNS TXT record
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

---

## ⚡ Performance

### Optimizations included:

- **Images**: AVIF/WebP formats, lazy loading, `next/image` with blur placeholders
- **Fonts**: `display: swap`, preload critical fonts
- **Code splitting**: Dynamic imports for heavy components
- **Caching**: 30-day image cache, immutable static assets
- **Compression**: Gzip enabled
- **DNS prefetch**: Cloudinary, Google Fonts, Maps
- **Security headers**: X-Frame-Options, CSP, HSTS

### Expected Lighthouse scores:

| Metric         | Target |
| -------------- | ------ |
| Performance    | 95+    |
| Accessibility  | 95+    |
| Best Practices | 100    |
| SEO            | 100    |

---

## 📱 PWA

The site includes a Web App Manifest for installability:

- Add to home screen on mobile
- Offline-capable (add service worker for full PWA)
- App shortcuts: Book Inquiry, View Gallery

---

## 🛡️ Security

- JWT tokens stored in HTTP-only cookies (XSS-safe)
- Admin routes protected by proxy middleware
- Zod validation on all API inputs
- bcrypt password hashing (12 rounds)
- Security headers on all responses
- Admin panel not linked from public site

---

## 📞 Support

**Ramayan Farm**

- 📞 +91 81403 98723
- 📧 info@greenlandfarm.in
- 📍 Near NH-48, Surat-Navsari Highway, Surat, Gujarat - 395009

---

_Built with ❤️ for Ramayan Farm — Surat's Luxury Wedding Venue_

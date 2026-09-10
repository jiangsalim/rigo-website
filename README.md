# RIGO DESIGN & CONSTRUCTION CO. LTD

<p align="center">
  <img src="https://rigo-design-construction-co-ltd.vercel.app/icon-512.png" alt="RIGO Logo" width="80" height="80" />
</p>

<h1 align="center">RIGO DESIGN & CONSTRUCTION</h1>

<p align="center">
  <em>Build The Future.</em>
</p>

<p align="center">
  Premium construction and architectural design services in Uganda — from concept to completion.
</p>

<p align="center">
  <a href="https://rigo-design-construction-co-ltd.vercel.app">🌐 Website</a> •
  <a href="https://rigo-design-construction.sanity.studio">⚙️ CMS Studio</a> •
  <a href="#-features">✨ Features</a> •
  <a href="#-installation">📥 Installation</a> •
  <a href="#-support">📧 Support</a>
</p>

---

## 📖 About RIGO

**RIGO DESIGN & CONSTRUCTION CO. LTD** is a premier construction and architectural design company based in Mukono, Uganda. We specialize in residential construction, commercial construction, design & build, architectural plans, renovation, and interior design.

This website serves as our digital storefront — showcasing our portfolio, services, team, and architectural plans. Clients can browse completed projects, view our team's credentials, download CVs, request quotes, and contact us directly.

Built with love in Uganda 🇺🇬 for clients across East Africa and beyond.

---

## ✨ Features

### 🏗️ Service Showcase
- Comprehensive listing of construction services
- Individual service detail pages with full descriptions
- Category-based organization (Residential, Commercial, Design-Build, etc.)
- Custom SVG icons for each service type

### 📁 Project Portfolio
- Featured projects displayed on homepage
- Detailed project pages with photo galleries
- Project statistics (square footage, duration, budget)
- Client testimonials linked to specific projects
- Location and completion date metadata

### 🎨 Architectural Plans
- Browse pre-designed architectural plans
- Detailed plan specifications (bedrooms, bathrooms, floors, square footage)
- Downloadable PDF plans
- Inquiry form for plan customization

### 🖼️ Photo & Video Gallery
- Tabbed interface for photos and videos
- Lightbox image viewer
- YouTube/Vimeo video embeds
- Direct MP4 upload support
- Category filtering

### 👥 Team Profiles
- Individual team member pages
- Downloadable CVs (PDF)
- Social media links (LinkedIn, Twitter, Website)
- Areas of expertise tags
- Full biographical content

### 📱 Progressive Web App
- Install as an app on any device (Android, iOS, Desktop)
- Offline support with custom offline page
- Service worker caching
- Custom install prompt
- Native app-like experience

### 🌓 Dark Mode Toggle
- Fixed position toggle button
- Affects only light sections (navy sections remain unchanged)
- Smooth CSS variable transitions
- LocalStorage persistence
- Sun/Moon icon animation

### 📞 Contact & Quote System
- Contact form with Brevo email integration
- Multi-step quote request form
- File upload for reference images
- Google Maps embed
- WhatsApp floating button
- Emergency call button

### 🔒 Trust & Compliance
- URA Tax Registration Certificate display
- TIN Number and Business Registration number
- Badge with lightbox viewer
- Displayed in footer and about page

### 🔍 SEO Optimized
- Complete meta tags and Open Graph
- Twitter Card support
- Schema.org structured data (LocalBusiness, Organization, Breadcrumbs)
- XML sitemap and robots.txt
- Canonical URLs
- Google Search Console verified

---

## 🚀 Getting Started

### 🌐 Use the Website

Visit [rigo-design-construction-co-ltd.vercel.app](https://rigo-design-construction-co-ltd.vercel.app) — no installation needed!

1. Browse our services and portfolio
2. View completed projects and testimonials
3. Download architectural plans
4. Request a quote or contact us directly
5. Install as an app for quick access

### 📱 Install as an App

RIGO works as a Progressive Web App (PWA):

**On Android:**
1. Open the site in Chrome
2. Tap the menu (⋮) → Add to Home screen
3. Tap Install

**On iPhone/iPad:**
1. Open the site in Safari
2. Tap Share → Add to Home Screen
3. Tap Add

**On Desktop:**
1. Open the site in Chrome or Edge
2. Click the install icon in the address bar
3. Click Install

---

## 🛠️ Tech Stack

RIGO is built with modern, fast technology:

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS, Custom CSS Variables |
| **Animations** | Framer Motion |
| **CMS** | Sanity.io v5 |
| **Emails** | Brevo API |
| **Icons** | React Icons |
| **Hosting** | Vercel |
| **Analytics** | Vercel Analytics |
| **SEO** | Schema.org, Open Graph, Sitemap |

---

## 📁 Project Structure

```

rigo-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About + Team
│   │   ├── services/           # Services listing + detail
│   │   ├── projects/           # Portfolio + detail
│   │   ├── gallery/            # Photo & video gallery
│   │   ├── architectural-plans/# Plans + detail
│   │   ├── contact/            # Contact form
│   │   ├── quote/              # Multi-step quote
│   │   ├── privacy/            # Privacy policy
│   │   ├── terms/              # Terms & conditions
│   │   ├── sitemap/            # HTML sitemap
│   │   ├── offline/            # PWA offline page
│   │   └── api/                # API routes (Brevo)
│   ├── components/             # Reusable UI components
│   │   ├── layout/             # Header, Footer
│   │   ├── home/               # Homepage sections
│   │   ├── shared/             # Forms, PageHero, etc.
│   │   └── ui/                 # Buttons, toggles, floating actions
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities & configs
│   └── styles/                 # Global CSS
├── public/                     # Static assets & PWA files
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   ├── icon-192.png
│   └── icon-512.png
└── README.md

```

**CMS Studio** (separate repo): `rigo-sanity-studio`

---

## 💻 Development Setup

Want to run RIGO locally? Here's how:

### Prerequisites
- Node.js 18+
- npm or pnpm
- Sanity.io account

### 1. Clone the repository

```bash
git clone https://github.com/jiangsalim/rigo-website.git
cd rigo-website
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create .env.local:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=3nm2s1f6
NEXT_PUBLIC_SANITY_DATASET=production
BREVO_API_KEY=your_brevo_api_key
BREVO_TO_EMAIL=infohermansoftware@gmail.com
BREVO_FROM_EMAIL=infohermansoftware@gmail.com
```

4. Start the development server

```bash
npm run dev
```

5. Open in browser

Visit http://localhost:3000

---

🔌 API Endpoints

Internal API routes for form submissions:

Endpoint Method Description
/api/contact POST Handle contact form submissions → Brevo
/api/quote POST Handle quote form submissions → Brevo
/api/revalidate POST Sanity webhook for page revalidation

---

🎨 Design System

Colors

Token Light Mode Dark Mode
--background #FAF9F6 (warm cream) #1A1A1A
--surface #F0EDE8 (warm beige) #111111
--text-heading #0A1F3F (navy) #FFFFFF
--text-body #4A4540 (charcoal) #D1D1D1
--accent #E65100 (orange) Same

Typography

· Headings: Playfair Display (serif)
· Body: Inter (sans-serif)

Section Pattern

```
Navy → Cream → Warm Gray → Cream → Navy → Cream → Navy
```

---

🤝 Contributing

We welcome contributions from the community!

1. Fork the repository
2. Create a branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m "Add amazing feature")
4. Push to your branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

📜 Legal

Copyright Notice

All architectural plans, designs, drawings, and content on this website are the intellectual property of RIGO DESIGN & CONSTRUCTION CO. LTD unless otherwise stated. Unauthorized use, reproduction, or distribution is prohibited.

Disclaimer

RIGO DESIGN & CONSTRUCTION CO. LTD shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or services. Our liability is limited to the maximum extent permitted by law.

---

📧 Support

Having issues? We're here to help!

Channel Contact
📧 Email info@rigodesign.co.tz
📞 Phone +256 772 723 188
📍 Address Mukono, Namawojjolo, next to Gaz Petrol Station
🕐 Hours Monday–Friday, 8:00 AM – 5:00 PM EAT

---

🙏 Acknowledgements

RIGO would not be possible without the incredible open-source community:

· Next.js — React framework
· Sanity.io — Headless CMS
· Tailwind CSS — Styling
· Framer Motion — Animations
· Brevo — Email API
· Vercel — Hosting

---

📄 License

This project is proprietary software owned by RIGO DESIGN & CONSTRUCTION CO. LTD. All rights reserved.

---

<p align="center">
  <strong>Built with ❤️ in Uganda by <a href="https://herman-software-website.vercel.app/">HERMAN Software Solutions</a></strong>
</p>

<p align="center">
  ⭐ If you find RIGO's website impressive, please give it a star on GitHub!
</p>

---

🗺️ Roadmap

✅ Completed

· ☑ Service showcase with detail pages
· ☑ Project portfolio with galleries
· ☑ Architectural plans with PDF downloads
· ☑ Team profiles with CV downloads
· ☑ Photo & video gallery
· ☑ Multi-step quote request system
· ☑ Contact form with email integration
· ☑ Progressive Web App (PWA)
· ☑ Dark mode toggle
· ☑ URA certificate trust badge
· ☑ Complete SEO optimization
· ☑ Google Search Console verified

🚧 In Progress

· ☐ Blog / News section
· ☐ Online payment integration
· ☐ Client portal for project tracking

🔮 Future

· ☐ Mobile app (Android/iOS)
· ☐ Multi-language support (Swahili, Luganda)
· ☐ AI-powered project estimator
· ☐ Virtual project tours (3D/VR)

---

Last updated: August 2026

```
# ATELIER VERA — Interior Architecture & Spatial Design Studio (Full-Stack MERN Application)

A complete, production-oriented MERN (MongoDB, Express.js, React.js/Vite, Node.js) application built for a boutique luxury interior architecture studio following the **Warm Minimalist Luxury & Contemporary Editorial** design direction.

## 1. Aesthetic & Design System
- **Color Palette**:
  - Primary Background: `#F7F5F0` (Warm Ivory)
  - Secondary Background: `#EAE5DC` (Soft Sand)
  - Primary Text: `#292824` (Deep Charcoal)
  - Secondary Text: `#77746D`
  - Accent: `#777C61` (Muted Olive)
  - Borders: `#DDD8CE`
  - Surface White: `#FFFFFF`
- **Typography**: `Lora` (editorial serif headings) paired with `Inter` (body, forms, navigation).
- **Responsive Mobile Drawer**: Right-to-left sliding drawer on mobile viewports with backdrop overlay, Escape key support, route-change auto-close, and background scroll lock.

## 2. Project Structure
```text
atelier-vera-mern/
├── backend/
│   ├── config/             # MongoDB Atlas & Cloudinary stream upload configuration
│   ├── controllers/        # Auth, Projects, Services, Testimonials, Appointments, Enquiries, Settings, Media, Dashboard
│   ├── middleware/         # JWT HTTP-only cookie protection, rate limiting, Multer upload filter, centralized error handler
│   ├── models/             # Admin, Project, Service, Testimonial, Appointment, Enquiry, WebsiteSettings, MediaAsset
│   ├── routes/             # Modular Express REST routes
│   ├── seed/               # Initial administrator & demo content seeding script
│   ├── utils/              # JWT cookie helper & timezone-aware booking conflict engine
│   ├── .env.example        # Documented backend environment variables
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/             # robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/     # Navbar, Footer, FloatingContactIcons, BeforeAfterSlider, RevealOnScroll, SmartImage, ConfirmModal
│   │   ├── context/        # StudioContext (state + REST API integration)
│   │   ├── data/           # Clearly marked fictional initial demo dataset
│   │   ├── pages/          # Home, About, Services, Projects, ProjectDetail, BeforeAfter, Process, Testimonials, Contact, Booking, Admin
│   │   ├── services/       # Axios instance with credential cookies & 401 session interceptor
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example        # Documented frontend environment variables
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── DEPLOYMENT.md
└── README.md
```

## 3. Local Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas cluster URI (or local MongoDB instance)
- Cloudinary account (Cloud Name, API Key, API Secret)

### Step 1: Configure & Start the Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your MONGODB_URI, JWT_SECRET, and CLOUDINARY_* credentials
npm install

# Provision the initial Admin account and demo studio records:
npm run seed

# Start the Express development server on port 5000:
npm run dev
```

### Step 2: Configure & Start the Frontend
```bash
cd ../frontend
cp .env.example .env
npm install
npm run dev
```
Open `http://localhost:5173` for the public website and `http://localhost:5173/admin` for the protected Admin Studio Portal.

## 4. Initial Admin Setup & Demo Content Notice
- Public admin registration is disabled by security policy.
- Set `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD` in `backend/.env` and run `npm run seed`.
- Default seeded demo credentials: `admin@ateliervera.com` / `AtelierVera@2026` (change immediately after first sign-in under **Admin Profile**).
- **Demo Business Configuration**: All phone numbers, addresses, WhatsApp digits, Instagram links, and client testimonials are clearly flagged as demo content and are 100% editable from **Admin Dashboard → 7. Content Settings**.

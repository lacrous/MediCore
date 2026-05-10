# MediCore - Hospital Management System

A premium, feature-rich Hospital Management System (HMS) built with React 19, TypeScript, Tailwind CSS, and Vite.

## Features

- **Authentication** - Login, Register, Role-based access (Admin, Doctor, Nurse, Receptionist)
- **Dashboard** - Interactive charts, KPI cards, activity feed, department overview
- **Appointments** - Full CRUD with status badges, filtering, pagination
- **Patients** - Patient records, detail view, medical history timeline, vitals
- **Pharmacy** - Medication inventory with stock level indicators
- **Billing** - Invoice management with payment tracking, CSV export
- **Calendar** - Monthly appointment calendar with event viewing
- **Settings** - Theme toggle, notifications, security, profile management
- **Arabic/English** - Full bilingual support with RTL layout
- **Light/Dark Mode** - Full theme switching with smooth transitions

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3
- Framer Motion
- Recharts (charts)
- React Router DOM
- Lucide React (icons)
- Sonner (toasts)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Vercel Deployment

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (run this from the project root)
cd /path/to/medicore-hms
vercel --prod
```

### Option 2: Git + Vercel Dashboard

1. Push this project to a GitHub/GitLab/Bitbucket repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel will auto-detect Vite framework settings
5. Click **Deploy**

### Option 3: Vercel Dashboard (Manual Upload)

1. Build the project: `npm run build`
2. Go to [vercel.com/new](https://vercel.com/new)
3. Select **Upload** tab
4. Drag and drop the `dist/` folder
5. Project name: `medicore-hms`
6. Click **Deploy**

### Vercel Configuration

The project includes `vercel.json` at the root with:
- SPA routing support (all routes redirect to index.html)
- Asset caching headers
- Security headers
- Framework auto-detection for Vite

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@medicore.com | admin123 |
| Doctor | doctor@medicore.com | doctor123 |
| Nurse | nurse@medicore.com | nurse123 |
| Reception | reception@medicore.com | reception123 |

## Credits

- **Made by:** Hassan El-Deghidy
- **Powered by:** Nurovia

# AeroLink Ghana — Airport Transfer Platform

**Repository:** [github.com/wastwagon/aerolinkghana.com](https://github.com/wastwagon/aerolinkghana.com)  
**Production:** [aerolinkghana.com](https://aerolinkghana.com)

Premium airport transfer booking platform built with Next.js, PostgreSQL, and Redis.

## Tech Stack

- **Frontend/Backend:** Next.js 16 (App Router, Turbopack hot reload)
- **Database:** PostgreSQL 16 (Docker)
- **Cache:** Redis 7 (Docker)
- **ORM:** Prisma 7
- **Auth:** Auth.js (NextAuth v5)
- **Styling:** Tailwind CSS 4
- **Deployment:** Coolify (VPS)

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Blue | `#1B365D` | Primary brand, headers |
| Gold | `#C9A227` | Accents, CTAs, pricing |
| White | `#FFFFFF` | Backgrounds |
| Light Blue | `#4DA6FF` | Secondary accent |

## Contact

- **Phone:** 0555207204
- **WhatsApp:** +233 55 520 7204
- **Address:** Burma Camp, Accra, Ghana

---

## Local Development

### Prerequisites

- Node.js 20+
- Docker Desktop (running)

### 1. Start Database Services

```bash
docker compose -f docker-compose.dev.yml up -d
```

This starts PostgreSQL on port `5438` and Redis on port `6391`.

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` and set `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Install & Setup Database

```bash
npm install
npx prisma migrate dev --name init
npm run db:seed
```

### 4. Start Dev Server (Hot Reload)

```bash
npm run dev
```

Open [http://localhost:3080](http://localhost:3080)

---

## Default Admin Login

| Field | Value |
|-------|-------|
| Email | `admin@aerolinkghana.com` |
| Password | `admin123` |

**Change this password immediately in production.**

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage + booking form
│   ├── admin/                # Admin dashboard + CMS
│   ├── dashboard/            # User booking dashboard
│   ├── login/                # Authentication
│   └── api/                  # REST API routes
├── components/               # UI components
├── lib/                      # Utilities, auth, pricing
└── generated/prisma/         # Prisma client
```

## Features

- Professional mobile-first homepage
- Airport pickup/drop-off booking form
- Date/time + flight number capture
- Passenger count & vehicle selection
- Automatic quoted pricing
- WhatsApp booking integration
- Mobile Money / Cash / Card payment options
- Admin dashboard for booking management
- User dashboard for booking history
- CMS for content pages

---

## Deploy to Coolify (Docker Compose — all-in-one)

**GitHub repo:** `https://github.com/wastwagon/aerolinkghana.com`

The repo includes a single **`docker-compose.yml`** with:
- **app** — Next.js (port 3000, auto-runs Prisma migrations on start)
- **postgres** — PostgreSQL 16 (persistent volume)
- **redis** — Redis 7 (persistent volume)

### Coolify steps

1. Push repo to GitHub
2. Coolify → **New Resource** → **Docker Compose**
3. Connect repo `wastwagon/aerolinkghana.com`, branch `main`
4. Compose file: `docker-compose.yml`
5. **Exposed service:** `app` on port **3000**
6. Domain: `aerolinkghana.com` (HTTPS)
7. Add environment variables in Coolify:

| Variable | Required |
|---|---|
| `POSTGRES_PASSWORD` | Yes |
| `AUTH_SECRET` | Yes |
| `AUTH_URL` | `https://aerolinkghana.com` |
| `NEXT_PUBLIC_APP_URL` | `https://aerolinkghana.com` |
| `PAYSTACK_SECRET_KEY` | Yes (live) |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Yes (live) |
| `RESEND_API_KEY` | Yes |
| `EMAIL_FROM` | Yes |
| `ADMIN_EMAIL` | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `233555207204` |

`DATABASE_URL` and `REDIS_URL` are **wired automatically** inside compose — do not override unless using external DB.

8. Deploy — migrations and seed run automatically when the app container starts.

### After first deploy

Default admin is created automatically: `admin@aerolinkghana.com` / `admin123` — **change immediately** at `/login`.

To disable auto-seed on restart (optional): set `RUN_DB_SEED=false` in Coolify env.

### Push to GitHub

```bash
git add .
git commit -m "Initial AeroLink Ghana platform — booking, admin, blog, mobile UI"
git push -u origin main
```

Or use [GitHub Desktop](https://desktop.github.com) with remote `https://github.com/wastwagon/aerolinkghana.com.git`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed vehicles & admin user |
| `npm run db:studio` | Open Prisma Studio |
| `docker compose -f docker-compose.dev.yml up -d` | Start Postgres + Redis (local dev) |
| `docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build` | Full stack locally (app on port 3099) |

## Paystack Setup (Prototype)

1. Create a free account at [paystack.com](https://paystack.com)
2. Copy your **test** public and secret keys from the dashboard
3. Add to `.env`:

```env
PAYSTACK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_..."
```

4. Book with **Pay Online** — supports Visa, Mastercard, Mobile Money, and bank transfer
5. For production webhooks, point Paystack to: `https://yourdomain.com/api/payments/paystack` (PUT)

## Email (Resend SMTP)

Booking emails are sent automatically via [Resend SMTP](https://resend.com/docs/send-with-smtp):

| Event | Customer email | Admin email |
|-------|----------------|-------------|
| WhatsApp / Cash booking | Booking received | New booking alert |
| Paystack booking created | — | New booking alert |
| Paystack payment confirmed | Booking confirmed | — |

Add to `.env`:

```env
RESEND_API_KEY="re_..."
RESEND_SMTP_HOST="smtp.resend.com"
RESEND_SMTP_PORT="465"
EMAIL_FROM="AeroLink Ghana <bookings@yourdomain.com>"
ADMIN_EMAIL="bookings@aerolinkghana.com"
```

For testing, use `onboarding@resend.dev` as `EMAIL_FROM` until your domain is verified in Resend.

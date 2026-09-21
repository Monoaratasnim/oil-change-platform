# Emberline — On-site Commercial Oil Change Platform

Emberline is a production-ready Next.js marketing and lead-capture platform for an
on-site commercial kitchen oil change service. It combines a full marketing
storefront with an interactive quotation calculator, persisted quotations and
contact inquiries written to PostgreSQL through Drizzle ORM, and a protected
staff dashboard for reviewing submitted records.

Built with strict TypeScript, fluid responsive design (375px → 1440px), zero
horizontal overflow, keyboard-accessible focus management, and fully
parameterized database queries.

## Features

- Marketing site with hero, services, service process, pricing, and contact
  sections rendered from a shared design-token system.
- Interactive quotation calculator with instant, live price estimation across
  equipment types, service frequency (one-time vs. monthly subscription), and
  additional maintenance options, plus inline validation with informative
  messages.
- Quotation and inquiry persistence via Drizzle ORM with strict server-side
  validation and parameterized queries.
- Protected staff dashboard (`/dashboard`) gated by an `ADMIN_SECRET_KEY`
  cookie or query-parameter check.
- Responsive staff tables with status indicators, currency/date formatting, and
  empty states.
- Error boundaries at the app, route-segment, dashboard, and component level
  with clean fallback states, plus `404` and loading skeletons.

## Tech Stack

| Layer       | Technology                                                      |
| ----------- | --------------------------------------------------------------- |
| Framework   | Next.js 15 (App Router) on React 19                             |
| Language    | TypeScript in strict mode                                        |
| Styling     | Tailwind CSS with a custom design-token theme                   |
| Components  | shadcn/ui (Button, Badge, Card) plus custom site components      |
| Icons       | lucide-react                                                     |
| Database    | PostgreSQL                                                       |
| ORM         | Drizzle ORM with the `postgres.js` driver                        |
| CLI tooling | drizzle-kit for migrations and schema push                       |
| Linting     | ESLint (`next/core-web-vitals`, `next/typescript`)               |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── dashboard/auth/route.ts      Cookie-based admin authentication
│   │   ├── inquiries/route.ts           POST contact inquiries
│   │   └── quotations/route.ts          POST quotation requests
│   ├── dashboard/
│   │   ├── error.tsx                    Dashboard error boundary
│   │   └── page.tsx                     Protected staff dashboard
│   ├── error.tsx                        Root-level error boundary
│   ├── global-error.tsx                 Root layout error boundary
│   ├── loading.tsx                      Loading skeleton fallback
│   ├── not-found.tsx                    404 fallback
│   ├── globals.css                      Design tokens + base styles
│   ├── layout.tsx                       Root layout (fonts, skip link)
│   └── page.tsx                         Home page
├── components/
│   ├── site/                            Marketing components
│   └── ui/                              shadcn/ui primitives
├── db/
│   ├── index.ts                         Postgres client + Drizzle instance
│   ├── queries.ts                       Typed, parameterized query functions
│   └── schema.ts                        Strictly typed table definitions
├── lib/
│   ├── http.ts                          Shared JSON helpers for route handlers
│   └── utils.ts                         cn() class-merge utility
└── types/
    └── css.d.ts                          Ambient CSS module declarations
drizzle/                                  Generated SQL migrations
```

## Prerequisites

- Node.js 20.9 or newer
- npm 10 or newer
- A PostgreSQL 14+ database (local, Docker, or a hosted provider)

## Environment Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

3. Configure the variables:

   | Variable           | Required | Description                                                     |
   | ------------------ | -------- | --------------------------------------------------------------- |
   | `DATABASE_URL`     | Yes      | Postgres connection string, e.g. `postgresql://user:pass@host:5432/db` |
   | `ADMIN_SECRET_KEY` | Yes      | Secret access key that unlocks the staff dashboard               |

4. Create the database schema:

   ```bash
   npm run db:push
   ```

   For environments where migrations are preferred:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dashboard lives at
[http://localhost:3000/dashboard](http://localhost:3000/dashboard) and accepts
the access key through the sign-in form.

## Scripts

| Script              | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Start the development server (Turbopack)          |
| `npm run build`     | Production build with type-checking and linting   |
| `npm start`         | Start the production server                        |
| `npm run lint`      | Run ESLint                                        |
| `npm run db:generate` | Generate a SQL migration from the Drizzle schema |
| `npm run db:push`   | Push the schema directly to the database           |
| `npm run db:migrate` | Apply generated migrations to the database        |

## Database Schema

Both tables are defined in `src/db/schema.ts` and are created with surrogate
serial primary keys and timezone-aware timestamps.

### quotations

| Column            | Type          | Notes                              |
| ----------------- | ------------- | ---------------------------------- |
| `id`              | `serial`      | Primary key                        |
| `equipment_type`  | `text`        | Selected equipment type            |
| `service_tier`    | `text`        | `one-time` or `monthly`            |
| `selected_options`| `jsonb`       | Array of maintenance option ids    |
| `estimated_price` | `numeric(10,2)` | Client-estimated price in USD     |
| `created_at`      | `timestamptz` | Defaults to `now()`                |

### inquiries

| Column            | Type          | Notes                              |
| ----------------- | ------------- | ---------------------------------- |
| `id`              | `serial`      | Primary key                        |
| `name`            | `text`        | Contact name                       |
| `email`           | `text`        | Contact email                      |
| `phone`           | `text`        | Contact phone                      |
| `business_address`| `text`        | Business address                   |
| `message`         | `text`        | Inquiry message                    |
| `created_at`      | `timestamptz` | Defaults to `now()`                |

All reads and writes go through the Drizzle query builder in `src/db/queries.ts`.
Every value is passed as a bound parameter — no user input is ever interpolated
into SQL strings — so the data layer is resilient to SQL injection.

## API Endpoints

### `POST /api/quotations`

Persists a quotation request. Request body:

```json
{
  "equipmentType": "delivery-van",
  "serviceTier": "monthly",
  "selectedOptions": ["air-filter"],
  "estimatedPrice": 156.2
}
```

Responses:

| Status | Meaning                                                |
| ------ | ------------------------------------------------------ |
| `201`  | Quotation inserted; returns the created row             |
| `400`  | Invalid JSON or validation failure with field messages  |
| `500`  | Database error                                         |

### `POST /api/inquiries`

Persists a contact inquiry. Request body:

```json
{
  "name": "Ava Chen",
  "email": "ava@oberoncafe.example",
  "phone": "(555) 012-3456",
  "businessAddress": "410 SE Main St, Portland, OR",
  "message": "Two delivery vans need service before the holiday rush."
}
```

Responses use the same status-code contract as `/api/quotations`.

### `GET /api/dashboard/auth`

Establishes or clears the dashboard session. Query parameters:

| Param      | Behavior                                        |
| ---------- | ------------------------------------------------ |
| `key`      | Valid value sets a 7-day HttpOnly cookie          |
| `signout=1`| Clears the session cookie                         |

## Staff Dashboard

The dashboard at `/dashboard` lists submitted quotations and contact inquiries
newest-first in responsive tables with status indicators (subscription vs.
one-time, new inquiries), maintenance option chips, formatted prices, and
timestamps.

Access requires a valid `ADMIN_SECRET_KEY`, provided either through the sign-in
form (which sets an `HttpOnly`, `SameSite=Strict` cookie) or a `?key=` query
parameter. Unauthorized visitors see an access-restricted screen; invalid keys
surface a clear error. Database failures render a dedicated recovery state.

## Accessibility & Hardening

- Single semantic landmarks per page (`main`, `header`, `footer`, `nav`) with
  a skip-to-main link in the root layout.
- Visible focus rings on every interactive element, plus custom
  `peer-focus-visible` rings for custom radio and checkbox controls.
- `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-invalid`,
  `aria-live`, and `role="alert"` used for labels, groups, and validation
  messages; form fieldsets group related controls semantically.
- Fluid layouts from 375px to 1440px with no horizontal page overflow
  (`overflow-x: clip` on the body; scrollable table wrappers).
- Error boundaries at the app, dashboard, and calculator-component level with
  actionable fallbacks; `404`, loading, and global error states included.
- Inline validation produces human-readable messages; all DB inputs are
  validated server-side and fully parameterized.

## Deployment

### Vercel

1. Push the repository to a Git provider and import it into Vercel.
2. In the Vercel project settings, add the environment variables:
   - `DATABASE_URL`
   - `ADMIN_SECRET_KEY`
   (Use Production and Preview scopes as needed.)
3. Provision a PostgreSQL database (Vercel Postgres, Neon, Supabase, or any
   provider exposing a standard connection string) and point `DATABASE_URL` at
   it.
4. Apply the schema before or immediately after deploy:

   ```bash
   npm run db:generate
   npm run db:push
   ```

5. Deploy the default branch. The framework preset is auto-detected; the build
   command is `next build` and the output is static + dynamic App Router routes.

Because `ADMIN_SECRET_KEY` is delivered through environment variables, it never
enters the client bundle — the cookie it establishes is `HttpOnly` and `Secure`
in production.

### Alternative hosts

Any Node.js host that runs Next.js works. Set the same two environment
variables, run `npm run build` and `npm start`, and keep migrations in sync
with `npm run db:generate` / `npm run db:migrate`.

## License

Proprietary. For internal use by Emberline Logistics LLC.
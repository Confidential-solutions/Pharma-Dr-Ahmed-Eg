# Architecture & Development Rules

> [!IMPORTANT]
> **Dr. Ahmed Pharmacy Monorepo Standards**
> This repository is a production-grade fullstack pharmacy platform with a Clean Architecture .NET 9 Web API backend (`server-api/`) and a modern bilingual TanStack Start React frontend (`dr-ahmed/`).

## Monorepo Structure & Organization

- **Frontend Application (`dr-ahmed/`):**
  - Built with TanStack Start, React 19, Tailwind CSS v4, and Radix UI / Shadcn.
  - Keep all pharmacy pages as TanStack file routes in `dr-ahmed/src/routes/`.
  - Shared bilingual copy (Arabic primary, English secondary), business contact details, working hours, and CDN image references reside in `dr-ahmed/src/lib/`.
  - Supabase client and AuthProvider are centralized in `dr-ahmed/src/lib/supabase.ts` and `dr-ahmed/src/lib/auth.tsx`.
  - Prescription and contact inquiries are typed in `dr-ahmed/src/types/api.ts` and handled via `dr-ahmed/src/services/api/`.

- **Backend Web API (`server-api/`):**
  - Built with ASP.NET Core .NET 9 following Clean Architecture principles (`Core/`, `Application/`, `Controllers/`, `Models/`, `Extensions/`, `Middlewares/`).
  - Native Supabase SDK integration with dependency injection for direct access to PostgREST and Realtime.
  - Exposes RESTful endpoints for pharmacy info, services, prescriptions, and health checks.

- **Root Orchestration:**
  - Root `package.json` coordinates running, testing, building, and verifying both frontend and backend (`npm run dev:frontend`, `npm run build:backend`, `npm run db:verify`, etc.).
  - Schema, seeds, and migrations are documented in `supabase-setup-and-seed.sql` and scripts in `scripts/`.

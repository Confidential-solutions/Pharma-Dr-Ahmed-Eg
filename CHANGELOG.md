# Changelog

All notable changes to **Dr. Ahmed Pharmacy (`صيدلية د. أحمد طارق سليم`)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-11-07

### Added
- **Modular Custom Hooks Architecture (`dr-ahmed/src/hooks/`)**:
  - `useScrolled`: Configurable scroll-position threshold listener (powers `SiteHeader` and `ScrollTop`).
  - `useMenuDismiss`: Accessible `pointerdown` outside, `Escape` key, and viewport resize dismissal.
  - `useLightbox`: Full-screen image lightbox index management, keyboard navigation, and scroll lock.
  - `useContactForm`: Localized WhatsApp deep-link generation and Zod schema validation.
  - `useSupabaseTodos`: Clean Supabase PostgREST async CRUD hook with strongly typed error handling.
  - `useAuthDialog`: Modal state, tab selection, and user feedback toast orchestration.
  - `useLocalStorage` & `useWindowSize`: Cross-tab synchronized local storage and SSR-safe window sizing.
  - Central barrel export via `@/hooks`.
- **Centralized TypeScript Architecture (`dr-ahmed/src/types/`)**:
  - Extracted and split all domain types into dedicated files: `api.ts`, `i18n.ts`, `auth.ts`, `theme.ts`, `database.ts`, and `social.ts`.
  - Re-exported via central barrel `@/types` with backward-compatible forwarder in `i18n/types.ts`.
- **Full-Bleed Hero Background Layout**:
  - Transformed hero section into a full-bleed photo background with ambient primary glow and dark gradient overlay.
- **Modern Animated 404 Page (`NotFoundPage.tsx`)**:
  - Smooth Framer Motion spring physics, 3D levitating medical cross, and bilingual quick-exploration chips.
- **Official Brand Contacts & Social Media**:
  - WhatsApp & Phone: `+20 102 304 3122`.
  - Official Email: `dr.ahmed.tarak73@gmail.com`.
  - Social media channels: Facebook, Instagram, TikTok, LinkedIn.
- **Accessibility Guidelines & Conformance (`ACCESSIBILITY.md`)**:
  - Full WCAG 2.1 AA statement covering RTL/LTR layout, keyboard navigation, focus trapping, and screen reader support.

### Fixed
- **Mobile Menu Icon Alignment**:
  - Replaced unanchored CSS spans with a mathematically centered 24×24 SVG with Framer Motion path morphing.
- **TikTok Social Icon Alignment**:
  - Replaced solid-fill vector with an outline stroke icon matching Lucide icons (`strokeWidth="2"`).
- **CI/CD Platform Binary Portability**:
  - Untracked Windows-generated `package-lock.json` so CI and Vercel resolve Linux-native `lightningcss` binaries.
- **TypeScript Strict Safety**:
  - Replaced explicit `any` in Supabase health check and AuthProvider with type-safe `unknown`.

---

## [1.0.0] - 2026-11-07

### Added
- **Clean Architecture .NET 9 Web API (`server-api`)**:
  - Modular REST Controllers for `Pharmacy`, `Services`, `Prescriptions`, `Todos`, and `Health`.
  - Application Service Layer with strongly typed DTOs and interfaces.
  - Native OpenAPI 3.0 support via `MapOpenApi()` with Scalar UI at `/scalar/v1` and custom Swagger UI at `/swagger`.
  - Dynamic CORS middleware with local wildcard evaluation for smooth developer workflow.
  - Supabase C# SDK dependency injection for direct PostgREST operations.
- **Modern TanStack Start React Frontend (`dr-ahmed`)**:
  - Fullstack React 19 architecture with type-safe file-based routing.
  - Fully bilingual localized interface (Arabic primary with RTL, English secondary with LTR toggle).
  - Modern UI primitives built with Radix UI, Tailwind CSS v4, and Lucide icons.
  - Pages: Home (`/`), About (`/about`), Services (`/services`), Gallery (`/gallery`), Contact (`/contact`), Consult (`/consult`), Health (`/health`).
- **Supabase Cloud Infrastructure & Storage**:
  - PostgreSQL schema with Row Level Security (RLS) policies on all tables (`todos`, `pharmacy_info`, `services`, `prescriptions`, `contact_inquiries`).
  - Storage bucket `pharmacy-images` provisioned with public CDN delivery for brand and service imagery.
  - Storage bucket `prescriptions` provisioned for patient prescription uploads.
- **Performance Optimizations**:
  - Lossless image re-compression (q80) saving 10%–16% payload across all pharmacy photographs.
  - Non-blocking image loading: `decoding="async"`, `fetchPriority="high"` on Hero, and `loading="lazy"` on gallery assets.
  - Code-splitting: Lazy-loaded authentication dialog (`React.lazy()`) reducing initial JavaScript bundle size.
  - Preconnect and DNS prefetch hints for Supabase CDN and Google Fonts.
  - ASP.NET Core response compression (Brotli + Gzip) and HTTP caching (`[ResponseCache(Duration = 300)]`).
- **Project Structure & Clean Monorepo**:
  - Consolidated database migrations in `database/`.
  - Comprehensive documentation in `docs/` (`ARCHITECTURE.md`, `API_DOCUMENTATION.md`, `DEPLOYMENT.md`, `DATABASE.md`, `PERFORMANCE.md`, `ROADMAP.md`).
  - Standardized governance files (`CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `LICENSE`).
  - Modular GitHub Actions CI/CD workflows and issue templates in `.github/`.


# Changelog

All notable changes to **Dr. Ahmed Pharmacy (`صيدلية د. أحمد طارق سليم`)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

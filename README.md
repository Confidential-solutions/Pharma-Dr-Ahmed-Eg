# 🏥 Dr. Ahmed Pharmacy — Fullstack Healthcare Platform
### صيدلية د. أحمد طارق سليم — ميت الرخا، زفتى، الغربية

[![.NET 9](https://img.shields.io/badge/.NET-9.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/start)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_15-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Bilingual](https://img.shields.io/badge/i18n-Arabic_%26_English-16a34a)](dr-ahmed/src/i18n)
[![Accessibility: WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-blue)](ACCESSIBILITY.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An enterprise-grade, production-ready fullstack healthcare and pharmacy platform built for **Dr. Ahmed Tarek Selim Pharmacy** in Mit Al-Rakha, Zifta, Gharbia Governorate, Egypt.

---

## 🌟 Key Highlights

- **Bilingual By Design**: Native Arabic primary experience (RTL) with seamless toggle to English (LTR).
- **Clean Architecture .NET 9 Web API**: Domain-driven, decoupled ASP.NET Core API with Swagger UI & Scalar documentation.
- **TanStack Start React 19 Frontend**: Server-side rendered (SSR), type-safe file routes, powered by Nitro engine.
- **Supabase Cloud Integration**: PostgreSQL with Row Level Security (RLS) policies and direct C# SDK dependency injection.
- **Blazing Fast Performance**:
  - Global Supabase CDN for all pharmacy imagery.
  - Non-blocking `decoding="async"`, `fetchPriority="high"` on Hero, lazy off-screen images.
  - Code-split dynamic modals (`React.lazy()` for authentication dialogs).
  - Brotli and Gzip HTTP response compression enabled on API endpoints.
  - HTTP `[ResponseCache(Duration = 300)]` for high-frequency reads.

---

## 📁 Repository Structure

```
Pharma-Dr-Ahmed-Eg/
├── .github/                 # Modular GitHub Actions workflows & issue templates
│   ├── workflows/           # frontend-ci.yml, backend-ci.yml, release.yml, security-scan.yml
│   └── ISSUE_TEMPLATE/      # Modern issue forms & PR template
├── database/                # Schema, migrations & seed scripts for PostgreSQL
│   ├── schema.sql           # Complete single-source schema & seeds
│   ├── README.md            # Database architecture & guide
│   └── migrations/          # Versioned migrations
├── docs/                    # In-depth architectural & operational documentation
│   ├── ARCHITECTURE.md      # Comprehensive fullstack blueprint
│   ├── API_DOCUMENTATION.md # REST API reference & Swagger/Scalar
│   ├── DEPLOYMENT.md        # Production hosting & Docker guide
│   ├── PERFORMANCE.md       # Load time benchmarks & strategies
│   └── ROADMAP.md           # Product roadmap & feature planning
├── dr-ahmed/                # Frontend application (TanStack Start + React 19)
│   ├── public/              # Static assets & compressed fallbacks
│   └── src/                 # File routes, components, services, lib, i18n
├── server-api/              # Backend Web API (ASP.NET Core .NET 9 Clean Architecture)
│   ├── Controllers/         # REST endpoints (Pharmacy, Services, Prescriptions, Health)
│   ├── Application/         # Business services, DTOs & interfaces
│   └── Core/                # Domain entities & enums
├── scripts/                 # Operational automation (.mjs)
├── package.json             # Root monorepo scripts
└── README.md                # Project documentation
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v20+ or v22+
- **.NET SDK**: 9.0+
- **Git**

### 1. Clone & Install
```bash
git clone https://github.com/Confidential-solutions/Pharma-Dr-Ahmed-Eg.git
cd Pharma-Dr-Ahmed-Eg

# Install frontend dependencies
cd dr-ahmed
npm install
cd ..
```

### 2. Run the Fullstack Monorepo

#### Run the Backend Web API (`server-api`)
```bash
npm run run:backend
# Or: cd server-api && dotnet run
```
- API Base: [http://localhost:5076](http://localhost:5076)
- **Interactive Swagger UI**: [http://localhost:5076/swagger](http://localhost:5076/swagger)
- **Scalar API Reference**: [http://localhost:5076/scalar/v1](http://localhost:5076/scalar/v1)
- **Health Check**: [http://localhost:5076/api/health](http://localhost:5076/api/health)

#### Run the Frontend Web Application (`dr-ahmed`)
```bash
npm run dev:frontend
# Or: cd dr-ahmed && npm run dev
```
- Frontend Web App: [http://localhost:8080](http://localhost:8080) (or `http://localhost:3000`)

---

## 🛠️ Monorepo Commands

| Command | Description |
|---|---|
| `npm run dev:frontend` | Start frontend Vite development server with HMR |
| `npm run build:frontend` | Compile frontend for production (`.output/`) |
| `npm run lint:frontend` | Lint frontend TypeScript code |
| `npm run run:backend` | Run ASP.NET Core .NET 9 Web API |
| `npm run build:backend` | Build backend solution in Release mode |
| `npm run test:backend` | Run backend unit & integration tests |
| `npm run build` | Build both frontend and backend concurrently |
| `npm run db:verify` | Verify Supabase database tables & connection |
| `npm run db:upload-images` | Upload compressed images to Supabase Storage CDN |
| `npm run db:migrate` | Execute SQL migrations on Supabase |

---

## 🌐 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and runtime environment |
| `GET` | `/api/pharmacy/info` | Pharmacy contact, address, coordinates, hours *(cached)* |
| `GET` | `/api/pharmacy/hours` | Operating schedule *(cached)* |
| `GET` | `/api/services` | Active pharmacy services in Arabic & English *(cached)* |
| `POST` | `/api/prescriptions` | Submit prescription request with patient details |
| `GET` | `/api/prescriptions/{id}` | Query prescription order status |
| `POST` | `/api/contact` | Submit inquiry or pharmacist consultation |

For detailed payloads and examples, see [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).

---

## 📚 Documentation Index

- 📐 [Architecture Blueprint](docs/ARCHITECTURE.md)
- 🔌 [REST API Documentation](docs/API_DOCUMENTATION.md)
- 🚀 [Production Deployment Guide](docs/DEPLOYMENT.md)
- 🗄️ [Database Architecture & Migrations](database/README.md)
- ⚡ [Performance & Optimization Strategies](docs/PERFORMANCE.md)
- 🗺️ [Product Roadmap](docs/ROADMAP.md)
- ♿ [Accessibility Statement & Standards](ACCESSIBILITY.md)
- 📋 [Release Changelog](CHANGELOG.md)
- 🤝 [Contributing Guidelines](CONTRIBUTING.md)
- 🛡️ [Security Policy](SECURITY.md)

---

## 👥 Authors & Acknowledgments

- **Dr. Ahmed Tarek Selim Pharmacy** — Mit Al-Rakha, Zifta, Gharbia Governorate, Egypt.
- **Architect & Lead Engineer**: `eng-jawad-z` (<eng.jawadzahwe@gmail.com>)
- **Confidential Solutions**

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

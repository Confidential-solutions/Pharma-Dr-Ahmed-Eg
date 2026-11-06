# Dr. Ahmed Pharmacy — Fullstack Solution

Enterprise-grade architecture for **Dr. Ahmed Tarek Selim Pharmacy** (`صيدلية د. أحمد طارق سليم`).

The workspace is organized into a clean decoupled monorepo:
- **`dr-ahmed/`**: Frontend web application built with **TanStack Start**, **React 19**, **Tailwind CSS**, and **Vite**.
- **`server-api/`**: Backend Web API built with **ASP.NET Core (.NET 9)** adhering to Clean Architecture principles.

---

## Workspace Structure

```
├── dr-ahmed/                 # Frontend Web App (TanStack Start / React)
│   ├── public/               # Public assets
│   ├── src/                  # Routes, components, services, lib, i18n
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.ts        # Vite configuration
│
├── server-api/               # Backend Web API (ASP.NET Core .NET 9)
│   ├── Controllers/          # REST API endpoints
│   ├── Application/          # Business logic, DTOs & Interfaces
│   ├── Core/                 # Entities & domain models
│   ├── Middlewares/          # Exception handling & pipeline
│   ├── Program.cs            # ASP.NET Core bootstrap
│   └── ServerApi.csproj      # .NET 9 project
│
├── ARCHITECTURE.md           # Comprehensive architectural blueprint
├── package.json              # Monorepo root with convenience scripts
└── README.md                 # Project documentation
```

---

## Prerequisites

- **Node.js**: v20+ or v24+
- **.NET SDK**: .NET 9.0+

---

## Quick Start

### 1. Run the Backend API (`server-api`)

```bash
# Using root command:
npm run run:backend

# Or directly in server-api:
cd server-api
dotnet run
```
API runs on `http://localhost:5076` (or `https://localhost:7244`).  
Health check endpoint: `http://localhost:5076/api/health`  
OpenAPI specification: `http://localhost:5076/openapi/v1.json`

### 2. Run the Frontend (`dr-ahmed`)

```bash
# Using root command:
npm run dev:frontend

# Or directly in dr-ahmed:
cd dr-ahmed
npm install
npm run dev
```
Frontend runs on `http://localhost:3000` (or `http://localhost:5173`).

---

## Build Commands

| Task | Monorepo Command |
|---|---|
| **Build Full Stack** | `npm run build` |
| **Build Frontend** | `npm run build:frontend` |
| **Build Backend** | `npm run build:backend` |
| **Lint Frontend** | `npm run lint:frontend` |

---

## Key Backend Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and runtime info |
| `GET` | `/api/pharmacy/info` | Pharmacy contact, address, coordinates, hours |
| `GET` | `/api/pharmacy/hours` | Operating schedule |
| `GET` | `/api/services` | Pharmacy services list (Arabic & English) |
| `POST` | `/api/prescriptions` | Submit prescription request with patient details |
| `GET` | `/api/prescriptions/{id}` | Query prescription order status |
| `POST` | `/api/contact` | Submit inquiry or pharmacist consultation message |

---

For in-depth architectural details, see [ARCHITECTURE.md](ARCHITECTURE.md).

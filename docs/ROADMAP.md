# Production Roadmap: Dr. Ahmed Pharmacy

This document tracks completed milestones and upcoming strategic initiatives for **Dr. Ahmed Pharmacy (`صيدلية د. أحمد طارق سليم`)**.

---

## Phase 1: Core Foundation & Monorepo Architecture (Completed ✅)

- [x] **Monorepo Structure**: Decoupled TanStack Start frontend (`dr-ahmed`) and .NET 9 Web API (`server-api`).
- [x] **Bilingual Support**: Comprehensive Arabic primary (RTL) and English secondary support.
- [x] **Clean Architecture Web API**: Controllers, Application DTOs & Services, Core domain models, Global Exception Handling.
- [x] **Supabase Integration**: PostgreSQL relational database with Row Level Security (RLS) policies.
- [x] **High-Performance CDN Storage**: Provisioned `pharmacy-images` and `prescriptions` buckets; uploaded optimized photography.
- [x] **Interactive Documentation**: OpenAPI 3.0 specification, Scalar API reference at `/scalar/v1`, and Swagger UI at `/swagger`.
- [x] **Load Time & Performance Optimizations**:
  - Image re-compression (q80)
  - `decoding="async"`, `fetchPriority="high"` on Hero
  - Lazy loading for off-screen gallery items
  - Code-splitting with `React.lazy()` for authentication dialogs
  - Brotli and Gzip response compression in ASP.NET Core
  - HTTP `[ResponseCache]` for high-frequency static endpoints
  - Preconnect & DNS prefetch for Supabase CDN and Google Fonts

---

## Phase 2: Enhanced Patient Experience (In Progress 🚀)

- [ ] **Direct WhatsApp Automation**: Webhook listener linking prescription submissions directly to WhatsApp business notifications.
- [ ] **Prescription Tracker**: Dedicated interactive tracking page where patients enter their phone number or tracking code to monitor prescription status.
- [ ] **Arabic Voice Search**: Voice-driven medication search for elder patients in Mit Al-Rakha community.
- [ ] **SMS Notification Gateway**: Real-time SMS alerts when medications are ready for pickup or out for delivery.

---

## Phase 3: Commercial & Branch Operations (Planned 🔮)

- [ ] **Inventory Synchronization**: Real-time stock integration with the pharmacy's local POS / ERP software.
- [ ] **Online Payment Gateways**: Integration with Egyptian payment processors (Fawry, Vodafone Cash, InstaPay, Paymob).
- [ ] **Chronic Refill Subscriptions**: Automated monthly recurring reminders for blood pressure and diabetic refills.
- [ ] **Pharmacist Backoffice Portal**: Secured dashboard for Dr. Ahmed and staff to manage prescription queues and inventory.


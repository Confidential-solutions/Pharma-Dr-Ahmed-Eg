# Database Architecture & Supabase Guide

This directory contains the database definitions, migration scripts, and seed data for **Dr. Ahmed Pharmacy**.

## Overview

The pharmacy solution uses **Supabase (PostgreSQL 15+)** providing:
1. **PostgreSQL Relational DB** with strict schema integrity and foreign constraints.
2. **Row Level Security (RLS)** ensuring safe access from both anonymous client apps and authenticated users.
3. **Supabase Storage** for prescription photo uploads and high-speed global CDN delivery of service & pharmacy imagery.
4. **Direct .NET 9 Web API Integration** using `supabase-csharp` SDK via Dependency Injection.

---

## Directory Structure

```
database/
├── README.md                           # This documentation
├── schema.sql                          # Complete consolidated schema & seeds
├── supabase-setup-and-seed.sql         # Supabase SQL Editor one-click initialization
└── migrations/
    ├── 001_initial_schema_and_seed.sql         # Base tables, RLS, and seed data
    ├── 002_add_image_url_to_services.sql       # Added image_url CDN column to services
    └── 003_storage_bucket_pharmacy_images.sql  # Prescriptions & pharmacy-images buckets
```

---

## Tables & Schemas

### 1. `pharmacy_info`
Stores core branch information, bilingual titles, address, contact phone, WhatsApp link, and working hours JSON.
- `id` (UUID, PK)
- `name_ar` / `name_en` (TEXT): Pharmacy legal name in Arabic and English
- `short_name_ar` / `short_name_en` (TEXT): Compact title for navigation headers
- `phone_display` / `phone_href` / `whatsapp_number` (TEXT): Communication channels
- `address_ar` / `address_en` / `map_query` (TEXT): Physical location details
- `hours` (JSONB): Structured array of operating hours per shift/day

### 2. `services`
Stores the pharmacy's core healthcare offerings with bilingual titles, descriptions, Lucide icon names, and Supabase CDN image URLs.
- `id` (UUID, PK)
- `key` (TEXT, UNIQUE): Service key identifier (`meds`, `beauty`, `baby`, `chronic`, `delivery`, `consult`)
- `title_ar` / `title_en` (TEXT): Service title
- `description_ar` / `description_en` (TEXT): Detailed description
- `icon_name` (TEXT): Frontend Lucide icon key
- `image_url` (TEXT): Public URL in Supabase Storage (`pharmacy-images` bucket)
- `is_active` (BOOLEAN): Visibility flag

### 3. `prescriptions`
Stores digital prescription orders uploaded by customers via web or WhatsApp.
- `id` (UUID, PK)
- `patient_name` (TEXT): Customer full name
- `phone_number` (TEXT): Contact number for confirmation
- `address` (TEXT): Delivery destination
- `notes` (TEXT): Special patient instructions or doctor notes
- `image_url` (TEXT): Uploaded prescription photo stored in `prescriptions` bucket
- `requires_delivery` (BOOLEAN): Home delivery or branch pickup
- `status` (INT): Workflow status (0: PendingReview, 1: Approved, 2: Preparing, 3: OutForDelivery, 4: Completed, 5: Rejected)
- `status_text` (TEXT): Human-readable status

### 4. `contact_inquiries`
Stores inquiries, clinical questions, and consultation requests submitted by patients.
- `id` (UUID, PK)
- `name` / `phone` / `subject` / `message` (TEXT)
- `is_resolved` (BOOLEAN): Pharmacy staff resolution indicator

### 5. `todos`
Operational workflow checklist for pharmacy staff, integrated with .NET 9 Web API `TodosController`.

---

## Storage Buckets

1. **`pharmacy-images` (Public)**:
   - Houses optimized brand and service photography (`hero-pharmacy.jpg`, `medicines.jpg`, `beauty-care.jpg`, etc.).
   - Assets are cached at edge and served via Supabase CDN.
2. **`prescriptions` (Public/Authenticated)**:
   - Houses prescription images uploaded during prescription submission.

---

## Applying Migrations

### Option A: Using Supabase Dashboard (Recommended)
1. Open [Supabase Dashboard SQL Editor](https://supabase.com/dashboard/project/jqckzibvkggwfvsdzawa/sql/new).
2. Copy the contents of `database/schema.sql`.
3. Paste into the editor and click **Run**.

### Option B: Automated via Script
```bash
npm run db:verify
# To apply migrations with your Supabase Personal Access Token:
node scripts/apply-migration.mjs <YOUR_SUPABASE_PAT>
```

### Option C: Upload CDN Images
```bash
npm run db:upload-images
```


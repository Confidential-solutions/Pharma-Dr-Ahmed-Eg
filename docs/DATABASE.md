# Database Architecture & Entity Specifications

For the comprehensive database setup guide, migrations, and seed scripts, please see **[database/README.md](../database/README.md)**.

---

## Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    PHARMACY_INFO {
        uuid id PK
        text name_ar
        text name_en
        text short_name_ar
        text short_name_en
        text phone_display
        text phone_href
        text whatsapp_number
        text facebook_url
        text address_ar
        text address_en
        text map_query
        jsonb hours
        timestamptz updated_at
    }

    SERVICES {
        uuid id PK
        text key UK
        text title_ar
        text title_en
        text description_ar
        text description_en
        text icon_name
        text image_url
        boolean is_active
        timestamptz created_at
    }

    PRESCRIPTIONS {
        uuid id PK
        text patient_name
        text phone_number
        text address
        text notes
        text image_url
        boolean requires_delivery
        int status
        text status_text
        timestamptz created_at
        timestamptz updated_at
    }

    CONTACT_INQUIRIES {
        uuid id PK
        text name
        text phone
        text subject
        text message
        boolean is_resolved
        timestamptz created_at
    }
```

---

## Storage Buckets

1. **`pharmacy-images`**:
   - Access: Public Read (`anon`, `authenticated`)
   - Objects: Brand photos, service visual cards (`medicines.jpg`, `baby-care.jpg`, `delivery.jpg`, etc.).
   - CDN Base URL: `https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/`

2. **`prescriptions`**:
   - Access: Public Insert (`anon`, `authenticated`), Public Read
   - Objects: Uploaded doctor prescriptions and medical slips.


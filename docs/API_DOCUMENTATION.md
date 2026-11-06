# Dr. Ahmed Pharmacy — REST API Documentation

The Dr. Ahmed Pharmacy backend is powered by **ASP.NET Core (.NET 9)**, adhering to Clean Architecture principles. It exposes a fully typed, documented, and CORS-enabled REST API.

---

## Interactive Documentation Interfaces

When running the backend server locally on `http://localhost:5076`:
- **Interactive Swagger UI**: [http://localhost:5076/swagger](http://localhost:5076/swagger)
- **Scalar API Reference**: [http://localhost:5076/scalar/v1](http://localhost:5076/scalar/v1)
- **Raw OpenAPI 3.0 JSON Specification**: [http://localhost:5076/openapi/v1.json](http://localhost:5076/openapi/v1.json)
- **Root Redirect**: Accessing `http://localhost:5076/` automatically redirects to `/swagger`.

---

## Base URLs

- **Local Development**: `http://localhost:5076` or `https://localhost:7244`
- **Production API**: Configured via reverse proxy (Nginx / Azure / Cloudflare)

---

## Endpoints

### 1. Health & Status

#### `GET /api/health`
Checks the service health, environment status, and system timestamp.

**Response `200 OK`**:
```json
{
  "status": "Healthy",
  "environment": "Development",
  "timestamp": "2026-11-07T00:15:00.0000000Z",
  "service": "DrAhmedPharmacy.WebAPI"
}
```

---

### 2. Pharmacy Information

#### `GET /api/pharmacy/info`
Retrieves the pharmacy branch details, localized names, phone contacts, WhatsApp number, and address coordinates.
*Cached via HTTP 300s response cache header.*

**Response `200 OK`**:
```json
{
  "nameArabic": "صيدلية د. أحمد طارق سليم",
  "nameEnglish": "Dr. Ahmed Tarek Selim Pharmacy",
  "shortNameArabic": "صيدلية د. أحمد طارق",
  "shortNameEnglish": "Dr. Ahmed Tarek Pharmacy",
  "phoneDisplay": "+20 1XX XXX XXXX",
  "phoneHref": "tel:+201000000000",
  "whatsappNumber": "201000000000",
  "facebookUrl": "https://facebook.com/",
  "addressArabic": "ميت الرخا، مركز زفتى، محافظة الغربية – وسط البلد بجوار مسجد الشيخ إسماعيل",
  "addressEnglish": "Mit Al-Rakha, Zifta, Gharbia Governorate – Town Center next to Sheikh Ismail Mosque",
  "mapQuery": "مسجد الشيخ إسماعيل ميت الرخا زفتى الغربية",
  "workingHours": [
    {
      "daysArabic": "السبت – الخميس",
      "daysEnglish": "Saturday – Thursday",
      "timeArabic": "٩ صباحًا – ١٢ منتصف الليل",
      "timeEnglish": "9:00 AM – 12:00 AM"
    },
    {
      "daysArabic": "الجمعة",
      "daysEnglish": "Friday",
      "timeArabic": "١ ظهرًا – ١٢ منتصف الليل",
      "timeEnglish": "1:00 PM – 12:00 AM"
    }
  ]
}
```

#### `GET /api/pharmacy/hours`
Retrieves only the structured operating schedule.
*Cached via HTTP 300s response cache header.*

---

### 3. Pharmacy Services

#### `GET /api/services`
Retrieves all active clinical and retail healthcare services offered by the pharmacy with bilingual titles, descriptions, Lucide icon keys, and Supabase Storage CDN image URLs.
*Cached via HTTP 300s response cache header.*

**Response `200 OK`**:
```json
[
  {
    "id": "1b09b533-5c8e-4a6c-9477-9ca07185bb5f",
    "key": "meds",
    "titleArabic": "أدوية",
    "titleEnglish": "Prescription & OTC Medicines",
    "descriptionArabic": "أدوية أصلية ومضمونة بأسعار رسمية، ونساعدك تلاقي البديل المناسب.",
    "descriptionEnglish": "Authentic pharmaceuticals, generic alternatives, and trusted medicine supply.",
    "iconName": "Pill",
    "imageUrl": "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/medicines.jpg",
    "isActive": true
  }
]
```

---

### 4. Prescriptions Management

#### `POST /api/prescriptions`
Submits a patient's prescription request with optional uploaded image and delivery flag.

**Request Body (`application/json`)**:
```json
{
  "patientName": "محمود السيد",
  "phoneNumber": "+201012345678",
  "address": "ميت الرخا - شارع داير الناحية",
  "notes": "علاج ضغط الدم الشهري كونكور 5",
  "imageUrl": "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/prescriptions/sample.jpg",
  "requiresDelivery": true
}
```

**Response `201 Created`**:
```json
{
  "id": "7f8b9e6a-1234-4a5b-9c8d-123456789abc",
  "patientName": "محمود السيد",
  "phoneNumber": "+201012345678",
  "address": "ميت الرخا - شارع داير الناحية",
  "notes": "علاج ضغط الدم الشهري كونكور 5",
  "imageUrl": "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/prescriptions/sample.jpg",
  "requiresDelivery": true,
  "status": 0,
  "statusText": "PendingReview",
  "createdAt": "2026-11-07T00:15:00.0000000Z"
}
```

#### `GET /api/prescriptions/{id}`
Retrieves the order processing status and details of a submitted prescription by ID.

---

### 5. Contact Inquiries & Consultations

#### `POST /api/contact`
Submits a general inquiry or clinical consultation request for the pharmacist.

**Request Body (`application/json`)**:
```json
{
  "name": "إبراهيم خليل",
  "phone": "+201123456789",
  "subject": "استشارة دوائية",
  "message": "هل يمكن تناول البنادول مع أدوية السيولة؟"
}
```

**Response `200 OK`**:
```json
{
  "success": true,
  "message": "Inquiry submitted successfully."
}
```


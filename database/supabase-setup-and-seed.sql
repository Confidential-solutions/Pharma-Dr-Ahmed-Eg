-- ==============================================================================
-- Dr. Ahmed Pharmacy Database Schema & Initial Seeds
-- Supabase Project: jqckzibvkggwfvsdzawa
-- Run this in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. CREATE TABLES
-- ==============================================================================

-- 2.1 Pharmacy Info Table
CREATE TABLE IF NOT EXISTS public.pharmacy_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    short_name_ar TEXT NOT NULL,
    short_name_en TEXT NOT NULL,
    phone_display TEXT NOT NULL,
    phone_href TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    facebook_url TEXT,
    address_ar TEXT NOT NULL,
    address_en TEXT NOT NULL,
    map_query TEXT NOT NULL,
    hours JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 2.3 Pharmacy Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    icon_name TEXT,
    image_url TEXT,  -- Supabase Storage URL (pharmacy-images bucket)
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 2.4 Prescriptions Table
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    address TEXT,
    notes TEXT,
    image_url TEXT,
    requires_delivery BOOLEAN NOT NULL DEFAULT TRUE,
    status INT NOT NULL DEFAULT 0, -- 0: PendingReview, 1: Approved, 2: Preparing, 3: OutForDelivery, 4: Completed, 5: Rejected
    status_text TEXT NOT NULL DEFAULT 'PendingReview',
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ
);

-- 2.5 Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.pharmacy_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 3.1 Pharmacy Info Policies (Public read)
DROP POLICY IF EXISTS "Allow public read pharmacy_info" ON public.pharmacy_info;
CREATE POLICY "Allow public read pharmacy_info"
    ON public.pharmacy_info FOR SELECT
    TO anon, authenticated
    USING (true);

-- 3.2 Services Policies (Public read)
DROP POLICY IF EXISTS "Allow public read services" ON public.services;
CREATE POLICY "Allow public read services"
    ON public.services FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- 3.3 Prescriptions Policies (Secure: public INSERT only, staff/service_role SELECT)
DROP POLICY IF EXISTS "Allow public insert prescriptions" ON public.prescriptions;
CREATE POLICY "Allow public insert prescriptions"
    ON public.prescriptions FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read prescriptions" ON public.prescriptions;
DROP POLICY IF EXISTS "Staff read prescriptions" ON public.prescriptions;
CREATE POLICY "Staff read prescriptions"
    ON public.prescriptions FOR SELECT
    TO authenticated
    USING (
        (auth.jwt() ->> 'role' IN ('staff', 'pharmacist', 'admin'))
        OR (auth.role() = 'service_role')
    );

-- 3.4 Contact Inquiries Policies (Secure: public INSERT only, staff/service_role SELECT)
DROP POLICY IF EXISTS "Allow public insert contact_inquiries" ON public.contact_inquiries;
CREATE POLICY "Allow public insert contact_inquiries"
    ON public.contact_inquiries FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read contact_inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Staff read contact_inquiries" ON public.contact_inquiries;
CREATE POLICY "Staff read contact_inquiries"
    ON public.contact_inquiries FOR SELECT
    TO authenticated
    USING (
        (auth.jwt() ->> 'role' IN ('staff', 'pharmacist', 'admin'))
        OR (auth.role() = 'service_role')
    );

-- ==============================================================================
-- 4. STORAGE BUCKET CONFIGURATION
-- ==============================================================================

-- 4.1 Prescriptions bucket (for uploaded prescription photos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('prescriptions', 'prescriptions', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 4.2 Pharmacy images bucket (CDN-backed images for all pages)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pharmacy-images', 'pharmacy-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies: allow upload and public view
DROP POLICY IF EXISTS "Allow public upload to prescriptions bucket" ON storage.objects;
CREATE POLICY "Allow public upload to prescriptions bucket"
    ON storage.objects FOR INSERT
    TO anon, authenticated
    WITH CHECK (bucket_id = 'prescriptions');

DROP POLICY IF EXISTS "Allow public read from prescriptions bucket" ON storage.objects;
CREATE POLICY "Allow public read from prescriptions bucket"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'prescriptions');

-- ==============================================================================
-- 5. INITIAL SEED DATA
-- ==============================================================================

-- 5.1 Seed Pharmacy Info (Real verified contact details)
DELETE FROM public.pharmacy_info;
INSERT INTO public.pharmacy_info (
    name_ar, name_en, short_name_ar, short_name_en,
    phone_display, phone_href, whatsapp_number, facebook_url,
    address_ar, address_en, map_query, hours
) VALUES (
    'صيدلية د. أحمد طارق سليم',
    'Dr. Ahmed Tarek Selim Pharmacy',
    'صيدلية د. أحمد طارق',
    'Dr. Ahmed Tarek Pharmacy',
    '+20 102 304 3122',
    'tel:+201023043122',
    '201023043122',
    'https://www.facebook.com/profile.php?id=61596102338642',
    'ميت الرخا، مركز زفتى، محافظة الغربية – وسط البلد بجوار مسجد الشيخ إسماعيل',
    'Mit Al-Rakha, Zifta, Gharbia Governorate – Town Center next to Sheikh Ismail Mosque',
    'مسجد الشيخ إسماعيل ميت الرخا زفتى الغربية',
    '[
        {"daysArabic": "السبت – الخميس", "daysEnglish": "Saturday – Thursday", "timeArabic": "٩ صباحًا – ١٢ منتصف الليل", "timeEnglish": "9:00 AM – 12:00 AM"},
        {"daysArabic": "الجمعة", "daysEnglish": "Friday", "timeArabic": "١ ظهرًا – ١٢ منتصف الليل", "timeEnglish": "1:00 PM – 12:00 AM"}
    ]'::jsonb
);

-- 5.3 Seed Services
DELETE FROM public.services;
INSERT INTO public.services (key, title_ar, title_en, description_ar, description_en, icon_name, image_url, is_active)
VALUES
    ('meds',     'أدوية',                    'Prescription & OTC Medicines',    'أدوية أصلية ومضمونة بأسعار رسمية، ونساعدك تلاقي البديل المناسب.',    'Authentic pharmaceuticals, generic alternatives, and trusted medicine supply.',              'Pill',        'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/medicines.jpg',   true),
    ('beauty',   'مستحضرات تجميل',           'Dermocosmetics & Skincare',       'منتجات عناية بالبشرة والشعر من ماركات موثوقة.',                       'Medical skincare, haircare, and certified beauty essentials.',                               'Sparkles',    'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/beauty-care.jpg', true),
    ('baby',     'رعاية الأم والطفل',        'Mother & Baby Care',              'ألبان أطفال، حفاضات، ومستلزمات العناية بالأم والطفل.',               'Baby formulas, pediatric nutrition, and maternal healthcare essentials.',                    'Baby',        'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/baby-care.jpg',   true),
    ('chronic',  'الأدوية المزمنة',          'Chronic Disease Support',         'متابعة أدوية الضغط والسكر والقلب وتجهيزها شهريًا.',                  'Monthly medication refills, blood pressure & diabetic regimen monitoring.',                  'HeartPulse',  'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/pharmacist.jpg', true),
    ('delivery', 'توصيل للبيت',              'Home Delivery',                   'ابعت الروشتة على واتساب ونوصّلك طلبك داخل المنطقة.',                 'Rapid door-to-door delivery across Mit Al-Rakha and surrounding areas.',                     'Truck',       'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/delivery.jpg',   true),
    ('consult',  'استشارة صيدلانية',         'Pharmacist Consultation',         'اسأل عن جرعتك أو تداخلات الأدوية ببساطة ومن غير تعقيد.',            'Professional clinical advice on dosages, drug interactions, and usage instructions.',        'Stethoscope', 'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/bp-check.jpg',   true);

-- 5.4 Seed Sample Prescriptions
DELETE FROM public.prescriptions;
INSERT INTO public.prescriptions (patient_name, phone_number, address, notes, requires_delivery, status, status_text)
VALUES
    ('محمود السيد', '+201012345678', 'ميت الرخا - شارع داير الناحية', 'مطلوب علاج الضغط الشهري كونكور 5 و كوزار 50', true, 1, 'Approved'),
    ('سارة أحمد', '+201098765432', 'بجوار مدرسة ميت الرخا الإعدادية', 'فيتامينات أطفال ولبن نان رقم 2', true, 0, 'PendingReview');

-- 5.5 Seed Sample Inquiries
DELETE FROM public.contact_inquiries;
INSERT INTO public.contact_inquiries (name, phone, subject, message, is_resolved)
VALUES
    ('إبراهيم خليل', '+201123456789', 'استشارة دوائية', 'هل يمكن تناول البنادول مع أدوية السيولة؟', true),
    ('مريم حسن', '+201187654321', 'استفسار عن توفر منتج', 'هل متوفر كريم لاروش بوزيه إيفاكلار دو بلس؟', false);


-- ==============================================================================
-- Migration: 003_storage_bucket_pharmacy_images.sql
-- Description: Provision public storage buckets for prescriptions and pharmacy CDN assets
-- Target: Supabase Storage
-- ==============================================================================

-- 1. Prescriptions bucket (patient uploads)
INSERT INTO storage.buckets (id, name, public)
VALUES ('prescriptions', 'prescriptions', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Pharmacy images bucket (brand and service photos)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pharmacy-images', 'pharmacy-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policies for prescriptions bucket
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

-- Policies for pharmacy-images bucket
DROP POLICY IF EXISTS "Allow public read from pharmacy-images bucket" ON storage.objects;
CREATE POLICY "Allow public read from pharmacy-images bucket"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'pharmacy-images');


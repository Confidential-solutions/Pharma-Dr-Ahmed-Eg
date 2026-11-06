-- ==============================================================================
-- Migration: 002_add_image_url_to_services.sql
-- Description: Add CDN image_url column to services table and populate URLs
-- Target: Supabase (PostgreSQL 15+)
-- ==============================================================================

ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN public.services.image_url IS 'Public URL of service photo hosted in Supabase Storage pharmacy-images bucket';

-- Update existing records with CDN images
UPDATE public.services SET image_url = 'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/medicines.jpg' WHERE key = 'meds';
UPDATE public.services SET image_url = 'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/beauty-care.jpg' WHERE key = 'beauty';
UPDATE public.services SET image_url = 'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/baby-care.jpg' WHERE key = 'baby';
UPDATE public.services SET image_url = 'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/pharmacist.jpg' WHERE key = 'chronic';
UPDATE public.services SET image_url = 'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/delivery.jpg' WHERE key = 'delivery';
UPDATE public.services SET image_url = 'https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images/bp-check.jpg' WHERE key = 'consult';


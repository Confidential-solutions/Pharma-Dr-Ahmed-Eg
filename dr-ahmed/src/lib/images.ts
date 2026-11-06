/**
 * Pharmacy image URLs — served from Supabase Storage (CDN-backed, public bucket).
 * Bucket: pharmacy-images
 * Project: jqckzibvkggwfvsdzawa
 *
 * To replace an image: upload a new file to the "pharmacy-images" bucket in Supabase
 * Storage with the same filename; the URL is identical so no code change is needed.
 *
 * Local fallback copies live in dr-ahmed/public/images/ for offline dev.
 */

const STORAGE_BASE = "https://jqckzibvkggwfvsdzawa.supabase.co/storage/v1/object/public/pharmacy-images";

export const images = {
  hero:       `${STORAGE_BASE}/hero-pharmacy.jpg`,
  pharmacist: `${STORAGE_BASE}/pharmacist.jpg`,
  medicines:  `${STORAGE_BASE}/medicines.jpg`,
  beauty:     `${STORAGE_BASE}/beauty-care.jpg`,
  baby:       `${STORAGE_BASE}/baby-care.jpg`,
  bp:         `${STORAGE_BASE}/bp-check.jpg`,
  delivery:   `${STORAGE_BASE}/delivery.jpg`,
  storefront: `${STORAGE_BASE}/storefront.jpg`,
} as const;

/** Map service slug → representative image URL */
export const serviceImage: Record<string, string> = {
  meds:     images.medicines,
  beauty:   images.beauty,
  baby:     images.baby,
  chronic:  images.pharmacist,
  delivery: images.delivery,
  consult:  images.bp,
  bp:       images.bp,
};

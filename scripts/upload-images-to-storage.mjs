/**
 * upload-images-to-storage.mjs
 * ----------------------------
 * 1. Retrieves the service-role key from the Supabase Management API (PAT auth).
 * 2. Creates the `pharmacy-images` public bucket (idempotent).
 * 3. Uploads all 8 pharmacy images from dr-ahmed/public/images/.
 * 4. Prints the final public CDN URL for each image.
 * 5. Writes updated dr-ahmed/src/lib/images.ts using Supabase Storage URLs.
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Config ───────────────────────────────────────────────────────────────────
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || "jqckzibvkggwfvsdzawa";
const SUPABASE_URL = process.env.SUPABASE_URL || `https://${PROJECT_REF}.supabase.co`;
const PAT         = process.env.SUPABASE_ACCESS_TOKEN || process.env.SUPABASE_PAT || "";
if (!PAT) abort("SUPABASE_ACCESS_TOKEN or SUPABASE_PAT environment variable is required.");
const BUCKET      = "pharmacy-images";
const MGMT_API    = "https://api.supabase.com";

// ── Helpers ───────────────────────────────────────────────────────────────────
function abort(msg) { console.error(`\n❌  ${msg}`); process.exit(1); }

async function getServiceRoleKey() {
  const res = await fetch(`${MGMT_API}/v1/projects/${PROJECT_REF}/api-keys`, {
    headers: { Authorization: `Bearer ${PAT}` },
  });
  if (!res.ok) abort(`Management API /api-keys failed: ${res.status} ${await res.text()}`);
  const keys = await res.json();
  const srk = keys.find((k) => k.name === "service_role");
  if (!srk) abort("service_role key not found in project API keys");
  console.log("✅  Got service_role key");
  return srk.api_key;
}

async function ensureBucket(serviceKey) {
  // Try to create; ignore 409 (already exists)
  const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      apikey: serviceKey,
    },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
  });
  if (res.status === 409) {
    console.log(`ℹ️   Bucket "${BUCKET}" already exists — skipping creation`);
    return;
  }
  if (!res.ok) abort(`Create bucket failed: ${res.status} ${await res.text()}`);
  console.log(`✅  Bucket "${BUCKET}" created (public)`);
}

async function uploadImage(serviceKey, filePath, fileName) {
  const bytes = readFileSync(filePath);
  const ext   = fileName.split(".").pop().toLowerCase();
  const mime  = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";

  // Upsert so re-runs overwrite gracefully
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": mime,
      "x-upsert": "true",
    },
    body: bytes,
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`  ❌  ${fileName}: ${res.status} ${body}`);
    return null;
  }
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fileName}`;
  console.log(`  ✅  ${fileName}  →  ${publicUrl}`);
  return publicUrl;
}

// ── Main ─────────────────────────────────────────────────────────────────────
const serviceKey = await getServiceRoleKey();
await ensureBucket(serviceKey);

const imagesDir = join(ROOT, "dr-ahmed", "public", "images");
const files = readdirSync(imagesDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`\n📤  Uploading ${files.length} images to ${BUCKET}...\n`);

const urls = {};
for (const file of files) {
  const url = await uploadImage(serviceKey, join(imagesDir, file), file);
  if (url) urls[file] = url;
}

// ── Build the images.ts key map ───────────────────────────────────────────────
const BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

const imageMap = {
  hero:        `${BASE}/hero-pharmacy.jpg`,
  pharmacist:  `${BASE}/pharmacist.jpg`,
  medicines:   `${BASE}/medicines.jpg`,
  beauty:      `${BASE}/beauty-care.jpg`,
  baby:        `${BASE}/baby-care.jpg`,
  bp:          `${BASE}/bp-check.jpg`,
  delivery:    `${BASE}/delivery.jpg`,
  storefront:  `${BASE}/storefront.jpg`,
};

const imagesTs = `/**
 * Pharmacy image URLs — served from Supabase Storage (CDN-backed, public bucket).
 * Bucket: ${BUCKET}
 * Project: ${PROJECT_REF}
 *
 * To replace an image: upload a new file to the "${BUCKET}" bucket in Supabase
 * Storage with the same filename; the URL is identical so no code change is needed.
 *
 * Local fallback copies live in dr-ahmed/public/images/ for offline dev.
 */

const STORAGE_BASE = "${BASE}";

export const images = {
  hero:       \`\${STORAGE_BASE}/hero-pharmacy.jpg\`,
  pharmacist: \`\${STORAGE_BASE}/pharmacist.jpg\`,
  medicines:  \`\${STORAGE_BASE}/medicines.jpg\`,
  beauty:     \`\${STORAGE_BASE}/beauty-care.jpg\`,
  baby:       \`\${STORAGE_BASE}/baby-care.jpg\`,
  bp:         \`\${STORAGE_BASE}/bp-check.jpg\`,
  delivery:   \`\${STORAGE_BASE}/delivery.jpg\`,
  storefront: \`\${STORAGE_BASE}/storefront.jpg\`,
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
`;

const targetPath = join(ROOT, "dr-ahmed", "src", "lib", "images.ts");
writeFileSync(targetPath, imagesTs, "utf8");
console.log(`\n✅  Updated dr-ahmed/src/lib/images.ts with Supabase Storage URLs`);

// ── Also update the services table image_url column ───────────────────────────
console.log(`\n📋  Next step: update services table image_url values in Supabase.`);
console.log(`    Run the SQL below in the Supabase SQL Editor:\n`);
console.log(`UPDATE public.services SET image_url = '${BASE}/medicines.jpg'  WHERE slug = 'meds';`);
console.log(`UPDATE public.services SET image_url = '${BASE}/beauty-care.jpg' WHERE slug = 'beauty';`);
console.log(`UPDATE public.services SET image_url = '${BASE}/baby-care.jpg'   WHERE slug = 'baby';`);
console.log(`UPDATE public.services SET image_url = '${BASE}/pharmacist.jpg'  WHERE slug = 'chronic';`);
console.log(`UPDATE public.services SET image_url = '${BASE}/delivery.jpg'    WHERE slug = 'delivery';`);
console.log(`UPDATE public.services SET image_url = '${BASE}/bp-check.jpg'    WHERE slug = 'consult';`);
console.log(`\nDone! 🎉`);


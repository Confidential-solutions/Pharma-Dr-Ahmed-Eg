/**
 * add-image-url-to-services.mjs
 * Adds image_url column to services table and sets Supabase Storage URLs.
 */

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || "jqckzibvkggwfvsdzawa";
const SUPABASE_URL = process.env.SUPABASE_URL || `https://${PROJECT_REF}.supabase.co`;
const PAT = process.env.SUPABASE_ACCESS_TOKEN || process.env.SUPABASE_PAT || "";
if (!PAT) {
  console.error("❌ SUPABASE_ACCESS_TOKEN or SUPABASE_PAT environment variable is required.");
  process.exit(1);
}
const BASE = `${SUPABASE_URL}/storage/v1/object/public/pharmacy-images`;

// Get service role key
const keysRes = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/api-keys`, {
  headers: { Authorization: `Bearer ${PAT}` },
});
const keys = await keysRes.json();
const serviceKey = keys.find((k) => k.name === "service_role").api_key;
console.log("✅  Got service_role key\n");

// Run SQL via Management API
async function runSQL(sql) {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  const body = await res.json();
  if (!res.ok) throw new Error(`SQL failed: ${JSON.stringify(body)}`);
  return body;
}

// Step 1: Add image_url column (idempotent)
console.log("Step 1: Adding image_url column to services...");
await runSQL(`
  ALTER TABLE public.services
    ADD COLUMN IF NOT EXISTS image_url TEXT;
`);
console.log("  ✅  Column added (or already exists)\n");

// Step 2: Set image URLs per service key
const imageMap = {
  meds:     `${BASE}/medicines.jpg`,
  beauty:   `${BASE}/beauty-care.jpg`,
  baby:     `${BASE}/baby-care.jpg`,
  chronic:  `${BASE}/pharmacist.jpg`,
  delivery: `${BASE}/delivery.jpg`,
  consult:  `${BASE}/bp-check.jpg`,
};

console.log("Step 2: Updating image_url for each service...");
for (const [key, url] of Object.entries(imageMap)) {
  await runSQL(`UPDATE public.services SET image_url = '${url}' WHERE key = '${key}';`);
  console.log(`  ✅  ${key} → ${url}`);
}

// Step 3: Reload PostgREST schema cache
console.log("\nStep 3: Reloading PostgREST schema cache...");
await runSQL(`NOTIFY pgrst, 'reload schema';`);
console.log("  ✅  Schema cache reloaded\n");

// Step 4: Verify
console.log("Step 4: Verifying...");
const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/services?select=key,image_url`, {
  headers: {
    Authorization: `Bearer ${serviceKey}`,
    apikey: serviceKey,
  },
});
const rows = await checkRes.json();
rows.forEach((r) => console.log(`  ✅  ${r.key}: ${r.image_url}`));

console.log("\n🎉  Done! services.image_url is live.");


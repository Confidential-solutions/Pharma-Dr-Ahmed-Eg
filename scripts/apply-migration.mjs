import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlFileCandidates = [
  path.join(__dirname, "..", "database", "schema.sql"),
  path.join(__dirname, "..", "database", "supabase-setup-and-seed.sql"),
  path.join(__dirname, "..", "supabase-setup-and-seed.sql"),
];
const sqlFilePath = sqlFileCandidates.find(p => fs.existsSync(p)) || sqlFileCandidates[0];

const PROJECT_REF = "jqckzibvkggwfvsdzawa";
const token = process.env.SUPABASE_ACCESS_TOKEN || process.argv[2];

if (!token) {
  console.log("==================================================");
  console.log("Option A (Automated via Token):");
  console.log("Run: node scripts/apply-migration.mjs <YOUR_SUPABASE_PERSONAL_ACCESS_TOKEN>");
  console.log("(You can generate a token at https://supabase.com/dashboard/account/tokens)");
  console.log("==================================================");
  console.log("Option B (Direct in Browser - No token needed):");
  console.log("1. Open: https://supabase.com/dashboard/project/" + PROJECT_REF + "/sql/new");
  console.log("2. Copy all code from 'supabase-setup-and-seed.sql'");
  console.log("3. Paste and click 'Run'");
  console.log("==================================================");
  process.exit(0);
}

async function runMigration() {
  const sql = fs.readFileSync(sqlFilePath, "utf8");
  console.log(`Executing SQL migration on project ${PROJECT_REF}...`);

  try {
    const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`❌ Migration failed (${response.status}):`, err);
      process.exit(1);
    }

    console.log("✅ SQL migration applied successfully!");
    console.log("Verifying tables now...");
    const verifyModule = await import("./verify-supabase.mjs");
  } catch (err) {
    console.error("❌ Error executing migration:", err.message);
  }
}

runMigration();


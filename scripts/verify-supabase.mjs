const SUPABASE_URL = "https://jqckzibvkggwfvsdzawa.supabase.co";
const SUPABASE_KEY = "sb_publishable_QOjIqSJvhptTcEKprbizPQ_VkWjya8B";

const tablesToCheck = [
  "pharmacy_info",
  "services",
  "prescriptions",
  "contact_inquiries",
];

async function checkDatabase() {
  console.log("==================================================");
  console.log("Checking Supabase Database at:", SUPABASE_URL);
  console.log("==================================================");

  let successCount = 0;

  for (const table of tablesToCheck) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(`❌ Table '${table}': NOT FOUND or ERROR (${response.status}) -> ${error.message}`);
      } else {
        const data = await response.json();
        console.log(`✅ Table '${table}': OK (${data.length} row(s) seeded)`);
        if (data.length > 0) {
          console.log(`   Sample item:`, JSON.stringify(data[0]).substring(0, 100) + "...");
        }
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Table '${table}': Request failed`, err.message);
    }
  }

  console.log("==================================================");
  if (successCount === tablesToCheck.length) {
    console.log("🎉 All tables and seeds are ACTIVE and VERIFIED!");
  } else if (successCount === 0) {
    console.log("⚠️ No tables found yet. Please run `database/schema.sql` in your Supabase SQL Editor.");
    console.log("Direct Link: https://supabase.com/dashboard/project/jqckzibvkggwfvsdzawa/sql/new");
  } else {
    console.log(`⚠️ Partial setup: ${successCount}/${tablesToCheck.length} tables verified.`);
  }
  console.log("==================================================");
}

checkDatabase();


/**
 * Export the waitlist table to CSV for the beta-roster workflow.
 * Usage: DATABASE_URL=... npx tsx scripts/export-waitlist.ts [out.csv]
 */
import fs from "node:fs";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const out = process.argv[2] || `waitlist-export-${new Date().toISOString().slice(0, 10)}.csv`;

async function main() {
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  const { rows } = await pool.query<Record<string, string | number>>(
    "SELECT id, name, email, platform, platform_handle, primary_language, created_at FROM waitlist ORDER BY created_at"
  );
  await pool.end();

  const header = ["id", "name", "email", "platform", "platform_handle", "primary_language", "created_at"];
  const csvEscape = (v: string | number) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [header.join(","), ...rows.map((r) => header.map((h) => csvEscape(r[h])).join(","))].join("\n");

  fs.writeFileSync(out, csv, "utf8");
  console.log(`Exported ${rows.length} rows to ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

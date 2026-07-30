/**
 * Export the waitlist table to CSV for the beta-roster workflow.
 * Usage: npx tsx scripts/export-waitlist.ts [out.csv]
 */
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const dbPath = path.join(DATA_DIR, "waitlist.db");
if (!fs.existsSync(dbPath)) {
  console.error(`No database at ${dbPath}`);
  process.exit(1);
}

const out = process.argv[2] || `waitlist-export-${new Date().toISOString().slice(0, 10)}.csv`;
const db = new DatabaseSync(dbPath, { readOnly: true });
const rows = db
  .prepare(
    "SELECT id, name, email, platform, platform_handle, primary_language, created_at FROM waitlist ORDER BY created_at"
  )
  .all() as Record<string, string | number>[];

const header = ["id", "name", "email", "platform", "platform_handle", "primary_language", "created_at"];
const csvEscape = (v: string | number) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = [header.join(","), ...rows.map((r) => header.map((h) => csvEscape(r[h])).join(","))].join("\n");

fs.writeFileSync(out, csv, "utf8");
console.log(`Exported ${rows.length} rows to ${out}`);

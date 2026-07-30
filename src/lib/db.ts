import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

// node:sqlite (Node 22.5+) instead of better-sqlite3 — same synchronous API,
// no native build step on Windows or in the Docker image.
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

let db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (db) return db;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new DatabaseSync(path.join(DATA_DIR, "waitlist.db"));
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      platform TEXT NOT NULL,
      platform_handle TEXT NOT NULL,
      primary_language TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      ip_hash TEXT,
      user_agent TEXT
    );
  `);
  return db;
}

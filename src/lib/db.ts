import { Pool } from "pg";

// Postgres (Azure Database for PostgreSQL / Supabase). Uses a single shared
// pool across the serverless runtime. Azure Postgres requires SSL.
const connectionString = process.env.DATABASE_URL;

let pool: Pool | null = null;

export function getPool(): Pool {
  if (pool) return pool;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  pool = new Pool({
    connectionString,
    // Azure Postgres presents a CA-signed cert; require SSL but don't fail on
    // chain verification (App Service doesn't ship the Azure CA by default).
    ssl: { rejectUnauthorized: false },
    max: 5,
  });
  return pool;
}

/**
 * Ensures the waitlist table exists. Safe to call repeatedly (idempotent).
 * Called lazily on first insert so a fresh database self-provisions.
 */
let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = getPool()
    .query(
      `
      CREATE TABLE IF NOT EXISTS waitlist (
        id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name            TEXT NOT NULL,
        email           TEXT NOT NULL,
        platform        TEXT NOT NULL,
        platform_handle TEXT NOT NULL,
        primary_language TEXT NOT NULL,
        created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
        ip_hash         TEXT,
        user_agent      TEXT
      );
      CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_lower_idx
        ON waitlist (lower(email));
      `
    )
    .then(() => undefined)
    .catch((err) => {
      // Reset so a later request can retry provisioning.
      schemaReady = null;
      throw err;
    });
  return schemaReady;
}

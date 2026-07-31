import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { getPool, ensureSchema } from "@/lib/db";
import { allowRequest } from "@/lib/rate-limit";
import { LANGUAGES, WAITLIST } from "@/content/copy";

export const runtime = "nodejs";

const MIN_FILL_TIME_MS = 3000;

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  platform: z.enum(WAITLIST.platforms),
  platform_handle: z.string().trim().min(1).max(100),
  primary_language: z.enum(LANGUAGES),
  // Anti-spam
  website: z.string().optional(), // honeypot — a filled value gets fake success below
  started_at: z.number(),
});

// Generic success either way — no email enumeration.
// Must be a factory: a NextResponse body stream can only be sent once.
const genericOk = () => NextResponse.json({ ok: true });

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!allowRequest(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot filled or form submitted suspiciously fast → pretend success
  if ((data.website && data.website.length > 0) || Date.now() - data.started_at < MIN_FILL_TIME_MS) {
    return genericOk();
  }

  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 32);
  const userAgent = (req.headers.get("user-agent") || "").slice(0, 300);

  try {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO waitlist (name, email, platform, platform_handle, primary_language, ip_hash, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [data.name, data.email, data.platform, data.platform_handle, data.primary_language, ipHash, userAgent]
    );
  } catch (err: unknown) {
    // Unique violation (duplicate email, Postgres code 23505) →
    // same generic success, no enumeration.
    if (typeof err === "object" && err !== null && "code" in err && (err as { code?: string }).code === "23505") {
      return genericOk();
    }
    console.error("waitlist insert failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return genericOk();
}

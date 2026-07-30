/** Per-IP token bucket, in-memory (single-instance deploy per plan §11). */

type Bucket = { tokens: number; last: number };

const CAPACITY = 5;
const REFILL_PER_MS = 5 / 60_000; // 5 tokens per minute
const buckets = new Map<string, Bucket>();

export function allowRequest(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: CAPACITY, last: now };
  bucket.tokens = Math.min(CAPACITY, bucket.tokens + (now - bucket.last) * REFILL_PER_MS);
  bucket.last = now;
  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    return false;
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);

  // Opportunistic cleanup so the map doesn't grow unbounded
  if (buckets.size > 10_000) {
    buckets.forEach((b, k) => {
      if (now - b.last > 10 * 60_000) buckets.delete(k);
    });
  }
  return true;
}

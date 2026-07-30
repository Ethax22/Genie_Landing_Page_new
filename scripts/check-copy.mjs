/**
 * CI copy sweep — fails the build if banned marketing words appear in page copy.
 * Banned per spec: AI-powered | supercharge | unlock | revolutionise/-ize | seamless
 */
import fs from "node:fs";
import path from "node:path";

const BANNED = /AI-powered|supercharge|unlock|revolutioni[sz]e|seamless/i;
const ROOTS = ["src/content", "src/components", "src/app"];

let failures = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|mjs)$/.test(entry.name)) {
      const lines = fs.readFileSync(full, "utf8").split("\n");
      lines.forEach((line, i) => {
        const match = line.match(BANNED);
        if (match) {
          console.error(`BANNED WORD "${match[0]}" — ${full}:${i + 1}`);
          failures++;
        }
      });
    }
  }
}

for (const root of ROOTS) walk(root);

if (failures > 0) {
  console.error(`\nCopy sweep failed: ${failures} banned-word hit(s).`);
  process.exit(1);
}
console.log("Copy sweep clean — no banned words.");

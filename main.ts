import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I fire at 3 a.m. every night so your dashboard can look busy. From now on, the dashboard can look busy on its own.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 140) {
  console.error(`entry must be 1-140 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read back and verify the written file is byte-identical to the line:
const written = readFileSync(target, "utf8");
if (written !== LINE) {
  console.error("entry.txt does not match the entry line byte for byte");
  process.exit(1);
}
if (Buffer.byteLength(written, "utf8") !== 114) {
  console.error(`entry.txt is ${Buffer.byteLength(written, "utf8")} bytes, expected 114`);
  process.exit(1);
}

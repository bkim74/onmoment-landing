/**
 * scripts/gen-icons.mjs
 * OnMoment landing icon generator — matches PWA app identity
 * Usage: pnpm node scripts/gen-icons.mjs
 *
 * Output: public/icon-192.png, icon-512.png, apple-touch-icon.png, favicon.ico
 */
import { createRequire } from "module";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dir = dirname(fileURLToPath(import.meta.url));
const pub = join(__dir, "..", "public");

// Matches PWA app: ivory italic O on #151411
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#151411"/>
  <ellipse
    cx="256" cy="256"
    rx="92" ry="124"
    stroke="#F5EDE0"
    stroke-width="20"
    fill="none"
    transform="rotate(-8, 256, 256)"
  />
</svg>`;

const buf = Buffer.from(SVG);

const sizes = [
  { name: "icon-192.png",         size: 192 },
  { name: "icon-512.png",         size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(buf)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(join(pub, name));
  console.log(`✓ ${name} (${size}×${size})`);
}

// favicon.ico: 32×32 PNG renamed — browsers accept PNG ico
const faviconPng = await sharp(buf).resize(32, 32).png().toBuffer();
writeFileSync(join(pub, "favicon.ico"), faviconPng);
console.log("✓ favicon.ico (32×32)");

console.log("Done — public/icon-192.png · icon-512.png · apple-touch-icon.png · favicon.ico");

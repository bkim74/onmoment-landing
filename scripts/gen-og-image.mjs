/**
 * og-image.png 생성 스크립트 (onmoment.kr 랜딩용)
 * 사용: node scripts/gen-og-image.mjs
 */

import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dir, "../public/og-image.png");

const W = 1200, H = 630;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#F4EFE6"/>

  <text x="88" y="88"
    font-family="monospace" font-size="17" fill="#8B7355" letter-spacing="3.2">ON MOMENT — DAILY OFFERING</text>
  <line x1="88" y1="106" x2="296" y2="106" stroke="#D9CCB3" stroke-width="1"/>

  <text x="88" y="244"
    font-family="Noto Serif KR Medium, Noto Serif KR" font-size="102"
    fill="#1C1A17" letter-spacing="-1">오늘이</text>
  <text x="88" y="355"
    font-family="Noto Serif KR Medium, Noto Serif KR" font-size="102"
    fill="#1C1A17" letter-spacing="-1">선물이 되도록.</text>

  <text x="90" y="438"
    font-family="Cormorant Garamond Medium, Cormorant Garamond" font-size="68"
    font-style="italic" font-weight="500" fill="#5A4A3A">Turn On</text>
  <text x="90" y="513"
    font-family="Cormorant Garamond Medium, Cormorant Garamond" font-size="68"
    font-style="italic" font-weight="500" fill="#5A4A3A">the Whole You.</text>

  <text x="88" y="592"
    font-family="monospace" font-size="15" fill="#8B7355" letter-spacing="1">onmoment.kr</text>
  <text x="${W - 88}" y="592"
    font-family="Noto Serif KR Medium, Noto Serif KR" font-size="17"
    fill="#5A4A3A" text-anchor="end" letter-spacing="3">온순간</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`✓ og-image.png → ${OUT}`);

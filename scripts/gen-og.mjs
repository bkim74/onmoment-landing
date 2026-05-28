import sharp from "sharp";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "og-image.png");

const W = 1200;
const H = 630;

// OnMoment Anti-Dopamine palette
const PAPER   = "#F5EDE0";
const COFFEE  = "#3D2817";
const WOOD    = "#8B6F47";
const CURTAIN = "#F0E5D0";

const svg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${W}" height="${H}"
  viewBox="0 0 ${W} ${H}">

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${PAPER}"/>

  <!-- Subtle border frame -->
  <rect x="32" y="32" width="${W - 64}" height="${H - 64}"
        fill="none" stroke="${CURTAIN}" stroke-width="1"/>

  <!-- Eyebrow -->
  <text
    x="84" y="112"
    font-family="Georgia, serif"
    font-size="12"
    letter-spacing="4"
    fill="${WOOD}"
    opacity="0.7">온순간 · SOUL OASIS</text>

  <!-- Hairline divider top -->
  <line x1="84" y1="130" x2="340" y2="130"
        stroke="${CURTAIN}" stroke-width="1"/>

  <!-- Main headline line 1 -->
  <text
    x="84" y="290"
    font-family="Georgia, 'Noto Serif KR', serif"
    font-size="76"
    font-weight="400"
    fill="${COFFEE}"
    letter-spacing="-1">오늘이 선물이 되도록,</text>

  <!-- Main headline line 2 — indented, heavier weight -->
  <text
    x="84" y="390"
    font-family="Georgia, 'Noto Serif KR', serif"
    font-size="88"
    font-weight="400"
    fill="${COFFEE}"
    letter-spacing="-2">한 줄.</text>

  <!-- Sub copy -->
  <text
    x="84" y="460"
    font-family="Georgia, 'Noto Serif KR', serif"
    font-size="20"
    font-weight="300"
    fill="${WOOD}"
    opacity="0.85">하루 한 줄. 내일 다시 만나는 나.</text>

  <!-- Hairline divider bottom -->
  <line x1="84" y1="496" x2="260" y2="496"
        stroke="${CURTAIN}" stroke-width="1"/>

  <!-- Domain -->
  <text
    x="84" y="524"
    font-family="Georgia, serif"
    font-size="13"
    letter-spacing="2"
    fill="${WOOD}"
    opacity="0.45">onmoment.kr</text>

  <!-- Depth line — right aligned -->
  <text
    x="${W - 84}" y="${H - 60}"
    font-family="Georgia, serif"
    font-size="13"
    text-anchor="end"
    fill="${WOOD}"
    opacity="0.3">오늘이 나에게 돌아오는 곳.</text>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf, { density: 144 })
  .png()
  .resize(W, H, { fit: "fill" })
  .toFile(OUT);

console.log(`og-image.png → ${OUT} (${W}×${H})`);

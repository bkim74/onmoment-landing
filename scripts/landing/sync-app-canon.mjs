// 앱 정본(canon.js JOURNEYS) → lib/landing/appCanon.json 스냅샷. 사용: node scripts/landing/sync-app-canon.mjs <canon.js 경로>
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";

const src = process.argv[2];
if (!src) { console.error("usage: sync-app-canon.mjs <path/to/canon.js>"); process.exit(2); }
const abs = resolve(src);
// canon.js 는 package type 이 없을 수 있어 .mjs 사본으로 읽는다
const tmp = resolve(process.env.TMPDIR || tmpdir(), `canon-${process.pid}.mjs`);
writeFileSync(tmp, readFileSync(abs, "utf8"));
const { JOURNEYS, JOURNEY_LIST } = await import(pathToFileURL(tmp).href);
const order = (JOURNEY_LIST || Object.values(JOURNEYS)).map((j) => j.id);
const journeys = order.map((k) => {
  const j = JOURNEYS[k];
  return { key: j.id, label: j.label, short: j.short, moments: j.moments.map((m) => ({ id: m.id, label: m.label })) };
});
const out = { source: abs.split("/").slice(-6).join("/"), syncedAt: new Date().toISOString(), journeys };
const dest = resolve(dirname(fileURLToPath(import.meta.url)), "../../lib/landing/appCanon.json");
writeFileSync(dest, JSON.stringify(out, null, 2) + "\n");
console.log(`wrote ${dest} (${journeys.length} journeys: ${order.join(", ")})`);

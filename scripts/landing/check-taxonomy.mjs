// 여정 분류 하나: giftV5.json · gift-v6 journeys.js · landing.js occasions 가 appCanon.json 키/상황 id 안에 있는지 검사
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const rd = (p) => readFileSync(resolve(root, p), "utf8");
const canon = JSON.parse(rd("lib/landing/appCanon.json"));
const keys = new Set(canon.journeys.map((j) => j.key));
const moments = Object.fromEntries(canon.journeys.map((j) => [j.key, new Set(j.moments.map((m) => m.id))]));
const errors = [];
// 패키지 전용 키(여정 안의 한 행사로 가는 입구) → [앱 여정, 행사]
const PACKAGE_ALIAS = { teen: ["beginnings", "adolescence"] };
const known = (k) => keys.has(k) || k in PACKAGE_ALIAS;
for (const [k, [j, o]] of Object.entries(PACKAGE_ALIAS)) if (!keys.has(j) || !moments[j].has(o)) errors.push(`alias "${k}" -> ${j}/${o} not in appCanon`);

const v5 = Object.keys(JSON.parse(rd("lib/landing/giftV5.json")).journeys);
for (const k of v5) if (!keys.has(k)) errors.push(`giftV5.json journeys: "${k}" not in appCanon`);

const ctx = { window: {} };
vm.runInNewContext(rd("public/gift-v6/journeys.js"), ctx);
const v6 = Object.keys(ctx.window.ONMOMENT_JOURNEYS || {});
for (const k of v6) if (!known(k)) errors.push(`gift-v6/journeys.js: "${k}" not in appCanon`);

const src = rd("public/gift-v6/landing.js");
const m = src.match(/const occasions=(\{[\s\S]*?\}\]?\});/) || src.match(/const occasions=(\{.*?\]\]\})/);
const occ = {};
if (!m) errors.push("landing.js: occasions map not found");
else {
  const map = vm.runInNewContext("(" + m[1] + ")");
  for (const [k, list] of Object.entries(map)) {
    if (!known(k)) errors.push(`landing.js occasions: journey "${k}" not in appCanon`);
    occ[k] = list.map((x) => x[0]);
    for (const id of occ[k]) if (id !== "other" && !((moments[PACKAGE_ALIAS[k]?.[0] || k]) && moments[PACKAGE_ALIAS[k]?.[0] || k].has(id))) errors.push(`landing.js occasions.${k}: "${id}" not in canon moments of ${k}`);
  }
}

console.log(`canon keys (${keys.size}): ${[...keys].join(", ")}`);
console.log(`giftV5.json journeys (${v5.length}): ${v5.join(", ")}`);
console.log(`gift-v6 journeys.js (${v6.length}): ${v6.join(", ")}`);
for (const [k, l] of Object.entries(occ)) console.log(`landing.js occasions.${k}: ${l.join(", ")}`);
if (errors.length) { console.error("\nFAIL\n" + errors.map((e) => " - " + e).join("\n")); process.exit(1); }
console.log("\nOK taxonomy matches appCanon");

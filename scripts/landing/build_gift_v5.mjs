// 이야기 선물 일곱 여정 랜딩 — 시안 v5(public/gift-v5/landing.mjs · journeys.mjs, 원본 그대로)를 미리 그려 lib/landing/giftV5.json 으로.
//   운영 범위 맞춤 · 실제 주소 잇기는 public/gift-v5/realize.mjs 한 곳. 화면 안 다시 그리기(client.mjs)도 같은 함수를 쓴다.
//   실행: node scripts/landing/build_gift_v5.mjs
import { writeFileSync } from "node:fs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
const pub = new URL("../../public/gift-v5/", import.meta.url);
// 이야기 초상 예시의 단일 출처 = public/gift-v6/journeys.js (화면에서는 같은 파일을 읽는다)
{ const ctx = { window: {} }; vm.runInNewContext(readFileSync(fileURLToPath(new URL("../../public/gift-v6/journeys.js", import.meta.url)), "utf8"), ctx); globalThis.ONMOMENT_JOURNEYS = ctx.window.ONMOMENT_JOURNEYS; }
// 행사별 이야기 초상 · FAQ 덮어쓰기의 단일 출처 = lib/landing/momentPortrait.json (화면에서는 페이지에 실린 같은 JSON)
globalThis.ONMOMENT_MOMENT_PORTRAIT = JSON.parse(readFileSync(fileURLToPath(new URL("../../lib/landing/momentPortrait.json", import.meta.url)), "utf8"));
const { hubHTML, journeyHTML } = await import(new URL("landing.mjs", pub));
const { JOURNEY_LIST } = await import(new URL("journeys.mjs", pub));
const { realize, header, footer } = await import(new URL("realize.mjs", pub));
const { howHTML } = await import(new URL("how.mjs", pub));

const out = { header: header(), footer: footer(), hub: realize(hubHTML(), { page: "hub" }), how: howHTML(), journeys: {}, meta: {} };
for (const j of JOURNEY_LIST) {
  out.journeys[j.id] = realize(journeyHTML(j.id, {}), { page: j.id });
  out.meta[j.id] = { title: `${j.label} | 온순간`, description: j.short, number: j.number };
}
if ((out.hub.match(/how-entry/g) || []).length !== 1 || Object.values(out.journeys).some((h) => (h.match(/how-entry/g) || []).length !== 1)) { console.error("역할별 안내 입구가 한 곳씩 들어가지 않았어요"); process.exit(1); }
const left = JSON.stringify(out).match(/#journey\/|#conditions|#mine|file:\/\/|사진과 글|결제되지 않아요|체험해 주세요/g);
if (left) { console.error("남은 시안 표현:", [...new Set(left)]); process.exit(1); }
writeFileSync(fileURLToPath(new URL("../../lib/landing/giftV5.json", import.meta.url)), JSON.stringify(out));
console.log("giftV5.json", Object.keys(out.journeys).join(" "), Math.round(JSON.stringify(out).length / 1024) + "KB");

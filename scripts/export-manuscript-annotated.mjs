// 깊이 9편 → "개작용" 원고: 핵심 지점에 편집 마커를 인라인 삽입.
// 마커를 보고 본인 경험·표현으로 고친 뒤 마커 줄을 지우면 등록용 원고가 됩니다.
import { getDepthSequence } from "../app/journal/articles.ts";
import { writeFileSync, mkdirSync } from "node:fs";

// 슬러그별 [정확한 본문 줄] → 마커. 그 줄 "다음"에 마커를 끼워 넣는다.
const NOTES = {
  "soul-mirror": {
    "오래 알던 사람의 낯선 표정": "🟡 본인이 실제로 ‘설명 못 할 경외’를 느낀 장면 1~2개로 교체(언제·어디서·무엇을 봤는지).",
    "난 나를 진정 아는가.": "🔴 글의 심장 문장 — 같은 질문을 본인 말투로 다시 쓰기.",
  },
  "ritual-and-the-real": {
    "창밖의 빛이 잠깐 달라 보였다는 것": "🟡 오늘 당신의 실제 디테일 2~3개로 교체.",
    "리추얼은 조금 다릅니다.": "🔴 ‘나에게 리추얼이란’을 본인 정의·말로.",
  },
  "vulnerability-and-connection": {
    "결국 멀어질까 봐.": "🟡 당신이 실제로 감췄던 약함과 그 두려움으로.",
    "관계를 약하게 만들지 않습니다.": "🔴 본인 경험에서 나온 표현으로.",
  },
  "the-life-behind-a-line": {
    "그릇이 아니라 열쇠에 가깝습니다.": "🔴 비유를 ‘당신의 비유’로 교체(독창적 비유=강한 인간창작 신호).",
    "통째로 돌아올 때가 있습니다.": "🟡 한 줄 덕에 하루가 통째로 돌아온 본인 실제 사례.",
  },
  "when-what-we-received-overflows": {
    "이유 없이 따뜻했던 한순간": "🟡 당신의 실제 ‘받은 순간’으로 교체.",
    "가득 찬 잔은": "🟢 비유를 본인 이미지로 바꿔도 좋음.",
  },
  "how-far-does-connection-reach": {
    "계절과 빛과 공기.": "🟡 당신의 실제 관계 지도(구체 대상)로.",
    "누군가는 이름 붙이지 않은 채 둡니다.": "🔴 신(神)·초월 부분 — 본인 신념·표현으로 직접 결정해 쓰기(개인 영역).",
  },
  "the-quiet-way-change-comes": {
    "그리고 오늘의 작은 선택 하나.": "🟡 당신의 변화에 실제로 작용한 조건들로.",
    "발견할 때.": "🟡 당신이 ‘어느새 변해 있던’ 실제 순간.",
  },
  "love-that-carries-weakness-forward": {
    "약함을 감추지 않아도 되게 합니다.": "🔴 이 책의 핵심 명제 — 반드시 본인 표현으로.",
    "누군가에게 건너가는 것.": "🟡 사랑의 세 방향에 각각 당신의 실제 경험 한 조각.",
  },
  "so-today-becomes-a-gift": {
    "그렇게 부릅니다.": "🟡 오늘을 선물로 느낀(혹은 못 느낀) 본인 경험으로.",
    "이미 건네진 시간일지 모릅니다.": "🟢 이미 본인이 준 중심 문장 — 유지하거나 더 다듬기.",
  },
};

const RULE = "─".repeat(40);
const out = [];

out.push("온순간 — 깊이 저널 9편 · ✍️ 개작(편집)용 원고");
out.push("");
out.push("【사용법】 ⟦✍️ … ⟧ 마커가 ‘여기를 본인 표현으로’ 지점입니다.");
out.push("고쳐 쓴 뒤 마커 줄을 지우면 그대로 저작권 등록용 원고가 됩니다.");
out.push("【마커】 🔴 반드시 본인 표현(핵심 명제·비유)  🟡 본인 경험·구체 장면 삽입  🟢 말투·이미지 다듬기(선택)");
out.push("【가장 효율 높은 2가지】① ‘예시 나열’을 전부 당신의 실제 장면(이름·장소·감각)으로  ② 각 편의 핵심 한 문장을 본인 말로.");
out.push("");

for (const a of getDepthSequence()) {
  const notes = NOTES[a.slug] ?? {};
  out.push(RULE);
  out.push(`${a.number}. ${a.title}`);
  if (a.subtitle) out.push(`— ${a.subtitle}`);
  out.push("");

  for (const block of a.paragraphs) {
    if (!Array.isArray(block)) {
      out.push(`        · ${block.overline} ·`);
      out.push("");
      continue;
    }
    if (block.length === 0) { out.push(""); continue; }
    for (const line of block) {
      out.push(line);
      if (notes[line]) out.push(`   ⟦✍️ ${notes[line]} ⟧`);
    }
    out.push("");
  }
  out.push("");
}

const text = out.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";
mkdirSync("copyright", { recursive: true });
writeFileSync("copyright/온순간-깊이저널-9편-편집용.md", text, "utf8");

// 마커가 모두 박혔는지 검증
const placed = (text.match(/⟦✍️/g) || []).length;
const expected = Object.values(NOTES).reduce((n, m) => n + Object.keys(m).length, 0);
console.log(`✓ copyright/온순간-깊이저널-9편-편집용.md`);
console.log(`  마커 ${placed}/${expected} 삽입`);
if (placed !== expected) console.log("  ⚠️ 일부 앵커 문자열 불일치 — 확인 필요");

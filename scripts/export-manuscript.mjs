// 깊이 저널 9편 → 어문저작물 등록용 단일 원고로 렌더.
// echo/bridge(=화면 연결부)는 저작물 본문이 아니므로 제외. 제목·부제·본문만.
import { getDepthSequence } from "../app/journal/articles.ts";
import { writeFileSync, mkdirSync } from "node:fs";

const RULE = "─".repeat(40);
const out = [];

out.push("온순간 — 깊이 저널 (책 1부 「한 겹 더 안에서」)");
out.push("어문저작물 · 전 9편 합본");
out.push("");

const essays = getDepthSequence();
for (const a of essays) {
  out.push(RULE);
  out.push(`${a.number}. ${a.title}`);
  if (a.subtitle) out.push(`— ${a.subtitle}`);
  out.push("");

  for (const block of a.paragraphs) {
    if (!Array.isArray(block)) {
      // 섹션 오버라인
      out.push(`        · ${block.overline} ·`);
      out.push("");
      continue;
    }
    if (block.length === 0) {
      out.push(""); // 단락 사이 추가 여백
      continue;
    }
    for (const line of block) {
      out.push(line); // "" 는 빈 줄로 그대로
    }
    out.push(""); // 단락 끝 빈 줄
  }
  out.push("");
}

const text = out.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";

mkdirSync("copyright", { recursive: true });
writeFileSync("copyright/온순간-깊이저널-9편-원고.md", text, "utf8");

const chars = text.replace(/\s/g, "").length;
console.log(`✓ 작성: copyright/온순간-깊이저널-9편-원고.md`);
console.log(`  편수: ${essays.length} · 총 ${text.split("\n").length}줄 · 공백제외 ${chars}자`);
console.log("  제목들:");
for (const a of essays) console.log(`   ${a.number}. ${a.title}`);

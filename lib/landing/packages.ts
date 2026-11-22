import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

// 메인 #packages 카드의 데이터 — 단일 출처는 public/gift-v6/prices.js(가격 · pain · 추천 묶음) · journeys.js(이름).
//   빌드 때 같은 파일을 vm 으로 읽는다(scripts/landing/build_gift_v5.mjs 와 같은 방식).
type Opt = { label: string; price: number; unit: "set" | "per"; min?: number };
type Prices = { options: Record<string, Opt>; bundles: Record<string, { recommended: string[] }>; pain: Record<string, string> };

function load<T>(file: string, key: string): T {
  const ctx: { window: Record<string, unknown> } = { window: {} };
  vm.runInNewContext(readFileSync(path.join(process.cwd(), "public/gift-v6", file), "utf8"), ctx);
  return ctx.window[key] as T;
}

export type PackageCard = { key: string; name: string; pain: string; chips: string[]; from: number; img: string };

const ORDER = ["parents", "beginnings", "retire", "together", "couple", "remember", "self", "teen"];

export function getPackages(): PackageCard[] {
  const prices = load<Prices>("prices.js", "ONMOMENT_PRICES");
  const journeys = load<Record<string, { label: string }>>("journeys.js", "ONMOMENT_JOURNEYS");
  return ORDER.map((key) => {
    const rec = prices.bundles[key].recommended;
    const from = rec.reduce((sum, k) => {
      const o = prices.options[k];
      return sum + (o.unit === "per" ? o.price * (o.min ?? 0) : o.price);
    }, 0);
    return {
      key,
      name: `${journeys[key].label} 패키지`,
      pain: prices.pain[key],
      chips: rec.map((k) => prices.options[k].label),
      from,
      img: key === "teen" ? "/teen-portrait/ice.webp" : `/gift-v6/story-${key}.webp`,
    };
  });
}

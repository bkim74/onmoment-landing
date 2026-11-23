import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

// 메인 #packages 카드의 데이터 — 단일 출처는 public/gift-v6/prices.js(가격 · pain · 추천 묶음) · journeys.js(이름).
//   빌드 때 같은 파일을 vm 으로 읽는다(scripts/landing/build_gift_v5.mjs 와 같은 방식).
type Opt = { label: string; price: number; unit: "set" | "per"; min?: number };
type Prices = {
  options: Record<string, Opt>;
  bundles: Record<string, { recommended: string[]; more?: string[] }>;
  pain: Record<string, string>;
  journeyCopy?: Record<string, { optLabel?: Record<string, string> }>;
};
type Gallery = { role: string; alt: string; mobile?: { src: string; width: number; height: number }; src: string; width: number; height: number };
type Manifest = { disclosure: string; journeys: Record<string, { product: string; gallery: Gallery[] }> };

function load<T>(file: string, key: string): T {
  const ctx: { window: Record<string, unknown> } = { window: {} };
  vm.runInNewContext(readFileSync(path.join(process.cwd(), "public/gift-v6", file), "utf8"), ctx);
  return ctx.window[key] as T;
}

export type PackageCard = {
  key: string; name: string; pain: string;
  from: number; item: string; // 실물 가장 작은 값 · 그 상품 이름
  product: string; caption: string; img: { src: string; width: number; height: number; alt: string };
};

const ORDER = ["parents", "beginnings", "retire", "together", "couple", "remember", "self", "teen"];

// 한 상품의 가장 작은 결제 합계 — 세트는 가격 그대로, 개당은 가격 × 최소 수량.
const minTotal = (o: Opt) => (o.unit === "per" ? o.price * (o.min ?? 1) : o.price);

export function getPackages(): PackageCard[] {
  const prices = load<Prices>("prices.js", "ONMOMENT_PRICES");
  const journeys = load<Record<string, { label: string }>>("journeys.js", "ONMOMENT_JOURNEYS");
  const manifest = JSON.parse(readFileSync(path.join(process.cwd(), "public/onmoment-gifts/v2/manifest.ko.json"), "utf8")) as Manifest;
  return ORDER.map((key) => {
    const b = prices.bundles[key];
    const ids = Array.from(new Set([...b.recommended, ...(b.more ?? [])]));
    let best = ids[0];
    for (const id of ids) if (minTotal(prices.options[id]) < minTotal(prices.options[best])) best = id;
    const j = manifest.journeys[key];
    const scene = j.gallery.find((g) => g.role === "scene") ?? j.gallery[0];
    const m = scene.mobile ?? scene;
    return {
      key,
      name: `${journeys[key].label} 패키지`,
      pain: prices.pain[key],
      from: minTotal(prices.options[best]),
      item: prices.journeyCopy?.[key]?.optLabel?.[best] ?? prices.options[best].label,
      product: j.product,
      caption: manifest.disclosure,
      img: { src: m.src, width: m.width, height: m.height, alt: scene.alt },
    };
  });
}

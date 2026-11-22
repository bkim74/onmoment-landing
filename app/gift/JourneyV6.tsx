"use client";

import { useEffect, useRef } from "react";

// 여정 A/B 랜딩 v6 — 바닐라 렌더러(public/gift-v6/landing.js)를 이 래퍼 안에서만 그린다.
//   스타일은 .om-gift-v6 안으로 가둬 다른 페이지로 새지 않는다. 낮/밤은 시스템 설정을 따른다.
type R = (root: HTMLElement, journey: string, variant: string) => void;
type W = Window & { ONMOMENT_JOURNEYS?: unknown; ONMOMENT_RENDER?: R };

function load(src: string, ready: () => boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    if (ready()) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    const s = existing ?? document.createElement("script");
    s.addEventListener("load", () => resolve(), { once: true });
    s.addEventListener("error", () => reject(new Error(src)), { once: true });
    if (!existing) {
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
    }
  });
}

export default function JourneyV6({ journey, variant }: { journey: string; variant: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = window as W;
    let alive = true;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => el.classList.toggle("dark", mq.matches);
    apply();
    mq.addEventListener("change", apply);
    (async () => {
      try {
        await load("/gift-v6/journeys.js", () => !!w.ONMOMENT_JOURNEYS);
        await load("/gift-v6/prices.js", () => !!(w as W & { ONMOMENT_PRICES?: unknown }).ONMOMENT_PRICES);
        await load("/gift-v6/landing.js", () => !!w.ONMOMENT_RENDER);
        if (alive && w.ONMOMENT_RENDER) {
          el.innerHTML = "";
          w.ONMOMENT_RENDER(el, journey, variant);
        }
      } catch {
        /* 스크립트를 못 불러오면 빈 화면 대신 아래 안내 */
        if (alive) el.innerHTML = "<p style='padding:60px 24px;text-align:center'>화면을 불러오지 못했어요. 새로고침해 주세요.</p>";
      }
    })();
    return () => {
      alive = false;
      mq.removeEventListener("change", apply);
    };
  }, [journey, variant]);

  return (
    <>
      <link rel="stylesheet" href="/gift-v6/landing.css" precedence="default" />
      <div id="app" ref={ref} className="om-gift-v6" data-journey={journey} data-variant={variant} />
    </>
  );
}

"use client";

import { useState } from "react";

/**
 * §01 시그니처 Reveal — 두 층 웹의 첫 문턱.
 * 표면은 고요(영혼·경외·신 명사 0), 열기로 선택한 사람에게만 깊이층으로 잇는다.
 * 기본 닫힘 · button + aria-expanded · 키보드 접근 · 0.6s 베일 페이드(reduced-motion이면 즉시).
 */
export default function DepthReveal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 flex flex-col items-center text-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="depth-reveal-why-one-line"
        className="text-[12px] tracking-[0.14em] text-wood-natural/50 transition-colors duration-300 hover:text-wood-natural"
      >
        {open ? "· 다시 접기 ·" : "· 한 겹 더 들여다보기 ·"}
      </button>

      <div
        id="depth-reveal-why-one-line"
        aria-hidden={!open}
        className={`grid w-full max-w-[24rem] transition-all duration-[600ms] ease-out motion-reduce:transition-none ${
          open ? "mt-7 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {/* 베일 — 열릴 때 가늘게 걷힌다 */}
          <div className="mx-auto mb-6 h-px w-10 bg-wood-natural/25" />

          <div className="om-ko space-y-3 text-[14.5px] leading-[1.9] text-coffee-deep/70">
            <p>난 나를 진정 아는가.</p>
            <p>
              우리는 종종 괜찮다고 말하며,
              <br />
              정작 내 안에서 일어난 일은 지나칩니다.
            </p>
            <p>한 줄은 그 앞에 잠시 멈춰 서게 합니다.</p>
          </div>

          <a
            href="/journal/soul-mirror"
            tabIndex={open ? 0 : -1}
            className="om-ko mt-7 inline-block text-[12.5px] text-wood-natural/60 underline underline-offset-4 transition-colors hover:text-wood-natural"
          >
            더 깊이 들여다보기 →
          </a>
        </div>
      </div>
    </div>
  );
}

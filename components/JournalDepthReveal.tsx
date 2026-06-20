"use client";

import { useState, type ReactNode } from "react";

/**
 * /journal 깊이층 인-페이지 reveal — 두 층 웹의 두 번째 문턱.
 * 표면(제품-경험) 글이 먼저 서고, 깊이 묶음("한 겹 더 안에서")은
 * 열기로 선택한 사람에게만 펼쳐진다. 기본 닫힘 · button + aria-expanded ·
 * 닫힘 시 inert(포커스/포인터 제거) · 0.6s 베일 페이드(reduced-motion이면 즉시).
 */
export default function JournalDepthReveal({
  eyebrow,
  description,
  children,
}: {
  eyebrow: string;
  description: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mb-16">
      <div className="flex flex-col items-center text-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="journal-depth-collection"
          className="text-[12px] tracking-[0.14em] text-wood-natural/50 transition-colors duration-300 hover:text-wood-natural"
        >
          {open ? "· 다시 접기 ·" : "· 한 겹 더 안에서 ·"}
        </button>

        <div
          id="journal-depth-collection"
          inert={!open}
          className={`grid w-full transition-all duration-[600ms] ease-out motion-reduce:transition-none ${
            open ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {/* 베일 — 열릴 때 가늘게 걷힌다 */}
            <div className="mx-auto mb-7 h-px w-10 bg-wood-natural/25" />
            <div className="mb-6 text-left">
              <p className="eyebrow mb-2">{eyebrow}</p>
              <p className="om-ko text-sm leading-relaxed text-coffee-deep/50">
                {description}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

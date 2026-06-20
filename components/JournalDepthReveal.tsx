"use client";

import { useState } from "react";
import Link from "next/link";

type SpineItem = { slug: string; number: string; title: string };
type SpineAct = { numeral: string; label: string; items: SpineItem[] };

/**
 * /journal 깊이층 입구 — 두 층 웹의 두 번째 문턱.
 * 9편 목록을 들이밀지 않는다. 열면 첫 글로 들어가는 "문" 하나만 서고,
 * 전체 차례는 기본 닫힘의 작은 구조도("이 흐름의 차례")로만 발견된다.
 * 진행표·완독·카운터 없음 · 강제순서 없음(점프 자유).
 * 기본 닫힘 · button + aria-expanded · 닫힘 시 inert · 0.6s 베일(reduced-motion 즉시).
 */
export default function JournalDepthReveal({
  eyebrow,
  framing,
  enterLabel,
  spineLabel,
  entry,
  acts,
}: {
  eyebrow: string;
  framing: string[];
  enterLabel: string;
  spineLabel: string;
  entry: { slug: string; title: string };
  acts: SpineAct[];
}) {
  const [open, setOpen] = useState(false);
  const [spineOpen, setSpineOpen] = useState(false);

  return (
    <section className="mb-16">
      <div className="flex flex-col items-center text-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="journal-depth-doorway"
          className="text-[12px] tracking-[0.14em] text-wood-natural/50 transition-colors duration-300 hover:text-wood-natural"
        >
          {open ? "· 다시 접기 ·" : `· ${eyebrow} ·`}
        </button>

        <div
          id="journal-depth-doorway"
          inert={!open}
          className={`grid w-full max-w-[28rem] transition-all duration-[600ms] ease-out motion-reduce:transition-none ${
            open ? "mt-9 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {/* 베일 — 열릴 때 가늘게 걷힌다 */}
            <div className="mx-auto mb-8 h-px w-10 bg-wood-natural/25" />

            {/* 프레이밍 — 목록이 아니라 한 겹 안의 분위기 */}
            <div className="om-serif space-y-1 text-[15px] leading-[1.9] text-coffee-deep/65">
              {framing.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* 문 — 첫 글 한 편으로 들어가는 입구 */}
            <Link
              href={`/journal/${entry.slug}`}
              className="group mt-9 block rounded-2xl border border-curtain-soft bg-curtain-soft/30 px-7 py-7 text-left transition-colors hover:border-wood-natural/30 hover:bg-curtain-soft/60"
            >
              <h3 className="om-ko mb-3 text-[18px] font-semibold leading-snug text-coffee-deep group-hover:text-ink-quiet sm:text-[20px]">
                {entry.title}
              </h3>
              <span className="om-ko text-[12.5px] text-wood-natural/60 transition-colors group-hover:text-wood-natural">
                {enterLabel} →
              </span>
            </Link>

            {/* 이 흐름의 차례 — 기본 닫힘 · 발견되는 등뼈(진행표 아님) */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setSpineOpen((v) => !v)}
                aria-expanded={spineOpen}
                aria-controls="journal-depth-spine"
                className="text-[11px] tracking-[0.14em] text-wood-natural/40 transition-colors duration-300 hover:text-wood-natural"
              >
                {spineOpen ? "· 차례 접기 ·" : `· ${spineLabel} ·`}
              </button>

              <div
                id="journal-depth-spine"
                inert={!spineOpen}
                className={`grid transition-all duration-[600ms] ease-out motion-reduce:transition-none ${
                  spineOpen ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden text-left">
                  <ol className="space-y-6">
                    {acts.map((act) => (
                      <li key={act.numeral}>
                        <p className="eyebrow mb-2 text-wood-natural/45">
                          {act.numeral} · {act.label}
                        </p>
                        <ul className="space-y-1.5">
                          {act.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                href={`/journal/${item.slug}`}
                                className="om-ko text-[13.5px] leading-relaxed text-coffee-deep/65 transition-colors hover:text-coffee-deep"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

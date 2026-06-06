import Link from "next/link";
import { LocalizedResponsiveLines } from "@/components/ResponsiveLines";
import { HERO_TITLE, HERO_SUB } from "@/lib/lineContracts";
import { ARTICLES } from "./journal/articles";

const APP = "https://app.onmoment.kr";

// ── Tab nav ──────────────────────────────────────────────────────────────────
const TABS = [
  { label: "왜 한 줄인가",   href: "#why-one-line"  },
  { label: "나만의 공간",    href: "#private-space" },
  { label: "카드에서 책까지", href: "#card-to-book"  },
  { label: "신뢰와 데이터",  href: "#trust-data"    },
  { label: "저널",           href: "#journal"       },
  { label: "시작하기",       href: "#start"         },
];

// ── Section 01 ───────────────────────────────────────────────────────────────
const WHY_CARDS = [
  { title: "내려놓음",   desc: "머릿속에 맴도는 장면을 한 문장으로 밖에 놓습니다" },
  { title: "정직함",     desc: "긴 설명보다 한 문장이 더 솔직할 때가 있습니다" },
  { title: "회귀",       desc: "오늘의 문장이 내일의 나에게 다시 돌아옵니다" },
  { title: "발견",       desc: "며칠의 한 줄 사이에서 자주 돌아오는 마음이 보입니다" },
];

// ── Section 02 ───────────────────────────────────────────────────────────────
const SPACE_CARDS = [
  { title: "점수보다 이야기",  desc: "오늘의 마음은 평가가 아니라 기록으로 남습니다" },
  { title: "진단보다 비춤",   desc: "온순간은 마음을 단정하지 않고, 다시 볼 수 있게 돕습니다" },
  { title: "연속보다 리듬",   desc: "매일 해야 한다는 압박보다 나의 리듬을 먼저 둡니다" },
  { title: "공유보다 선택",   desc: "내가 고른 문장만 선물이 됩니다" },
];

// ── Section 03 ───────────────────────────────────────────────────────────────
const JOURNEY_STAGES = [
  { num: "01", label: "하루 카드",    desc: "오늘의 문장이 하나의 카드로 남습니다" },
  { num: "02", label: "이번 주 챕터", desc: "며칠의 카드가 모여 이번 주의 이야기가 됩니다" },
  { num: "03", label: "나의 책",      desc: "챕터들이 쌓여 내가 지나온 마음의 윤곽을 보여줍니다" },
  { num: "04", label: "선물 카드",    desc: "내가 고른 문장만 누군가에게 건넬 수 있습니다" },
];

// ── Section 04 ───────────────────────────────────────────────────────────────
const TRUST_CARDS = [
  {
    title: "무엇을 저장하나요",
    desc: "계정 정보, 하루의 문장, 감정 흐름, 비춤, 선택한 반응, 주간 반영을 저장합니다",
  },
  {
    title: "누가 볼 수 있나요",
    desc: "기본적으로 본인만 볼 수 있고, 선물 링크는 내가 선택한 카드만 보여줍니다",
  },
  {
    title: "어디에서 확인하나요",
    desc: "개인정보 처리방침과 이용약관에서 자세한 기준을 확인할 수 있습니다",
  },
];


// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <div className="min-h-screen bg-paper-cream text-coffee-deep">

      {/* ── Brand nav ─────────────────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-7">
        <p className="eyebrow">온순간 · Soul Oasis</p>
        <a
          href={`${APP}/today`}
          className="rounded-full border border-wood-natural/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-wood-natural/70 transition-colors duration-300 hover:border-coffee-deep/40 hover:text-coffee-deep"
        >
          앱 열기
        </a>
      </header>

      {/* ── Sticky tab nav ─────────────────────────────────────────────────── */}
      <nav
        aria-label="페이지 내 탐색"
        className="sticky top-0 z-20 border-b border-curtain-soft bg-paper-cream/95"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <div className="scrollbar-hide overflow-x-auto">
          <ul className="mx-auto flex max-w-2xl gap-0 px-4 py-2.5">
            {TABS.map((tab) => (
              <li key={tab.href}>
                <a
                  href={tab.href}
                  className="block whitespace-nowrap px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-wood-natural/55 transition-colors duration-200 hover:text-coffee-deep"
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-6">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="pb-20 pt-16">
          <div className="mb-10">
            <h1 className="om-headline text-[clamp(28px,9.5vw,42px)] font-semibold leading-[1.18] tracking-[-0.02em] text-coffee-deep sm:text-[clamp(42px,7vw,58px)]">
              <LocalizedResponsiveLines contracts={HERO_TITLE} />
            </h1>
            <p className="om-ko mt-5 text-base font-medium text-coffee-deep/65 sm:text-lg">
              <LocalizedResponsiveLines contracts={HERO_SUB} Tag="span" />
            </p>
            <p className="mt-2 text-sm text-wood-natural/60">
              오늘이 나에게 돌아오는 곳
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`${APP}/today`}
              className="inline-flex items-center justify-center rounded-full bg-coffee-deep px-7 py-3.5 text-sm font-medium text-paper-cream transition-colors duration-300 hover:bg-ink-quiet"
            >
              오늘의 온순간 시작하기 →
            </a>
            <a
              href={`${APP}/install`}
              className="inline-flex items-center justify-center rounded-full border border-wood-natural/25 px-7 py-3.5 text-sm font-medium text-coffee-deep/80 transition-colors duration-300 hover:border-coffee-deep/40 hover:text-coffee-deep"
            >
              앱 설치 방법 보기
            </a>
          </div>
          <p className="mt-6 text-[11px] text-wood-natural/45">
            처음의 한 줄은 나에게만 머무릅니다
          </p>
        </section>

        <hr className="hairline" />

        {/* ── §01 왜 한 줄인가 ─────────────────────────────────────────────── */}
        <section id="why-one-line" className="py-24">
          <p className="eyebrow mb-1">§01</p>
          <p className="mb-6 text-sm font-medium text-wood-natural/60">왜 한 줄인가</p>
          <h2 className="om-headline om-ko mb-6 text-[20px] font-semibold leading-snug text-coffee-deep sm:text-[24px]">
            한 문장은 작아서 시작할 수 있고,<br className="hidden sm:block" /> 짧아서 더 솔직해질 수 있습니다
          </h2>
          <div className="mb-10 space-y-1 text-sm leading-relaxed text-coffee-deep/65">
            <p>하루를 전부 설명하지 않아도</p>
            <p>마음이 오래 머문 장면은 남습니다</p>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {WHY_CARDS.map((card) => (
              <div key={card.title} className="rounded-none border border-curtain-soft bg-curtain-soft/40 px-4 py-5">
                <p className="mb-2 text-sm font-medium text-coffee-deep">{card.title}</p>
                <p className="text-xs leading-relaxed text-coffee-deep/60">{card.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-wood-natural/45">
            긴 기록을 쓰지 않아도 괜찮습니다 — 오늘의 나를 속이지 않는 한 문장이면 충분합니다
          </p>
        </section>

        <hr className="hairline" />

        {/* ── §02 나만의 공간 ──────────────────────────────────────────────── */}
        <section id="private-space" className="py-24">
          <p className="eyebrow mb-1">§02</p>
          <p className="mb-6 text-sm font-medium text-wood-natural/60">나만의 공간</p>
          <h2 className="om-headline om-ko mb-6 text-[20px] font-semibold leading-snug text-coffee-deep sm:text-[24px]">
            처음의 한 줄은 나에게만 머무릅니다
          </h2>
          <div className="mb-10 space-y-1.5 text-sm leading-relaxed text-coffee-deep/65">
            <p>온순간은 처음부터 나만의 공간으로 시작합니다</p>
            <p>오늘의 문장은 점수가 아니라 이야기로 남습니다</p>
            <p>기록의 리듬은 내가 정합니다</p>
            <p>선물이 되는 문장은 내가 고릅니다</p>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SPACE_CARDS.map((card) => (
              <div key={card.title} className="rounded-none border border-curtain-soft bg-curtain-soft/40 px-4 py-5">
                <p className="mb-2 text-sm font-medium text-coffee-deep">{card.title}</p>
                <p className="text-xs leading-relaxed text-coffee-deep/60">{card.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] uppercase tracking-[0.18em] text-wood-natural/35">
            NO SCORE · NO DIAGNOSIS · NO STREAK · PRIVATE BY DEFAULT
          </p>
        </section>

        <hr className="hairline" />

        {/* ── §03 카드에서 책까지 ──────────────────────────────────────────── */}
        <section id="card-to-book" className="py-24">
          <p className="eyebrow mb-1">§03</p>
          <p className="mb-6 text-sm font-medium text-wood-natural/60">카드에서 책까지</p>
          <h2 className="om-headline om-ko mb-6 text-[20px] font-semibold leading-snug text-coffee-deep sm:text-[24px]">
            한 줄은 하루 카드가 되고,<br className="hidden sm:block" /> 카드들은 나의 책이 됩니다
          </h2>
          <div className="mb-12 space-y-1 text-sm leading-relaxed text-coffee-deep/65">
            <p>오늘 마음이 오래 머문 장면 하나를 남기면</p>
            <p>그 문장은 오늘의 카드로 남습니다</p>
            <p className="mt-2">며칠의 카드가 모이면 이번 주의 챕터가 열리고</p>
            <p>챕터들이 쌓이면 내가 지나온 마음의 책이 됩니다</p>
            <p className="mt-2">그중 내가 고른 문장만 언젠가 누군가에게 건넬 수 있는 선물이 됩니다</p>
          </div>

          {/* Day card mockup */}
          <div className="mb-14 flex justify-center">
            <div
              className="relative rounded-none border border-curtain-soft bg-paper-cream px-7 py-9"
              style={{
                width: "220px",
                transform: "rotate(-1.5deg)",
              }}
            >
              <p
                className="eyebrow mb-8"
                style={{ opacity: 0.45 }}
              >
                {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "numeric", day: "numeric" })}
              </p>
              <p
                className="om-serif leading-[1.65] text-coffee-deep"
                style={{ fontSize: "17px" }}
              >
                오늘 나는 조금 늦게<br />나에게 돌아왔다
              </p>
              <div className="mt-10 flex items-end justify-between">
                <span
                  className="text-[9px] uppercase tracking-[0.12em] text-wood-natural"
                  style={{ opacity: 0.4 }}
                >
                  나에게만 머무는 카드
                </span>
                <span className="eyebrow" style={{ opacity: 0.25 }}>
                  온순간
                </span>
              </div>
            </div>
          </div>

          {/* Journey flow — desktop horizontal, mobile vertical */}
          <div className="mb-10">
            {/* Desktop */}
            <div className="hidden sm:flex items-start gap-2">
              {JOURNEY_STAGES.map((stage, i) => (
                <div key={stage.num} className="flex flex-1 items-start gap-2">
                  <div className="flex-1 rounded-none border border-curtain-soft bg-curtain-soft/40 px-4 py-5">
                    <p className="eyebrow mb-2">{stage.num}</p>
                    <p className="mb-1.5 text-sm font-medium text-coffee-deep">{stage.label}</p>
                    <p className="text-xs leading-relaxed text-coffee-deep/60">{stage.desc}</p>
                  </div>
                  {i < JOURNEY_STAGES.length - 1 && (
                    <span className="mt-6 shrink-0 text-wood-natural/30 text-sm">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="sm:hidden space-y-3">
              {JOURNEY_STAGES.map((stage, i) => (
                <div key={stage.num} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-wood-natural/35" />
                    {i < JOURNEY_STAGES.length - 1 && (
                      <div className="mt-1.5 w-px flex-1 bg-wood-natural/15" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="eyebrow mb-1">{stage.num} &nbsp;{stage.label}</p>
                    <p className="text-xs leading-relaxed text-coffee-deep/60">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-wood-natural/45">
            공유가 목표가 아닙니다 — 내가 고른 문장만 선물이 됩니다
          </p>
        </section>

        <hr className="hairline" />

        {/* ── §04 신뢰와 데이터 ────────────────────────────────────────────── */}
        <section id="trust-data" className="py-24">
          <p className="eyebrow mb-1">§04</p>
          <p className="mb-6 text-sm font-medium text-wood-natural/60">신뢰와 데이터</p>
          <h2 className="om-headline om-ko mb-6 text-[20px] font-semibold leading-snug text-coffee-deep sm:text-[24px]">
            기록은 기본적으로 나에게 머물고,<br className="hidden sm:block" /> 내가 고른 문장만 선물이 됩니다
          </h2>
          <div className="mb-10 space-y-1 text-sm leading-relaxed text-coffee-deep/65">
            <p>
              온순간은 사용자가 남긴 문장을
            </p>
            <p>광고 목적이나 제3자 판매 목적으로 사용하지 않습니다</p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {TRUST_CARDS.map((card) => (
              <div key={card.title} className="rounded-none border border-curtain-soft bg-curtain-soft/40 px-5 py-5">
                <p className="mb-2 text-sm font-medium text-coffee-deep">{card.title}</p>
                <p className="text-xs leading-relaxed text-coffee-deep/60">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-5 text-[11px] text-wood-natural/50">
            <a href="/principles" className="transition-colors hover:text-wood-natural underline underline-offset-2">
              기록을 대하는 방식
            </a>
            <span>·</span>
            <a href="/privacy" className="transition-colors hover:text-wood-natural underline underline-offset-2">
              개인정보 처리방침
            </a>
            <span>·</span>
            <a href="/terms" className="transition-colors hover:text-wood-natural underline underline-offset-2">
              이용약관
            </a>
          </div>
        </section>

        <hr className="hairline" />

        {/* ── §05 저널 ─────────────────────────────────────────────────────── */}
        <section id="journal" className="py-24">
          <p className="eyebrow mb-1">§05</p>
          <p className="mb-6 text-sm font-medium text-wood-natural/60">저널</p>
          <h2 className="om-headline om-ko mb-6 text-[20px] font-semibold leading-snug text-coffee-deep sm:text-[24px]">
            온순간 저널은 한 줄을 대하는 마음을<br className="hidden sm:block" /> 천천히 적어두는 곳입니다
          </h2>
          <div className="mb-10 space-y-1 text-sm leading-relaxed text-coffee-deep/65">
            <p>온순간이 왜 한 줄에서 시작하는지</p>
            <p>조금 더 깊게 적어두었습니다</p>
          </div>

          <div className="mb-6 space-y-3">
            {ARTICLES.slice(0, 5).map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group flex items-center gap-4 rounded-none border border-curtain-soft px-5 py-4 transition-colors hover:border-wood-natural/30 hover:bg-curtain-soft/50"
              >
                <span className="eyebrow shrink-0" style={{ opacity: 0.4 }}>
                  {article.number}
                </span>
                <p className="om-ko flex-1 text-sm text-coffee-deep/75 group-hover:text-coffee-deep">
                  {article.title}
                </p>
                <span className="shrink-0 text-[11px] text-wood-natural/40 group-hover:text-wood-natural">
                  →
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/journal"
            className="text-[11px] uppercase tracking-[0.15em] text-wood-natural/50 transition-colors hover:text-wood-natural"
          >
            저널 더 읽기 →
          </Link>
        </section>

        <hr className="hairline" />

        {/* ── §06 시작하기 ─────────────────────────────────────────────────── */}
        <section id="start" className="py-24 text-center">
          <p className="eyebrow mb-1 text-center">§06</p>
          <p className="mb-8 text-sm font-medium text-wood-natural/60">시작하기</p>
          <h2 className="om-headline om-ko mx-auto mb-4 max-w-sm text-[20px] font-semibold leading-snug text-coffee-deep sm:text-[24px]">
            오늘 마음이 오래 머문 장면 하나를<br />조용히 놓아두세요
          </h2>
          <p className="mb-2 text-sm text-wood-natural/70">오늘의 첫 줄을 남겨볼까요?</p>
          <p className="mb-10 text-[11px] text-wood-natural/40">
            잘 쓴 문장이 아니어도 괜찮습니다 — 처음의 한 줄은 나에게만 머무릅니다
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`${APP}/today`}
              className="inline-flex items-center justify-center rounded-full bg-coffee-deep px-8 py-3.5 text-sm font-medium text-paper-cream transition-colors duration-300 hover:bg-ink-quiet"
            >
              오늘의 온순간 시작하기 →
            </a>
            <a
              href={`${APP}/install`}
              className="inline-flex items-center justify-center rounded-full border border-wood-natural/25 px-8 py-3.5 text-sm font-medium text-coffee-deep/80 transition-colors duration-300 hover:border-coffee-deep/40 hover:text-coffee-deep"
            >
              앱 설치 방법 보기
            </a>
          </div>
          <p className="mt-8 text-[11px] text-wood-natural/35">
            오늘이 선물이 되도록, 그렇게 살아가는 너와 나
          </p>
          <p className="mt-4 text-[11px] text-wood-natural/40">
            현재 온순간은 소수 베타로 운영 중입니다.{" "}
            <a
              href="mailto:hello@onmoment.kr"
              className="underline underline-offset-2 transition-colors hover:text-wood-natural/70"
            >
              베타 참여 문의 →
            </a>
          </p>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-curtain-soft py-12">
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow">온순간 · Soul Oasis</p>
            <p className="text-[10px] text-wood-natural/30">
              ⓒ {new Date().getFullYear()} 온순간
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-wood-natural/40">
            <a href="/principles" className="transition-colors hover:text-wood-natural">
              기록을 대하는 방식
            </a>
            <span>·</span>
            <a href="/privacy" className="transition-colors hover:text-wood-natural">
              개인정보 처리방침
            </a>
            <span>·</span>
            <a href="/terms" className="transition-colors hover:text-wood-natural">
              이용약관
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

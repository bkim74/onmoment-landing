import type { Metadata } from "next";
import Link from "next/link";
import { ARC_LABELS, DEPTH_LABEL, getArticlesByArc, ARTICLES, type Article } from "./articles";

const APP = "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "온순간 저널",
  description: "한 줄을 대하는 마음을 천천히 적어두는 곳",
  robots: { index: true, follow: true },
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <li>
      <Link
        href={`/journal/${article.slug}`}
        className="group block rounded-2xl border border-curtain-soft bg-curtain-soft/30 px-6 py-6 transition-colors hover:border-wood-natural/30 hover:bg-curtain-soft/60"
      >
        <div className="mb-3 flex items-baseline gap-3">
          <span className="eyebrow">{article.number}</span>
          <span className="eyebrow opacity-30">{article.readingTime} 읽기</span>
        </div>
        <h2 className="om-ko mb-2 text-[17px] font-semibold leading-snug text-coffee-deep group-hover:text-ink-quiet sm:text-[19px]">
          {article.title}
        </h2>
        <p className="om-ko mb-4 text-sm leading-relaxed text-coffee-deep/60">
          {article.subtitle}
        </p>
        <p className="text-[11px] text-wood-natural/55 transition-colors group-hover:text-wood-natural">
          읽기 →
        </p>
      </Link>
    </li>
  );
}

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-paper-cream text-coffee-deep">

      {/* ── Brand nav ── */}
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-7">
        <Link href="/" className="eyebrow transition-opacity hover:opacity-80">
          온순간 · Soul Oasis
        </Link>
        <a
          href={`${APP}/today`}
          className="rounded-full border border-wood-natural/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-wood-natural/70 transition-colors hover:border-coffee-deep/40 hover:text-coffee-deep"
        >
          앱 열기
        </a>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-24 pt-10">

        {/* ── Journal header ── */}
        <div className="mb-16">
          <p className="eyebrow mb-4">온순간 저널</p>
          <h1 className="om-headline mb-5 text-[28px] font-semibold leading-snug text-coffee-deep sm:text-[34px]">
            한 줄을 대하는 마음을
            <br />
            천천히 적어두는 곳입니다
          </h1>
          <p className="text-sm leading-loose text-coffee-deep/60">
            온순간이 왜 한 문장에서 시작하는지,
            <br className="hidden sm:block" />
            왜 처음의 기록은 나에게만 머물러야 하는지,
            <br className="hidden sm:block" />
            그리고 한 줄이 어떻게 카드와 책과 선물이 되는지 적어둡니다.
          </p>
          <p className="om-ko mt-5 text-sm leading-relaxed text-coffee-deep/45">
            순서대로 읽어도 좋고, 지금 마음이 가는 제목부터 펼쳐도 좋습니다.
          </p>
        </div>

        <hr className="hairline mb-12" />

        {/* ── 깊이층 (한 겹 더 안에서) — 책 깊이 묶음, 맨 앞에 선다 ── */}
        {ARTICLES.some((a) => a.collection === "depth") && (
          <section className="mb-16">
            <div className="mb-6">
              <p className="eyebrow mb-2">{DEPTH_LABEL.eyebrow}</p>
              <p className="om-ko text-sm leading-relaxed text-coffee-deep/50">
                {DEPTH_LABEL.description}
              </p>
            </div>
            <ol className="space-y-6">
              {ARTICLES.filter((a) => a.collection === "depth").map((article: Article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </ol>
          </section>
        )}

        {/* ── Article list (arc-grouped, surface) ── */}
        {([1, 2] as const).map((arc) => (
          <section key={arc} className="mb-16 last:mb-0">
            <div className="mb-6">
              <p className="eyebrow mb-2">{ARC_LABELS[arc].eyebrow}</p>
              <p className="om-ko text-sm leading-relaxed text-coffee-deep/50">
                {ARC_LABELS[arc].description}
              </p>
            </div>
            <ol className="space-y-6">
              {getArticlesByArc(arc)
                .filter((a) => !a.collection)
                .map((article: Article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
            </ol>
          </section>
        ))}

        <hr className="hairline my-16" />

        {/* ── CTA ── */}
        <div className="text-center">
          <p className="om-ko mb-2 text-sm text-coffee-deep/70">
            오늘 마음이 오래 머문 장면이 있다면
          </p>
          <p className="mb-8 text-sm text-coffee-deep/50">
            한 문장만 조용히 놓아두세요
          </p>
          <a
            href={`${APP}/today`}
            className="inline-flex items-center justify-center rounded-xl bg-coffee-deep px-8 py-3.5 text-sm font-medium text-paper-cream transition-colors hover:bg-ink-quiet"
          >
            오늘의 온순간 시작하기 →
          </a>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-curtain-soft py-10">
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="eyebrow transition-opacity hover:opacity-80">
              온순간 · Soul Oasis
            </Link>
            <p className="text-[10px] text-wood-natural/30">
              ⓒ {new Date().getFullYear()} 온순간
            </p>
          </div>
          <div className="mt-3 flex gap-4 text-[11px] text-wood-natural/40">
            <Link href="/privacy" className="transition-colors hover:text-wood-natural">
              개인정보 처리방침
            </Link>
            <span>·</span>
            <Link href="/terms" className="transition-colors hover:text-wood-natural">
              이용약관
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

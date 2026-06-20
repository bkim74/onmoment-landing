import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle, getAdjacentArticles } from "../articles";

const APP = "https://app.onmoment.kr";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | 온순간 저널`,
    description: article.subtitle,
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(slug);

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

      <main className="mx-auto max-w-2xl px-6 pb-24 pt-6">

        {/* ── Back link ── */}
        <div className="mb-10">
          <Link
            href="/journal"
            className="text-[11px] uppercase tracking-[0.15em] text-wood-natural/50 transition-colors hover:text-wood-natural"
          >
            ← 저널로 돌아가기
          </Link>
        </div>

        {/* ── Article header ── */}
        <div className="mb-12">
          <div className="mb-5 flex items-baseline gap-3">
            <span className="eyebrow">{article.number}</span>
            <span className="eyebrow opacity-40">{article.readingTime} 읽기</span>
          </div>
          <h1 className="om-headline om-ko mb-4 text-[24px] font-semibold leading-snug text-coffee-deep sm:text-[30px]">
            {article.title}
          </h1>
          <p className="om-ko text-base leading-relaxed text-coffee-deep/60 sm:text-[17px]">
            {article.subtitle}
          </p>
        </div>

        <hr className="hairline mb-12" />

        {/* ── Article body ── */}
        <article
          className="om-ko"
          style={{ maxWidth: "680px" }}
        >
          {article.paragraphs.map((para, pi) => {
            // 작은 섹션 오버라인 (멈춤 · 직면 · 비춤 등)
            if (!Array.isArray(para)) {
              return (
                <p
                  key={pi}
                  className="om-ko mb-6 mt-14 text-[12px] font-medium tracking-[0.14em] text-wood-natural/55 first:mt-0"
                >
                  {para.overline}
                </p>
              );
            }
            return para.length === 0 ? (
              <div key={pi} className="h-4" />
            ) : (
              <p
                key={pi}
                className="om-serif mb-8 text-[16px] leading-[2.0] text-coffee-deep/85 sm:text-[17px]"
              >
                {para.map((line, li) => {
                  if (line === "") {
                    // 의미 단위 소간격 — 단락 내 여백
                    return <span key={li} className="block mb-3" />;
                  }
                  const next = para[li + 1];
                  const hasBr = li < para.length - 1 && next !== "";
                  return (
                    <span key={li}>
                      {line}
                      {hasBr && <br />}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </article>

        <hr className="hairline mt-12 mb-12" />

        {/* ── Article CTA ── */}
        <div className="mb-16 text-center">
          <p className="om-ko mb-2 text-sm text-coffee-deep/70">
            오늘 마음이 오래 머문 장면이 있다면
          </p>
          <p className="mb-2 text-sm text-coffee-deep/50">
            한 문장만 조용히 놓아두세요
          </p>
          <p className="mb-8 text-[11px] text-wood-natural/40">
            처음의 한 줄은 나에게만 머무릅니다
          </p>
          <a
            href={`${APP}/today`}
            className="inline-flex items-center justify-center rounded-xl bg-coffee-deep px-8 py-3.5 text-sm font-medium text-paper-cream transition-colors hover:bg-ink-quiet"
          >
            오늘의 온순간 시작하기 →
          </a>
        </div>

        {/* ── Prev / Next navigation ── */}
        <nav aria-label="이전/다음 글" className="grid grid-cols-2 gap-3">
          <div>
            {prev && (
              <Link
                href={`/journal/${prev.slug}`}
                className="group flex flex-col rounded-xl border border-curtain-soft px-4 py-4 transition-colors hover:border-wood-natural/30"
              >
                <span className="eyebrow mb-2 opacity-40">← 이전 글</span>
                <span className="om-ko text-sm leading-snug text-coffee-deep/70 group-hover:text-coffee-deep">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                href={`/journal/${next.slug}`}
                className="group flex flex-col rounded-xl border border-curtain-soft px-4 py-4 text-right transition-colors hover:border-wood-natural/30"
              >
                <span className="eyebrow mb-2 opacity-40">다음 글 →</span>
                <span className="om-ko text-sm leading-snug text-coffee-deep/70 group-hover:text-coffee-deep">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
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

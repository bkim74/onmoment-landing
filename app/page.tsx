const APP = "https://app.onmoment.kr";

const STEPS = [
  {
    glyph: "§1",
    label: "남김",
    desc: "오늘 마음이 오래 머문 장면을 한 문장으로 남깁니다.\n어떤 문장이어도 괜찮습니다.",
  },
  {
    glyph: "§2",
    label: "비춤",
    desc: "며칠의 한 줄 사이에서 다시 돌아온 말이\n조용히 비춰집니다.",
  },
  {
    glyph: "§3",
    label: "나의 책",
    desc: "흩어진 한 줄들은 시간이 지나\n조용히 하나의 이야기로 이어집니다.",
  },
  {
    glyph: "§4",
    label: "선물",
    desc: "나의 이야기는 언젠가 누군가에게\n건넬 수 있는 선물이 됩니다.",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-paper-cream text-coffee-deep">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-8">
        <p className="eyebrow">온순간 · Soul Oasis</p>
        <a
          href={`${APP}/today`}
          className="rounded-full border border-wood-natural/25 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-wood-natural/70 transition-colors duration-300 hover:border-coffee-deep/40 hover:text-coffee-deep"
        >
          앱 열기
        </a>
      </nav>

      <main className="mx-auto max-w-2xl px-6">

        {/* ── §1 Hero ─────────────────────────────────────────────────── */}
        <section className="pb-24 pt-14">
          <div className="mb-10">
            <h1 className="text-[42px] font-semibold leading-[1.18] tracking-[-0.02em] text-coffee-deep sm:text-[58px] md:text-[68px]">
              오늘이 선물이 되도록,
              <br />
              <span className="text-coffee-deep/90">한 줄.</span>
            </h1>
            <p className="mt-5 text-base font-medium text-coffee-deep/65 sm:text-lg">
              하루 한 줄. 내일 다시 만나는 나.
            </p>
            <p className="mt-2 text-sm text-wood-natural/60">
              오늘이 나에게 돌아오는 곳.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`${APP}/today`}
              className="inline-flex items-center justify-center rounded-xl bg-coffee-deep px-7 py-3.5 text-sm font-medium text-paper-cream transition-colors duration-300 hover:bg-ink-quiet"
            >
              오늘의 온순간 시작하기 →
            </a>
            <a
              href={`${APP}/install`}
              className="inline-flex items-center justify-center rounded-xl border border-wood-natural/25 px-7 py-3.5 text-sm font-medium text-coffee-deep/80 transition-colors duration-300 hover:border-coffee-deep/40 hover:text-coffee-deep"
            >
              앱 설치 방법 보기
            </a>
          </div>
        </section>

        <hr className="hairline" />

        {/* ── §2 Manifesto ─────────────────────────────────────────────── */}
        <section className="py-24">
          <p className="eyebrow mb-7">선언</p>
          <div className="space-y-4 text-[17px] leading-[1.85] text-coffee-deep/80 sm:text-[19px]">
            <p>온순간은 오늘의 마음을 있는 그대로 담습니다.</p>
            <p>하루에 하나의 문장만 남겨도 충분합니다.</p>
            <p>
              시간이 지나 그 한 줄들은
              <br />
              조용히 하나의 이야기로 이어집니다.
            </p>
          </div>
        </section>

        <hr className="hairline" />

        {/* ── §3 How it works ──────────────────────────────────────────── */}
        <section className="py-24">
          <p className="eyebrow mb-10">흐름</p>
          <div className="space-y-10">
            {STEPS.map((step, i) => (
              <div key={step.glyph} className="flex gap-8">
                {/* timeline */}
                <div className="flex flex-col items-center pt-1">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-wood-natural/35" />
                  {i < STEPS.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-wood-natural/12" />
                  )}
                </div>
                {/* content */}
                <div className="pb-1">
                  <div className="flex items-baseline gap-3">
                    <span className="eyebrow">{step.glyph}</span>
                    <span className="text-sm font-medium text-coffee-deep">
                      {step.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-coffee-deep/65 whitespace-pre-line">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="hairline" />

        {/* ── §4 Trust ─────────────────────────────────────────────────── */}
        <section className="py-24">
          <p className="eyebrow mb-7">약속</p>
          <p className="mb-6 text-[11px] uppercase tracking-[0.18em] text-wood-natural/40">
            NO SCORE · NO DIAGNOSIS · NO STREAK · PRIVATE BY DEFAULT
          </p>
          <div className="space-y-2 text-sm text-coffee-deep/65">
            <p>오늘의 문장은 점수가 아니라 이야기로 남습니다.</p>
            <p>기록의 리듬은 내가 정합니다.</p>
            <p>처음부터 나만의 공간으로 시작합니다.</p>
          </div>
        </section>

        <hr className="hairline" />

        {/* ── §5 Life as Gift ──────────────────────────────────────────── */}
        <section className="py-24">
          <p className="eyebrow mb-7">선물</p>
          <p className="text-[17px] leading-[1.85] text-coffee-deep/80 sm:text-[19px]">
            하루의 한 줄이 나의 장이 되고,
            <br />
            언젠가 누군가에게 건넬 수 있는
            <br />
            선물이 됩니다.
          </p>
          <p className="mt-8 text-[11px] text-wood-natural/45">
            오늘이 선물이 되도록, 그렇게 살아가는 너와 나
          </p>
        </section>

        <hr className="hairline" />

        {/* ── §6 CTA ───────────────────────────────────────────────────── */}
        <section className="py-24 text-center">
          <p className="mb-2 text-sm text-wood-natural/70">
            오늘의 첫 줄을 남겨볼까요?
          </p>
          <p className="mb-10 text-[11px] text-wood-natural/40">
            — 한 문장이면 충분합니다.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`${APP}/today`}
              className="inline-flex items-center justify-center rounded-xl bg-coffee-deep px-8 py-3.5 text-sm font-medium text-paper-cream transition-colors duration-300 hover:bg-ink-quiet"
            >
              오늘의 온순간 시작하기 →
            </a>
            <a
              href={`${APP}/install`}
              className="inline-flex items-center justify-center rounded-xl border border-wood-natural/25 px-8 py-3.5 text-sm font-medium text-coffee-deep/80 transition-colors duration-300 hover:border-coffee-deep/40 hover:text-coffee-deep"
            >
              앱 설치 방법 보기
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-curtain-soft py-12">
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow">온순간 · Soul Oasis</p>
            <p className="text-[10px] text-wood-natural/30">
              ⓒ {new Date().getFullYear()} 온순간
            </p>
          </div>
          <div className="mt-4 flex gap-4 text-[11px] text-wood-natural/40">
            <a href="/privacy" className="hover:text-wood-natural transition-colors">
              개인정보 처리방침
            </a>
            <span>·</span>
            <a href="/terms" className="hover:text-wood-natural transition-colors">
              이용약관
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

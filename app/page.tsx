const APP_URL = "https://app.onmoment.kr";

const HOW_STEPS = [
  {
    num: "01",
    label: "한 줄",
    desc: "오늘 마음이 오래 머문 장면을 한 문장으로 남깁니다. 어떤 문장이어도 괜찮습니다.",
  },
  {
    num: "02",
    label: "비춤",
    desc: "며칠의 한 줄 사이에서 다시 돌아온 말이 조용히 비춰집니다.",
  },
  {
    num: "03",
    label: "나의 책",
    desc: "흩어진 한 줄들은 시간이 지나 조용히 하나의 이야기로 이어집니다.",
  },
  {
    num: "04",
    label: "선물",
    desc: "나의 이야기는 언젠가 누군가에게 건넬 수 있는 선물이 됩니다.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-paper-cream text-coffee-deep">
      {/* ── Nav ── */}
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-6 py-7">
        <p className="text-[11px] uppercase tracking-[0.25em] text-wood-natural">
          온순간 · Soul Oasis
        </p>
        <a
          href={`${APP_URL}/today`}
          className="rounded-full border border-wood-natural/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] text-wood-natural transition-colors hover:border-coffee-deep hover:text-coffee-deep"
        >
          앱 열기
        </a>
      </nav>

      <main className="mx-auto max-w-2xl px-6">
        {/* ── §1 Hero ── */}
        <section className="pb-20 pt-16 text-center">
          <h1 className="text-[38px] font-semibold leading-tight tracking-tight text-coffee-deep sm:text-[52px] md:text-[60px]">
            오늘이 선물이 되도록,
            <br />
            한 줄.
          </h1>
          <p className="mt-5 text-base font-medium text-coffee-deep/70 sm:text-lg">
            하루 한 줄. 내일 다시 만나는 나.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-wood-natural">
            오늘이 나에게 돌아오는 곳.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`${APP_URL}/today`}
              className="w-full rounded-2xl bg-coffee-deep px-8 py-4 text-sm font-semibold text-paper-cream transition-colors hover:bg-ink-quiet sm:w-auto"
            >
              오늘의 온순간 시작하기
            </a>
            <a
              href={`${APP_URL}/install`}
              className="w-full rounded-2xl border border-wood-natural/30 px-8 py-4 text-sm font-medium text-coffee-deep transition-colors hover:border-coffee-deep sm:w-auto"
            >
              앱 설치 방법 보기
            </a>
          </div>
        </section>

        <hr className="border-curtain-soft" />

        {/* ── §2 Manifesto ── */}
        <section className="py-20 text-center">
          <p className="mx-auto max-w-md text-base leading-loose text-coffee-deep/80 sm:text-lg sm:leading-loose">
            온순간은 오늘의 마음을 평가하지 않습니다.
            <br />
            하루에 하나의 문장만 남겨도 충분합니다.
            <br />
            시간이 지나 그 한 줄들은
            <br />
            조용히 하나의 이야기로 이어집니다.
          </p>
        </section>

        <hr className="border-curtain-soft" />

        {/* ── §3 How it works ── */}
        <section className="py-20">
          <p className="mb-10 text-center text-[10px] uppercase tracking-[0.25em] text-wood-natural/60">
            흐름
          </p>
          <div className="space-y-8">
            {HOW_STEPS.map((step, i) => (
              <div key={step.num} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-wood-natural/40" />
                  {i < HOW_STEPS.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-wood-natural/15" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-wood-natural/60">
                    {step.num}&nbsp;&nbsp;{step.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-coffee-deep/80">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-curtain-soft" />

        {/* ── §4 Trust ── */}
        <section className="py-20 text-center">
          <p className="mb-6 text-[10px] uppercase tracking-[0.15em] text-wood-natural/40">
            NO SCORE · NO DIAGNOSIS · NO STREAK · PRIVATE BY DEFAULT
          </p>
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-wood-natural">
            점수를 매기지 않습니다.
            <br />
            연속 기록을 요구하지 않습니다.
            <br />
            기본값은 나만의 공간입니다.
          </p>
        </section>

        <hr className="border-curtain-soft" />

        {/* ── §5 Life as Gift ── */}
        <section className="py-20 text-center">
          <p className="mx-auto max-w-sm text-base leading-loose text-coffee-deep/80 sm:text-lg sm:leading-loose">
            하루의 한 줄이 나의 장이 되고,
            <br />
            언젠가 누군가에게 건넬 수 있는
            <br />
            선물이 됩니다.
          </p>
          <p className="mt-6 text-[11px] text-wood-natural/50">
            오늘이 선물이 되도록, 그렇게 살아가는 너와 나
          </p>
        </section>

        <hr className="border-curtain-soft" />

        {/* ── §6 CTA ── */}
        <section className="py-20 text-center">
          <p className="mb-8 text-sm text-wood-natural">오늘의 첫 줄을 남겨볼까요?</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`${APP_URL}/today`}
              className="w-full rounded-2xl bg-coffee-deep px-8 py-4 text-sm font-semibold text-paper-cream transition-colors hover:bg-ink-quiet sm:w-auto"
            >
              오늘의 온순간 시작하기
            </a>
            <a
              href={`${APP_URL}/install`}
              className="w-full rounded-2xl border border-wood-natural/30 px-8 py-4 text-sm font-medium text-coffee-deep transition-colors hover:border-coffee-deep sm:w-auto"
            >
              앱 설치 방법 보기
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-curtain-soft py-10">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-wood-natural/40">
            온순간 · Soul Oasis
          </p>
          <p className="mt-2 text-[10px] text-wood-natural/30">
            ⓒ {new Date().getFullYear()} 온순간. All rights reserved.
          </p>
          <div className="mt-3 flex justify-center gap-4 text-[10px] text-wood-natural/40">
            <a href={`${APP_URL}/privacy`} className="hover:text-wood-natural">
              개인정보 처리방침
            </a>
            <span>·</span>
            <a href={`${APP_URL}/terms`} className="hover:text-wood-natural">
              이용약관
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

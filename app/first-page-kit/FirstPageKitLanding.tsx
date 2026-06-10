"use client";

/* 디지털 첫 장 키트 v1 — 리추얼 개봉 경험 실험 페이지.
   도착 → 열어봄 → 비어 있는 첫 장 → 내일 돌아옴 → 이야기로 자람 → 건넴의 씨앗 → 오늘의 한 줄.
   서비스 설명 페이지가 아니라 "도착한 첫 장을 열어보는" 경험이 우선. */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "./track";

/* ── 다중 행 카피 헬퍼 — \n = 줄바꿈, 빈 줄 = 연 구분 ── */

function Lines({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}

function Stanzas({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i} className={className}>
          <Lines text={p} />
        </p>
      ))}
    </>
  );
}

/* ── 스크롤 진입 리빌 — opacity/translateY만, 한 번만 ── */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fpk-reveal ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── 섹션 50% 노출 1회 이벤트 ── */

function useSectionSeen(
  event: "first_page_timeline_seen" | "first_page_story_growth_seen" | "first_page_gift_section_seen",
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          track(event, {}, { once: true });
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [event]);

  return ref;
}

/* ── 리추얼 버튼 — 명령이 아니라 초대 ── */

function RitualButton({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <a href={href} onClick={onClick} className="fpk-btn om-keep">
      {children}
    </a>
  );
}

/* ════════════════════════ 섹션들 ════════════════════════ */

/* 어휘 구분 (v1.3 확정): 첫 장에는 "도착"만 쓴다 · "돌아오다"는 오직 한 줄(오늘 남긴 문장)에만 쓴다. */
const PROMISE_BODY = `오늘 남긴 한 줄은
내일의 당신에게 돌아옵니다.

시간이 지나면
하나의 페이지가 되고,
언젠가 건넬 수 있는 이야기로 엮입니다.`;

export type HeroStage = "closed" | "received" | "promise";

/* v1.3 — 도착 → 수령 → 약속 → 행동.
   received 단계는 첫 장이 화면의 주인공: CTA·스크롤·앱 이동 없음, 보는 시간만.
   promise 단계에 같은 카드 안에서 약속 문장 + action area가 떠오름. */
function HeroEnvelopeSection({
  stage,
  onOpen,
  startHref,
  onReadMore,
}: {
  stage: HeroStage;
  onOpen: () => void;
  startHref: string;
  onReadMore: () => void;
}) {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 py-16">
      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow om-keep">온순간 · Soul Oasis</p>
        </Reveal>

        {/* 봉투 — 장식 비주얼, 상태는 카피·CTA가 전달. 열리면 작아지며 자리를 내어줌 */}
        <Reveal delay={150} className="mt-8">
          <div
            aria-hidden="true"
            className={`fpk-envelope mx-auto ${stage !== "closed" ? "is-open fpk-envelope--docked" : ""}`}
          >
            <div className="fpk-env-back" />
            <div className="fpk-env-card">
              <span className="fpk-env-card-line" />
            </div>
            <div className="fpk-env-front" />
            <div className="fpk-env-flap" />
            <div className="fpk-env-seal om-keep">첫 장</div>
          </div>
        </Reveal>

        {stage === "closed" ? (
          <>
            <Reveal delay={280}>
              <h1 className="om-headline mt-8 text-[34px] font-medium leading-[1.18] tracking-[-0.02em] text-ink-quiet">
                당신의 첫 장이
                <br />
                비어 있는 채로
                <br />
                도착했습니다.
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p className="om-ko mt-6 text-[15.5px] leading-[1.85] text-[#7A6654]">
                아직 아무것도 쓰지 않아도 괜찮습니다.
                <br />
                오늘은 먼저 이 장을 여는 것부터 시작합니다.
              </p>
            </Reveal>
            <Reveal delay={520} className="mt-9 w-full">
              <button type="button" onClick={onOpen} className="fpk-btn om-keep w-full md:w-auto md:px-12">
                첫 장 열기
              </button>
            </Reveal>
            <Reveal delay={620}>
              <p className="om-ko mt-5 text-[13px] leading-[1.6] text-wood-natural/70">
                열면, 오늘 남긴 한 줄이
                <br />
                어디로 돌아오는지 먼저 보여드립니다.
              </p>
            </Reveal>
          </>
        ) : (
          /* received·promise — 첫 장 카드가 주인공. received에는 행동 요소가 일절 없다 */
          <div className="fpk-paper-card fpk-opened-card mt-3 w-full px-7 py-9">
            <h2 className="om-headline text-[24px] font-medium leading-[1.3] tracking-[-0.02em] text-ink-quiet">
              당신에게 도착한 첫 장
            </h2>

            {/* 비어 있는 첫 장 — 수령의 실체 */}
            <div className="fpk-empty-page fpk-empty-page--receipt mt-7">
              <p className="om-ko text-[14px] leading-[1.8] text-wood-natural/75">
                아직 아무것도 쓰이지 않았습니다.
              </p>
            </div>

            <p className="om-ko mt-6 text-[13.5px] leading-[1.7] text-wood-natural/75">
              이 장은 오늘의 한 줄을 기다리고 있습니다.
            </p>

            {stage === "promise" && (
              <div className="fpk-promise-in">
                <div className="om-ko mt-8 space-y-5 text-[15.5px] leading-[1.85] text-[#5C4A3A]">
                  <Stanzas text={PROMISE_BODY} />
                </div>
                <p className="om-ko mt-7 text-[13.5px] leading-[1.7] text-wood-natural/75">
                  이제, 이 장이 어디로 돌아오는지 살펴볼 수 있습니다.
                </p>
                <div className="mt-7">
                  <button type="button" onClick={onReadMore} className="fpk-btn om-keep w-full">
                    어디로 돌아오는지 보기
                  </button>
                </div>
                <div className="mt-6">
                  <a
                    href={startHref}
                    onClick={() => track("first_page_quick_start_clicked", { startHref })}
                    className="om-ko text-[13.5px] text-wood-natural/75 underline underline-offset-4 transition-colors hover:text-wood-natural"
                  >
                    오늘 바로 한 줄 남기기
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

const FIRST_PAGE_BODY = `이 장은 아직 비어 있습니다.

오늘부터 남기는 작은 문장들이
내일의 당신에게 돌아오고,
시간이 지나 하나의 이야기로 엮입니다.

잘 쓰지 않아도 괜찮습니다.
오늘의 한 장면이면 충분합니다.`;

/* v1.2 — 중간 섹션은 읽는 구간. 앱 이동 CTA 없음 (강한 CTA는 FinalCtaSection 한 곳만) */
function FirstPageCardSection() {
  return (
    <section className="flex min-h-[95svh] flex-col items-center justify-center px-6 py-20">
      <Reveal className="w-full max-w-[400px]">
        <div className="fpk-paper-card px-7 py-9 text-center">
          <h2 className="om-headline text-[26px] font-medium leading-[1.3] tracking-[-0.02em] text-ink-quiet">
            당신에게 도착한 첫 장
          </h2>
          <div className="om-ko mt-6 space-y-5 text-[15.5px] leading-[1.85] text-[#5C4A3A]">
            <Stanzas text={FIRST_PAGE_BODY} />
          </div>

          {/* 비어 있는 첫 장 — 입력창이 아니라 입력의 예고 */}
          <div className="fpk-empty-page mt-8">
            <p className="om-ko text-[14px] leading-[1.8] text-wood-natural/75">
              오늘의 한 장면이
              <br />
              여기에 머물 수 있습니다.
            </p>
          </div>

        </div>
      </Reveal>
      <Reveal delay={150}>
        <p className="om-ko mt-7 text-center text-[13px] leading-[1.6] text-wood-natural/70">
          설명보다 먼저,
          <br />
          당신의 오늘을 한 줄만 남겨주세요.
        </p>
      </Reveal>
    </section>
  );
}

const TIMELINE_CARDS = [
  {
    label: "오늘",
    title: "한 장면을 남깁니다.",
    body: "작고 지나가는 마음이어도 괜찮습니다.\n오늘의 당신이 바라본 한순간이면 충분합니다.",
  },
  {
    label: "내일",
    title: "그 문장이 당신에게 돌아옵니다.",
    body: "어제는 스쳐 지나간 하루도\n다음 날엔 조금 다른 빛으로 읽힐 수 있습니다.",
  },
  {
    label: "시간이 지나면",
    title: "하루들은 하나의 이야기로 엮입니다.",
    body: "흩어진 장면들은 페이지가 되고,\n당신도 몰랐던 흐름이 천천히 드러납니다.",
  },
] as const;

function ReturnTimelineSection() {
  const ref = useSectionSeen("first_page_timeline_seen");

  return (
    <section ref={ref} className="flex min-h-[115svh] flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-[400px]">
        <Reveal>
          <h2 className="om-headline text-center text-[27px] font-medium leading-[1.3] tracking-[-0.02em] text-ink-quiet">
            오늘 남긴 것은,
            <br />
            내일 다른 빛으로 돌아옵니다
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="om-ko mt-6 text-center text-[15.5px] leading-[1.85] text-[#7A6654]">
            온순간은 오늘의 문장을 붙잡아 두었다가,
            <br />
            조용히 다시 당신에게 돌려줍니다.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col items-center">
          {TIMELINE_CARDS.map((card, i) => (
            <div key={card.label} className="flex w-full flex-col items-center">
              {i > 0 && (
                <div aria-hidden="true" className="my-5 flex flex-col items-center">
                  <span className="block h-7 w-px bg-wood-natural/25" />
                  <span className="mt-1 text-[12px] text-wood-natural/45">↓</span>
                </div>
              )}
              <Reveal className="w-full">
                <div className="fpk-paper-card px-7 py-7">
                  <p className="eyebrow">{card.label}</p>
                  <p className="om-ko mt-3 text-[17px] font-medium leading-[1.5] text-ink-quiet">
                    {card.title}
                  </p>
                  <p className="om-ko mt-3 text-[15px] leading-[1.8] text-[#7A6654]">
                    <Lines text={card.body} />
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="om-ko mt-14 text-center text-[14px] leading-[1.8] text-[#7A6654]">
            온순간은 남겨진 하루가 사라지지 않도록,
            <br />
            당신의 속도로 조용히 이어줍니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const GROWTH_BODY = `오늘 남긴 한 줄은
내일의 당신에게 돌아오고,

며칠이 지나면
반복해서 비친 장면이 보이기 시작하고,

시간이 쌓이면
그 하루들은 하나의 페이지처럼 엮입니다.`;

const GROWTH_STEPS = [
  { label: "한 줄", kind: "line" },
  { label: "돌아오는 문장", kind: "echo" },
  { label: "하나의 페이지", kind: "page" },
  { label: "자라나는 이야기", kind: "story" },
] as const;

function StoryGrowthSection() {
  const ref = useSectionSeen("first_page_story_growth_seen");

  return (
    <section ref={ref} className="flex min-h-[95svh] flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-[400px]">
        <Reveal>
          <h2 className="om-headline text-center text-[27px] font-medium leading-[1.3] tracking-[-0.02em] text-ink-quiet">
            한 줄은 머무르지 않고
            <br />
            자라납니다
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="om-ko mt-7 space-y-5 text-center text-[15.5px] leading-[1.85] text-[#7A6654]">
            <Stanzas text={GROWTH_BODY} />
          </div>
        </Reveal>

        {/* 종이 조각이 페이지로, 페이지가 이야기로 겹쳐 자라는 비주얼 */}
        <div className="mt-14 flex flex-col items-center">
          {GROWTH_STEPS.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              {i > 0 && (
                <span aria-hidden="true" className="my-4 block h-6 w-px bg-wood-natural/25" />
              )}
              <Reveal delay={i * 80}>
                <div className={`fpk-sheet fpk-sheet--${step.kind}`}>
                  <span className="om-keep text-[13.5px] tracking-[0.02em] text-[#5C4A3A]">
                    {step.label}
                  </span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="om-ko mt-14 text-center text-[14px] leading-[1.8] text-[#7A6654]">
            당신은 대단한 글을 쓰지 않아도 됩니다.
            <br />
            온순간은 살아낸 하루를 잃어버리지 않게 하는 자리입니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const GIFT_BODY = `온순간의 이야기는
먼저 당신에게 돌아오고,
당신 안에서 조금 더 머뭅니다.

그리고 때가 되면,
건넬 수 있는 장면이 됩니다.`;

const GIFT_OPTIONS = [
  { title: "나에게 남기기", sub: "미래의 나에게 닿도록" },
  { title: "조용히 간직하기", sub: "아직 말이 되지 않은 마음을 그대로" },
  { title: "언젠가 건네기", sub: "누군가에게 전하고 싶은 장면이 생겼을 때" },
] as const;

function GiftPossibilitySection() {
  const ref = useSectionSeen("first_page_gift_section_seen");

  return (
    <section ref={ref} className="flex min-h-[115svh] flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-[400px]">
        <Reveal>
          <h2 className="om-headline text-center text-[27px] font-medium leading-[1.3] tracking-[-0.02em] text-ink-quiet">
            먼저 나에게 돌아온 것은,
            <br />
            언젠가 누군가에게 건네질 수도 있습니다
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="om-ko mt-7 space-y-5 text-center text-[15.5px] leading-[1.85] text-[#7A6654]">
            <Stanzas text={GIFT_BODY} />
          </div>
        </Reveal>

        <div className="mt-12 space-y-4">
          {GIFT_OPTIONS.map((opt, i) => (
            <Reveal key={opt.title} delay={i * 80}>
              <div className="fpk-paper-card px-7 py-6">
                <p className="om-ko text-[16px] font-medium leading-[1.5] text-ink-quiet">
                  {opt.title}
                </p>
                <p className="om-ko mt-1.5 text-[14px] leading-[1.7] text-[#7A6654]">{opt.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="om-ko mt-14 text-center text-[14px] leading-[1.8] text-[#7A6654]">
            온순간은 하루를 기록하는 곳이 아니라,
            <br />
            건넬 수 있는 이야기의 씨앗을 남기는 곳이기도 합니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const FINAL_BODY = `잘 쓴 문장이 아니어도 괜찮습니다.

지금 떠오르는 한 장면,
혹은 마음에 잠시 머문 한 줄이면 충분합니다.

온순간은 그 문장을
먼저 당신에게 돌려드립니다.`;

function FinalCtaSection({
  startHref,
  sectionRef,
}: {
  startHref: string;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={sectionRef}
      className="flex min-h-[95svh] flex-col items-center justify-center px-6 py-24"
    >
      <div className="flex w-full max-w-[342px] flex-col items-center text-center">
        <Reveal>
          <h2 className="om-headline text-[28px] font-medium leading-[1.3] tracking-[-0.02em] text-ink-quiet">
            오늘의 첫 장면을
            <br />
            남겨볼까요?
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="om-ko mt-7 space-y-5 text-[15.5px] leading-[1.85] text-[#7A6654]">
            <Stanzas text={FINAL_BODY} />
          </div>
        </Reveal>
        <Reveal delay={240} className="mt-10 w-full">
          <RitualButton
            href={startHref}
            onClick={() => track("first_page_final_cta_clicked", { startHref })}
          >
            오늘의 한 줄 남기기
          </RitualButton>
        </Reveal>
        <Reveal delay={340}>
          <p className="om-ko mt-5 text-[13px] leading-[1.6] text-wood-natural/70">
            오늘 남긴 한 줄은
            <br />
            내일의 당신에게 돌아옵니다.
          </p>
        </Reveal>
        <Reveal delay={420}>
          <p className="om-ko mt-20 text-[13.5px] leading-[1.8] text-wood-natural/60">
            혼자 남긴 하루가,
            <br />
            혼자만의 것으로 끝나지 않도록.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════ 페이지 루트 ════════════════════════ */
/* v1.2 — Sticky CTA 완전 제거: 현재 목적은 전환 최적화가 아니라 리추얼 감각 검증 */

export default function FirstPageKitLanding({ startHref }: { startHref: string }) {
  const [heroStage, setHeroStage] = useState<HeroStage>("closed");

  const timelineWrapRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLElement>(null);
  const promiseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    track("first_page_viewed", {}, { once: true });
    return () => {
      if (promiseTimerRef.current != null) window.clearTimeout(promiseTimerRef.current);
    };
  }, []);

  // 도착 → 수령: 자동 스크롤·CTA 없음. 첫 장을 "보는 시간"(1.3s)을 가진 뒤 약속이 떠오른다.
  // 카드 등장 모션(0.45s 지연)이 끝난 기준으로 1.3s — reduced-motion은 0.2s (강제 대기감 없이).
  const handleOpen = () => {
    track("first_page_envelope_opened", {}, { once: true });
    setHeroStage("received");
    track("first_page_received_seen", {}, { once: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    promiseTimerRef.current = window.setTimeout(
      () => {
        setHeroStage("promise");
        track("first_page_promise_revealed", {}, { once: true });
      },
      reduce ? 200 : 450 + 1300,
    );
  };

  // "어디로 돌아오는지 보기" — ReturnTimelineSection 시작점으로 정확히.
  // scrollIntoView 대신 offset 보정 (115svh flex 센터링이 시작점을 지나치게 만들던 문제)
  const handleReadMore = () => {
    const el = timelineWrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <main className="fpk relative overflow-x-clip">
      {/* 종이 질감 — 보이지 않고 느껴지는 정도 */}
      <div aria-hidden="true" className="fpk-texture" />

      <HeroEnvelopeSection
        stage={heroStage}
        onOpen={handleOpen}
        startHref={startHref}
        onReadMore={handleReadMore}
      />
      {/* 이하 읽는 구간 — "어디로 돌아오는지 보기" 또는 수동 스크롤로 도달. 강한 CTA는 Final 한 곳 */}
      <FirstPageCardSection />
      <div ref={timelineWrapRef} style={{ scrollMarginTop: 24 }}>
        <ReturnTimelineSection />
      </div>
      <StoryGrowthSection />
      <GiftPossibilitySection />
      <FinalCtaSection startHref={startHref} sectionRef={finalRef} />

      <style>{`
        /* ── 종이 질감 ── */
        .fpk-texture {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(72, 48, 28, 0.028) 1px, transparent 1px);
          background-size: 12px 12px;
        }

        /* ── 리빌 — 열림의 모션, 놀라움 금지 ── */
        .fpk-reveal {
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 1.1s var(--ease-ritual),
            transform 1.1s var(--ease-ritual);
        }
        .fpk-reveal.is-in {
          opacity: 1;
          transform: none;
        }

        /* ── 종이 카드 ── */
        .fpk-paper-card {
          background: #FFF8ED;
          border: 1px solid rgba(86, 61, 39, 0.10);
          box-shadow: 0 20px 70px rgba(67, 45, 25, 0.09);
          border-radius: 28px;
        }

        /* ── 비어 있는 첫 장 ── */
        .fpk-empty-page {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 180px;
          background: #FFFDF6;
          border: 1px solid rgba(86, 61, 39, 0.08);
          border-radius: 14px;
          box-shadow: inset 0 1px 4px rgba(67, 45, 25, 0.04);
          overflow: hidden;
        }
        .fpk-empty-page::after {
          /* 접힌 모서리 — 종이의 물성 */
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 22px;
          height: 22px;
          background: linear-gradient(225deg, var(--paper-cream) 50%, rgba(86, 61, 39, 0.07) 50%);
          border-bottom-left-radius: 6px;
        }

        /* ── 리추얼 버튼 ── */
        .fpk-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 54px;
          padding: 0 28px;
          border-radius: 999px;
          background: #2B211A;
          color: #FFF8ED;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.01em;
          box-shadow: 0 14px 40px rgba(43, 33, 26, 0.16);
          transition:
            transform 0.5s var(--ease-ritual),
            box-shadow 0.5s var(--ease-ritual);
        }
        .fpk-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 46px rgba(43, 33, 26, 0.20);
        }
        .fpk-btn:focus-visible {
          outline: 2px solid var(--wood-natural);
          outline-offset: 3px;
        }

        /* ── 봉투 ── */
        .fpk-envelope {
          position: relative;
          width: min(300px, 72vw);
          aspect-ratio: 3 / 2;
          perspective: 900px;
          margin-top: 8px;
          margin-bottom: 8px;
          transition: transform 1s var(--ease-ritual), margin 1s var(--ease-ritual);
        }
        /* 열린 봉투는 작아지며 첫 장에게 자리를 내어준다 */
        .fpk-envelope--docked {
          transform: scale(0.58);
          margin-top: -16px;
          margin-bottom: -22px;
        }
        /* 열림 카드 — 봉투에서 꺼내듯, 숨 한 번 쉬고 떠오름 */
        .fpk-opened-card {
          animation: fpkCardIn 1.1s var(--ease-ritual) 0.45s both;
        }
        @keyframes fpkCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
        /* 수령 단계의 빈 장 — 첫 장이 주인공이 되는 넓은 자리 */
        .fpk-empty-page--receipt {
          min-height: 216px;
        }
        /* 약속 — 같은 카드 안에서 조용히 떠오름 */
        .fpk-promise-in {
          animation: fpkCardIn 0.9s var(--ease-ritual) both;
        }
        .fpk-env-back {
          position: absolute;
          inset: 0;
          background: #EDE0C9;
          border: 1px solid rgba(86, 61, 39, 0.14);
          border-radius: 14px;
          box-shadow: 0 24px 60px rgba(67, 45, 25, 0.12);
        }
        .fpk-env-card {
          position: absolute;
          left: 7%;
          right: 7%;
          top: 9%;
          bottom: 16%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFF8ED;
          border: 1px solid rgba(86, 61, 39, 0.10);
          border-radius: 10px;
          box-shadow: 0 6px 20px rgba(67, 45, 25, 0.08);
          transition: transform 0.9s var(--ease-ritual) 0.18s;
        }
        .fpk-env-card-line {
          display: block;
          width: 46%;
          height: 1px;
          background: rgba(139, 111, 71, 0.35);
        }
        .fpk-envelope.is-open .fpk-env-card {
          transform: translateY(-18px);
        }
        .fpk-env-front {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 56%;
          background: linear-gradient(180deg, #F2E6D0 0%, #ECDEC5 100%);
          border: 1px solid rgba(86, 61, 39, 0.12);
          border-top: none;
          border-radius: 0 0 14px 14px;
          box-shadow: 0 -2px 8px rgba(67, 45, 25, 0.05);
        }
        .fpk-env-flap {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 52%;
          background: #F1E4CC;
          border: 1px solid rgba(86, 61, 39, 0.12);
          clip-path: polygon(0 0, 100% 0, 50% 96%);
          border-radius: 14px 14px 0 0;
          transform-origin: top center;
          transition: transform 1.05s var(--ease-ritual);
          z-index: 2;
        }
        .fpk-envelope.is-open .fpk-env-flap {
          transform: rotateX(-150deg);
        }
        .fpk-env-seal {
          position: absolute;
          left: 50%;
          top: 48%;
          transform: translate(-50%, -50%);
          padding: 7px 13px;
          border-radius: 999px;
          background: #2B211A;
          color: #FFF8ED;
          font-size: 11px;
          letter-spacing: 0.18em;
          box-shadow: 0 4px 14px rgba(43, 33, 26, 0.22);
          z-index: 3;
          transition: opacity 0.8s var(--ease-ritual), transform 0.8s var(--ease-ritual);
        }
        .fpk-envelope.is-open .fpk-env-seal {
          opacity: 0.85;
          transform: translate(-50%, -42%);
        }

        /* ── 자라나는 이야기 — 종이 조각이 페이지로 겹쳐 자람 ── */
        .fpk-sheet {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFF8ED;
          border: 1px solid rgba(86, 61, 39, 0.10);
          border-radius: 10px;
          text-align: center;
        }
        .fpk-sheet--line {
          width: 180px;
          padding: 10px 16px;
          box-shadow: 0 4px 14px rgba(67, 45, 25, 0.07);
        }
        .fpk-sheet--echo {
          width: 200px;
          padding: 13px 16px;
          box-shadow:
            0 4px 14px rgba(67, 45, 25, 0.07),
            3px 4px 0 -1px #F7EDDA,
            3px 5px 8px rgba(67, 45, 25, 0.05);
        }
        .fpk-sheet--page {
          width: 220px;
          padding: 22px 16px;
          box-shadow:
            0 6px 18px rgba(67, 45, 25, 0.08),
            4px 5px 0 -1px #F7EDDA,
            7px 9px 0 -2px #F2E6D0,
            7px 10px 10px rgba(67, 45, 25, 0.05);
        }
        .fpk-sheet--story {
          width: 240px;
          padding: 32px 16px;
          border-radius: 12px;
          box-shadow:
            0 10px 26px rgba(67, 45, 25, 0.10),
            5px 6px 0 -1px #F7EDDA,
            9px 11px 0 -2px #F2E6D0,
            13px 16px 0 -3px #EDE0C9,
            13px 18px 14px rgba(67, 45, 25, 0.06);
        }
        .fpk-sheet--story::before {
          /* 책등의 기미 */
          content: "";
          position: absolute;
          left: 9px;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: rgba(139, 111, 71, 0.25);
        }

        /* ── Reduced motion — 모든 모션을 즉시 상태로 ── */
        @media (prefers-reduced-motion: reduce) {
          .fpk .fpk-reveal,
          .fpk .fpk-btn,
          .fpk .fpk-envelope,
          .fpk .fpk-env-card,
          .fpk .fpk-env-flap,
          .fpk .fpk-env-seal {
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
            animation: none !important;
          }
          .fpk .fpk-opened-card,
          .fpk .fpk-promise-in {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

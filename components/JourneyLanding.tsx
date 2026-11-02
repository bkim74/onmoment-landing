"use client";

/**
 * 첫 화면 — 아무에게도 못 한 말을 두는 곳. 이해받음 → 알아차림 → 흘러넘침 순서(세 겹 효능), 어디서 멈춰도 온전하다.
 * 메인에는 관계 이야기를 두지 않고(Six Bans 6), 여정을 누르면 그 시절의 하루를 전체 화면에서 넘겨 본다. 상대가 변한다고 약속하지 않는다.
 *
 * 경계
 *   - 고르지 않아도 시작할 수 있다. 앱으로 넘기는 값은 버튼 위치·여정 이름(src)뿐, 이름·본문은 없다.
 *   - 모든 예시는 가상 기록이고 AI 를 부르지 않는다. 먼저 받아 주고, 더 볼지는 내가 고른다(쉼도 정답).
 *   - 앱 주소 바꾸기(?app=)는 *.vercel.app 시범 화면에서만 듣는다.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { JOURNEYS, type Journey, type JourneyKey } from "@/lib/journeys";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";
const isKey = (v: string | null): v is JourneyKey => JOURNEYS.some((j) => j.key === v && j.ready);

function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return <>{parts.map((p, i) => <span key={i}>{p}{i < parts.length - 1 && <br />}</span>)}</>;
}

function JourneyView({ journey, startHref, onBack }: { journey: Journey; startHref: string; onBack: () => void }) {
  const [showComfort, setShowComfort] = useState(false);
  const [path, setPath] = useState<"rest" | "more" | null>(null);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    backRef.current?.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShowComfort(true), reduce ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (after || path === "rest") bookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [after, path]);

  const choose = (label: string, text: string) => { setChosen(label); setAfter(text); };

  return (
    <div className="jv" role="dialog" aria-modal="true" aria-label={journey.label}>
      <div className="jv-bar">
        <button ref={backRef} type="button" className="jv-back" onClick={onBack}>
          <span aria-hidden="true">←</span> 처음으로
        </button>
        <span className="jv-tag">가상 예시</span>
      </div>

      <div className="jv-body">
        <p className="eyebrow">{journey.label}</p>
        <h2><Lines text={journey.hook} /></h2>

        <p className="jv-step-label">오늘 남긴 한 줄</p>
        <div className="jv-line"><p>{journey.line}</p></div>

        {showComfort && (
          <div className="jv-rise">
            <p className="jv-comfort">{journey.comfort}</p>
            {path === null && (
              <div className="jv-choices two">
                <button type="button" onClick={() => setPath("rest")}>오늘은 여기까지</button>
                <button type="button" onClick={() => setPath("more")}>조금 더 보기</button>
              </div>
            )}
          </div>
        )}

        {path === "rest" && (
          <div ref={bookRef} className="jv-rise jv-book">
            <p className="jv-step-label">이 한 줄은 책의 한 쪽으로</p>
            <div className="jv-page"><p>{journey.line}</p></div>
            <p className="jv-note">오늘은 이걸로 충분합니다. 내일 또 와도, 며칠 뒤에 와도 그대로 있어요.</p>
          </div>
        )}

        {path === "more" && (
          <div className="jv-rise">
            <p className="jv-step-label">원할 때, 다른 시선으로</p>
            <p className="jv-mirror">{journey.mirror}</p>
            {answer === null ? (
              <div className="jv-choices two">
                <button type="button" onClick={() => setAnswer("yes")}>맞아요</button>
                <button type="button" onClick={() => setAnswer("no")}>조금 달라요</button>
              </div>
            ) : (
              <p className="jv-note">{answer === "yes" ? "내 마음에 닿은 말만 남깁니다." : "그럼 이 말은 넘겨요. 정하는 건 나입니다."}</p>
            )}
          </div>
        )}

        {path === "more" && answer !== null && (
          <div className="jv-rise">
            <p className="jv-step-label">마음이 가는 한 걸음이 있다면</p>
            <div className="jv-choices">
              {journey.steps.map((s) => (
                <button key={s.label} type="button" aria-pressed={chosen === s.label} onClick={() => choose(s.label, s.after)}>{s.label}</button>
              ))}
              <button type="button" aria-pressed={chosen === "rest"} onClick={() => choose("rest", journey.rest)}>오늘은 쉬기</button>
            </div>
          </div>
        )}

        {after && (
          <div ref={bookRef} className="jv-rise jv-book">
            <p className="jv-step-label">이 날들이 책의 한 쪽으로</p>
            <div className="jv-pages">
              <article><small>첫째 날</small><p>{journey.line}</p></article>
              <article><small>다음 날</small><p>{after}</p></article>
            </div>
            <p className="jv-book-for">쌓이면, <strong>{journey.book}</strong></p>
            <p className="jv-note">담을 기록은 내가 고릅니다. 종이책은 시범을 준비하고 있어요.</p>
          </div>
        )}
      </div>

      <div className="jv-cta">
        <a className="primary" href={startHref}>오늘의 한 줄 쓰기 <span>↗</span></a>
      </div>
    </div>
  );
}

// 첫 화면의 종이 — 누구에게도 보여 주지 않은 한 줄이 조용히 놓인다. 관계 이야기는 여기에 두지 않는다(Six Bans 6).
const QUIET_LINES = [
  "괜찮다고 했지만, 괜찮지 않았다.",
  "아무도 모르지만, 오늘 나는 꽤 애썼다.",
  "사실은 오늘 좀 서운했다.",
];

function QuietPage({ paused }: { paused: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % QUIET_LINES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <figure className="ol-quiet">
      <div className="ol-paper"><p key={i}>{QUIET_LINES[i]}</p></div>
      <figcaption>가상 기록 예시</figcaption>
    </figure>
  );
}

export default function JourneyLanding({ ways }: { ways: React.ReactNode }) {
  const [app, setApp] = useState(APP);
  const [open, setOpen] = useState<JourneyKey | null>(null);
  const pushedRef = useRef(false);
  const cardRefs = useRef<Partial<Record<JourneyKey, HTMLButtonElement | null>>>({});
  const lastRef = useRef<JourneyKey | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (window.location.hostname.endsWith(".vercel.app")) {
      const v = q.get("app");
      if (v && /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(v)) setApp(v);
    }
    const f = q.get("for");
    if (isKey(f)) setOpen(f);
    const onPop = () => {
      const k = new URLSearchParams(window.location.search).get("for");
      pushedRef.current = false;
      setOpen(isKey(k) ? k : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const addressWith = (key: JourneyKey | null) => {
    const u = new URL(window.location.href);
    if (key) u.searchParams.set("for", key); else u.searchParams.delete("for");
    return u.pathname + u.search;
  };

  const openJourney = (key: JourneyKey) => {
    lastRef.current = key;
    window.history.pushState(null, "", addressWith(key));
    pushedRef.current = true;
    setOpen(key);
  };

  const closeJourney = useCallback(() => {
    if (pushedRef.current) { window.history.back(); return; }
    // 여정 주소로 바로 들어온 경우 — 돌아갈 곳이 다른 사이트일 수 있어 첫 화면으로 바꾼다
    window.history.replaceState(null, "", addressWith(null));
    setOpen(null);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const esc = (e: KeyboardEvent) => { if (e.key === "Escape") closeJourney(); };
      window.addEventListener("keydown", esc);
      return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
    }
    const last = lastRef.current;
    if (last) cardRefs.current[last]?.focus({ preventScroll: false });
  }, [open, closeJourney]);

  const start = (src: string) => `${app}/start?src=${src}`;
  const current = JOURNEYS.find((j) => j.key === open) ?? null;

  return (
    <div id="om-purpose">
      <div className="surface" aria-hidden={current ? true : undefined}>
        <section className="ol-hero">
          <header>
            <span className="logo">온순간<small>ONMOMENT</small></span>
            <a className="text" href={`${app}/`}>이미 쓰고 있어요</a>
          </header>
          <div className="ol-hero-in">
            <div className="ol-lead">
              <h1>아무에게도 못 한 말,<br />여기에 두세요.</h1>
              <p className="ol-sub">있는 그대로 담습니다.<br />나만의 공간으로 시작합니다.</p>
              <a className="ol-cta" href={start("hero")}>오늘의 한 줄 쓰기 <span>↗</span></a>
              <p className="ol-small">쓰는 건 무료예요. 지금은 초대받은 분부터 함께합니다.</p>
            </div>
            <QuietPage paused={!!current} />
          </div>
        </section>

        <main>
          <section className="ol-flow">
            <article><h3>먼저, 쉬어 갑니다</h3><p>한 줄이면 충분합니다.</p></article>
            <article><h3>그러다 보면, 내 마음이 보입니다</h3><p>원할 때 AI가 조용히 비춰 줍니다.</p></article>
            <article><h3>마음이 차면, 건네고 싶은 말이 생깁니다</h3><p>언제 건넬지는 내가 정합니다.</p></article>
            <p className="ol-enough">어디서 멈춰도 온전합니다.</p>
          </section>

          <section className="ol-books-sec">
            <h2>그 날들이,<br />책으로 남습니다.</h2>
            <div className="ol-covers">
              <div className="ol-cover ol-cover-self"><span>나에게<br />남기는 책</span><em>온순간</em></div>
              <div className="ol-cover ol-cover-gift"><span>누군가에게<br />건네는 책</span><em>온순간</em></div>
            </div>
            <p className="ol-books-note">내 말 그대로, 한 쪽씩. 표지는 가상 예시이고, 종이책은 시범을 준비하고 있어요.</p>
          </section>

          <section className="jl-pick" id="journeys">
            <h2>지금 어떤 시절을<br />지나고 계신가요?</h2>
            <div className="jl-cards">
              {JOURNEYS.map((j) => !j.ready ? (
                <div key={j.key} className="jl-card jl-soon">
                  <small>{j.label}</small>
                  <span className="jl-hook"><Lines text={j.hook} /></span>
                  <span className="jl-soon-tag">오픈 준비 중</span>
                </div>
              ) : (
                <button key={j.key} ref={(el) => { cardRefs.current[j.key] = el; }} type="button" className="jl-card" onClick={() => openJourney(j.key)}>
                  <small>{j.label}</small>
                  <span className="jl-hook"><Lines text={j.hook} /></span>
                  <span className="jl-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </section>

          <section className="ol-close">
            <h2>첫 줄은, 오늘이어도 좋습니다.</h2>
            <a className="ol-cta" href={start("closing")}>오늘의 한 줄 쓰기 <span>↗</span></a>
            <details className="ol-status">
              <summary>지금 되는 일과 준비 중인 일</summary>
              <p>지금 앱에서: 한 줄 쓰기, 원문을 한 쪽으로 보기, 다시 읽기, 고른 기록을 책 모양으로 미리 보기. 돌아보기를 고르면 AI가 비춰 주고 문장을 제안하기도 하며, 제안은 내가 고른 때에만 저장됩니다.</p>
              <p>준비 중: AI 편집 초안과 종이책 시범. 내 원문은 그대로 보관하고, 편집 초안은 내가 확인한 뒤에만 건네는 방식으로 만들고 있어요. 이 화면의 글은 모두 가상 예시입니다.</p>
            </details>
          </section>
        </main>
        {ways}
      </div>

      {current && <JourneyView key={current.key} journey={current} startHref={start(`journey-${current.key}`)} onBack={closeJourney} />}
    </div>
  );
}

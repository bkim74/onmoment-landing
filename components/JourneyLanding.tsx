"use client";

/**
 * 첫 화면 — 한 줄·비춤·내가 고른 한 걸음이 쌓여 책이 된다. 여정을 누르면 그 시절의 하루를 전체 화면에서 직접 넘겨 본다.
 *
 * 경계
 *   - 고르지 않아도 시작할 수 있다. 앱으로 넘기는 값은 버튼 위치·여정 이름(src)뿐, 이름·본문은 없다.
 *   - 모든 예시는 가상 기록이고 AI 를 부르지 않는다. 비춤은 묻기만 하고, 한 걸음은 내가 고른다(쉼도 정답).
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
  const [showMirror, setShowMirror] = useState(false);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    backRef.current?.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShowMirror(true), reduce ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (after) bookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [after]);

  const choose = (label: string, text: string) => { setChosen(label); setAfter(text); };

  return (
    <div className="jv" role="dialog" aria-modal="true" aria-label={journey.label}>
      <div className="jv-bar">
        <button ref={backRef} type="button" className="jv-back" onClick={onBack}>
          <span aria-hidden="true">←</span> 다른 시절 보기
        </button>
        <span className="jv-tag">가상 예시</span>
      </div>

      <div className="jv-body">
        <p className="eyebrow">{journey.label}</p>
        <h2><Lines text={journey.hook} /></h2>

        <p className="jv-step-label">오늘 남긴 한 줄</p>
        <div className="jv-line"><p>{journey.line}</p></div>

        {showMirror && (
          <div className="jv-rise">
            <p className="jv-step-label">AI의 비춤</p>
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

        {answer !== null && (
          <div className="jv-rise">
            <p className="jv-step-label">오늘, 해보고 싶은 한 걸음은요?</p>
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
            <p className="jv-step-label">살아낸 날이 책의 한 쪽으로</p>
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
        <header>
          <span className="logo">온순간<small>ONMOMENT</small></span>
          <a className="text" href={`${app}/`}>이미 쓰고 있어요</a>
        </header>

        <main>
          <section className="hero">
            <div className="lead">
              <p className="eyebrow">일기를 써도 그때뿐이었다면</p>
              <h1>내가 쓴 한 줄이 쌓여,<br /><em>내 책이 됩니다.</em></h1>
              <p className="intro">한 줄을 남기면, 원할 때 AI가 세 줄로 비춰 줘요.<br /><strong>한 걸음은 내가 고르고, 살아낸 날들은 책이 됩니다.</strong></p>
              <div className="actions">
                <a className="primary" href={start("hero")}>오늘의 한 줄 쓰기 <span>↗</span></a>
              </div>
              <p className="quiet">쓰는 건 무료예요. 지금은 초대받은 분부터 함께하는 작은 베타예요.</p>
            </div>

            <div className="evidence">
              <div className="jv-three" aria-label="세 줄 예시">
                <div><small>내 한 줄</small><p>오늘 엄마 전화에 또 짜증냈다. 그만큼 지쳐 있었다.</p></div>
                <div><small>AI의 비춤</small><p>혹시 인정받고 싶었던 걸까?</p></div>
                <div><small>내가 고르는 한 걸음</small><p>오늘 밤 ‘고마워’ 한 줄 보내 볼까? 오늘은 쉬어도 좋고.</p></div>
              </div>
              <p className="source">가상 기록 예시 · AI는 비춰 줄 뿐, 정하는 건 나입니다</p>
            </div>
          </section>

          <section className="jl-pick" id="journeys">
            <h2>지금, 어떤 시절을<br />지나고 있나요?</h2>
            <p className="intro">열린 이야기를 눌러 그 시절의 하루를 직접 넘겨 보세요.</p>
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

          <section className="jl-status">
            <p className="eyebrow">지금 되는 일과 준비 중인 일</p>
            <p className="quiet">
              지금 앱에서: 한 줄 쓰기, 원문을 한 쪽으로 보기, 다시 읽기, 고른 기록을 책 모양으로 미리 보기. 돌아보기를 고르면 AI가 비춰 주고 문장을 제안하기도 하며, 제안은 내가 고른 때에만 저장됩니다.<br />
              준비 중: AI 편집 초안과 종이책 시범. 내 원문은 그대로 보관하고, 편집 초안은 내가 확인한 뒤에만 건네는 방식으로 만들고 있어요.
            </p>
          </section>

          <section className="closing">
            <h2>오늘의 한 줄부터.</h2>
            <div className="actions">
              <a className="primary" href={start("closing")}>오늘의 한 줄 쓰기 <span>↗</span></a>
            </div>
          </section>
        </main>
        {ways}
      </div>

      {current && <JourneyView key={current.key} journey={current} startHref={start(`journey-${current.key}`)} onBack={closeJourney} />}
    </div>
  );
}

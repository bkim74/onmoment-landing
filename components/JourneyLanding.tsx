"use client";

/**
 * 첫 화면 — 무엇을 얻는지(내 말로 만든 책)를 먼저 보여 준다. 안쪽 경험은 받음·누림 먼저, 어디서 멈춰도 온전하다.
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
  const [tone, setTone] = useState<"joy" | "hard">(journey.joy ? "joy" : "hard");
  const day = tone === "joy" && journey.joy ? journey.joy : journey;
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
  const pickTone = (t: "joy" | "hard") => { setTone(t); setPath(null); setAnswer(null); setAfter(null); setChosen(null); };

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

        {journey.joy && (
          <div className="jv-tones" role="group" aria-label="어떤 날을 볼까요">
            <button type="button" aria-pressed={tone === "joy"} onClick={() => pickTone("joy")}>기쁜 날</button>
            <button type="button" aria-pressed={tone === "hard"} onClick={() => pickTone("hard")}>버거운 날</button>
          </div>
        )}

        <p className="jv-step-label">오늘 남긴 한 줄</p>
        <div className={`jv-line${tone === "joy" && journey.joy ? " jv-line-joy" : ""}`}><p key={day.line}>{day.line}</p></div>

        {showComfort && (
          <div className="jv-rise">
            <p className="jv-comfort">{day.comfort}</p>
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
            <div className="jv-page"><p>{day.line}</p></div>
            <p className="jv-note">오늘은 이걸로 충분합니다. 내일 또 와도, 며칠 뒤에 와도 그대로 있어요.</p>
          </div>
        )}

        {path === "more" && (
          <div className="jv-rise">
            <p className="jv-step-label">원할 때, 다른 시선으로</p>
            <p className="jv-mirror">{day.mirror}</p>
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
              {day.steps.map((s) => (
                <button key={s.label} type="button" aria-pressed={chosen === s.label} onClick={() => choose(s.label, s.after)}>{s.label}</button>
              ))}
              <button type="button" aria-pressed={chosen === "rest"} onClick={() => choose("rest", day.rest)}>오늘은 쉬기</button>
            </div>
          </div>
        )}

        {after && (
          <div ref={bookRef} className="jv-rise jv-book">
            <p className="jv-step-label">이 날들이 책의 한 쪽으로</p>
            <div className="jv-pages">
              <article><small>첫째 날</small><p>{day.line}</p></article>
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

// 첫 화면의 상품 — 무엇을 얻는지 눈으로 먼저 본다. 글은 가상 예시이고 쪽을 넘겨 기쁜 날과 버거운 날을 함께 보여 준다.
const PAGES = [
  { date: "3월 2일", text: "서른여덟에 면허를 땄다. 주차장에서 혼자 소리를 질렀다." },
  { date: "5월 18일", text: "괜찮다고 했지만, 괜찮지 않았다. 그래도 오늘을 적어 둔다." },
  { date: "8월 9일", text: "오늘 하늘이 처음 보는 색이었다. 사진 대신 한 줄로 남긴다." },
];

function ProductBook({ paused }: { paused: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % PAGES.length), 4800);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <figure className="pb">
      <div className="pb-spread">
        <div className="pb-page pb-left"><small>나의 올해</small><span>내 말로 남긴<br />한 권</span></div>
        <div key={i} className="pb-page pb-right"><small>{PAGES[i].date}</small><p>{PAGES[i].text}</p></div>
      </div>
      <figcaption>가상 기록으로 만든 예시</figcaption>
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
              <p className="pb-kicker">하루 한 줄로 만드는 내 책</p>
              <h1>사진은 수만 장인데,<br />그날의 마음은 한 줄도 없습니다.</h1>
              <p className="ol-sub">하루 한 줄이면, 그 마음이 내 책이 됩니다.</p>
              <a className="ol-cta" href={start("hero")}>오늘의 한 줄 쓰기 <span>↗</span></a>
              <p className="ol-small">무료 · 쓰자마자 책의 한 쪽으로 · 지금은 초대받은 분부터</p>
            </div>
            <ProductBook paused={!!current} />
          </div>
        </section>

        <main>
          <section className="pb-why">
            <article><strong>30초</strong><h3>길게 안 써도 됩니다</h3><p>좋았던 일도, 속상했던 일도 한 줄이면 끝.</p></article>
            <article><strong>바로</strong><h3>쓰자마자 책이 됩니다</h3><p>내가 쓴 말 그대로, 책의 한 쪽으로 보여 드립니다.</p></article>
            <article><strong>나만</strong><h3>내 계정에만 남습니다</h3><p>원할 때만 AI에게 질문을 받고, 건넬지도 내가 정합니다.</p></article>
          </section>

          <section className="pb-two">
            <h2>한 권은 나에게.<br />한 권은 소중한 사람에게.</h2>
            <div className="ol-covers">
              <div className="ol-cover ol-cover-self"><span>나에게</span><em>온순간</em></div>
              <div className="ol-cover ol-cover-gift"><span>당신에게</span><em>온순간</em></div>
            </div>
            <div className="pb-two-copy">
              <p><strong>내가 다시 펼치는 책</strong>기뻤던 날도 버거웠던 날도, 내 말 그대로.</p>
              <p><strong>세상에 한 권뿐인 선물</strong>말로 다 못 한 마음을, 그 사람에게.</p>
            </div>
            <p className="ol-books-note">표지는 가상 예시입니다. 종이책은 시범을 준비하고 있어요.</p>
          </section>

          <section className="jl-pick" id="journeys">
            <h2>지금, 누구의 이야기를<br />남기고 싶으세요?</h2>
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
            <h2>오늘의 한 줄이, 첫 쪽입니다.</h2>
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

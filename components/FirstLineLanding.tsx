"use client";

/**
 * 첫 화면 — 무슨 서비스인지, 무엇을 얻는지, 지금 무엇을 누르는지 5초 안에 (K2, 2026-11-01).
 *
 * 경계
 *   - 버튼은 하나. 앱의 /start 로 가고, 넘기는 것은 버튼 위치(src)뿐이다.
 *   - 예시는 가상 기록이다. 원문과 AI 편집 초안을 가르고, 지금 되는 일과 시범 중인 일을 섞지 않는다.
 *   - 앱 주소 바꾸기(?app=)는 *.vercel.app 시범 화면에서만 듣는다. 운영 주소에서는 무시한다.
 */

import { useEffect, useState } from "react";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export default function FirstLineLanding({ ways }: { ways: React.ReactNode }) {
  const [app, setApp] = useState(APP);
  useEffect(() => {
    if (!window.location.hostname.endsWith(".vercel.app")) return;
    const v = new URLSearchParams(window.location.search).get("app");
    if (v && /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(v)) setApp(v);
  }, []);
  const start = (src: string) => `${app}/start?src=${src}`;

  return (
    <div id="om-purpose">
      <div className="surface">
        <header>
          <span className="logo">온순간<small>ONMOMENT</small></span>
          <a className="text" href={`${app}/`}>이미 쓰고 있어요</a>
        </header>

        <main>
          <section className="hero">
            <div className="lead">
              <h1>내가 쓴 한 줄이 쌓여,<br /><em>내 책이 됩니다.</em></h1>
              <p className="intro">오늘을 온전히 남기는, 한 줄.<br />남긴 글은 내 말 그대로 책의 한 쪽이 돼요.</p>
              <div className="actions">
                <a className="primary" href={start("hero")}>오늘의 한 줄 쓰기 <span>↗</span></a>
              </div>
              <p className="quiet">가입하면 바로 쓸 수 있어요. 나만의 공간으로 시작합니다.</p>
            </div>

            <div className="evidence">
              <div className="purpose-paper">
                <small>11월 2일</small>
                <p>퇴근길에 비가 그쳤다.<br />우산을 접고 조금 더 걸었다.</p>
              </div>
              <p className="source">가상 기록 예시 · 쓴 글을 고치지 않고 그대로 놓은 한 쪽</p>
            </div>
          </section>

          <section className="easy">
            <div>
              <p className="eyebrow">어떻게</p>
              <h2>한 줄을 남기면,<br />책의 한 쪽으로 돌아옵니다.</h2>
            </div>
            <div className="easy-steps">
              <article><span>1</span><div><h3>오늘의 한 줄을 씁니다</h3><p>한 단어도, 긴 글도 쓴 그대로 담깁니다.</p></div></article>
              <article><span>2</span><div><h3>내 말이 책의 한 쪽이 됩니다</h3><p>남긴 글을 한 쪽으로 보고, 책 탭에서 언제든 다시 찾습니다.</p></div></article>
              <article><span>3</span><div><h3>쌓이면 내 책이 됩니다</h3><p>담을 기록은 내가 고릅니다. 원하면 하루를 돌아보는 시간도 이어집니다.</p></div></article>
            </div>
          </section>

          <section className="purpose-section">
            <p className="eyebrow">책은 이렇게 만들어집니다</p>
            <div className="purpose-preview">
              <div className="purpose-paper">
                <small>내가 쓴 원문</small>
                <p>퇴근길에 비가 그쳤다. 우산을 접고 조금 더 걸었다.</p>
                <p>오늘은 할 말을 끝내 하지 못했다.</p>
              </div>
              <div className="purpose-paper">
                <small>AI 편집 초안 · 시범 제작</small>
                <p>할 말을 끝내 하지 못한 날에도, 퇴근길에는 우산을 접고 조금 더 걸었다.</p>
                <small>원문에 있는 일로만 이야기를 엮어 제안합니다.</small>
              </div>
            </div>
            <p className="source">모두 가상 기록·편집 예시입니다.</p>
            <p className="quiet">
              지금 앱에서 되는 일: 한 줄 남기기, 한 쪽으로 보기, 다시 찾기, 고른 기록으로 책 미리 보기.<br />
              시범 중인 일: AI 편집 초안, 인쇄된 책. 원문은 그대로 보관하고, 책으로 건네기 전 내가 확인합니다.
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
    </div>
  );
}

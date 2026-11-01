"use client";

/**
 * 첫 화면 — 무슨 서비스인지, 무엇을 얻는지, 지금 무엇을 누르는지 5초 안에 (K2, 2026-11-01).
 *
 * 경계
 *   - 버튼은 하나. 앱의 /start 로 가고, 넘기는 것은 버튼 위치(src)뿐이다.
 *   - 예시는 가상 기록이다. 원문과 AI 시안을 가르고, 지금 되는 일과 준비 중인 일을 섞지 않는다.
 *   - 사람 편집 시범은 기본 서비스가 아니라 이 화면에 싣지 않는다. 앱의 별도 선택 안내에만 둔다.
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
              <p className="quiet">지금은 초대받은 분부터 함께하는 작은 베타예요. 초대 링크가 없으면 참여 신청 안내로 이어져요. 나만의 공간으로 시작합니다.</p>
            </div>

            <div className="evidence">
              <div className="purpose-paper">
                <small>11월 2일</small>
                <p>퇴근길에 비가 그쳤다.<br />우산을 접고 조금 더 걸었다.</p>
              </div>
              <p className="source">가상 기록 예시 · 앱에서 바로 보는 한 쪽, 쓴 글 그대로</p>
            </div>
          </section>

          <section className="easy">
            <div>
              <p className="eyebrow">어떻게</p>
              <h2>한 줄을 남기면,<br />책의 한 쪽으로 돌아옵니다.</h2>
            </div>
            <div className="easy-steps">
              <article><span>1</span><div><h3>오늘의 한 줄을 씁니다</h3><p>한 단어도, 긴 글도 쓴 그대로 담깁니다.</p></div></article>
              <article><span>2</span><div><h3>원문을 한 쪽으로 봅니다</h3><p>쓴 글을 고치지 않고 책의 한 쪽에 놓습니다.</p></div></article>
              <article><span>3</span><div><h3>저장을 확인하고 다시 읽습니다</h3><p>남긴 글은 책 탭에서 언제든 다시 읽습니다. 원하면 하루를 돌아보는 시간도 이어집니다.</p></div></article>
              <article><span>4</span><div><h3>쌓이면 내 책이 됩니다</h3><p>담을 기록은 내가 고르고, 책 모양으로 미리 봅니다.</p></div></article>
            </div>
          </section>

          <section className="purpose-section">
            <p className="eyebrow">지금 되는 일과 준비 중인 일</p>
            <div className="purpose-preview">
              <div className="purpose-paper">
                <small>내가 쓴 원문</small>
                <p>퇴근길에 비가 그쳤다. 우산을 접고 조금 더 걸었다.</p>
                <p>오늘은 할 말을 끝내 하지 못했다.</p>
              </div>
              <div className="purpose-paper">
                <small>AI 편집 시안 · 앱에 아직 없는 기능</small>
                <p>할 말을 끝내 하지 못한 날에도, 퇴근길에는 우산을 접고 조금 더 걸었다.</p>
                <small>준비 중인 방향을 보여 주는 가상 시안입니다.</small>
              </div>
            </div>
            <p className="source">모두 가상 기록·편집 예시입니다.</p>
            <p className="quiet">
              지금 앱에서: 한 줄 쓰기, 원문을 한 쪽으로 보기, 다시 읽기, 고른 기록을 책 모양으로 미리 보기.<br />
              돌아보기를 고르면 AI가 문장을 제안하기도 해요. 제안은 내가 고른 때에만 저장됩니다.<br />
              준비 중: AI 편집 초안과 종이책 시범. 내 원문은 그대로 보관하고, 편집 초안은 내가 확인한 뒤에만 건네는 방식으로 만들고 있어요. 지금 신청하거나 받을 수 있는 기능은 아니에요.
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

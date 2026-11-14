import type { Metadata } from "next";
import Script from "next/script";
import { GIFT_JOURNEYS, journeyHref } from "@/lib/landing/giftJourneys";
import "../v4.css";
import "../gift.css";

// 이야기 선물 — 새 온순간을 운영 홈과 나란히 시험하는 숨은 페이지(11-14 범님).
//   홈 · 사이트맵 · 검색에 드러내지 않는다. 링크를 받은 사람만 들어온다. 시안 v3(DESIGN.md)의 '선물 소개'를 실제 앱 범위에 맞춘다.
const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";
const START = `${APP}/start?src=gift-page&next=%2Fprepare`;

const TITLE = "이야기 선물 — 온순간";
const DESC = "한 사람을 위한 책, 우리의 기억으로. 각자가 기억하는 한 장면씩, 쓴 사람의 말 그대로 모아 건네는 이야기 선물. 지금은 디지털본을 무료로 시범 운영해요.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  robots: { index: false, follow: false },
  openGraph: {
    title: "한 사람을 위한 책, 우리의 기억으로 — 온순간",
    description: "각자가 기억하는 한 장면씩, 쓴 사람의 말 그대로. 온순간 이야기 선물.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

const ROLES = [
  { who: "준비하는 사람", h: "누가 남겼는지\n한눈에 보여요.", p: "단톡방에 붙일 초대 글이 함께 만들어져요. 아직 못 쓴 분께는 재촉 대신 물음 하나를 건네요." },
  { who: "함께 쓰는 사람", h: "한 장면이면\n시작할 수 있어요.", p: "가입 없이 링크에서 바로 써요. 물음 셋이 길잡이가 되고, 한 칸만 채워도 돼요. 다른 사람의 글은 보이지 않아요." },
  { who: "받는 사람", h: "내 속도로\n천천히 펼쳐요.", p: "누가 어떤 날을 기억했는지 읽어요. 답장이나 감동한 반응을 해야 할 의무는 없어요." },
];

const STEPS = [
  { n: "01", h: "누구에게, 어떤 날", p: "여정과 받는 쪽, 그날만 정하면 준비 공간이 생겨요. 원고 마감은 그날에 맞춰 자동으로 잡혀요." },
  { n: "02", h: "링크 하나로 모으기", p: "함께 쓸 사람들은 가입 없이, 각자 편한 때에 휴대폰에서 한 장면씩 남겨요." },
  { n: "03", h: "원문 그대로 엮기", p: "모인 장면이 쓴 사람의 말 그대로 한 권으로 엮여요. 준비하는 사람은 넣고 빼기만 하고, 글은 쓴 사람만 고쳐요." },
  { n: "04", h: "미리 보고 건네기", p: "책으로 미리 보고 완성하면 글이 고정되고, 받는 쪽에 드릴 링크가 생겨요." },
];

const FAQ = [
  ["받는 분이 직접 쓰셔야 하나요?", "아니요. 함께한 사람들이 기억하는 장면으로 한 권을 만들어요. 받는 분은 그날 편히 읽으시면 돼요."],
  ["글을 잘 못 써도 괜찮을까요?", "네. 한두 문장이어도 좋아요. 잘 쓴 문장보다 그 사람과만 나눈 장면이 더 오래 남아요."],
  ["가격은 얼마인가요?", "지금은 디지털본(링크로 읽는 책)을 무료로 시범 운영해요. 종이책은 준비하고 있어요."],
  ["누가 글을 읽나요?", "준비하는 사람과 받는 쪽이 읽어요. ‘우리의 시간을 남기기’는 함께한 사람 모두가 읽어요. 쓰는 화면 맨 위에 늘 먼저 알려 드려요."],
  ["완성한 뒤에도 고칠 수 있나요?", "완성하면 글이 그대로 고정돼요. 받는 쪽이 읽는 책이 바뀌지 않도록, 고치기는 완성 전까지만 열려 있어요."],
  ["받는 분도 가입해야 하나요?", "아니요. 링크를 열면 바로 읽어요. 답장이나 가입을 요청하지 않아요."],
];

export default function GiftPage() {
  return (
    <div className="gift-page">
      <a className="skip" href="#main">본문으로 바로가기</a>
      <header>
        <a className="brand" href="/" aria-label="온순간 처음으로">
          <span aria-hidden="true">✳︎</span> 온순간<small>ONMOMENT</small>
        </a>
        <nav aria-label="주 메뉴">
          <a href="#journeys">일곱 가지 선물</a>
          <a className="nav-cta" href={START} data-app-link>선물 준비 ↗</a>
        </nav>
      </header>

      <main id="main">
        <section className="gift-hero wrap">
          <div className="gift-hero-copy">
            <p className="eyebrow">부모님 큰 생신 · 은퇴 · 소중한 날의 이야기 선물</p>
            <h1>
              한 사람을 위한 책,
              <br />
              우리의 기억으로.
            </h1>
            <p className="gift-lead">
              “고맙습니다” 뒤에 있던 그날을,{" "}
              <br />
              각자의 말로 모아 한 권으로 건네요.
            </p>
            <div className="gift-hero-actions">
              <a className="button primary" href={START} data-app-link>
                이야기 선물 준비하기 <span aria-hidden="true">↗</span>
              </a>
              <a className="text-button" href="#journeys">일곱 가지 선물 보기</a>
            </div>
            <p className="fine">한 문장부터 · 쓴 사람이 직접 고침 · 완성 전 책으로 미리 보기 · 디지털본 무료 시범</p>
          </div>
          <figure className="gift-hero-quote">
            <blockquote>
              “아빠, 별말 없이 함께 먹던
              <br />
              그 저녁들이 고마워요.”
            </blockquote>
            <figcaption>가족이 남기는 한 장면 · 가상 예시</figcaption>
          </figure>
        </section>

        <section className="section gift-why">
          <div className="wrap gift-why-inner">
            <p className="eyebrow">칭찬보다 오래 남는, 우리만 아는 장면</p>
            <h2>
              그 사람이 내게
              <br />
              어떤 사람이었는지.
            </h2>
            <p className="gift-body">
              언제, 어디서, 어떤 말을 나눴는지. 한 장면에 마음을 담으면{" "}
              <br className="gift-br" />그 사람에게만 건넬 수 있는 이야기가 돼요.
            </p>
          </div>
        </section>

        <section className="section gift-journeys wrap" id="journeys" aria-labelledby="journeys-h">
          <p className="eyebrow">일곱 가지 이야기 선물</p>
          <h2 id="journeys-h">누구에게, 어떤 날에 건넬까요.</h2>
          <div className="gift-journey-grid">
            {GIFT_JOURNEYS.map((j) => (
              <article key={j.key} className={`gift-journey${j.key === "self" ? " is-self" : ""}`} data-journey={j.key}>
                <p className="gift-journey-who">{j.who}</p>
                <h3>{j.name}</h3>
                <p className="gift-journey-line">{j.line}</p>
                <ul className="gift-days" aria-label="이런 날에">
                  {j.days.map((d) => <li key={d}>{d}</li>)}
                </ul>
                <div className="gift-journey-sample">
                  <span>{j.question}</span>
                  <p>{j.example}</p>
                </div>
                <a className="gift-journey-cta" href={journeyHref(APP, j.key)} data-app-link>
                  {j.cta} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="fine centered">예시 장면은 가상이에요. 실제 책에는 쓴 사람의 말이 그대로 들어가요.</p>
        </section>

        <section className="section gift-roles">
          <div className="wrap">
            <p className="eyebrow">준비하는 분에게도, 쓰는 분에게도</p>
            <h2>
              마음을 모으는 수고를,
              <br />
              조금 가볍게.
            </h2>
            <div className="gift-role-grid">
              {ROLES.map((r) => (
                <article key={r.who}>
                  <span>{r.who}</span>
                  <h3>{r.h}</h3>
                  <p>{r.p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section gift-how" id="how">
          <div className="wrap">
            <p className="eyebrow">만드는 순서</p>
            <h2>정하는 날에서 건네는 날까지.</h2>
            <ol className="gift-steps">
              {STEPS.map((s) => (
                <li key={s.n}>
                  <span>{s.n}</span>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section gift-keep wrap" aria-labelledby="keep-h">
          <p className="eyebrow">이렇게 지켜요</p>
          <h2 id="keep-h">각자의 말이, 각자의 것으로.</h2>
          <ul>
            <li>각자의 글은 쓴 사람의 말 그대로 담아요.</li>
            <li>쓰기 전에, 누가 읽는지 먼저 알려 드려요.</li>
            <li>준비하는 사람은 넣고 빼기만 하고, 남의 글을 고치지 않아요.</li>
            <li>완성하면 글이 고정돼요. 받는 쪽이 읽는 책은 바뀌지 않아요.</li>
            <li>글은 암호화해 보관하고, 링크를 받은 사람만 읽어요.</li>
          </ul>
        </section>

        <section className="section faq wrap launch-faq">
          <div>
            <p className="eyebrow">자주 묻는 것</p>
            <h2>
              작은 궁금함에,
              <br />
              작은 답을.
            </h2>
          </div>
          <div>
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section gift-apply" id="start" aria-labelledby="start-h">
          <div className="wrap gift-start">
            <p className="eyebrow">디지털본 무료 시범</p>
            <h2 id="start-h">
              지금 떠오르는 한 사람,
              <br />
              함께한 어떤 날을 건네고 싶으세요?
            </h2>
            <a className="button primary" href={START} data-app-link>
              이야기 선물 준비하기 <span aria-hidden="true">↗</span>
            </a>
            <p className="fine">준비하는 분만 로그인해요 · 함께 쓰는 사람과 받는 쪽은 링크로 바로 · 종이책은 준비하고 있어요</p>
          </div>
        </section>
      </main>

      <footer className="wrap">
        <a className="brand" href="/">✳︎ 온순간</a>
        <p>
          내 모습 그대로 머물고,
          <br />내 이야기를 조금 더 만나는 곳.
        </p>
        <div>
          <a href="/story/">온순간의 이야기 →</a>
          <br />
          <a href="/principles/">기록을 대하는 방식 →</a>
        </div>
        <p className="fine">디지털본 시범 운영 · 이 페이지의 예시 장면은 가상이에요.</p>
        <p className="fine">
          © 2026 OnMoment · <a href="/privacy/">개인정보 처리방침</a> · <a href="/terms/">이용약관</a>
        </p>
      </footer>
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </div>
  );
}

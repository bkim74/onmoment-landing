import type { Metadata } from "next";
import Script from "next/script";
import "../v4.css";
import "../gift.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

const TITLE = "칠순·환갑 이야기 선물 — 온순간";
const DESC = "가족이 저마다 기억하는 한 장면씩. 그 말들을 모아 칠순·환갑에 건네는 한 권의 이야기 선물. 지금은 디지털본을 무료로 시범 운영해요.";
const START = `${APP}/start?src=gift-page&next=%2Fprepare`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://onmoment.kr/gift/" },
  openGraph: {
    title: "가족이 기억하는 그분을, 한 권에 — 온순간",
    description: "칠순·환갑에 건네는 가족의 이야기 선물. 한 사람이 한 장면씩, 각자의 말 그대로.",
    url: "https://onmoment.kr/gift/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

const VOICES = [
  {
    who: "큰딸",
    title: "돌아간 길을 보며 웃던 날",
    text: "아빠와 오래된 사진을 함께 봤다. 사진 속 산길을 가리키며 “이때 길을 잘못 들어서 한참 돌았지.” 하셨다.\n그때 나는, 길을 돌아가도 웃을 수 있다는 걸 아빠한테서 배웠다.",
  },
  {
    who: "막내아들",
    title: "현관에 놓인 구두",
    text: "첫 출근 날 아침, 아버지가 닦아 둔 구두가 현관에 있었다. 하신 말씀은 “늦지 마라” 한마디였다.\n그 구두를 신고 나서던 기분을 아직 기억한다.",
  },
  {
    who: "손녀",
    title: "냉장고 위의 그림",
    text: "할아버지는 내가 그린 그림을 냉장고에 붙여 두고, 손님이 오실 때마다 보여 주셨다.\n조금 부끄러웠고, 많이 좋았다.",
  },
];

const STEPS = [
  { n: "01", h: "받는 분과 그날", p: "받는 분 이름과 그날만 정하면 준비 공간이 생겨요. 원고 마감은 그날에 맞춰 자동으로 잡혀요." },
  { n: "02", h: "가족에게 링크 하나", p: "단톡방에 붙일 글이 함께 만들어져요. 가족은 가입 없이, 각자 편한 때에 휴대폰에서 한 장면씩 남겨요." },
  { n: "03", h: "원문 그대로 엮기", p: "모인 장면이 쓴 사람의 말 그대로 한 권으로 엮여요. 준비하시는 분은 넣고 빼기만 하고, 글은 쓴 사람만 고쳐요." },
  { n: "04", h: "완성하고 건네기", p: "책으로 미리 보고 완성하면 받는 분께 드릴 링크가 생겨요. 그날, 그 링크를 건네요." },
];

const FAQ = [
  ["부모님이 직접 쓰셔야 하나요?", "아니요. 가족이 함께 겪고 기억하는 장면으로 한 권을 만들어요. 부모님은 받는 날 편히 읽으시면 돼요."],
  ["글을 잘 못 써도 괜찮을까요?", "네. 한두 문장이어도 좋아요. 물음을 따라 떠오른 그대로 남기면 돼요. 잘 쓴 문장보다 그 집만 아는 장면이 더 오래 남아요."],
  ["가격은 얼마인가요?", "지금은 디지털본(링크로 읽는 책)을 무료로 시범 운영해요. 종이책은 준비하고 있어요."],
  ["언제쯤 시작하면 좋을까요?", "가족이 쓸 시간이 있으면 좋아요. 그날 2~3주 전이면 넉넉하고, 원고 마감은 그날 사흘 전으로 자동으로 잡혀요."],
  ["혼자 준비해도 되나요?", "네. 준비하시는 분도 같은 링크로 장면을 남길 수 있어요. 한 장면으로도 한 권이 돼요."],
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
          <a href="#how">만드는 순서</a>
          <a className="nav-cta" href={START} data-app-link>선물 준비 시작 ↗</a>
        </nav>
      </header>

      <main id="main">
        <section className="gift-hero wrap">
          <div className="gift-hero-copy">
            <p className="eyebrow">칠순 · 환갑 이야기 선물 · 디지털본 시범</p>
            <h1>
              가족이 저마다 기억하는
              <br />
              그분을, 한 권에.
            </h1>
            <p className="gift-lead">
              자녀와 손주, 가족 한 사람 한 사람이{" "}
              <br />
              함께 겪은 장면을 하나씩 남기면,{" "}
              <br />그 말들을 모아 한 권의 이야기로 엮어요.
            </p>
            <div className="gift-hero-actions">
              <a className="button primary" href={START} data-app-link>
                선물 준비 시작하기 <span aria-hidden="true">↗</span>
              </a>
              <a className="text-button" href="#how">
                어떻게 만들어지나요
              </a>
            </div>
            <p className="fine">지금은 디지털본을 무료로 시범 운영해요. 준비하시는 분만 로그인하고, 가족과 받는 분은 링크로 바로 들어와요.</p>
          </div>
          <figure className="gift-hero-photo">
            <img src="/assets/journey-parents.webp" alt="오래된 사진을 함께 보는 가족의 손" width={1536} height={1024} />
            <figcaption>가상 예시 이미지</figcaption>
          </figure>
        </section>

        <section className="section gift-write">
          <div className="wrap gift-write-inner">
            <div>
              <p className="eyebrow">쓰는 가족에게</p>
              <h2>
                축사를 쓰지 않아도 돼요.
                <br />
                기억나는 한 장면이면 충분해요.
              </h2>
              <p className="gift-body">
                가족에게는 링크 하나가 가요. 휴대폰에서 세 가지 물음을 따라, 그때의 장면을 자기 말로 남겨요.
              </p>
              <p className="gift-body">
                문장은 각자의 말 그대로 담아요. 가입하지 않아도 되고, 다른 가족의 글은 보이지 않아요.
              </p>
            </div>
            <ol className="gift-prompts" aria-label="한 장면을 떠올리는 세 물음">
              <li>
                <span>하나</span>
                <strong>그때 그분이 한 말</strong>
                <em>“늦지 마라.” 짧았던 한마디도 좋아요.</em>
              </li>
              <li>
                <span>둘</span>
                <strong>그때 나는</strong>
                <em>그 자리에서 내가 보고 느낀 것.</em>
              </li>
              <li>
                <span>셋</span>
                <strong>지금 전하고 싶은 것</strong>
                <em>그날 하지 못한 말, 오늘 건네고 싶은 말.</em>
              </li>
            </ol>
          </div>
        </section>

        <section className="section gift-voices wrap" aria-labelledby="voices-h">
          <p className="eyebrow">한 권 안에서는</p>
          <h2 id="voices-h">
            같은 분을,
            <br />
            가족마다 다른 장면으로.
          </h2>
          <div className="gift-voice-grid">
            {VOICES.map((v) => (
              <article key={v.who}>
                <span className="gift-voice-who">{v.who}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
          <p className="fine centered">가상 예시예요. 실제 책에는 가족이 남긴 말이 그대로 들어가요.</p>
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
            <li>준비하시는 분은 가족이 건네기로 한 글만 봐요.</li>
            <li>모인 장면만으로 엮어요. 빈 쪽을 지어서 채우지 않아요.</li>
            <li>내가 쓴 장면은 원하면 내 온순간 기록으로도 간직해요.</li>
          </ul>
        </section>

        <section className="section gift-apply" id="start" aria-labelledby="start-h">
          <div className="wrap gift-start">
            <p className="eyebrow">디지털본 무료 시범</p>
            <h2 id="start-h">
              그날을,
              <br />
              지금 준비해요.
            </h2>
            <p className="gift-body">받는 분과 그날만 정하면, 가족에게 건넬 링크가 바로 생겨요.</p>
            <a className="button primary" href={START} data-app-link>
              선물 준비 시작하기 <span aria-hidden="true">↗</span>
            </a>
            <p className="fine">준비하시는 분만 로그인해요 · 종이책은 준비하고 있어요</p>
          </div>
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

        <section className="closing wrap">
          <span className="closing-star" aria-hidden="true">✳︎</span>
          <h2>먼저 내 이야기부터 남겨 보고 싶다면.</h2>
          <a className="button" href={`${APP}/start?src=gift-page`} data-app-link>
            오늘의 한 장면 남기기 ↗
          </a>
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
        <p className="fine">디지털본 시범 운영 · 이 페이지의 글과 이미지는 가상 예시예요.</p>
        <p className="fine">
          © 2026 OnMoment · <a href="/privacy/">개인정보 처리방침</a> · <a href="/terms/">이용약관</a>
        </p>
      </footer>
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </div>
  );
}

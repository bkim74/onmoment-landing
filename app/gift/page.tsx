import type { Metadata } from "next";
import Script from "next/script";
import GiftInquiryForm from "../../components/GiftInquiryForm";
import "../v4.css";
import "../gift.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

const TITLE = "칠순·환갑 이야기 선물 — 온순간";
const DESC = "가족이 저마다 기억하는 한 장면씩. 그 말들을 모아 칠순·환갑에 건네는 한 권의 이야기 선물. 지금은 시범 제작으로, 가격은 상담 뒤 안내해요.";

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
  { n: "01", h: "상담", p: "누구의 어떤 날인지, 그날이 언제인지, 몇 분이 함께 쓰는지 들어요. 가능한 형태와 일정을 함께 정해요." },
  { n: "02", h: "가족에게 링크 하나", p: "준비하시는 분이 가족에게 링크를 나눠요. 각자 편한 때에, 휴대폰에서 한 장면씩 남겨요." },
  { n: "03", h: "원문 그대로 엮기", p: "모인 장면을 쓴 사람의 말 그대로 모아 순서와 구성을 엮어요. 표현을 고칠 때는 쓴 사람이 직접 확인해요." },
  { n: "04", h: "확인하고 건네기", p: "준비하시는 분이 최종본을 확인한 뒤에 만들어요. 그날, 한 권으로 건네요." },
];

const FAQ = [
  ["부모님이 직접 쓰셔야 하나요?", "아니요. 가족이 함께 겪고 기억하는 장면으로 한 권을 만들어요. 부모님은 받는 날 편히 읽으시면 돼요."],
  ["글을 잘 못 써도 괜찮을까요?", "네. 한두 문장이어도 좋아요. 물음을 따라 떠오른 그대로 남기면 돼요. 잘 쓴 문장보다 그 집만 아는 장면이 더 오래 남아요."],
  ["가격은 얼마인가요?", "모인 이야기의 양과 책의 형태, 날짜에 따라 달라서 상담 뒤에 안내해요. 안내를 듣고 정하실 때까지 비용은 들지 않아요."],
  ["언제쯤 신청하면 좋을까요?", "가족이 쓰고, 엮고, 확인하고, 만드는 시간이 필요해요. 그날까지 남은 시간에 맞춰 가능한 형태를 상담에서 함께 정해요."],
  ["혼자 준비해도 되나요?", "네. 혼자 쓰셔도 한 권이 될 수 있어요. 분량에 맞는 형태를 상담에서 안내해요."],
  ["사진도 넣을 수 있나요?", "네, 글과 함께 넣을 수 있어요. 사진이 없어도 기억하는 장면이면 시작할 수 있어요."],
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
          <a className="nav-cta" href="#apply">상담 신청</a>
        </nav>
      </header>

      <main id="main">
        <section className="gift-hero wrap">
          <div className="gift-hero-copy">
            <p className="eyebrow">칠순 · 환갑 이야기 선물 · 시범 제작</p>
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
              <a className="button primary" href="#apply">
                시범 제작 상담 신청 <span aria-hidden="true">↓</span>
              </a>
              <a className="text-button" href="#how">
                어떻게 만들어지나요
              </a>
            </div>
            <p className="fine">지금은 시범 제작이에요. 가격과 형태는 모인 이야기와 날짜에 맞춰 상담 뒤 안내해요.</p>
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
                문장은 각자의 말 그대로 담아요. 원할 때만, 떠올리기 쉬운 물음 하나를 더 건네요.
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
            <h2>상담에서 건네는 날까지.</h2>
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
            <li>모인 글이 적으면 얇은 책자로 엮어요. 빈 쪽을 지어서 채우지 않아요.</li>
            <li>내가 쓴 장면은 원하면 내 온순간 기록으로도 간직해요.</li>
          </ul>
        </section>

        <section className="section gift-apply" id="apply" aria-labelledby="apply-h">
          <div className="wrap gift-apply-inner">
            <div className="gift-apply-copy">
              <p className="eyebrow">시범 제작 상담 신청</p>
              <h2 id="apply-h">
                그날을,
                <br />
                함께 준비해요.
              </h2>
              <p className="gift-body">몇 가지만 알려 주시면, 적어 주신 메일로 상담 안내를 보내 드려요.</p>
            </div>
            <GiftInquiryForm />
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
        <p className="fine">시범 제작 안내 · 이 페이지의 글과 이미지는 가상 예시예요.</p>
        <p className="fine">
          © 2026 OnMoment · <a href="/privacy/">개인정보 처리방침</a> · <a href="/terms/">이용약관</a>
        </p>
      </footer>
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </div>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import data from "@/lib/landing/giftV5.json";

// 독서모임에서 함께 쓰기(2026-11-16) — '우리의 시간을 남기기' 안의 전용 입구. 메인에 여덟째 카드 · 별도 서비스 메뉴는 두지 않는다.
//   공통 경험: 내 삶의 한 장면을 남기고 → 다시 바라보고 → 원하는 만큼 나누고 → 원할 때 이야기책으로 간직한다. 책은 내 이야기를 떠올리는 계기.
//   '독서모임'(만나는 우리) 과 '이야기책 만들기'(결과물) 를 나눠 말한다. 예시는 가상.
const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";
const PAGE = "https://onmoment.kr/gift/together/reading/";

export const metadata: Metadata = {
  title: "독서모임에서 함께 쓰기 — 온순간",
  description: "같은 책을 읽고, 서로 다른 삶의 이야기를 만나요. 책을 읽으며 떠오른 내 경험을 남기고, 나누고 싶은 만큼만 모임에 전할 수 있어요.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "같은 책을 읽고, 서로 다른 삶의 이야기를 만나요 — 온순간",
    description: "책을 읽으며 떠오른 내 경험을 남겨보세요. 나누고 싶은 만큼만 모임에 전할 수 있어요.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

export default function ReadingClubPage() {
  return (
    <>
      <link rel="stylesheet" href="/gift-v5/styles.css" precedence="default" />
      <link rel="stylesheet" href="/gift-v5/campaign.css" precedence="default" />
      <link rel="stylesheet" href="/gift-v5/operate.css" precedence="default" />
      <link rel="stylesheet" href="/gift-v5/main.css" precedence="default" />
      <a className="skip" href="#content">본문으로 바로가기</a>
      <div id="stage">
        <div id="app" data-one-main data-reading-page>
          <div dangerouslySetInnerHTML={{ __html: data.header }} />
          <main id="content" className="campaign-hub one-main" tabIndex={-1}>
            <section className="hero wrap journey-hub">
              <div>
                <p className="eyebrow"><a href="/gift/together/">우리의 시간을 남기기</a> · 독서모임에서 함께 쓰기</p>
                <h1>같은 책을 읽고,<br />서로 다른 삶의 이야기를 만나요.</h1>
                <p className="lead">책을 읽으며 떠오른 내 경험을 남겨보세요.<br />나누고 싶은 만큼만 모임에 전할 수 있어요.</p>
                <div className="cta-row">
                  <a className="button primary" href={`${APP}/club/new?src=landing-reading`} data-app-link>독서모임 열기 <span>↗</span></a>
                  <button type="button" className="button" data-copy-page>이 페이지 주소 복사</button>
                </div>
                <p className="fine" data-copy-status aria-live="polite">모임장이 이 주소를 모임 대화방에 나눠도 좋아요. 초대받은 분은 받은 링크를 열면 바로 쓸 수 있어요.</p>
              </div>
              <figure className="hero-figure">
                <img src="/assets/journey-teen.webp" width={768} height={512} alt="여러 사람이 마주 앉을 수 있는 따뜻한 나무 식탁과 기록장" />
                <figcaption>분위기를 돕는 이미지예요 · 내 글에 사진은 선택이에요</figcaption>
              </figure>
            </section>

            <section className="section wrap">
              <div className="section-head"><div><p className="eyebrow">이렇게 이어져요</p><h2>책이 내 이야기를<br />떠올리게 해요.</h2></div></div>
              <div className="steps om-steps-4">
                <article><span className="number">01</span><h3>남기기</h3><p>책을 읽다 떠오른 내 경험 하나를, 내 말 그대로 남겨요.</p></article>
                <article><span className="number">02</span><h3>다시 바라보기</h3><p>남긴 글은 내 기록에서 언제든 다시 읽을 수 있어요.</p></article>
                <article><span className="number">03</span><h3>원하는 만큼 나누기</h3><p>‘모임에 나누기’를 누른 글만, 보기 전에 확인한 그대로 모임에 전해져요.</p></article>
                <article><span className="number">04</span><h3>원할 때 간직하기</h3><p>모아 둔 내 글로 이야기책을 엮는 일은 원할 때만 해요.</p></article>
              </div>
            </section>

            <section className="section wrap">
              <div className="section-head"><div><p className="eyebrow">가상 예시</p><h2>이런 한 장면이면 돼요.</h2></div><p>한 문장만 남겨도 괜찮아요.<br />이만큼 길게 쓰지 않아도 돼요.</p></div>
              <div className="om-pages">
                <article className="om-page">
                  <p className="om-page-by">이번 책을 읽다가 · 가상 예시</p>
                  <p>책 속에서 누군가를 기다려주는 장면을 읽다가 딸의 자전거 연습이 떠올랐어요. 저는 자꾸 방법을 알려줬는데, 딸은 ‘그냥 옆에 있어줘’라고 했어요. 그날은 가르쳐주는 것보다 곁에 있는 게 필요했나 봐요.</p>
                </article>
                <article className="om-page om-page-self">
                  <p className="om-page-by">한 문장도 충분해요 · 가상 예시</p>
                  <p>딸이 ‘그냥 옆에 있어줘’라고 했던 날이 떠올랐다.</p>
                </article>
              </div>
            </section>

            <section className="section wrap">
              <div className="section-head"><div><p className="eyebrow">누가 읽나요</p><h2>나누기 전까지는,<br />나만 봐요.</h2></div></div>
              <div className="om-care">
                <ul>
                  <li>처음 남긴 글은 ‘내 기록’에 간직돼요. 모임장도, 다른 참여자도 볼 수 없어요.</li>
                  <li>‘모임에 나누기’를 누르면, 전해질 글과 읽을 사람을 먼저 보여드려요. 확인한 그대로만 전해져요.</li>
                  <li>나눈 글은 언제든 거둘 수 있어요.</li>
                  <li>모임에 나눈 글과 이야기책에 넣을 글은 따로예요. 책에 넣을 글은 내가 고르고 확인해요.</li>
                </ul>
              </div>
            </section>

            <section className="section wrap">
              <div className="om-scope">
                <div className="om-scope-now">
                  <h3>독서모임</h3>
                  <p>같은 책을 읽고 만나는 우리 모임이에요. 온순간에서는 각자 떠오른 경험을 남기고, 원하는 만큼 나눠요.</p>
                </div>
                <div className="om-scope-later">
                  <h3>이야기책 만들기</h3>
                  <p>내가 고른 내 글로 엮는 한 권이에요. 모임에 나눈 것과 별개로, 원할 때 만들어요.</p>
                </div>
              </div>
              <p className="om-note">모임이 끝난 뒤에는 ‘오늘 이야기를 나누고 새롭게 떠오른 게 있나요?’라는 물음이 이어질 수 있어요. 답하지 않아도 괜찮아요.</p>
              <div className="cta-row"><a className="button primary" href={`${APP}/club/new?src=landing-reading`} data-app-link>독서모임 열기 <span>↗</span></a></div>
            </section>
          </main>
          <div dangerouslySetInnerHTML={{ __html: data.footer }} />
        </div>
      </div>
      <Script id="copy-page" strategy="afterInteractive">{`(()=>{const b=document.querySelector('[data-copy-page]'),s=document.querySelector('[data-copy-status]');if(!b||!s)return;b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('${PAGE}');s.textContent='주소를 복사했어요. 모임 대화방에 붙여넣어 주세요.';}catch{s.textContent='${PAGE} — 길게 눌러 복사해 주세요.';}});})();`}</Script>
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </>
  );
}

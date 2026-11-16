import type { Metadata } from "next";
import Script from "next/script";
import { MAIN_JOURNEYS, SELF_SIDE } from "@/lib/landing/oneMain";

// 하나의 메인(2026-11-16 전달서) — 이야기 선물을 앞에, 예전 메인의 개인 기록 · 이벤트 · 권리 안내를 같은 브랜드 안에 흡수한다.
//   순서(11-16 하나의 이야기): 선물의 모습 → 할 일 → 완성될 한 권 → 일곱 여정 → 건네는 한 쪽 · 나에게 남는 한 쪽 → 받는 날 → 지금 쓸 수 있는 것 · 가격 → 나에게도 남는 기록 → 이벤트 · FAQ → 마무리.
//   예전 앵커(#journeys · #book-event · #first-page · #first-experience · #gifts)를 그대로 둔다 — 외부 링크 · 북마크 보존. 예전 메인 전체는 /record/.
//   스타일은 이야기 선물 시안 v5(public/gift-v5) + 흡수한 구역용 main.css.
const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";
const RECORDS = `${APP}/?tab=history`; // 앱이 지원하는 주소(기록 탭 바로 열기 · 로그인 왕복에도 유지) — onmoment-recovery feat/one-main
const START = (src: string) => `${APP}/start?src=${src}`;
// 완성될 한 권(#book) — 실제 동의받은 책으로 다시 만들 때까지 끈다(11-16 지시서 · 범님 11-16 "이 품질이면" 판단)
const SHOW_BOOK = false;

export const metadata: Metadata = {
  title: "온순간 — 함께한 날들을 모아, 소중한 분에게 건네는 나의 이야기",
  description: "내 이야기를 남기고, 원하는 만큼 선물하는 온순간. 함께한 장면과 그때의 마음을 내 말로 남기고, 그중 전하고 싶은 만큼 골라 이야기 선물로 건네세요.",
  openGraph: {
    title: "함께한 날들을 모아, 소중한 분에게 건네는 나의 이야기 — 온순간",
    description: "내 이야기를 남기고, 원하는 만큼 선물하는 온순간.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="/gift-v5/styles.css" precedence="default" />
      <link rel="stylesheet" href="/gift-v5/campaign.css" precedence="default" />
      <link rel="stylesheet" href="/gift-v5/operate.css" precedence="default" />
      <link rel="stylesheet" href="/gift-v5/main.css" precedence="default" />
      <a className="skip" href="#content">본문으로 바로가기</a>
      <div id="stage">
        <div id="app" data-one-main>
          <header className="site-header wrap">
            <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">✳︎</span><span>온순간</span><small>ONMOMENT</small></a>
            <nav className="header-links" aria-label="서비스 안내">
              <a href="#journeys">일곱 여정</a>
              <a href="#book-event">책 선물 이벤트</a>
              <a href={RECORDS} data-app-link>내 기록</a>
            </nav>
          </header>

          <main id="content" className="campaign-hub one-main" tabIndex={-1}>
            {/* 1 선물의 모습 */}
            <section className="hero wrap journey-hub">
              <div>
                <p className="eyebrow">내 이야기를 남기고, 원하는 만큼 선물하는 온순간</p>
                <h1>함께한 날들을 모아,<br />소중한 분에게 건네는 나의 이야기.</h1>
                <p className="lead">함께한 장면과 그때의 마음을 내 말로 남겨보세요.<br />그중 전하고 싶은 만큼 골라, 이야기 선물로 건네세요.</p>
                <div className="cta-row">
                  <a className="button primary" href="#journeys">이야기 선물 준비하기 <span>↗</span></a>
                  <a className="button" href={RECORDS} data-app-link>내 기록</a>
                </div>
                <p className="fine">한 문장부터 · 내 말 그대로 · 원할 때 책으로</p>
              </div>
              <figure className="hero-figure">
                <img src="/assets/books-hero.webp" width={760} height={780} alt="온순간 이야기 선물의 책 제작 방향 이미지" />
                <div className="image-note"><p>너를 이야기하다 나를 알게 되고,<br />네 이야기를 읽다가 나를 만난다.</p><span>찬연한 너와 나의 이야기.</span></div>
                <figcaption>제작 방향 이미지 · 실제 사양은 별도 확인</figcaption>
              </figure>
            </section>

            {/* 2 각자의 자리에서 할 일 — 가장 먼저(범님 11-16: 효능감은 '내가 무엇을 하면 되는지'에서 시작한다) */}
            <section id="how" className="section wrap om-roles">
              <div className="section-head">
                <div><p className="eyebrow">각자의 자리에서</p><h2>나는 무엇을 하면 되나요?</h2></div>
                <p>준비하는 분도, 함께 쓰는 분도, 받는 분도.<br />할 일은 한 장면이면 충분해요.</p>
              </div>
              <div className="om-role-grid">
                <article className="om-role" data-role="prepare">
                  <h3>선물을 준비하는 분</h3>
                  <ol><li>여정을 고르고, 첫 장면 하나를 써요.</li><li>초대 링크를 가족이나 함께한 분들께 보내요.</li><li>모인 이야기를 미리 보고, 받는 분께 건네요.</li></ol>
                  <a className="button primary" href="#journeys">여정 고르기 <span>↓</span></a>
                </article>
                <article className="om-role" data-role="write">
                  <h3>초대받아 쓰는 분</h3>
                  <ol><li>받은 링크를 열어요. 가입하지 않아도 돼요.</li><li>떠오르는 한 장면을 한 문장이라도 써요.</li><li>보내면 준비하는 분께 전해져요.</li></ol>
                  <p className="om-role-note">받은 링크가 있다면, 그 링크를 열면 바로 쓸 수 있어요.</p>
                </article>
                <article className="om-role" data-role="receive">
                  <h3>선물을 받는 분</h3>
                  <ol><li>받은 링크를 열어 천천히 읽어요.</li><li>답장이나 다른 할 일은 없어요. 읽는 것으로 충분해요.</li></ol>
                </article>
                <article className="om-role" data-role="self">
                  <h3>나에게 남기는 분</h3>
                  <ol><li>오늘 떠오른 한 장면을 한 줄로 남겨요.</li><li>내 기록에서 언제든 다시 읽어요. 기본은 나만 봐요.</li></ol>
                  <a className="button" href={START("roles")} data-app-link>나에게 남기기 <span>↗</span></a>
                </article>
              </div>
              <div className="how-entry"><p><strong>더 자세히 알고 싶다면</strong>준비하는 분 · 함께 쓰는 분 · 받는 분의 화면을 한눈에 봐요.</p><a className="button" href="/gift/how/">역할별로 자세히 보기<span aria-hidden="true">→</span></a></div>
            </section>

            {/* 3 완성될 한 권 — 11-16 지시서: 실제 동의받은 책이 생길 때까지 운영에서 감춘다(소스 보존 · SHOW_BOOK 로 다시 켬). 이전 설명: — 온순간 편집 엔진이 실제로 엮은 결과(11-16 실측 · 가상 가족 · 칠순). 원문은 그대로, 편집 글은 '편집 도움'으로 구분 */}
            {SHOW_BOOK && (
            <section id="book" className="section wrap om-bk-sec">
              <div className="section-head">
                <div><p className="eyebrow">완성될 한 권</p><h2>여섯 장면이,<br />이렇게 한 권이 됐어요.</h2></div>
                <p>온순간이 실제로 엮은 결과예요.<br />가족과 장면은 가상이에요.<br />가족이 쓴 문장은 한 글자도 고치지 않았어요.</p>
              </div>
              <div className="om-bk" data-bk>
                <div className="om-bk-strip" data-bk-strip tabIndex={0} aria-label="책 넘겨 보기 — 옆으로 밀거나 화살표를 눌러요">
                  <article className="om-bk-page om-bk-cover" aria-label="표지">
                    <p className="om-bk-cover-kicker">칠순을 맞은 김영수님께</p>
                    <h3 className="om-bk-cover-title">포크 두 개,<br />포크 다섯 개</h3>
                    <p className="om-bk-cover-sub">다섯 사람이 기억하는 장면들</p>
                    <span className="om-bk-cover-mark" aria-hidden="true">✳︎</span>
                  </article>
                  <article className="om-bk-page om-bk-center" aria-label="제사">
                    <p className="om-bk-epigraph">“늦지 마라.”</p>
                    <p className="om-bk-by">막내아들이 기억하는 아버지의 말</p>
                  </article>
                  <article className="om-bk-page" aria-label="여는 글">
                    <p className="om-bk-label">여는 글 <span>· 편집 도움</span></p>
                    <p>김영수님의 칠순을 위해 큰딸 민지가 이 책을 준비했다. 아내 순자, 큰딸 민지, 막내아들, 사위 준호, 손녀 지우. 다섯 사람이 여섯 장면을 썼다.</p>
                    <p>장면은 1978년 겨울에서 시작해 작년 추석에 닿는다. 큰딸의 두 장면에는 사과와 포크가 있다. 두 장면 사이에 다른 가족의 기억이 놓인다.</p>
                  </article>
                  <article className="om-bk-page" aria-label="차례">
                    <p className="om-bk-label">차례</p>
                    <ol className="om-bk-toc">
                      <li><span>첫째 이야기</span>이불과 과일 한 접시</li>
                      <li><span>둘째 이야기</span>구두와 물 한 잔</li>
                      <li><span>셋째 이야기</span>냉장고의 그림</li>
                    </ol>
                    <p className="om-bk-small">그분의 말 · 함께 쓴 사람들</p>
                  </article>
                  <article className="om-bk-page om-bk-chapter" aria-label="첫째 이야기">
                    <p className="om-bk-label">첫째 이야기</p>
                    <h3>이불과<br />과일 한 접시</h3>
                    <p className="om-bk-opener">아이들이 어리던 때의 장면 둘. 1978년 겨울의 이불, 학창 시절의 사과. <span>· 편집 도움</span></p>
                  </article>
                  <article className="om-bk-page" aria-label="아내 순자의 장면">
                    <p className="om-bk-quote">“애들 춥다.”</p>
                    <p className="om-bk-by">아내 순자 · 1978년 겨울</p>
                    <p>연탄 배달을 마치고 들어온 날, 당신은 손이 언 줄도 모르고 아이들 이불부터 덮어 주었다.</p>
                    <p className="om-bk-now">여보, 칠순 축하해요. 이번 겨울은 내가 이불 덮어 줄게요.</p>
                  </article>
                  <article className="om-bk-page" aria-label="큰딸 민지의 장면">
                    <p className="om-bk-by">큰딸 민지 · 학창 시절</p>
                    <p className="om-bk-drop">늦게 집에 돌아오면 아버지는 별말 없이 늘 과일 한 접시를 내어 주셨다. 깎은 사과 옆에는 꼭 포크가 두 개 있었다.</p>
                    <p className="om-bk-pull">깎은 사과 옆에는<br />꼭 포크가 두 개 있었다.</p>
                  </article>
                  <article className="om-bk-page om-bk-photo" aria-label="작년 추석, 큰딸 민지의 두 번째 장면">
                    <figure><img src="/assets/journey-teen.webp" width={768} height={512} alt="과일과 찻잔이 놓인 햇살 드는 식탁" loading="lazy" /></figure>
                    <p className="om-bk-bridge">그리고 작년 추석. 큰딸의 두 번째 장면이다. <span>· 편집 도움</span></p>
                    <p>설거지를 하다 돌아보니 아버지가 식탁에 앉아 사과를 깎고 계셨다. 이번엔 포크가 다섯 개였다.</p>
                    <p className="om-bk-now">아빠, 이번엔 제가 깎을게요.</p>
                  </article>
                  <article className="om-bk-page" aria-label="그분의 말">
                    <p className="om-bk-label">그분의 말</p>
                    <ul className="om-bk-sayings">
                      <li>“애들 춥다.”<span>아내 순자</span></li>
                      <li>“늦지 마라.”<span>막내아들</span></li>
                      <li>“밥은 먹고 다니나.”<span>사위 준호</span></li>
                    </ul>
                  </article>
                  <article className="om-bk-page om-bk-center om-bk-colophon" aria-label="책을 엮은 방식">
                    <p>가족이 쓴 문장은 고치지 않고<br />그대로 실었어요.</p>
                    <p>장 제목과 잇는 글은<br />온순간의 편집 도움을 받아 엮었어요.</p>
                    <p className="om-bk-small">다섯 사람 · 여섯 장면 · 2026</p>
                  </article>
                </div>
                <div className="om-bk-nav">
                  <button type="button" className="om-bk-btn" data-bk-prev aria-label="앞 쪽">←</button>
                  <span className="om-bk-count" data-bk-count aria-live="polite">1 / 10</span>
                  <button type="button" className="om-bk-btn" data-bk-next aria-label="다음 쪽">→</button>
                </div>
              </div>
              <ul className="om-book-facts">
                <li><strong>원문 그대로</strong>가족이 쓴 문장은 한 글자도 고치지 않아요.</li>
                <li><strong>편집 기획</strong>차례 · 장 제목 · 여는 글 · 잇는 말을 장면 속 사물과 말에서 지어요.</li>
                <li><strong>처음과 끝이 이어지게</strong>포크 두 개로 시작해, 포크 다섯 개로 닫혀요.</li>
              </ul>
            </section>
            )}

            {/* 4 일곱 여정 — 모두 사진 */}
            <section id="journeys" className="section wrap journey-directory">
              <div className="section-head">
                <div><p className="eyebrow">일곱 가지 이야기 선물</p><h2>선물하고 싶은 분이<br />떠오르셨나요?</h2></div>
                <p>소중한 날마다, 다른 마음으로.<br />여정을 고르면 그날에 맞는 물음과 예시로<br />첫 장면을 쓸 수 있어요.</p>
              </div>
              <div className="journey-card-grid">
                {MAIN_JOURNEYS.map((j, i) => (
                  <a key={j.key} href={`/gift/${j.key}/`} className={`journey-card tone-${j.tone}`} data-journey={j.key}>
                    <figure><img src={`/assets/${j.image}`} width={768} height={512} loading="lazy" alt={j.alt} /><span className="journey-card-number">{String(i + 1).padStart(2, "0")}</span></figure>
                    <div className="journey-card-body">
                      <p>{j.moments}</p>
                      <h3>{j.name}<span aria-hidden="true">↗</span></h3>
                      <p className="card-desire">“{j.episode.replace(/^“|”$/g, "")}”</p>
                      <small>{j.who}</small>
                      <span className="om-card-more">살펴보기 →</span>
                    </div>
                  </a>
                ))}
              </div>
              <p className="om-note">사진은 분위기를 돕는 이미지예요. 내 선물에는 사진 없이 한 문장만 써도 돼요.</p>
            </section>

            {/* 5 건네는 한 쪽, 나에게 남는 한 쪽 — 선물은 곧 나에게 주는 선물(말이 아니라 구조로). 보낼 문장은 내가 고른다 */}
            <section id="first-page" className="section wrap">
              <div className="section-head">
                <div><p className="eyebrow">건네는 동안, 나에게도</p><h2>건네는 한 쪽,<br />나에게 남는 한 쪽.</h2></div>
                <p>같은 장면이 소중한 분께 가는 한 쪽과<br />나에게 남는 한 쪽이 돼요.<br />보낼 문장은 내가 골라요.</p>
              </div>
              <div className="om-pick" aria-label="보낼 문장 고르기 예시">
                <p className="om-pick-title">보낼 문장 고르기 · 가상 예시</p>
                <p className="om-pick-row is-on"><span aria-hidden="true">✓</span>처음 혼자 살던 때, 찌개가 너무 짜서 엄마에게 전화했어요.</p>
                <p className="om-pick-row is-on"><span aria-hidden="true">✓</span>엄마, 그날은 찌개보다 엄마랑 통화한 게 더 좋았어요.</p>
                <p className="om-pick-row"><span aria-hidden="true">○</span>사실 그때 많이 외로웠다는 건, 아직 나만 알고 싶어요.</p>
                <p className="om-pick-note">빼 둔 문장은 보내지 않아요. 나에게만 남아요.</p>
              </div>
              <div className="om-pages">
                <article className="om-page">
                  <p className="om-page-by">엄마에게 · 서연이</p>
                  <h3>그 전화가 참 좋았어요</h3>
                  <p>처음 혼자 살던 때,<br />찌개가 너무 짜서 엄마에게 전화했어요.<br />같이 웃으며 물을 더 붓다 보니,<br />혼자 있던 부엌이 덜 낯설었어요.</p>
                  <p>엄마, 그날은 찌개보다<br />엄마랑 통화한 게 더 좋았어요.</p>
                  <span className="om-page-tag">소중한 분께 건네는 한 쪽</span>
                </article>
                <article className="om-page om-page-self">
                  <p className="om-page-by">그때의 나를 · 오늘의 내가</p>
                  <h3>혼자 해내지 않아도 됐던 날</h3>
                  <p>사실 그때 많이 외로웠다.</p>
                  <p>쓰다 보니, 나는 조리법보다<br />같이 웃었던 목소리를 기억하고 있었다.<br />혼자 해내야 한다고 생각하던 때에도<br />이렇게 물어볼 사람이 있었구나.</p>
                  <span className="om-page-tag">나에게 남는 한 쪽</span>
                </article>
              </div>
              <details className="om-more">
                <summary>이 한 쪽은 어떤 기록에서 시작됐나요?</summary>
                <ol className="om-flow">
                  <li><strong>내가 남긴 장면</strong><span>처음 혼자 살던 때, 찌개가 너무 짜서 엄마에게 전화했다.</span></li>
                  <li><strong>다시 바라보는 물음</strong><span>그날 정말 좋았던 건 무엇이었나요?</span></li>
                  <li><strong>내가 고른 말</strong><span>그날은 찌개보다 엄마랑 통화한 게 더 좋았어요.</span></li>
                </ol>
                <p>내가 쓴 원문은 그대로 두고, 나중에 덧붙인 마음은 따로 표시돼요. 무엇을 보내고 무엇을 남길지는 내가 정해요.</p>
              </details>
              <p className="om-note">한 문장으로 간직해도, 카드로 모아도, 책으로 엮어도 좋아요. 깊이는 원하는 만큼만. <a href="/keepsakes/">한 문장 · 카드 · 책 살펴보기 →</a></p>
            </section>

            {/* 6 받는 날 — 받는 분이 어떻게 펼쳐 읽는지(전달 방식 · 제공 범위) */}
            <section id="receive" className="section wrap om-receive">
              <div className="section-head">
                <div><p className="eyebrow">받는 날</p><h2>받는 분은,<br />링크 하나로 펼쳐요.</h2></div>
                <p>연구에서는, 마음을 전하는 사람이<br />받는 사람의 기쁨을 실제보다<br />작게 예상하는 경우가 많았어요.</p>
              </div>
              <div className="om-receive-grid">
                <figure className="om-phone" aria-hidden="true">
                  <span className="om-phone-screen">
                    <span className="om-phone-cover"><span className="om-phone-kicker">칠순을 맞은 김영수님께</span><span className="om-phone-title">포크 두 개,<br />포크 다섯 개</span><span className="om-phone-sub">다섯 사람이 기억하는 장면들</span></span>
                    <span className="om-phone-hint">눌러서 펼쳐 읽기</span>
                  </span>
                </figure>
                <ol className="om-receive-steps">
                  <li><strong>링크를 열면 표지부터</strong>가입하지 않아도 바로 열려요. 한 장씩 넘기며 읽어요.</li>
                  <li><strong>글씨는 크게</strong>읽기 편한 크기로 바꿔 볼 수 있어요.</li>
                  <li><strong>답장은 안 해도 돼요</strong>읽는 것으로 충분해요. 다시 열어 읽을 수도 있어요.</li>
                  <li><strong>종이책은 준비하고 있어요</strong>지금은 디지털 한 권으로 건네요.</li>
                </ol>
              </div>
              <p className="om-note">링크는 받은 분이 다른 가족에게 다시 전할 수 있어요. 꼭 담고 싶은 이야기만 골라 주세요. <span className="om-cite">(Kumar &amp; Epley, 2018, Psychological Science)</span></p>
            </section>

            {/* 7 지금 쓸 수 있는 것 · 가격 — 사고 싶어진 순간 바로 옆에, 지금의 범위와 열릴 가격을 한 상자로 */}
            <section id="offering" className="section wrap">
              <div className="section-head"><div><p className="eyebrow">지금 쓸 수 있는 것 · 가격</p><h2>지금은 무료로 시작하고,<br />원할 때 동참해요.</h2></div></div>
              <div className="om-scope">
                <div className="om-scope-now">
                  <h3>지금 쓸 수 있어요 · 무료 시범</h3>
                  <ul>
                    <li><strong>이야기 선물 디지털본</strong> 준비 · 초대 링크로 함께 쓰기 · 보낼 문장 고르기 · 사진 한 장 · 책으로 미리 보기 · 받는 링크까지.</li>
                    <li><strong>나에게 남기기</strong> 한 문장이나 사진 한 장으로 내 기록을 남기고, 다시 읽고, 원할 때 다른 시선으로 돌아봐요.</li>
                    <li><strong>내 기록 엮기</strong> 내 기록에서 글을 골라 직접 엮고 원고 파일로 내려받아요.</li>
                  </ul>
                </div>
                <div className="om-scope-later">
                  <h3>열릴 예정 · 지금은 결제 없음</h3>
                  <ul className="om-price">
                    <li><span>기본</span><strong>월 9,900원</strong></li>
                    <li><span>프리미엄 · 디지털 이야기책 월 1권</span><strong>월 19,900원</strong></li>
                    <li><span>종이책 · 두 시선 한 세트</span><strong>49,000원</strong></li>
                  </ul>
                  <p>유료가 열려도 자동으로 결제되지 않아요. 열리기 전에 먼저 알려 드려요. <a href="/value/#value-levels">가치 동참 · 가격 자세히 →</a></p>
                </div>
              </div>
              <div className="cta-row om-offer-cta">
                <a className="button primary" href="#journeys">이야기 선물 준비하기 <span>↗</span></a>
                <a className="button" href={START("offering")} data-app-link>나에게 남기기</a>
              </div>
            </section>

            {/* 8 나에게도 남는 기록 */}
            <section id="my-story" className="section wrap om-my-story">
              <span id="first-experience" className="om-anchor" aria-hidden="true" />
              <span id="gifts" className="om-anchor" aria-hidden="true" />
              <div className="section-head">
                <div><p className="eyebrow">선물 뒤에도, 나에게 남는 기록</p><h2>온순간, 가장 나답게.</h2></div>
                <p>선물을 준비하며 쓴 장면도,<br />오늘 문득 떠오른 하루도.<br />기본은 나만 보는 내 기록이에요.</p>
              </div>
              <div className="steps">
                <article><span className="number">01</span><h3>흘려보내고 싶지 않은 하루</h3><p>짧게 남긴 내 말 그대로, 다시 펼칠 한 쪽이 돼요.</p></article>
                <article><span className="number">02</span><h3>미처 보지 못했던 소중함</h3><p>시간과 거리, 다른 기록을 통해 내 이야기를 여러 방향에서 만나요.</p></article>
                <article><span className="number">03</span><h3>내가 고르는 다음 하루</h3><p>새롭게 보인 마음을, 원한다면 작은 선택으로 이어봐요.</p></article>
              </div>
              <div className="cta-row">
                <a className="button primary" href={START("my-story")} data-app-link>나에게 남기기 <span>↗</span></a>
                <a className="button" href={RECORDS} data-app-link>내 기록 다시 읽기</a>
              </div>
              <p className="fine">먼저 써 보고, 저장할 때 가입해요. 이미 쓰고 계신 분은 같은 계정으로 이어져요.</p>
              <div className="om-care">
                <h3>온순간이 기록을 대하는 방식</h3>
                <ul>
                  <li>처음부터 나만의 공간으로 시작해요.</li>
                  <li>오늘의 마음을 있는 그대로 담아요.</li>
                  <li>오늘의 문장은 점수가 아니라 이야기로 남아요.</li>
                  <li>무엇을 남기고 누구에게 건넬지는 내가 정해요.</li>
                </ul>
              </div>
              <details className="om-more">
                <summary>여정마다, 나에게 남기기</summary>
                <p>일곱 여정은 소중한 분께 건넬 때도, 나에게 남길 때도 같아요.</p>
                <ul className="om-topics">
                  {SELF_SIDE.map((t) => { const j = MAIN_JOURNEYS.find((m) => m.key === t.key)!; return <li key={t.key}><a href={t.href}><strong>{j.name}</strong><span>{t.line}</span></a></li>; })}
                </ul>
                <p><a href="/record/">나에게 남기는 기록, 더 자세히 →</a></p>
              </details>
            </section>

            {/* 9 이벤트 — 일반 종이책 주문과 상태를 나눈다 */}
            <section id="book-event" className="section wrap om-event">
              <p className="eyebrow">온순간 첫 책 선물 이벤트 · 11월 13일 ~ 26일</p>
              <h2>내가 쓴 하루가,<br />나에게 돌아오는 선물.</h2>
              <p className="lead">11월 13일부터 26일까지 온순간에 남긴 작은 장면들을 모아, 추첨으로 3분께 맞춤 선물책을 만들어 드려요. 두 시선을 한 권에 담아요.</p>
              <dl className="om-event-facts">
                <div><dt>응모</dt><dd>11/13 ~ 19 · 앱 ‘오늘’의 이벤트 카드</dd></div>
                <div><dt>조건</dt><dd>11/13 ~ 19 중 서로 다른 3일 이상 기록 + 제작 동의 + 편집본 확인 참여</dd></div>
                <div><dt>추첨</dt><dd>11/20 · 3분 · 앱과 이메일로 알려드려요</dd></div>
                <div><dt>확인</dt><dd>편집본 11/25 ~ 26 · 최종 승인 11/27</dd></div>
              </dl>
              <details className="om-more">
                <summary>참여 방법 · 책 형식 · 내 기록의 보호 자세히</summary>
                <h3>시작은, 오늘의 한 장면이면 충분해요</h3>
                <ol className="om-list">
                  <li>온순간 ‘오늘’에서 글 한 줄이나 사진 한 장을 남겨 주세요.</li>
                  <li>11월 19일까지 ‘오늘’의 이벤트 카드에서 제작 안내와 동의 내용을 확인하고 응모해 주세요.</li>
                  <li>11월 13~19일 중 서로 다른 3일 이상 기록하고, 제작에 동의하며 편집본 확인에 참여할 수 있는 분 가운데 3분을 추첨합니다. 기록한 날은 한국 시각 기준이에요. 선정된 뒤에도 26일까지 기록을 이어갈 수 있고, 책에 담을 장면은 그중에서 직접 고릅니다.</li>
                </ol>
                <h3>책의 형식</h3>
                <p>나를 알아보는 이야기와 당신에게 전하는 이야기, 두 이야기를 합쳐 48쪽 이상이면 양장본 한 권에 두 부로 담아요. 48쪽에 못 미치면 소책자 두 권으로 나누어 엮어요. 쪽수는 편집본에서 함께 보고, 장면을 더해 채울 수도 있어요.</p>
                <h3>내 이야기의 마지막 결정은, 내가 합니다</h3>
                <p>AI가 책 제작에 허락한 2주의 기록을 읽고 구성을 제안하며 편집합니다. 원문 인용에는 날짜를 담고, AI가 엮은 글은 편집 제안으로 구분해요. 책에 실을 기록을 고르고, 문장을 빼거나 고치고, 순서를 바꿀 수 있어요. 본인이 최종 승인한 원고만 인쇄하며, 승인 후 내용이 달라지면 다시 확인받습니다.</p>
                <h3>내 기록은 내 곁에, 공개는 내 선택으로</h3>
                <p>앱에 남긴 원래 기록은 책 제작 때문에 삭제되지 않아요. 완성된 책 파일도 참여자께 드립니다. 동의 없이 공개하거나 홍보에 사용하지 않아요. 편집용 작업 사본과 배송 정보의 이용 범위 · 보관기간 · 삭제 시점은 제작 안내에서 알려드립니다.</p>
              </details>
              <div className="cta-row"><a className="button primary" href={START("book-event")} data-app-link>오늘의 한 장면 남기기 <span>↗</span></a></div>
              <p className="fine">이벤트 책은 추첨으로 만드는 시범 제작이에요. 일반 종이책 주문은 준비하고 있어요.</p>
            </section>

            {/* 10 FAQ */}
            <section id="faq" className="section wrap om-faq">
              <p className="eyebrow">마음 편히 시작하도록</p>
              <h2>작은 궁금함에, 작은 답을.</h2>
              <details><summary>지금은 무엇부터 할 수 있나요?</summary><p>나에게 한 장면을 남기거나, 일곱 여정 가운데 하나를 골라 이야기 선물 디지털본을 준비할 수 있어요. 둘 다 같은 온순간 계정으로 이어져요. 종이책 주문과 유료 요금제는 준비하고 있어요.</p></details>
              <details><summary>매일 써야 하나요?</summary><p>아니요. 떠오른 날에 한 장면이면 충분해요. 글 한 줄이나 사진 한 장도 하루의 장면이에요.</p></details>
              <details><summary>돈이 드나요?</summary><p>지금 기록과 이야기 선물 디지털본은 무료 시범이에요. 유료 요금제와 종이책 주문은 준비하고 있고, 확정 조건은 시작 전에 안내해요. 책 선물 이벤트도 결제나 친구 초대가 응모 조건이 아니에요.</p></details>
              <details><summary>내가 쓴 기록은 누가 보나요?</summary><p>내 기록은 기본적으로 나만 봐요. 일부를 선물로 고를 때는 보낼 내용을 한 번 더 확인해요.</p></details>
              <details><summary>초대받아 쓴 글은 누가 읽나요?</summary><p>선물을 준비하는 분이 모인 글을 함께 읽고 엮어요. 완성한 책은 받는 링크를 가진 분이 읽어요. 링크는 다시 전달될 수 있으니, 꼭 필요한 이야기만 담아 주세요.</p></details>
              <details><summary>초대받은 사람도 가입해야 하나요?</summary><p>초대 링크로 바로 쓸 수 있어요. 쓴 글을 내 기록에도 간직하고 싶을 때만 로그인해요.</p></details>
              <details><summary>사진이 꼭 있어야 하나요?</summary><p>아니요. 한 문장이면 충분해요. 사진과 더 전하고 싶은 마음은 원할 때 더해요.</p></details>
              <details><summary>온순간을 소개하면 내 기록도 공개되나요?</summary><p>아래 소개 버튼은 온순간의 공개 소개 주소만 건네요. 내 기록이나 개인 초대 코드는 함께 보내지 않아요. 개인 이야기를 건네는 일은 앱에서 따로 선택해요.</p></details>
            </section>

            {/* 11 마무리 */}
            <section className="hub-meaning om-closing">
              <div className="wrap">
                <p className="eyebrow">찬연한 너와 나의 이야기.</p>
                <h2>오늘 떠오른 한 장면이면,<br />충분해요.</h2>
                <div className="cta-row">
                  <a className="button primary" href="#journeys">이야기 선물 준비하기 <span>↗</span></a>
                  <a className="button" href={START("closing")} data-app-link>나에게 남기기</a>
                </div>
              </div>
            </section>

            <section className="section wrap om-share">
              <h2>이런 시간이 생각나는 분께,<br />온순간을 건네주세요.</h2>
              <p>잘 쓰거나 매일 쓰지 않아도 괜찮은 곳. 개인 기록 없이, 온순간 소개 주소만 전해요.</p>
              <div className="cta-row">
                <button type="button" className="button" data-launch-share hidden>소개 링크 공유하기 ↗</button>
                <button type="button" className="button" data-launch-copy>소개 링크 복사</button>
              </div>
              <p className="fine" data-launch-status aria-live="polite" />
              <p data-launch-fallback hidden><input readOnly value="https://onmoment.kr/?src=invite" aria-label="온순간 소개 주소" /></p>
            </section>
          </main>

          <footer className="footer wrap om-footer">
            <p>온순간, 가장 나답게.</p>
            <nav aria-label="온순간 더 알아보기">
              <a href="/story/">온순간의 이야기</a>
              <a href="/journal/">온순간 저널</a>
              <a href="/principles/">기록을 대하는 방식</a>
              <a href="/value/">온순간 가치 동참 · 가격 안내</a>
              <a href="/privacy/">개인정보 처리방침</a>
              <a href="/terms/">이용약관</a>
              <button type="button" className="om-link" data-om-feedback="stuck">의견 남기기</button>
            </nav>
            <p className="fine">지금은 누구나 시작할 수 있는 무료 시범 운영 중이에요. 이 페이지의 이야기와 이미지는 가상 예시예요. 유료 요금제와 종이책 주문은 준비하고 있으며, 확정 조건은 시작 전에 안내해요. © 2026 OnMoment</p>
          </footer>
        </div>
      </div>
      <Script id="book-pages" strategy="afterInteractive">{`(()=>{const s=document.querySelector('[data-bk-strip]');if(!s)return;const pages=[...s.children],c=document.querySelector('[data-bk-count]');const pos=(p)=>p.getBoundingClientRect().left-s.getBoundingClientRect().left+s.scrollLeft-4;const cur=()=>{if(s.scrollLeft>=s.scrollWidth-s.clientWidth-2&&s.scrollLeft>0)return pages.length-1;let i=0,b=1e9;pages.forEach((p,k)=>{const d=Math.abs(pos(p)-s.scrollLeft);if(d<b){b=d;i=k}});return i};const show=()=>{if(c)c.textContent=(cur()+1)+' / '+pages.length};const go=(d)=>{const i=Math.max(0,Math.min(pages.length-1,cur()+d));s.scrollTo({left:pos(pages[i])})};document.querySelector('[data-bk-prev]')?.addEventListener('click',()=>go(-1));document.querySelector('[data-bk-next]')?.addEventListener('click',()=>go(1));s.addEventListener('keydown',(e)=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});s.addEventListener('scroll',()=>requestAnimationFrame(show),{passive:true});show();})();`}</Script>
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
      <Script src="/landing/launch.js" strategy="afterInteractive" />
    </>
  );
}

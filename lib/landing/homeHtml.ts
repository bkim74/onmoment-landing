// 첫 화면 마크업 — 시안 c159205 를 그대로 옮겼다. 동작은 public/landing/app.js, 앱 링크는 data-app-link.
const TEMPLATE = `<a class="skip-link" href="#main">본문으로 바로가기</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="wordmark" href="/" aria-label="온순간 처음으로"><span class="brand-mark" aria-hidden="true">온</span><span>온순간<small>ONMOMENT</small></span></a>
      <nav aria-label="주요 메뉴"><a href="#journeys">나의 여정</a><a href="#experience">한 쪽 체험</a><a href="#books">두 권의 책</a><a href="#questions">궁금한 점</a></nav>
      <a class="header-cta app-link" href="__APP__/start?src=header" data-app-link target="_blank" rel="noopener noreferrer">베타 앱 열기 <span aria-hidden="true">↗</span></a>
    </div>
  </header>
  <main id="main">
    <section class="hero section-wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="tiny-sun" aria-hidden="true">✳</span> 한 줄 기록으로 시작하는 나만의 이야기책</p>
        <h1 id="hero-title">오늘을 담아,<br>나에게 <em>선물하세요.</em></h1>
        <p class="hero-description">벅차게 좋았던 날도,<br>누군가 알아줬으면 하는 날도.<br>한 줄씩 담고, 나의 이야기를 다시 펼쳐보세요.</p>
        <a class="button primary" href="#experience">내 첫 한 쪽 만들어보기 <span aria-hidden="true">↗</span></a>
        <p class="cta-note">가입 없이 가볍게 체험해 보세요</p>
        <a class="hero-journey-link" href="#journeys">나에게 맞는 여정 둘러보기 <span aria-hidden="true">↓</span></a>
        <div class="hero-footnote"><span class="fine-line"></span><p>나에게 먼저, 그리고 소중한 당신에게.</p></div>
      </div>
      <figure class="hero-art">
        <div class="photo-frame"><img src="/assets/books-hero.webp" alt="햇빛 아래 놓인 소중한 나에게와 소중한 당신에게 두 권의 천 표지 책 시안" width="1024" height="1280" fetchpriority="high"><span class="photo-corner">LIFE, IN YOUR WORDS.</span><div class="photo-stamp" aria-hidden="true">오늘이<br><span>선물이 되도록</span><i>onmoment</i></div></div>
        <figcaption>책 제작 방향을 보여주는 이미지 · 종이책은 시범 준비 중입니다</figcaption>
      </figure>
    </section>

<!-- THREE_LINE_INTRO_START --><section class="core-three section-wrap" aria-labelledby="core-three-title"><div><p class="eyebrow">온순간의 현실 → 바람 → 선택</p><h2 id="core-three-title">오늘의 한 줄이,<br>바라는 삶과 이어지도록.</h2><p>내 하루를 있는 그대로 담고, 만나고 싶은 장면을 그려요.<br>마음이 가면 오늘 해볼 작은 일 하나를 골라보세요.</p></div><div class="core-three-lines"><p><span>현실</span>지금의 나는 어떤가요?</p><p><span>바람</span>어떤 장면을 만나고 싶나요?</p><p><span>선택</span>오늘, 무엇 하나를 해볼까요?</p><a href="#journeys">내 여정의 세 줄 예시 보기 <span aria-hidden="true">↓</span></a><small>한 줄에서 머물러도 충분해요.</small></div></section><!-- THREE_LINE_INTRO_END -->
<!-- JOURNEY_SELECTOR_START -->
<section class="journey-selector section-wrap" id="journeys" aria-labelledby="journeys-title">
  <div class="journey-selector-heading"><div><p class="eyebrow">FIVE WAYS TO YOUR STORY · 다섯 개의 입구</p><h2 id="journeys-title">지금의 나에게<br>가까운 여정은 무엇인가요?</h2></div><p>살아가는 모습은 달라도, 시작은 한 줄.<br>마음에 닿는 여정을 둘러보세요.<br><span>고르지 않고 바로 기록해도 괜찮아요.</span></p></div>
  <div class="journey-card-grid"><a class="journey-card " href="/journeys/teen/" style="--journey-accent:#7d4940;--journey-tint:#eee5d9">
      <div class="journey-card-image"><img src="/assets/journey-teen.webp" alt="햇살 드는 식탁 위 서로 다른 두 개의 머그잔과 귤, 두 사람의 공책" width="1536" height="1024" loading="lazy"></div>
      <div class="journey-card-copy"><div class="journey-card-kicker"><span>JOURNEY 01</span><span aria-hidden="true">↗</span></div><h3>사춘기 아이와 함께</h3><p>아이와 함께한 하루,<br>그 안에 있는 내 마음을 기록해요.</p><span class="journey-card-link">이 여정 둘러보기 <span aria-hidden="true">→</span></span></div></a><a class="journey-card " href="/journeys/retire/" style="--journey-accent:#617057;--journey-tint:#e9ecdf">
      <div class="journey-card-image"><img src="/assets/journey-retire.webp" alt="초록 공원이 보이는 창가의 안경, 작은 공책과 아침 커피" width="1536" height="1024" loading="lazy"></div>
      <div class="journey-card-copy"><div class="journey-card-kicker"><span>JOURNEY 02</span><span aria-hidden="true">↗</span></div><h3>은퇴, 나의 다음 장</h3><p>애써온 시간을 돌아보고,<br>새로 열린 하루를 내 말로 남겨요.</p><span class="journey-card-link">이 여정 둘러보기 <span aria-hidden="true">→</span></span></div></a><a class="journey-card " href="/journeys/baby/" style="--journey-accent:#a1654d;--journey-tint:#f0e5db">
      <div class="journey-card-image"><img src="/assets/journey-baby.webp" alt="부드러운 살구색 담요와 작은 아기 신발, 창가에 놓인 공책과 꽃" width="1536" height="1024" loading="lazy"></div>
      <div class="journey-card-copy"><div class="journey-card-kicker"><span>JOURNEY 03</span><span aria-hidden="true">↗</span></div><h3>아기를 기다리고, 함께 자라고</h3><p>기다림부터 함께 자라는 날까지,<br>아기와 나의 처음을 간직해요.</p><span class="journey-card-link">이 여정 둘러보기 <span aria-hidden="true">→</span></span></div></a><a class="journey-card " href="/journeys/pilgrim/" style="--journey-accent:#536e70;--journey-tint:#e2eae6">
      <div class="journey-card-image"><img src="/assets/journey-pilgrim.webp" alt="햇살 드는 시골길을 바라보는 돌담 위 여행 공책과 지팡이, 작은 야생화" width="1536" height="1024" loading="lazy"></div>
      <div class="journey-card-copy"><div class="journey-card-kicker"><span>JOURNEY 04</span><span aria-hidden="true">↗</span></div><h3>순례·리트릿, 돌아온 뒤에도</h3><p>길에서 만난 마음을 담고,<br>돌아온 일상과 천천히 이어봐요.</p><span class="journey-card-link">이 여정 둘러보기 <span aria-hidden="true">→</span></span></div></a><a class="journey-card journey-card-wide" href="/journeys/unsure/" style="--journey-accent:#8c764f;--journey-tint:#eee9dc">
      <div class="journey-card-image"><img src="/assets/journey-unsure.webp" alt="푸른 하늘이 비치는 창가의 물 한 잔과 작은 노란 꽃, 빈 공책" width="1536" height="1024" loading="lazy"></div>
      <div class="journey-card-copy"><div class="journey-card-kicker"><span>JOURNEY 05</span><span aria-hidden="true">↗</span></div><h3>아직 모르겠어요, 오늘의 나부터</h3><p>목적을 정하지 않아도 좋아요.<br>오늘 마음에 남은 한 줄부터.</p><span class="journey-card-link">이 여정 둘러보기 <span aria-hidden="true">→</span></span></div></a></div>
  <a class="journey-skip" href="#experience">아직 고르지 않고, 한 줄부터 써볼게요 <span aria-hidden="true">→</span></a>
</section>
<!-- JOURNEY_SELECTOR_END -->
    <section class="moments section-wrap" aria-labelledby="moments-title">
      <div class="section-intro"><p class="eyebrow">작아서 더 오래 기억하고 싶은</p><h2 id="moments-title">당신의 하루에도,<br class="mobile-only"> 책에 담고 싶은 순간이 있나요?</h2></div>
      <div class="moment-grid">
        <button class="moment" data-example="joy" aria-label="벅차게 좋았던 순간 예시로 한 쪽 만들어보기"><span class="moment-top"><span>벅차게 좋았던 순간</span><i aria-hidden="true">↗</i></span><span class="moment-line">“혼자 운전해 바다까지 갔다.<br>창문을 열고 한참 웃었다.”</span><span class="moment-bottom">기쁨을 오래 간직하고 싶을 때 <span aria-hidden="true">01</span></span></button>
        <button class="moment" data-example="ordinary" aria-label="평범해서 소중한 순간 예시로 한 쪽 만들어보기"><span class="moment-top"><span>평범해서 소중한 순간</span><i aria-hidden="true">↗</i></span><span class="moment-line">“아침 커피가 유난히 맛있었다.<br>조금 천천히 마셨다.”</span><span class="moment-bottom">나의 취향과 마음을 남기고 싶을 때 <span aria-hidden="true">02</span></span></button>
        <button class="moment" data-example="tired" aria-label="알아주고 싶은 내 마음 예시로 한 쪽 만들어보기"><span class="moment-top"><span>알아주고 싶은 내 마음</span><i aria-hidden="true">↗</i></span><span class="moment-line">“오늘은 조금 버거웠다.<br>그래도 나를 위해 밥을 차렸다.”</span><span class="moment-bottom">애쓴 나를 돌아보고 싶을 때 <span aria-hidden="true">03</span></span></button>
      </div>
      <p class="example-note">설명을 위해 만든 가상 기록입니다. 마음에 닿는 문장을 누르면 체험으로 이어집니다.</p>
    </section>

    <section class="experience-band" id="experience" aria-labelledby="experience-title">
      <div class="experience section-wrap">
        <div class="experience-left">
          <p class="eyebrow">MY FIRST PAGE · 한 쪽 체험</p>
          <h2 id="experience-title">첫 페이지는,<br>지금의 나로 충분해요.</h2>
          <p class="section-description">오늘 기억하고 싶은 장면 하나.<br>길지 않아도, 멋진 문장이 아니어도 좋아요.</p>
          <form id="page-form">
            <div class="input-heading"><label for="moment-input">오늘, 남기고 싶은 한 줄</label><span id="character-count">0 / 180</span></div>
            <textarea id="moment-input" maxlength="180" rows="4" placeholder="예: 햇빛이 좋아서 한 정거장 먼저 내려 걸었다." aria-describedby="demo-privacy input-error"></textarea>
            <p id="input-error" class="input-error" aria-live="polite"></p>
            <div class="example-chips" aria-label="예시 골라보기"><span>예시로 해볼까요?</span><button type="button" data-fill="joy">기쁜 날</button><button type="button" data-fill="ordinary">평범한 날</button><button type="button" data-fill="tired">애쓴 날</button></div>
            <button class="button primary" type="submit">내 한 쪽 펼쳐보기 <span aria-hidden="true">→</span></button>
            <p id="demo-privacy" class="privacy-note"><svg width="13" height="14" viewBox="0 0 14 16" aria-hidden="true"><rect x="2" y="7" width="10" height="8" rx="2" fill="none" stroke="currentColor"/><path d="M4 7V4a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor"/></svg> 체험 글은 전송·저장되지 않아요. 새로고침하면 사라져요.</p>
          </form>
        </div>
        <div class="paper-stage">
          <span class="stage-note">한 줄이 놓이면, 나의 한 쪽.</span>
          <div class="preview-paper" id="preview-paper">
            <div class="paper-head"><span>나의 첫 한 쪽</span><span class="page-symbol" aria-hidden="true">✳</span></div>
            <div class="paper-content"><p class="paper-date" id="paper-date"></p><p class="paper-quote empty" id="paper-quote">오늘의 나를,<br>이곳에 남겨 보세요.</p></div>
            <div class="paper-bottom"><span>온순간</span><span>01</span></div>
          </div>
          <div id="preview-actions" class="preview-actions" hidden><button type="button" id="edit-page">한 줄 고치기</button><span aria-hidden="true">·</span><button type="button" id="copy-page">한 줄 복사</button><button class="text-link" type="button" id="continue-page">앱에서 이어쓰기 ↗</button></div>
          <p id="preview-status" class="preview-status" aria-live="polite"></p>
        </div>
      </div>
    </section>

    <section class="meaning section-wrap" aria-labelledby="meaning-title">
      <div class="meaning-heading"><p class="eyebrow">기록을 넘어, 나와 가까워지는 시간</p><h2 id="meaning-title">담아 두고.<br>다시 만나고.<br><em>마음이 닿으면, 건네고.</em></h2><p>온순간은 그 사이를 함께합니다.<br>어디까지 이어갈지는 내가 정해요.</p></div>
      <div class="meaning-rows">
        <article><span class="meaning-number">01</span><div><h3>지금의 마음을 담아두세요.</h3><p>기쁜 마음도, 복잡한 마음도 내 말로.<br>한 줄을 남기는 것으로 충분한 날이 있어요.</p></div></article>
        <article><span class="meaning-number">02</span><div><h3>그날의 나를 다시 만나세요.</h3><p>내가 좋아한 것, 애쓴 것, 소중히 여긴 것.<br>기록을 펼치며 오늘의 마음으로 바라보세요.</p></div></article>
        <article><span class="meaning-number">03</span><div><h3>원한다면, 마음을 건네세요.</h3><p>나에게 남기고 싶은 이야기와<br>누군가에게 전하고 싶은 이야기를 골라보세요.</p></div></article>
      </div>
    </section>

    <section class="books-band" id="books" aria-labelledby="books-title">
      <div class="books-inner section-wrap">
        <div class="books-copy"><p class="eyebrow">두 권의 책 · 시범 준비 중</p><h2 id="books-title">한 권은 나에게.<br>한 권은,<br>소중한 당신에게.</h2><p>내가 살아온 날들을 다시 펼쳐보는 책.<br>그중 건네고 싶은 마음만 골라 담는 책.</p><p class="books-note">같은 삶에서 시작해, 서로 다른 선물이 되도록.<br>온순간이 준비하는 두 권의 책입니다.</p><span class="book-hint">표지를 눌러 가상 편집 예시를 펼쳐보세요 <span aria-hidden="true">→</span></span></div>
        <div class="book-pair">
          <button class="cloth-book self-book" data-book="self" aria-label="소중한 나에게 책의 가상 편집 예시 펼치기"><span class="book-series">MY OWN STORY</span><span class="book-title">소중한<br>나에게</span><span class="book-flower" aria-hidden="true">✳</span><span class="book-subtitle">좋은 날도, 애쓴 날도<br>모두 나의 이야기</span><span class="book-brand">온순간</span></button>
          <button class="cloth-book gift-book" data-book="gift" aria-label="소중한 당신에게 책의 가상 편집 예시 펼치기"><span class="book-series">A GIFT OF MY HEART</span><span class="book-title">소중한<br>당신에게</span><span class="book-flower" aria-hidden="true">✳</span><span class="book-subtitle">당신에게 전하고 싶은<br>내 마음의 장면들</span><span class="book-brand">온순간</span></button>
        </div>
      </div>
      <p class="books-disclaimer">표지와 내용은 가상 시안입니다. 현재 앱에서 두 권 자동 제작이나 종이책 주문은 제공하지 않습니다.</p>
    </section>

    <section class="faq section-wrap" id="questions" aria-labelledby="faq-title">
      <div><p class="eyebrow">시작하기 전에</p><h2 id="faq-title">궁금한 마음에,<br>작은 답을.</h2><span class="faq-flower" aria-hidden="true">✳</span></div>
      <div class="faq-list">
        <details><summary>온순간은 어떤 서비스인가요?<span aria-hidden="true">+</span></summary><div>일상의 한 줄을 남기고, 쌓인 기록을 다시 펼쳐보는 서비스입니다. 내 삶을 돌아보는 기록에서 출발해, 나와 소중한 이를 위한 책으로 이어가는 경험을 준비하고 있습니다.</div></details>
        <details><summary>글을 잘 쓰지 못해도 괜찮나요?<span aria-hidden="true">+</span></summary><div>네. “오늘 커피가 맛있었다” 같은 짧은 문장으로 시작해도 좋아요. 특별한 사건이나 잘 정리된 생각이 없어도, 지금 떠오르는 장면 하나를 내 말로 남겨보세요.</div></details>
        <details><summary>이 화면에서 쓴 글은 저장되나요?<span aria-hidden="true">+</span></summary><div>이곳은 가입 없이 해보는 한 쪽 체험입니다. 쓴 글은 서버로 전송되거나 저장되지 않으며, 새로고침하거나 창을 닫으면 사라집니다. 계속 간직하고 싶다면 ‘한 줄 복사’ 후 온순간 앱에 직접 붙여 넣어 주세요.</div></details>
        <details><summary>지금 종이책을 주문할 수 있나요?<span aria-hidden="true">+</span></summary><div>종이책은 시범 준비 중이며, 이 페이지에서는 주문이나 결제를 받지 않습니다. 두 권의 책도 제작 방향을 보여주는 시안입니다. 현재 앱에서는 기록을 남기고 다시 보는 경험부터 시작합니다.</div></details>
        <details><summary>지금 누구나 앱을 이용할 수 있나요?<span aria-hidden="true">+</span></summary><div>현재는 초대받은 분들과 베타를 진행하고 있습니다. 이 페이지의 한 쪽 체험은 가입 없이 이용할 수 있어요. 초대받으셨다면 상단의 ‘베타 앱 열기’로 이동해 앱의 안내를 따라 주세요.</div></details>
      </div>
    </section>

    <section class="closing section-wrap" aria-labelledby="closing-title"><span class="closing-flower" aria-hidden="true">✳</span><p class="eyebrow">언젠가 다시 펼쳤을 때, 반가울 오늘</p><h2 id="closing-title">오늘의 나에게,<br>한 쪽의 자리를 내어주세요.</h2><a class="button primary" href="#experience">내 첫 한 쪽 만들어보기 <span aria-hidden="true">↗</span></a><p class="cta-note">좋은 날도, 애쓴 날도. 모두 당신의 이야기니까요.</p></section>
  </main>
  <section class="ways-lite section-wrap" aria-label="온순간이 기록을 대하는 방식"><p class="eyebrow">온순간이 기록을 대하는 방식</p><ul><li>온순간은 처음부터 나만의 공간으로 시작합니다.</li><li>오늘의 마음을 있는 그대로 담습니다.</li><li>오늘의 문장은 점수가 아니라 이야기로 남습니다.</li><li>무엇을 남기고 누구에게 건넬지는 내가 정합니다.</li></ul><nav aria-label="더 읽기"><a href="/story/">온순간의 이야기 →</a><a href="/journal/">온순간 저널 →</a><a href="/principles/">기록을 대하는 방식 →</a></nav></section>
  <footer class="section-wrap"><a class="footer-logo" href="#">온순간 <span>ONMOMENT</span></a><p>오늘이 선물이 되도록.</p><span class="footer-status"><i aria-hidden="true"></i> 현재 초대 베타 운영 중</span><small>© 2026 OnMoment</small><nav class="footer-legal" aria-label="법적 고지"><a href="/privacy/">개인정보 처리방침</a><a href="/terms/">이용약관</a></nav></footer>

  <dialog id="book-dialog" aria-labelledby="dialog-book-title"><button class="dialog-close" data-close aria-label="책 미리보기 닫기">✕</button><div class="dialog-label">가상 편집 예시 · 시범 준비 중</div><div class="dialog-spread"><div class="dialog-cover"><p id="dialog-book-series"></p><h2 id="dialog-book-title"></h2><span aria-hidden="true">✳</span><small>온순간</small></div><div class="dialog-page"><p id="dialog-page-heading"></p><blockquote id="dialog-book-text"></blockquote><p class="dialog-source" id="dialog-book-source"></p><span class="dialog-page-number">01</span></div></div><p class="dialog-note" id="dialog-book-note"></p><button class="button outline" data-close>천천히 덮어두기</button></dialog>
  <dialog id="continue-dialog" aria-labelledby="continue-title"><button class="dialog-close" data-close aria-label="안내 닫기">✕</button><p class="eyebrow">나의 이야기를 이어가려면</p><h2 id="continue-title">한 줄을 챙겨,<br>온순간으로.</h2><p>체험 글은 앱으로 자동 이동하지 않아요.<br>먼저 복사한 뒤 앱에 붙여 넣어 주세요.</p><button class="button outline" id="copy-and-continue" type="button">내 한 줄 복사하기</button><p id="continue-copy-status" role="status"></p><a class="button primary app-link" href="__APP__/start?src=experience" " data-app-link target="_blank" rel="noopener noreferrer">베타 앱 열기 ↗</a><p class="dialog-note">현재는 초대받은 분들과 베타를 진행하고 있습니다.</p></dialog>`;
export const homeHtml = (appOrigin: string) => TEMPLATE.split("__APP__").join(appOrigin);

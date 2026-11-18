// 이야기 선물 — 역할별로 보는 '이렇게 만들어져요'(/gift/how/, 11-15 범님 요청).
//   준비하는 분(신청하는 분) · 함께 쓰는 사람 · 받는 분, 그리고 신청부터 건네기까지.
//   원칙: 앱에 실제로 있는 화면과 문구만 옮긴다(src/lib/brand/copy.ts giftBook). 예시 이름은 가상이라고 밝힌다.
//         결제 · 종이책은 아직 없으므로 '준비하고 있어요'로만 말한다.

const phone = (label, inner) => `<figure class="how-phone"><div class="how-screen">${inner}</div><figcaption>${label}</figcaption></figure>`;

const SCREEN_START = `<p class="hs-brand"><span class="om-mark" aria-hidden="true"></span> 온순간</p><p class="hs-meta">이야기 선물 준비 · 부모님께 감사하기 · 1 / 3</p><p class="hs-title">먼저, 그 장면 하나를<br>써 보세요.</p><p class="hs-sub">로그인은 준비 공간을 만들 때만 해요.</p><div class="hs-chips"><span class="on">칠순</span><span>환갑</span><span>팔순</span></div><p class="hs-label">소중한 분과의 한 장면</p><div class="hs-field">아버지는 별말 없이 늘 과일 한 접시를 내어 주셨다.</div><p class="hs-link">막힐 때, 물음을 따라 쓰기</p><div class="hs-btn">한 쪽으로 보기</div>`;

const SCREEN_DASH = `<p class="hs-meta">← 만들고 있는 선물</p><p class="hs-title">김영수님께</p><p class="hs-meta">칠순 · 12월 15일 · 원고 마감 12월 12일</p><div class="hs-card"><p class="hs-card-t">함께 쓸 사람들에게 건넬 링크</p><div class="hs-quote">김영수님의 칠순에 가족이 기억하는 장면을 모아 한 권으로 드리려 해요. 잘 쓰지 않아도 돼요.<br><u>app.onmoment.kr/w/…</u></div><div class="hs-btn ghost">글 복사하기</div></div><p class="hs-label">모인 장면 3</p><div class="hs-scene"><small>큰딸 민지 · 학창 시절</small>아버지는 별말 없이 늘 과일 한 접시를…</div><div class="hs-btn">이대로 완성하기</div>`;

const SCREEN_WRITE = `<p class="hs-meta">큰딸 민지님이 김영수님의 칠순을 준비하고 있어요.</p><p class="hs-title">김영수님과의 기억,<br>한 장면만 들려주세요.</p><p class="hs-sub">원고 마감 12월 12일 · 이 글은 김영수님과, 준비하는 큰딸 민지님이 읽어요.</p><div class="hs-field">첫 출근 날 아침, 아버지가 닦아 둔 구두가 현관에 있었다.</div><div class="hs-chips"><span>사진 한 장 더하기</span></div><p class="hs-label">책에 보일 내 이름</p><div class="hs-field one">막내아들</div><div class="hs-btn">책에 담길 모습 보기</div>`;

const SCREEN_DONE = `<p class="hs-title">건넸어요.</p><p class="hs-sub">큰딸 민지님이 모아 한 권으로 엮어요.<br>완성 전까지는 이 기기에서 다시 고칠 수 있어요.</p><div class="hs-btn ghost">고치기</div><div class="hs-btn ghost">다른 장면도 남기기</div><div class="hs-card soft"><p class="hs-card-t">내 기록에도 간직하기</p><p class="hs-sub">선물에 건넨 글은 그대로 두고, 내 기록에 사본을 남겨요. 나만 봐요.</p></div>`;

const SCREEN_READ = `<div class="hs-top"><span>목차</span><span>글씨 크게</span></div><p class="hs-star"><span class="om-mark" aria-hidden="true"></span></p><p class="hs-cover">김영수님께</p><p class="hs-sub c">칠순을 맞아, 가족이 기억하는 장면들</p><p class="hs-meta c">3명이 한 장면씩 남겼어요</p><hr><p class="hs-meta">막내아들 · 2015년 봄</p><p class="hs-read">“늦지 마라.”<br>첫 출근 날 아침, 아버지가 닦아 둔 구두가 현관에 있었다.</p><p class="hs-meta c end">이 책의 말은 쓴 사람의 말 그대로예요.</p>`;

const step = (n, t, p) => `<li><span>${n}</span><div><strong>${t}</strong><p>${p}</p></div></li>`;

export function howHTML() {
  return `
<section class="wrap how-hero" id="content">
  <p class="eyebrow">이렇게 만들어져요</p>
  <h1>한 사람이 시작하고,<br>여럿이 한 장면씩,<br>받는 분은 링크 하나로.</h1>
  <p class="lead">준비하는 분만 로그인해요. 함께 쓰는 사람과 받는 분은 건네받은 링크로 바로 들어와요.</p>
  <nav class="how-roles" aria-label="역할별 안내">
    <a href="#how-owner"><small>01</small>준비하는 분</a>
    <a href="#how-writer"><small>02</small>함께 쓰는 사람</a>
    <a href="#how-reader"><small>03</small>받는 분</a>
    <a href="#how-order"><small>04</small>신청과 비용</a>
  </nav>
</section>

<section class="wrap how-timeline" aria-label="한눈에 보는 흐름">
  <ol>
    <li><b>시작</b><span>여정을 고르고 첫 장면을 써 봐요</span><em>준비하는 분 · 3분 안팎</em></li>
    <li><b>초대</b><span>카카오톡으로 초대 카드를 보내면 끝이에요.</span><em>준비하는 분</em></li>
    <li><b>모으기</b><span>각자 한 장면씩, 원고 마감까지</span><em>함께 쓰는 사람</em></li>
    <li><b>완성</b><span>책으로 미리 보고 완성하면 받는 링크가 생겨요</span><em>준비하는 분</em></li>
    <li><b>건네기</b><span>그날, 링크 하나로 한 권을 읽어요</span><em>받는 분</em></li>
  </ol>
</section>

<section class="section wrap how-role" id="how-owner">
  <div class="how-copy">
    <p class="eyebrow">01 · 준비하는 분</p>
    <h2>신청은 한 사람이,<br>준비는 한곳에서.</h2>
    <p class="how-intro">칠순을 준비하는 큰딸, 송별회를 맡은 총무처럼 처음 시작하는 한 분이에요. 받는 분과 그날만 정하면, 나머지는 준비 공간이 챙겨요.</p>
    <ol class="how-steps">
      ${step("1", "여정과 날을 골라요", "일곱 여정 중 하나와 칠순 · 퇴임 · 졸업 같은 날을 고르고, 받는 분 이름을 적어요.")}
      ${step("2", "내 장면부터 써 봐요", "로그인 전에 한 장면을 써서, 책의 한 쪽으로 먼저 봐요. 마음이 들면 다음으로.")}
      ${step("3", "로그인하고 준비 공간을 만들어요", "그날을 정하면 원고 마감이 그날 사흘 전으로 잡혀요. 날짜를 비워 두면 3주를 넉넉히 받아요.")}
      ${step("4", "카카오톡으로 초대 카드를 보내면 끝이에요.", "초대 카드를 받은 분은 열어서 바로 쓸 수 있어요.")}
      ${step("5", "모이는 장면을 한곳에서 봐요", "누가 어떤 장면을 남겼는지 쌓여요. 아직인 분께는 재촉 대신 건넬 물음 하나가 준비돼 있어요.")}
      ${step("6", "미리 보고, 완성해요", "책으로 미리 보고 넣고 뺄 장면을 정해요. 완성하면 글이 고정되고 받는 분께 드릴 링크가 생겨요.")}
    </ol>
  </div>
  <div class="how-shots">${phone("첫 장면 써 보기", SCREEN_START)}${phone("준비 공간 · 초대 링크와 모인 장면", SCREEN_DASH)}</div>
</section>

<section class="section wrap how-role flip" id="how-writer">
  <div class="how-copy">
    <p class="eyebrow">02 · 함께 쓰는 사람</p>
    <h2>링크 하나로,<br>한 장면만.</h2>
    <p class="how-intro">가족 · 동료 · 친구 누구나요. 단톡방의 링크를 누르면 바로 쓰는 화면이 열려요.</p>
    <ol class="how-steps">
      ${step("1", "링크를 열어요", "누가 무엇을 준비하는지, 이 글을 누가 읽는지 먼저 보여요.")}
      ${step("2", "한마디 카드 · 사진과 한 줄 · 이야기 중 편한 것으로 남겨요.", "막히면 '그때 소중한 분이 한 말' 같은 물음을 따라 써요. 사진 한 장도 더할 수 있어요. 위치 정보는 지우고 담아요.")}
      ${step("3", "책에 담길 모습을 보고 건네요", "쓴 그대로 담겨요. 완성 전까지는 같은 기기에서 다시 고칠 수 있어요.")}
      ${step("4", "원하면 내 기록에도 간직해요", "선물에 건넨 글은 그대로 두고, 내 기록에 사본을 남겨요. 나만 봐요.")}
    </ol>
  </div>
  <div class="how-shots">${phone("한 장면 쓰기", SCREEN_WRITE)}${phone("건넨 뒤", SCREEN_DONE)}</div>
</section>

<section class="section wrap how-role" id="how-reader">
  <div class="how-copy">
    <p class="eyebrow">03 · 받는 분</p>
    <h2>그날, 링크 하나로<br>한 권을 펼쳐요.</h2>
    <p class="how-intro">받는 분은 링크만 있으면 돼요. 휴대폰에서 누르면 바로 열리는 디지털본이에요.</p>
    <ol class="how-steps">
      ${step("1", "표지부터 천천히", "누구의 무슨 날인지, 몇 사람이 마음을 보탰는지 첫 장에 담겨요.")}
      ${step("2", "쓴 사람의 말 그대로", "쓴 사람이 적은 그대로의 장면이, 쓴 사람과 그때를 곁에 두고 이어져요.")}
      ${step("3", "읽기 편하게", "목차로 누가 남긴 장면인지 찾고, 글씨를 크게 키우고, 읽던 곳부터 이어 읽어요.")}
    </ol>
  </div>
  <div class="how-shots one">${phone("받는 분이 읽는 책", SCREEN_READ)}</div>
</section>

<section class="section wrap how-order" id="how-order">
  <div class="section-head"><div><p class="eyebrow">04 · 신청과 비용</p><h2>신청부터 건네기까지,<br>한 화면씩.</h2></div><p>지금은 디지털본을 무료로 시범 운영해요.<br>결제 단계 없이 끝까지 만들어 건넬 수 있어요.</p></div>
  <ol class="how-order-steps">
    <li><span>1</span><strong>여정 고르기</strong><p>이 사이트에서 소중한 날에 맞는 여정을 골라 '써보기'를 눌러요.</p></li>
    <li><span>2</span><strong>첫 장면 · 로그인</strong><p>내 장면을 먼저 써 보고, 준비 공간을 만들 때 로그인해요. 카카오로 한 번 로그인해요.</p></li>
    <li><span>3</span><strong>초대 · 모으기</strong><p>카카오톡으로 초대 카드를 보내고, 원고 마감까지 장면이 모여요.</p></li>
    <li><span>4</span><strong>완성 · 건네기</strong><p>미리 보고 완성하면 받는 링크가 생겨요. 그날 이 링크를 건네요.</p></li>
  </ol>
  <div class="how-price">
    <div><p class="eyebrow">지금</p><strong>디지털본 · 무료 시범</strong><p>준비 공간 · 초대 링크 · 장면과 사진 · 책 미리 보기 · 받는 링크까지 비용이 들지 않아요.</p></div>
    <div><p class="eyebrow">준비하고 있어요</p><strong>종이책</strong><p>모인 장면을 손에 쥐는 한 권으로. 열리면 가격과 제작 일정을 먼저 보여 드릴게요.</p></div>
  </div>
</section>

<section class="section wrap journey-faq campaign-faq how-faq">
  <p class="eyebrow">자주 묻는 것</p>
  <h2>시작하기 전에.</h2>
  <details><summary>함께 쓰는 가족도 가입해야 하나요?</summary><p>링크만 있으면 바로 써요. 로그인은 준비하는 분만 해요. 쓴 장면을 내 기록에도 간직하고 싶을 때만 로그인하면 돼요.</p></details>
  <details><summary>잘 못 쓰는 가족이 많아요.</summary><p>한마디 카드 · 사진과 한 줄 · 이야기 중 편한 것으로 남겨요. 막힐 때 따라 쓰는 물음이 있고, 아직인 분께는 재촉 대신 건넬 물음 하나를 준비 공간에서 복사해 보낼 수 있어요.</p></details>
  <details><summary>쓴 글을 고칠 수 있나요?</summary><p>완성 전까지는 쓴 사람이 같은 기기에서 다시 고칠 수 있어요. 준비하는 분은 장면을 이번 책에서 빼거나 다시 넣을 수 있어요. 완성하면 글은 그대로 고정돼요.</p></details>
  <details><summary>누가 읽을 수 있나요?</summary><p>쓰는 화면에서 이 글을 누가 읽는지 먼저 알려 드려요. 완성된 책은 받는 링크를 가진 사람만 열 수 있고, 글은 암호화해 보관해요.</p></details>
  <details><summary>날짜가 아직 정해지지 않았어요.</summary><p>날짜를 비워 두고 시작할 수 있어요. 원고는 3주 동안 넉넉히 받아요.</p></details>
  <details><summary>혼자서도 만들 수 있나요?</summary><p>네. '부부·연인에게 마음 전하기'와 '나에게 건네기'는 혼자 완성해도 한 권이 돼요.</p></details>
</section>

<section class="wrap how-closing">
  <p class="eyebrow">어떤 날을 준비하고 계세요?</p>
  <h2>그날에 맞는 여정에서,<br>첫 장면부터 시작해요.</h2>
  <div class="how-cta"><a class="button primary" href="/gift/#journeys">일곱 여정 보기<span aria-hidden="true">↗</span></a><a class="button" href="/gift/parents/">칠순 · 환갑 준비하기</a></div>
  <p class="fine">예시 화면의 이름과 장면은 가상이에요. 실제 화면과 같은 문구로 옮겼어요.</p>
</section>`;
}

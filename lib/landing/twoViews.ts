// 같은 가상 기록이 두 시선에서 어떻게 달라지는지 — 첫 화면과 /keepsakes 가 함께 쓴다.
// 덧붙인 말은 예시 작성자의 말이다. 실제 책에서는 사용자가 남긴 말과 허용한 자료만 담는다.
export const twoViewsHtml = (attrs = "") => `<div class="two-views"${attrs ? ` ${attrs}` : ""}>
  <p class="two-views-head">같은 기록, 두 개의 시선 <span>가상 기록·가상 후속 글 예시</span></p>
  <div class="two-views-pages">
    <article class="view-page"><p class="view-role">기록하고 바라보는 나</p><h3>내가 살아온 장면과 맥락을 펼쳐보는 쪽</h3><div class="view-sheet"><small>남긴 장면</small><p>아침 커피가 유난히 맛있었다. 조금 천천히 마셨다.</p></div></article>
    <article class="view-page"><p class="view-role">선물로 받아 읽는 나</p><h3>그중 받아 읽고 싶은 장면과 말을 골라 담는 쪽</h3><div class="view-sheet"><small>남긴 장면</small><p>아침 커피가 유난히 맛있었다. 조금 천천히 마셨다.</p><hr><small>나중에 나에게 남긴 말</small><p>이런 아침을 다시 만나고 싶다.</p></div></article>
  </div>
  <p class="two-views-note">새 말을 쓰지 않아도, 고른 원문만으로 온전한 선물이 돼요.<br>지금 앱에서는 내 글 한 쪽과 덧붙인 말까지 간직해요. 두 권 제작은 준비 중이에요.</p>
</div>`;

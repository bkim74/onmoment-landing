// 두 시선(2026-11-11 정본) — '당신을 알아보는 책 / 나를 당신에게 전하는 책'. /keepsakes 에서 쓴다.
// 같은 가상 기록이 두 시선에서 어떻게 달라지는지. 덧붙인 말은 예시 작성자의 말이다(실제 사용자 기록 아님).
// 받는 사람의 마음은 지어내지 않는다 — 본 것과 내가 받은 의미만. 실제 책에는 사용자가 남긴 말과 허용한 자료만 담는다.
export const twoViewsHtml = (attrs = "") => `<div class="two-views"${attrs ? ` ${attrs}` : ""}>
  <p class="two-views-head">같은 장면, 두 개의 시선 <span>가상 기록 · 가상 덧붙인 말 예시</span></p>
  <div class="two-views-pages">
    <article class="view-page"><p class="view-role">당신을 알아보는 책</p><h3>내가 본 당신의 말과 행동, 그때 내가 받은 마음</h3><div class="view-sheet"><small>남긴 장면</small><p>내가 늦게 들어온 날, 네가 식탁에 물 한 잔을 두었다.</p><hr><small>덧붙인 내 말</small><p>그날 네가 두었던 물 한 잔이 기억나. 나는 그 작은 일에서 쉬어 갈 자리를 얻었어.</p></div></article>
    <article class="view-page"><p class="view-role">나를 당신에게 전하는 책</p><h3>당신에게 전하고 싶은 내 삶의 장면과 그 이유</h3><div class="view-sheet"><small>남긴 장면</small><p>내가 늦게 들어온 날, 네가 식탁에 물 한 잔을 두었다.</p><hr><small>덧붙인 내 말</small><p>나는 물을 마시고도 고맙다는 말을 하지 못했다. 그 무렵의 나를 너에게 전하고 싶다.</p></div></article>
  </div>
  <p class="two-views-note">받는 사람의 마음은 지어내지 않아요. 본 것과 내가 실제로 남긴 말만 담겨요.<br>나에게 건넬 때는 ‘그때의 나를 알아보는 책’과 ‘지금의 나를 앞으로의 나에게 전하는 책’이 돼요.</p>
</div>`;

// 부모님 여정 기본 랜딩(/gift/parents/) — 첫 화면은 내가 끝낼 무료 한 장 · 견본과 가격은 아래(PARENTS.md §1 · §4).
//   landing.mjs 의 journeyHTML('parents') 가 이 함수를 부른다. 앱 주소는 realize.mjs 의 startHref 그대로.
//   사진 · 대표 장면 · 단가 상수의 원본 = public/onmoment-gifts/v2/manifest.ko.json · public/gift-v6/prices.js (build_gift_v5.mjs 가 일치를 검사한다).
import { startHref } from './realize.mjs';

const APP = 'https://app.onmoment.kr';
export const PARENTS_FREE = {
  scene: { src: '/onmoment-gifts/v2/parents/scene.webp', w: 1536, h: 1024, small: '/onmoment-gifts/v2/parents/scene-640.webp', sw: 640, sh: 427, alt: '어머니의 손에 들린 가족책 표지에 귤을 나누는 어머니와 딸이 이어져 그려져 있습니다.' },
  book: { src: '/onmoment-gifts/v2/parents/contents.webp', w: 1024, h: 763, alt: '귤을 건네는 어머니의 그림이 앞표지 전체에 인쇄된 가족책 한 권입니다.' },
  line: '엄마, 다음에는 제가 먼저 귤을 까 드릴게요.',
  price: 49000,
};
const OCC_NAME = { seventy: '칠순', sixty: '환갑', eighty: '팔순', anniversary: '부모님 결혼기념일', silver: '은혼 · 25주년', golden: '금혼 · 50주년' };
export const parentsTitle = (momentId) => `${OCC_NAME[momentId] || '부모님과'} 식탁에서 읽을, 우리 가족의 한 장.`;

export function parentsHTML(j, m, k, photo, esc) {
  const go = (cls, label) => `<a class="${cls}" href="${esc(startHref(APP, 'parents', m.id))}" data-parents-start>${label}</a>`;
  const chips = j.moments.map((x) => `<button type="button" class="pf-chip" data-action="moment" data-moment="${x.id}" aria-pressed="${x.id === m.id}">${x.label}</button>`).join('');
  const rows = [
    ['식사 전에 · 가족의 말도 모아요', '원하면 링크 하나로 형제와 손주가 각자 기억을 남겨요. 내 한 줄만으로도 완성이에요.', '운영 중', 'live', ''],
    ['식탁에서 · 한 장을 함께 읽어요', '휴대폰으로 직접 읽거나, 받는 분께 디지털 한 장을 건네요. 받는 링크에는 내가 고른 말만 보여요.', '운영 중', 'live', ''],
    ['식사 뒤에 · 부모님 곁에 한 권', '우리 가족의 글이 담긴 펼침을 미리 본 뒤, 원하는 분만 양장본 안내를 신청해요.', '미리 신청', 'pre', '<a class="text-button pf-link" href="#pf-product">종이책 견본과 가격 보기</a>'],
    ['필요한 가족만 · 행사 준비 더 보기', '낭독 순서, 하객에게 건네는 장면, 답례 카드는 직접 열었을 때만 보여요. 고른 것마다 결과물과 합계를 알려 드려요.', '미리 신청', 'pre', '<a class="button pf-link-btn" href="/gift/parents/a/#options">행사 준비 더 보기</a>'],
  ];
  const faq = [
    ['무엇이 무료예요?', '내 한 줄로 읽는 디지털 한 장이 무료예요. 종이책은 안내를 받은 뒤 정해요.'],
    ['책 견본을 보면 비용이 생기나요?', '견본은 편하게 보세요. 신청은 직접 누를 때만 접수돼요.'],
    ['가족 초대 없이 끝낼 수 있나요?', '네. 내 한 줄로 한 장이 완성돼요. 가족의 말은 원할 때 곁에 놓아요.'],
  ];
  return `<main id="content" class="journey-page campaign-page parents-free tone-${j.tone}" data-journey-page="parents" tabindex="-1">
 <div class="wrap campaign-breadcrumb"><a href="#journeys">모든 이야기 선물</a><span>/</span><span>${j.label}</span></div>
 <section class="pf-hero wrap"><div class="pf-hero-copy"><p class="eyebrow">부모님께 감사하기</p><h1 data-pf-title>${esc(parentsTitle(m.id))}</h1><p class="lead">부모님 하면 떠오르는 장면 하나를 적어 보세요. 내 한 줄로 먼저 읽고, 원하면 가족의 말도 곁에 놓을 수 있어요.</p>
  <div class="pf-actions">${go('button primary pf-cta', '무료로 한 장 만들기')}<a class="text-button pf-link" href="#pf-example">완성 예시 읽기</a></div>
  <p class="pf-jump"><a class="text-button pf-link" href="#pf-product">종이책 견본과 가격</a></p>
  <div class="pf-occ" role="group" aria-label="어떤 날인가요 (선택)"><span>어떤 날인가요 · 선택</span><div>${chips}</div></div></div>
  <figure class="pf-hero-art"><img src="${photo(k.image)}" alt="${k.imageAlt}" width="768" height="512"></figure></section>
 <section id="pf-example" class="pf-example wrap"><div class="pf-head"><p class="eyebrow">무료 디지털 한 장</p><h2>완성 예시 읽기</h2><p>내 한 줄로 만든 한 장은 휴대폰에서 바로 읽어요. 혼자 간직해도 완성이에요.</p></div>
  <figure class="pf-card"><img src="${PARENTS_FREE.scene.src}" srcset="${PARENTS_FREE.scene.small} ${PARENTS_FREE.scene.sw}w, ${PARENTS_FREE.scene.src} ${PARENTS_FREE.scene.w}w" sizes="(max-width:760px) calc(100vw - 40px), 640px" width="${PARENTS_FREE.scene.w}" height="${PARENTS_FREE.scene.h}" alt="${PARENTS_FREE.scene.alt}" loading="lazy"><figcaption><p class="pf-badge">가상 이야기로 만든 예시</p><p class="pf-line">“${PARENTS_FREE.line}”</p></figcaption></figure>
  <div class="pf-center">${go('button primary pf-cta', '무료로 한 장 만들기')}</div></section>
 <section class="section wrap campaign-process"><div class="pf-head" id="pf-next"><p class="eyebrow">순서대로 소개해요</p><h2>한 장 다음에 할 수 있는 일</h2><p>모두 원할 때 하나씩이에요. 한 장만으로도 완성이에요.</p></div>
  <ol class="pf-rows">${rows.map((r) => `<li class="pf-row"><div><h3>${r[0]}</h3><p>${r[1]}</p>${r[4]}</div><span class="pf-status pf-${r[3]}">${r[2]}</span></li>`).join('')}</ol></section>
 <section id="pf-product" class="pf-product wrap"><div class="pf-head"><p class="eyebrow">종이책 견본과 가격</p><h2>부모님 곁에 한 권</h2><p>견본을 보는 것과 신청은 달라요. 신청은 직접 누를 때만 접수돼요.</p></div>
  <div class="pf-prod" data-offer-key="book" data-offer-qty="1"><figure><img src="${PARENTS_FREE.book.src}" width="${PARENTS_FREE.book.w}" height="${PARENTS_FREE.book.h}" alt="${PARENTS_FREE.book.alt}" loading="lazy"><figcaption>가상 이야기로 만든 AI 제작 시안</figcaption></figure>
  <div><h3>가족 이야기책</h3><p class="pf-price">양장본 1권 · 배송 포함 ${PARENTS_FREE.price.toLocaleString('ko-KR')}원 예시</p><p class="pf-note">최종 구성·가격·제작 일정은 안내를 받은 뒤 정해요.</p><a class="button primary pf-cta" href="/gift/parents/a/?book=1#inquiry">제작 안내 미리 신청</a><p class="pf-note">견본을 본 뒤에도 내 한 장으로 쉽게 돌아올 수 있어요.</p></div></div></section>
 <section class="pf-faq wrap"><h2>마음에 걸리는 것이 있다면.</h2>${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>
 <section class="other-journeys wrap"><h3>다른 소중한 날에도</h3><nav aria-label="다른 여정">${j.__others || ''}</nav></section>
 </main>`;
}

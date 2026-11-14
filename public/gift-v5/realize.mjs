// 시안 v5 랜딩(landing.mjs · journeys.mjs, 범님 원본 그대로)을 실제 운영 범위에 맞추는 한 곳.
//   1) 아직 앱에 없는 것(사진 넣기 · 제작 조건 · 결제 · 종이책 · 개인 기록으로 간직)을 이용 가능한 것처럼 말하지 않는다.
//   2) 시안 안의 해시 경로(#journey/… · #mine · #conditions)를 실제 주소로 잇는다.
//   3) 사진은 랜딩에 이미 있는 같은 파일(/assets/journey-*.webp)을 쓴다.
//   빌드 때 미리 그리기(scripts/landing/build_gift_v5.mjs)와 화면 안 다시 그리기(client.mjs)가 같은 함수를 쓴다.

const SAY = [
  // 사진 — 지금은 글로만 건넨다
  ["가족마다 간직한 기억과 사진을 모아", "가족마다 간직한 기억을 모아"],
  ["두 분과 함께한 가족의 기억과 사진을 모아", "두 분과 함께한 가족의 기억을 모아"],
  ["기억과 사진을 모아<br>그 사람만을 위한 이야기책을", "기억을 모아<br>그 사람만을 위한 이야기책을"],
  ["기억과 사진을 모아", "기억을 모아"],
  ["글이나 사진으로 시작하세요.", "한 문장으로 시작하세요."],
  ["한 문장이나 사진으로 시작해요.", "한 문장으로 시작해요."],
  ["각자가 확인한 글과 사진을 모아요.", "각자가 확인한 글을 모아요."],
  ["글·사진·이름을 직접 확인하고", "글과 이름을 직접 확인하고"],
  ["글·사진·이름을 직접 확인해요.", "글과 이름을 직접 확인해요."],
  ["쓴 뒤에는 내 글과 사진이 담긴 한 쪽을 먼저 확인해요.", "쓴 뒤에는 내 글이 담긴 한 쪽을 먼저 확인해요."],
  ["옛 사진에도 내 말 한 줄", "옛 사진 속 그날을, 내 말 한 줄로"],
  ["사진만으로 전해지지 않았던 그날의 마음을 직접 더해요.", "사진 밖에 있던 그날의 마음을 직접 적어요."],
  ["읽는 사람과 사진 사용을 먼저 확인해요.", "쓰기 전에, 누가 읽는지 먼저 알려요."],
  // 제작 · 결제 · 종이책 — 지금은 디지털본(링크로 읽는 책) 무료 시범
  ["가상 구성 예시 · 실제 인쇄 규격·배치는 제작 전 확인", "가상 구성 예시 · 지금은 링크로 읽는 디지털본으로 건네요"],
  ["책 전체와 제작 조건을 확인한 뒤<br>정말 건넬 선물인지 결정하면 돼요.", "책 전체를 미리 본 뒤<br>정말 건넬 선물인지 결정하면 돼요."],
  ["현재는 시안 체험 · 결제되지 않아요.", "디지털본 무료 시범 · 받는 분은 가입 없이 링크로 읽어요."],
  ["책의 순서·내용·누락을 확인한 뒤, 제작 조건을 보고 결정해요.", "모인 장면을 책으로 미리 보고, 넣고 뺄 것을 정해 완성해요."],
  ["책 전체와 제작 범위·총비용·도착일을 확인한 뒤 결정해요.", "책 전체를 미리 보고 완성하면, 받는 쪽에 드릴 링크가 생겨요."],
  ["모인 글로 미리본 뒤 소책자·디지털·마감 조정 등 가능한 대안과 비용을 확인해요.", "모인 만큼으로 한 권을 엮어요. 빈 쪽을 지어서 채우지 않아요."],
  ["한 문장부터 참여할 수 있어요. 현재 모인 글을 확인하고, 가능한 분량과 제작 형태를 정해요.", "한 문장부터 참여할 수 있어요. 모인 글을 책으로 미리 보고 완성해요."],
  ["모인 글과 제작 조건을 보고 결정해요. 기록으로만 간직해도 좋아요.", "모인 글을 책으로 미리 보고 완성해요."],
  ["한 장면부터 시작해요. 현재 시안은 한 편을 미리보고 확인하는 흐름이며, 분량에 맞는 실제 제작 형태는 별도 확인이 필요해요.", "한 장면부터 시작해요. 장면이 여럿이면 하나씩 더해요."],
  ["희망 선물일에 맞춰 준비하고, 내용 확인과 실제 제작 일정을 따로 확인해요.", "건네는 날을 정하면 원고 마감이 자동으로 잡혀요."],
  ["시안에서는 공통 책의 내용과 희망 부수를 확인해요. 개인별 결제·배송·소장 권한은 별도로 구현해야 해요.", "지금은 디지털본 링크를 함께한 모두가 읽어요. 사람별 종이책 주문은 준비하고 있어요."],
  ["조율자와 결제 담당을 구분해 제작 조건을 공유할 수 있어요. 실제 기관 증빙·결제 처리는 운영 연결 전이에요.", "지금은 디지털본을 무료로 시범 운영해요. 결제와 증빙은 종이책을 열 때 함께 안내할게요."],
  ["사람별·적어준 연도별 순서를 살펴보고 확인해요. 개인별 주문·배송은 실제 운영 연결 전이에요.", "누가, 언제쯤의 장면인지 함께 보여요. 사람별 종이책 주문은 준비하고 있어요."],
  // 범위 · 시점 · 기록
  ["가족이 원하는 시점과 열람 범위를 먼저 정해요.", "가족이 원하는 시점을 먼저 정해요. 날짜는 비워 둘 수 있어요."],
  ["가족이 진행 시점을 정해요. 시안에서는 날짜를 비워둘 수 있고 참여를 건너뛸 수 있어요. 원치 않는 참여를 재촉하지 않아요.", "가족이 진행 시점을 정해요. 날짜를 비워 둘 수 있고, 쓰지 않아도 괜찮아요. 원치 않는 참여를 재촉하지 않아요."],
  ["받는 사람에게 건네는 내용과 내가 혼자 간직할 생각을 나눠요.", "받는 사람에게 건넬 말만, 내가 고른 만큼 담아요."],
  ["네. 개인 기록으로 간직하고 다시 읽는 흐름을 선택할 수 있어요. 책 제작은 원할 때 별도로 결정해요.", "네. 온순간 기록에 날마다 한 장면씩 남기고 다시 읽을 수 있어요. 나에게 건네는 책은 원할 때 만들어요."],
  ["시안에서 직접 간직한 이야기는 골라 다시 준비할 수 있어요. 기존 운영 계정의 전체 기록 검색·가져오기는 연결 전이에요.", "지난 기록을 골라 책에 넣는 기능은 준비하고 있어요. 지금은 다시 보고 싶은 장면을 새로 써서 담아요."],
  ["그 이야기는, 내 삶의 한 장면이기도 해요.<br>원하면 내 기록에도 따로 간직하세요.", "그 이야기는, 내 삶의 한 장면이기도 해요.<br>원하면 온순간에서 나만의 기록도 이어 갈 수 있어요."],
  ["원하면 내 기록에도 간직하세요.<br>다시 읽고 떠오른 생각을 더하고,<br>다른 소중한 날에 꺼낼 이야기를 쌓아가요.", "원하면 온순간에서 나만의 기록도 이어 가요.<br>오늘의 한 장면을 남기고,<br>다시 읽으며 떠오른 생각을 더해요."],
  ["지금 어디까지 체험할 수 있나요?", "지금 무엇까지 할 수 있나요?"],
  ["내 글·사진 작성과 한 쪽 확인, 준비·책 미리보기 흐름을 체험할 수 있어요. 실제 공동 참여·AI·결제·인쇄·배송은 연결 전입니다. 가상 자료로 사용해 주세요.", "준비 · 초대 링크 · 한 장면 쓰기 · 책으로 미리 보기 · 받는 링크까지 실제로 쓸 수 있어요. 지금은 디지털본을 무료로 시범 운영하고, 사진 넣기와 종이책은 준비하고 있어요."],
];

const DECISION_ASIDE = /<aside><p class="eyebrow">제작 전, 세 가지를 함께 확인해요<\/p>[\s\S]*?<\/aside>/;
const NOW_ASIDE = `<aside><p class="eyebrow">지금 건네는 모습</p><ol><li><span>01</span><div><strong>링크로 읽는 디지털본</strong><p>표지 · 쓴 사람 · 원문 그대로의 장면</p></div></li><li><span>02</span><div><strong>무료 시범 운영</strong><p>준비부터 건네기까지 비용이 들지 않아요</p></div></li><li><span>03</span><div><strong>받는 분은 링크로 바로</strong><p>가입 · 답장 · 반응을 요구하지 않아요</p></div></li></ol><p class="fine">종이책 · 사진 넣기는 준비하고 있어요.</p></aside>`;
const SCOPE = /<section class="wrap scope-note scope-bottom">[\s\S]*?<\/section>/;
const NOW_SCOPE = `<section class="wrap scope-note scope-bottom"><strong>디지털본 무료 시범</strong><p>준비 · 초대 링크 · 한 장면 쓰기 · 책으로 미리 보기 · 받는 링크까지 실제로 쓸 수 있어요. 이 페이지의 예시 장면은 가상이에요. 사진 넣기와 종이책은 준비하고 있어요.</p></section>`;

/** 앱 주소 — 운영은 app.onmoment.kr. 시범 화면(*.vercel.app)에서만 ?app= 으로 바꾼다(app-origin.js 와 같은 규칙) */
export function appOrigin() {
  const prod = "https://app.onmoment.kr";
  if (typeof location === "undefined" || !location.hostname.endsWith(".vercel.app")) return prod;
  let o = null;
  try { o = new URLSearchParams(location.search).get("app") || sessionStorage.getItem("om:app-origin"); if (o) sessionStorage.setItem("om:app-origin", o); } catch { /* 저장 불가 */ }
  return o && /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(o) ? o : prod;
}

/** 여정 · 행사 · 대상을 그대로 앱 준비 화면으로 — /start 를 지나 /prepare?j=&o=&t= */
export function startHref(app, j, o, t) {
  const q = new URLSearchParams({ j });
  if (o) q.set("o", o);
  if (t && (o === "birth" || o === "first-birthday")) q.set("t", t);
  return `${app}/start?src=journey-${j}&next=${encodeURIComponent(`/prepare?${q.toString()}`)}`;
}

/** 시안 HTML → 운영 HTML */
export function realize(html, { app = "https://app.onmoment.kr", page = "hub" } = {}) {
  let s = html;
  for (const [a, b] of SAY) s = s.split(a).join(b);
  s = s.replace(DECISION_ASIDE, NOW_ASIDE).replace(SCOPE, NOW_SCOPE);
  // 사진: 시안의 assets/journeys/journey-*.webp = 랜딩의 /assets/journey-*.webp (같은 파일)
  s = s.replace(/src="[^"]*?assets\/(?:journeys\/)?([a-z0-9-]+\.(?:webp|svg|png|jpg))"/g, 'src="/assets/$1"');
  // 주소
  s = s.replace(/href="#journey\/([a-z]+)"/g, 'href="/gift/$1/"');
  if (page !== "hub") s = s.replace(/href="#journeys"/g, 'href="/gift/#journeys"');
  s = s.replace(/href="#mine"/g, `href="${app}/start?src=gift-self-record"`);
  s = s.replace(/<a class="text-button" href="#conditions">[^<]*<\/a>/g, "");
  return s;
}

export const header = () => `<header class="site-header wrap"><a class="brand" href="/gift/"><span class="brand-mark" aria-hidden="true">✳︎</span><span>온순간</span><small>ONMOMENT</small></a><nav class="header-links" aria-label="서비스 안내"><a href="/gift/#journeys">일곱 여정</a><a class="active" href="/gift/#journeys">나의 소중한 날 찾기 ↗</a></nav></header>`;
export const footer = () => `<footer class="footer wrap"><p>온순간, 가장 나답게.</p><p>디지털본 무료 시범 · 예시 장면은 가상이에요 · <a href="/privacy/">개인정보 처리방침</a> · <a href="/terms/">이용약관</a> · <a href="/">온순간 처음으로</a></p></footer>`;

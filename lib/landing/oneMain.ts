// 하나의 메인(2026-11-16 전달서) — 카드 순서: 마지막 큰 자리는 '나에게 건네기'(범님 11-16 — 선물 뒤 나에게 남는 기록으로 이어지게).
// — 선물의 모습 → 이야기 한 쪽 → 일곱 여정 → 만드는 방법 → 지금 제공 범위 → 나에게도 남는 기록 → 이벤트 · FAQ.
//   여정 이름 · 상황 · 쓰는 사람 → 받는 사람은 앱 정본(src/lib/giftBook/canon.js · copy.giftBook.journeys)과 같은 말이어야 한다.
//   예시 장면은 모두 가상(부록 B). 후기 · 참여 수 · 할인 · 마감 · 감동 보장은 만들지 않는다.

export type MainJourney = { key: string; name: string; moments: string; episode: string; who: string; image: string; alt: string; tone: string };

export const MAIN_JOURNEYS: MainJourney[] = [
  { key: "parents", name: "부모님께 감사하기", moments: "환갑 · 칠순 · 팔순 · 결혼기념일", episode: "엄마, 그 전화가 참 좋았어요.", who: "자녀·손주·가족 → 부모님 한 분 또는 두 분", image: "journey-parents.webp", alt: "따뜻한 식탁에서 옛 사진을 함께 바라보는 두 세대의 손", tone: "ochre" },
  { key: "couple", name: "부부·연인에게 마음 전하기", moments: "결혼기념일 · 연인의 기념일 · 소중한 사람의 생일", episode: "별일 없던 그 저녁이 좋아.", who: "나 → 소중한 한 사람", image: "journey-couple.webp", alt: "햇살 드는 거실에서 나란히 앉아 책을 읽고 기록하는 두 사람", tone: "wine" },
  { key: "retire", name: "함께한 시간에 감사하기", moments: "은퇴·퇴임 · 이직·전근 · 해외 이주 송별 · 활동 마무리", episode: "“밥부터 먹고 보자.”", who: "동료·친구·회원 → 떠나거나 역할을 마치는 사람", image: "journey-retire.webp", alt: "햇살이 들어오는 창가에 놓인 책과 안경, 꽃", tone: "sage" },
  { key: "beginnings", name: "새로운 시작을 축하하기", moments: "졸업 · 독립·첫 출발 · 결혼 · 출산 · 첫돌", episode: "잘 안 풀린 날에도 같이 걸었지.", who: "부모·가족·친구 → 새로운 출발을 맞는 사람", image: "journey-teen.webp", alt: "두 권의 노트와 찻잔이 놓인 햇살 가득한 집의 식탁", tone: "rose" },
  { key: "together", name: "우리의 시간을 남기기", moments: "송년회 · 활동 주년 · 동창회 · 가족 모임 · 수료 · 여행·완주", episode: "그 사진에서 다 같이 웃었어요.", who: "함께한 사람들 → 서로", image: "journey-teen.webp", alt: "여러 사람이 마주 앉을 수 있는 따뜻한 나무 식탁과 기록장", tone: "olive" },
  { key: "remember", name: "함께 기억하기", moments: "삶을 기억하는 모임 · 기일 · 가족의 기억 남기기", episode: "할머니의 “먹고 가”가 생각나요.", who: "가족·지인 → 유가족과 다음 세대", image: "journey-parents.webp", alt: "옛 사진과 펼친 책을 사이에 두고 기억을 나누는 손", tone: "stone" },
  { key: "self", name: "나에게 건네기", moments: "나의 생일 · 나의 은퇴 · 한 해 마무리 · 인생 전환", episode: "나 먹을 것도 하나 샀다.", who: "지금의 나 → 나", image: "journey-unsure.webp", alt: "창가의 빛과 물 한 잔 옆에 펼쳐진 나만의 기록장", tone: "sand" },
];

/** 개인 기록의 주제(예전 메인의 일곱 여정) — 선물 여정과 다른 상품처럼 늘어놓지 않고 '나에게도 남는 기록' 안에서 펼친다 */
export const RECORD_TOPICS: { key: string; name: string; line: string }[] = [
  { key: "teen", name: "사춘기 부모", line: "아이도 자라는 중. 나도 자라는 중." },
  { key: "couple", name: "연인·부부", line: "같은 하루, 서로 다른 우리." },
  { key: "parents", name: "부모님께", line: "내가 만난 당신을, 한 권에 담아서." },
  { key: "retire", name: "은퇴 전후", line: "명함 너머의 나를, 한 장씩 만나보세요." },
  { key: "baby", name: "임신·육아", line: "너의 처음 곁에, 나의 처음도 있었어." },
  { key: "pilgrim", name: "순례·리트릿", line: "길에서 만난 나를, 일상에서도 만나도록." },
  { key: "unsure", name: "있는 그대로", line: "무엇이 될지 몰라도, 오늘의 나부터." },
];

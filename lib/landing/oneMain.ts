// 하나의 메인(2026-11-16 전달서) — 카드 순서: 마지막 큰 자리는 '나에게 건네기'(범님 11-16 — 선물 뒤 나에게 남는 기록으로 이어지게).
// — 선물의 모습 → 이야기 한 쪽 → 일곱 여정 → 만드는 방법 → 지금 제공 범위 → 나에게도 남는 기록 → 이벤트 · FAQ.
//   여정 이름 · 상황 · 쓰는 사람 → 받는 사람은 앱 정본(src/lib/giftBook/canon.js · copy.giftBook.journeys)과 같은 말이어야 한다.
//   예시 장면은 모두 가상(부록 B). 후기 · 참여 수 · 할인 · 마감 · 감동 보장은 만들지 않는다.

export type MainJourney = { key: string; name: string; moments: string; episode: string; who: string; image: string; alt: string; tone: string };

export const MAIN_JOURNEYS: MainJourney[] = [
  { key: "parents", name: "부모님께 감사하기", moments: "환갑 · 칠순 · 팔순 · 결혼기념일", episode: "엄마, 그 전화가 참 좋았어요.", who: "자녀·손주·가족 → 부모님 한 분 또는 두 분", image: "journey-parents.webp", alt: "따뜻한 식탁에서 옛 사진을 함께 바라보는 두 세대의 손", tone: "ochre" },
  { key: "couple", name: "부부·연인에게 마음 전하기", moments: "결혼기념일 · 연인의 기념일 · 소중한 사람의 생일", episode: "별일 없던 그 저녁이 좋아.", who: "나 → 소중한 한 사람", image: "journey-couple.webp", alt: "햇살 드는 거실에서 나란히 앉아 책을 읽고 기록하는 두 사람", tone: "wine" },
  { key: "retire", name: "함께한 시간에 감사하기", moments: "은퇴·퇴임 · 이직·전근 · 송별 · 친구의 결혼·새 출발", episode: "“밥부터 먹고 보자.”", who: "동료·친구·회원 → 함께한 분", image: "journey-retire.webp", alt: "햇살이 들어오는 창가에 놓인 책과 안경, 꽃", tone: "sage" },
  { key: "beginnings", name: "자녀에게 건네기", moments: "출산 · 첫돌 · 사춘기 · 졸업 · 독립 · 결혼", episode: "잘 안 풀린 날에도 같이 걸었지.", who: "부모 → 자녀", image: "journey-teen.webp", alt: "두 권의 노트와 찻잔이 놓인 햇살 가득한 집의 식탁", tone: "rose" },
  { key: "together", name: "우리의 시간을 남기기", moments: "모임 · 독서모임 · 여행", episode: "그 사진에서 다 같이 웃었어요.", who: "함께한 사람들 → 서로", image: "journey-teen.webp", alt: "여러 사람이 마주 앉을 수 있는 따뜻한 나무 식탁과 기록장", tone: "olive" },
  { key: "remember", name: "함께 기억하기", moments: "삶을 기억하는 모임 · 기일 · 가족의 기억 남기기", episode: "할머니의 “먹고 가”가 생각나요.", who: "가족·지인 → 유가족과 다음 세대", image: "journey-parents.webp", alt: "옛 사진과 펼친 책을 사이에 두고 기억을 나누는 손", tone: "stone" },
  { key: "self", name: "나에게 건네기", moments: "나의 생일 · 나의 은퇴 · 한 해 마무리 · 인생 전환", episode: "나 먹을 것도 하나 샀다.", who: "지금의 나 → 나", image: "journey-unsure.webp", alt: "창가의 빛과 물 한 잔 옆에 펼쳐진 나만의 기록장", tone: "sand" },
];

/** 여정마다 나에게 남기기(11-16 범님: 여정은 하나) — 이야기 선물의 일곱 여정이 유일한 여정이다. 예전 개인 기록 주제는 이 여정 안의 상황으로 들어갔다.
 *  href: 나에게 남기는 쪽 안내가 있으면 그 페이지(예전 주제 페이지), 없으면 여정 상세 */
export const SELF_SIDE: { key: string; line: string; href: string }[] = [
  { key: "parents", line: "내가 만난 당신을, 한 권에 담아서.", href: "/gift/parents/" },
  { key: "couple", line: "같은 하루, 서로 다른 우리.", href: "/gift/couple/" },
  { key: "retire", line: "함께한 시간에서 받은 것을, 내 말로.", href: "/gift/retire/" },
  { key: "beginnings", line: "너의 처음 곁에, 나의 처음도 있었어. 사춘기 아이 곁의 나도.", href: "/gift/beginnings/" },
  { key: "together", line: "길에서 만난 나를, 일상에서도 만나도록.", href: "/gift/together/" },
  { key: "remember", line: "기억하는 마음을, 조용히 남겨 두어요.", href: "/gift/remember/" },
  { key: "self", line: "무엇이 될지 몰라도, 오늘의 나부터.", href: "/gift/self/" },
];

/** 예전 주제 페이지(/journeys/<예전 키>/) → 지금의 여정. 주소는 그대로 열리고, 맨 위에 새 여정으로 가는 안내를 단다 */
export const OLD_TO_JOURNEY: Record<string, { key: string; note: string }> = {
  parents: { key: "parents", note: "" },
  couple: { key: "couple", note: "" },
  baby: { key: "beginnings", note: "출산·육아" },
  teen: { key: "beginnings", note: "사춘기" },
  pilgrim: { key: "together", note: "여행·순례" },
  unsure: { key: "self", note: "" },
  retire: { key: "self", note: "나의 은퇴" },
};

// 이야기 선물 — 일곱 여정(누가 → 누구에게 · 어떤 날). 앱의 정본과 같은 키 · 같은 이름 · 같은 날 이름을 쓴다.
//   앱 정본: onmoment-recovery src/lib/giftBook/journeys.ts + src/lib/brand/copy.ts(giftBook.journeys). 바꾸면 두 곳을 함께 바꾼다.
//   버튼: 이야기 선물 = /start?src=journey-<key>&next=%2Fprepare%3Fj%3D<key> · 나에게 건네기 = /start?src=journey-self
export type GiftJourney = {
  key: "parents" | "thanks" | "newstart" | "us" | "together" | "memory" | "self";
  name: string;
  who: string;
  days: string[];
  line: string;      // 카드의 한 줄
  question: string;  // 그 여정의 첫 물음(앱 쓰기 화면과 같은 말)
  example: string;   // 가상 예시 한 장면
  cta: string;
};

export const GIFT_JOURNEYS: GiftJourney[] = [
  { key: "parents", name: "부모님께 감사하기", who: "가족 여러 명 → 부모님", days: ["환갑", "칠순", "팔순", "결혼기념일"],
    line: "가족이 저마다 기억하는 그분을, 한 권에.", question: "그때 그분이 한 말", example: "“늦지 마라.” 첫 출근 날 아침, 현관에 닦아 둔 구두가 있었다.", cta: "부모님께 드릴 선물 준비하기" },
  { key: "thanks", name: "함께한 시간에 감사하기", who: "동료 · 친구 · 회원 → 떠나거나 역할을 마치는 분", days: ["은퇴", "송별", "활동 마무리"],
    line: "함께 일한 사람들이 기억하는 그분을, 한 권에.", question: "함께 일하며 들은 그분의 말", example: "“천천히 해도 돼.” 발표를 망친 날, 끝까지 남아 자료를 같이 봐 주셨다.", cta: "감사의 선물 준비하기" },
  { key: "newstart", name: "새로운 시작을 축하하기", who: "부모 · 가족 · 친구 → 축하받는 사람", days: ["졸업", "독립 · 첫 출발", "첫돌", "결혼"],
    line: "곁에서 지켜본 사람들의 장면을, 새 출발에.", question: "지켜보며 마음에 남은 장면", example: "이삿짐 마지막 상자를 들고 나가며, 너는 한 번 뒤돌아 웃었다.", cta: "축하 선물 준비하기" },
  { key: "us", name: "우리 둘의 마음 전하기", who: "한 사람 → 한 사람", days: ["기념일", "생일"],
    line: "둘만 아는 장면을, 한 권에.", question: "그때 당신이 한 말", example: "“같이 걷는 건 좋아.” 그 말을 듣고 한 바퀴를 더 걸었다.", cta: "둘의 선물 준비하기" },
  { key: "together", name: "우리의 시간을 남기기", who: "여러 사람 → 서로", days: ["송년 · 주년", "동창회 · 재회 · 가족 모임", "모임 · 수료", "여행 · 순례 · 완주"],
    line: "함께한 사람들이 저마다 기억하는 시간을, 한 권에.", question: "그때 누군가 한 말", example: "마지막 날 밤, 누군가 “내년에도”라고 말했고 아무도 대답하지 않았지만 다 웃었다.", cta: "우리의 책 준비하기" },
  { key: "memory", name: "함께 기억하기", who: "가족 · 지인 → 유가족 · 다음 세대", days: ["추모", "기일"],
    line: "가족과 지인이 기억하는 그분을, 한 권에.", question: "그분이 자주 하시던 말", example: "“밥은 먹었니.” 전화를 걸면 늘 먼저 물으셨다.", cta: "기억의 책 준비하기" },
  { key: "self", name: "나에게 건네기", who: "나 → 나", days: ["나의 생일", "한 해 마무리", "인생의 전환"],
    line: "지난 장면을 지금의 눈으로 다시 읽고, 나에게.", question: "오늘, 마음에 남은 장면", example: "퇴근길에 올려다본 하늘이 유난히 예뻐서, 잠깐 멈춰 섰다.", cta: "내 기록으로 시작하기" },
];

export const journeyHref = (app: string, key: GiftJourney["key"]) =>
  key === "self" ? `${app}/start?src=journey-self` : `${app}/start?src=journey-${key}&next=%2Fprepare%3Fj%3D${key}`;

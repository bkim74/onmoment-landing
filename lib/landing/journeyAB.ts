// 여정 A/B 랜딩 설정 — 네 여정 × A(완성된 순간 먼저) · B(내 장면 먼저). (11-22 · exchange/outbox/2026-11-22_journey-mvp/00_PLAN.md §7)
//   여정 키 · 행사 id 는 앱 정본(src/lib/giftBook/canon.js)과 같다 — 상담 신청 API 가 이 값만 받는다.
//   그림(portrait)은 지금 가상 예시 사진 · 이야기 초상 완성본이 오면 이 칸만 바꾼다.
//   장면 · 문장은 모두 가상 예시다(실제 사용자 말 아님).

export type Scene = { who: string; text: string; send: string }; // send = 이 장면에서 건넬 한 문장(가상)
export type Outcome = { name: string; desc: string };
export type JourneyAB = {
  key: "parents" | "beginnings" | "couple" | "self";
  label: string;
  tag: string;
  portrait: { src: string; alt: string };
  a: { headline: [string, string]; lead: string };
  outcomes: [Outcome, Outcome, Outcome];
  mine: string;
  b: { question: string; scenes: Scene[] };
  cards: { gone: string | null; kept: string };
  moments: { id: string; label: string }[];
  group: boolean; // 함께 쓰는 사람 수를 묻는가
  kit: boolean; // 답례 수량을 묻는가
};

export const JOURNEY_AB: Record<JourneyAB["key"], JourneyAB> = {
  parents: {
    key: "parents",
    label: "인생 이야기 선물",
    tag: "칠순 · 환갑 · 팔순 · 결혼기념일",
    portrait: { src: "/assets/journey-parents.webp", alt: "따뜻한 식탁에서 옛 사진을 함께 바라보는 두 세대의 손" },
    a: {
      headline: ["가족이 기억하는 장면으로,", "그분의 시간을 건네요."],
      lead: "가족마다 다르게 기억하는 한 장면을 모아 이야기 초상과 한 권의 책으로 엮어요. 잔치에 오신 분들께는 그 이야기를 담은 작은 답례를 건네요.",
    },
    outcomes: [
      { name: "나의 이야기 초상", desc: "가족이 남긴 장면 속 그분의 모습을 한 장의 그림으로" },
      { name: "함께 쓴 이야기 책", desc: "가족 한 사람 한 사람의 장면을 원문 그대로" },
      { name: "나눔 키트", desc: "초상과 한 문장을 담은 답례 수건 · 이야기 카드" },
    ],
    mine: "선물을 준비하며 쓴 내 장면은 내 기록에도 남아요.",
    b: {
      question: "그분이 해 주신 말이나 행동 중, 아직 기억나는 장면이 있나요?",
      scenes: [
        { who: "큰딸", text: "아빠 가방에서는 서류보다 귤이 먼저 나왔어요. 버스 타기 전에 우리 손에 하나씩 쥐여 주셨지요.", send: "아빠, 그 귤 덕분에 우리 겨울은 늘 따뜻했어요." },
        { who: "아들", text: "운전하실 때 늘 트로트를 흥얼거리시는데, 가사는 반쯤 틀리셨어요.", send: "아빠 노래는 가사가 틀려도, 늘 우리 차 안의 배경음악이었어요." },
        { who: "손주", text: "할아버지는 내 그림을 냉장고에 다 붙여 두세요.", send: "할아버지 냉장고가 제 첫 전시회였어요." },
      ],
    },
    cards: { gone: "그분께 간 장면", kept: "나에게 남은 장면" },
    moments: [
      { id: "seventy", label: "칠순" },
      { id: "sixty", label: "환갑" },
      { id: "eighty", label: "팔순" },
      { id: "anniversary", label: "부모님 결혼기념일" },
      { id: "silver", label: "은혼 · 25주년" },
      { id: "golden", label: "금혼 · 50주년" },
      { id: "everyday", label: "평범한 오늘" },
    ],
    group: true,
    kit: true,
  },
  beginnings: {
    key: "beginnings",
    label: "우리 아이 첫 이야기",
    tag: "출산 · 백일 · 첫돌",
    portrait: { src: "/assets/journey-baby.webp", alt: "작은 아기 신발과 꽃 옆에 펼쳐진 이야기책" },
    a: {
      headline: ["너와 함께한 첫해를,", "우리 말로 남겨요."],
      lead: "처음 만난 날부터 첫돌까지, 부모와 가족이 기억하는 장면을 모아요. 아이에게는 훗날 읽을 이야기로, 부모에게는 첫해의 기록으로 남아요.",
    },
    outcomes: [
      { name: "나의 이야기 초상", desc: "가족이 남긴 장면 속 아이와 우리를 한 장의 그림으로" },
      { name: "첫해 이야기 카드북", desc: "처음 안은 날, 첫걸음, 첫 웃음을 원문 그대로" },
      { name: "나눔 키트", desc: "돌잔치 손님께 드리는 드립백 · '우리 아이 첫 장면' 카드" },
    ],
    mine: "부모가 된 첫해의 내 한 문장도 내 기록에 남아요.",
    b: {
      question: "아이와 함께한 어떤 장면이 떠오르나요?",
      scenes: [
        { who: "엄마", text: "처음 안았을 때, 네 손이 내 손가락 하나를 꼭 쥐었어.", send: "네가 쥐었던 그 손가락, 지금도 따뜻해." },
        { who: "아빠", text: "새벽 수유를 마치고, 품에서 잠든 너를 한참 바라봤어.", send: "그 새벽의 너를, 아빠는 오래 기억할 거야." },
        { who: "할머니", text: "첫 목욕 날, 너는 울지 않고 눈만 동그랗게 떴단다.", send: "그 동그란 눈으로 세상을 처음 만나던 날을 할머니가 기억해." },
      ],
    },
    cards: { gone: "아이에게 남길 장면", kept: "나에게 남은 장면" },
    moments: [
      { id: "first-birthday", label: "첫돌" },
      { id: "birth", label: "출산" },
      { id: "everyday", label: "평범한 오늘" },
      { id: "other", label: "그 밖의 날 (백일 등)" },
    ],
    group: true,
    kit: true,
  },
  couple: {
    key: "couple",
    label: "평범한 날의 사랑 이야기",
    tag: "결혼기념일 · 연인의 기념일 · 생일 · 결혼",
    portrait: { src: "/assets/journey-couple.webp", alt: "햇살 드는 거실에서 나란히 앉아 책을 읽고 기록하는 두 사람" },
    a: {
      headline: ["우리만 아는 평범한 하루가,", "가장 우리다운 선물이 돼요."],
      lead: "같은 날을 서로 다르게 기억하는 두 사람. 각자 남긴 장면을 나란히 놓아, 두 시선의 이야기와 우리 초상으로 엮어요.",
    },
    outcomes: [
      { name: "우리 이야기 초상", desc: "두 사람이 남긴 장면 속 우리를 한 장의 그림으로" },
      { name: "두 시선 카드", desc: "같은 날, 내가 본 너와 네가 본 나" },
      { name: "나눔 키트", desc: "결혼식 손님께 드리는 드립백 · 두 시선 카드" },
    ],
    mine: "상대가 기억하는 나를 만나고, 내 장면은 내 기록에 남아요.",
    b: {
      question: "우리 둘만 기억할 만한 평범한 하루가 있나요?",
      scenes: [
        { who: "나", text: "비 오던 날, 너는 우산을 내 쪽으로 조금 더 기울였지.", send: "그날도, 지금도 고마워." },
        { who: "너", text: "그날 젖은 내 어깨를 보고 네가 웃던 얼굴이 기억나.", send: "젖은 어깨보다 네 웃음이 더 오래 남았어." },
        { who: "나", text: "퇴근길에 붕어빵 두 개를 사 와서, 하나를 반으로 나눠 줬지.", send: "반으로 나눈 붕어빵이 제일 맛있었어." },
      ],
    },
    cards: { gone: "너에게 간 장면", kept: "나에게 남은 장면" },
    moments: [
      { id: "anniversary", label: "결혼기념일" },
      { id: "couple-day", label: "연인의 기념일" },
      { id: "birthday", label: "생일" },
      { id: "everyday", label: "평범한 오늘" },
      { id: "other", label: "그 밖의 날 (결혼식 등)" },
    ],
    group: false,
    kit: true,
  },
  self: {
    key: "self",
    label: "나에게 주는 선물",
    tag: "생일 · 한 해의 끝 · 새 출발 · 평범한 오늘",
    portrait: { src: "/assets/journey-unsure.webp", alt: "창가의 빛과 물 한 잔 옆에 펼쳐진 나만의 기록장" },
    a: {
      headline: ["오늘의 나를 만나는,", "작은 한 장."],
      lead: "하루에 한 장면, 내 말로 남겨요. 쌓인 장면에서 지금의 나를 닮은 이야기 초상과 작은 책이 만들어져요.",
    },
    outcomes: [
      { name: "오늘의 나 초상", desc: "내가 남긴 장면에서 고른 것으로 한 장의 그림을" },
      { name: "작은 책", desc: "다시 읽고 싶은 장면을 골라 한 권으로" },
      { name: "초상 엽서", desc: "책상 위에 두는 한 장" },
    ],
    mine: "모든 장면은 나만 읽어요. 건넬지는 내가 정합니다.",
    b: {
      question: "지금의 내가 다시 보고 싶은 장면은 무엇인가요?",
      scenes: [
        { who: "나", text: "계획대로 되지 않던 날, 나는 한참을 걸었다.", send: "그날 나는 숨을 고르고 있었나 보다." },
        { who: "나", text: "퇴근길 버스에서 창밖 노을을 끝까지 봤다.", send: "그 노을을 끝까지 본 나에게, 고마워." },
        { who: "나", text: "오랜만에 엄마에게 먼저 전화를 걸었다.", send: "먼저 건 그 전화가 오늘의 작은 용기였다." },
      ],
    },
    cards: { gone: null, kept: "나에게 남은 장면" },
    moments: [
      { id: "everyday", label: "평범한 오늘" },
      { id: "birthday", label: "나의 생일" },
      { id: "year-end", label: "한 해 마무리" },
      { id: "transition", label: "새 출발" },
      { id: "retirement", label: "나의 은퇴" },
    ],
    group: false,
    kit: false,
  },
};

export const AB_KEYS = Object.keys(JOURNEY_AB) as JourneyAB["key"][];
export const VARIANTS = ["a", "b"] as const;
export type Variant = (typeof VARIANTS)[number];

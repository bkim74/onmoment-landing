export type Locale = "ko" | "en";

export type LineContract = {
  mobile: string[];   // ≤430px
  desktop: string[];  // ≥640px (sm:)
};

export type LocalizedLineContract = Record<Locale, LineContract>;

// ── Landing brand surfaces ────────────────────────────────────────────────

export const HERO_TITLE: LocalizedLineContract = {
  ko: {
    mobile:  ["오늘이", "선물이 되도록,", "한 줄."],
    desktop: ["오늘이 선물이 되도록,", "한 줄."],
  },
  en: {
    // draft / reserved — not user-facing until global copy is confirmed
    mobile:  ["One honest line.", "Returned tomorrow."],
    desktop: ["One honest line.", "Returned tomorrow."],
  },
};

export const HERO_SUB: LocalizedLineContract = {
  ko: {
    mobile:  ["하루 한 줄.", "내일 다시 만나는 나."],
    desktop: ["하루 한 줄. 내일 다시 만나는 나."],
  },
  en: {
    // draft / reserved
    mobile:  ["A sentence a day.", "A self you meet again tomorrow."],
    desktop: ["A sentence a day. A self you meet again tomorrow."],
  },
};

import type { Metadata } from "next";
import GiftV5 from "../GiftV5";

// 이야기 선물 — 역할별로 보는 '이렇게 만들어져요'(준비하는 분 · 함께 쓰는 사람 · 받는 분 · 신청과 비용). 허브 · 여정 페이지에서 들어온다.
export const metadata: Metadata = {
  title: "이렇게 만들어져요 — 온순간 이야기 선물",
  description: "한 사람이 시작하고, 여럿이 한 장면씩, 받는 분은 링크 하나로. 역할별 화면과 신청 방법을 한눈에 봐요.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "이렇게 만들어져요 — 온순간 이야기 선물",
    description: "준비하는 분 · 함께 쓰는 사람 · 받는 분, 역할별 화면과 신청 방법.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

export default function GiftHowPage() {
  return <GiftV5 page="how" />;
}

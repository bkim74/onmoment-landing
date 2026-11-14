import type { Metadata } from "next";
import GiftV5 from "./GiftV5";

// 이야기 선물 — 일곱 여정 허브(시안 v5). 운영 홈과 나란히 시험하는 숨은 페이지: 홈 · 사이트맵 · 검색에 드러내지 않는다.
export const metadata: Metadata = {
  title: "소중한 날의 일곱 여정 — 온순간",
  description: "부모님, 함께한 사람, 새로운 시작, 우리 둘, 모임, 나, 추모. 일곱 여정의 이야기 선물을 구체적인 장면으로 시작해 보세요.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "함께한 장면을, 건네고 싶은 마음으로 — 온순간",
    description: "그 사람만을 위한 이야기책. 한 문장부터, 내 말 그대로.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

export default function GiftHubPage() {
  return <GiftV5 page="hub" />;
}

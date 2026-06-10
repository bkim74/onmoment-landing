import type { Metadata } from "next";
import FirstPageKitLanding from "./FirstPageKitLanding";

export const metadata: Metadata = {
  title: "온순간 · 당신의 첫 장이 도착했습니다",
  description:
    "당신의 첫 장이 비어 있는 채로 도착했습니다. 오늘 한 줄을 남기면, 내일의 당신에게 돌아옵니다.",
  // 실험 페이지 — URL 직접 공유 테스트 전용, 검색 격리
  robots: { index: false, follow: false },
};

const DEFAULT_START_HREF =
  "https://app.onmoment.kr/today?source=first_page_kit&variant=ritual_kit_v1";

export default function FirstPageKitPage() {
  const startHref =
    process.env.NEXT_PUBLIC_FIRST_PAGE_KIT_START_URL || DEFAULT_START_HREF;

  return <FirstPageKitLanding startHref={startHref} />;
}

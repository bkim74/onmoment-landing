// 개인 기록 상세 안내(예전 메인, 2026-11-16 하나의 메인으로 바뀌며 옮김) — 메인 #my-story 의 '개인 기록 더 자세히'에서 들어온다. 내용 · 이벤트 조건 · 권리 안내는 그대로.
import type { Metadata } from "next";
import Script from "next/script";
import { homeHtml } from "@/lib/landing/homeHtml";
import "../v4.css";
import "../launch.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "나에게 남기는 기록 — 온순간",
  description: "벅차게 좋았던 날도, 마음이 쓰인 날도. 온순간에서 한 줄씩 담고 나의 이야기를 다시 펼쳐보세요. 가입 없이 첫 한 쪽을 미리 만들어볼 수 있습니다.",
  openGraph: {
    title: "나에게 남기는 기록 — 온순간",
    description: "한 줄 기록으로 시작하는 나만의 이야기책. 좋은 날도, 애쓴 날도 당신의 이야기입니다.",
    // 페이지가 openGraph 를 정하면 공통 이미지가 덮인다 — 카카오톡 미리보기용으로 다시 넣는다
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

export default function RecordGuide() {
  return (
    <>
      {/* 여정은 하나(11-16) — 이 페이지는 예전 안내를 보존한 것. 여정 이름은 메인의 일곱 여정이 정본 */}
      <p data-journey-now style={{ margin: 0, padding: "14px max(16px, env(safe-area-inset-left, 0px))", background: "#f1f4ec", color: "#2f2a24", fontSize: 16, lineHeight: 1.6, textAlign: "center" }}>
        여정은 이제 <strong>일곱 이야기 여정</strong> 하나로 이어져요. 나에게 남길 때도, 건넬 때도 같은 여정이에요. <a href="/#journeys" style={{ color: "#6f2f2a", textDecoration: "underline", textUnderlineOffset: 3 }}>일곱 여정 보기 →</a>
      </p>
      <div className="home" dangerouslySetInnerHTML={{ __html: homeHtml(APP) }} />
      <Script src="/landing/v4.js" strategy="afterInteractive" />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
      <Script src="/landing/launch.js" strategy="afterInteractive" />
    </>
  );
}

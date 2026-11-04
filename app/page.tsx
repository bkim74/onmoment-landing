import type { Metadata } from "next";
import Script from "next/script";
import { homeHtml } from "@/lib/landing/homeHtml";
import "./v4.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "온순간 — 오늘을 담아, 나에게 선물하세요.",
  description: "벅차게 좋았던 날도, 마음이 쓰인 날도. 온순간에서 한 줄씩 담고 나의 이야기를 다시 펼쳐보세요. 가입 없이 첫 한 쪽을 미리 만들어볼 수 있습니다.",
  openGraph: {
    title: "온순간 — 오늘을 담아, 나에게 선물하세요.",
    description: "한 줄 기록으로 시작하는 나만의 이야기책. 좋은 날도, 애쓴 날도 당신의 이야기입니다.",
    // 페이지가 openGraph 를 정하면 공통 이미지가 덮인다 — 카카오톡 미리보기용으로 다시 넣는다
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

export default function Home() {
  return (
    <>
      <div className="home" dangerouslySetInnerHTML={{ __html: homeHtml(APP) }} />
      <Script src="/landing/v4.js" strategy="afterInteractive" />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </>
  );
}

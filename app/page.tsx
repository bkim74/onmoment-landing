import type { Metadata } from "next";
import Script from "next/script";
import { homeHtml } from "@/lib/landing/homeHtml";
import "./v4.css";
import "./launch.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "온순간 — 오늘을 담아, 나에게 선물하세요.",
  description: "하루를 한 장으로 간직하고, 소중한 날엔 함께 쓴 이야기로 건네요.",
  openGraph: {
    title: "온순간 — 오늘을 담아, 나에게 선물하세요.",
    description: "하루를 한 장으로 간직하고, 소중한 날엔 함께 쓴 이야기로 건네요.",
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
      <Script src="/landing/launch.js" strategy="afterInteractive" />
    </>
  );
}

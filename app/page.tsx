import type { Metadata } from "next";
import Script from "next/script";
import { homeHtml } from "@/lib/landing/homeHtml";
import "./landing.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "온순간 — 오늘을 담아, 나에게 선물하세요.",
  description: "벅차게 좋았던 날도, 마음이 쓰인 날도. 온순간에서 한 줄씩 담고 나의 이야기를 다시 펼쳐보세요. 가입 없이 첫 한 쪽을 미리 만들어볼 수 있습니다.",
  openGraph: {
    title: "온순간 — 오늘을 담아, 나에게 선물하세요.",
    description: "한 줄 기록으로 시작하는 나만의 이야기책. 좋은 날도, 애쓴 날도 당신의 이야기입니다.",
  },
};

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: homeHtml(APP) }} />
      <Script src="/landing/app.js" strategy="afterInteractive" />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { valueHtml } from "@/lib/landing/valueHtml";
import "../v4.css";
import "../launch.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "선물 뒤, 나를 위해 이어 쓰기 — 온순간 개인 요금 안내",
  description: "이야기 선물을 건넨 뒤에도 내 이야기를 이어 가고 싶은 분께 드리는 개인 요금 안내. 지금은 결제 없이 무료로 써요.",
  openGraph: {
    title: "선물 뒤, 나를 위해 이어 쓰기 — 온순간",
    description: "오늘이 선물이 되는 시간을, 함께 이어 가요. 지금은 결제 없이 무료로 써요.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

export default function ValuePage() {
  return (
    <>
      <div className="value-page-root" dangerouslySetInnerHTML={{ __html: valueHtml(APP) }} />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { valueHtml } from "@/lib/landing/valueHtml";
import "../v4.css";
import "../launch.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "온순간 가치 동참 — 온순간",
  description: "기록하고 다시 읽는 일은 누구에게나 늘 무료예요. AI와 더 자주, 더 깊이 만나고 싶을 때 함께 이어 가는 온순간의 가치 동참 안내.",
  openGraph: {
    title: "온순간 가치 동참 — 온순간",
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

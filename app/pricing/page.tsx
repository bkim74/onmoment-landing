import type { Metadata } from "next";
import Script from "next/script";
import { pricingHtml } from "@/lib/landing/pricingHtml";
import "../v4.css";
import "../launch.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";

export const metadata: Metadata = {
  title: "이용 요금 — 온순간",
  description: "기록하고 다시 읽는 일은 늘 무료예요. 더 자주, 더 깊이 만나고 싶을 때 고르는 온순간의 출시 예정 요금과 1년 이용권 안내.",
  openGraph: {
    title: "이용 요금 — 온순간",
    description: "기록하고 다시 읽는 일은 늘 무료예요. 지금은 결제 없이 무료로 써요.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
  },
};

export default function PricingPage() {
  return (
    <>
      <div className="pricing-page" dangerouslySetInnerHTML={{ __html: pricingHtml(APP) }} />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </>
  );
}

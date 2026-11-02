import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Script from "next/script";
import { JOURNEYS, journeyHtml } from "@/lib/landing/journeyHtml";
import "../../landing.css";

const APP = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.onmoment.kr";
const find = (key: string) => JOURNEYS.find((j) => j.key === key);

export function generateStaticParams() {
  return JOURNEYS.map((j) => ({ key: j.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  const j = find((await params).key);
  if (!j) return {};
  return {
    title: `${j.label} — 온순간의 여정`,
    description: j.description.replace(/\n/g, " "),
    openGraph: { title: `${j.label} — 온순간`, description: j.card.replace(/\n/g, " ") },
  };
}

export default async function JourneyPage({ params }: { params: Promise<{ key: string }> }) {
  const j = find((await params).key);
  if (!j) notFound();
  // 값은 지어낸 예시뿐이지만 JSON 안에서 태그가 닫히지 않게 < 를 막는다.
  const data = JSON.stringify(j).replace(/</g, "\\u003c");
  const style = { "--journey-accent": j.color, "--journey-tint": j.tint } as CSSProperties;
  return (
    <div className="journey-page" data-journey={j.key} style={style}>
      <script id="journey-data" type="application/json" dangerouslySetInnerHTML={{ __html: data }} />
      <div dangerouslySetInnerHTML={{ __html: journeyHtml(j, APP) }} />
      <Script src="/landing/journey.js" strategy="afterInteractive" />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </div>
  );
}

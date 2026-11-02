import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { JOURNEYS, journeyHtml } from "@/lib/landing/journeyHtml";
import "../../v4.css";

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
    openGraph: { title: `${j.label} — 온순간`, description: (j.card ?? j.description).replace(/\n/g, " ") },
  };
}

export default async function JourneyPage({ params }: { params: Promise<{ key: string }> }) {
  const j = find((await params).key);
  if (!j) notFound();
  return (
    <div className={`journey-page journey-${j.key}`}>
      <div dangerouslySetInnerHTML={{ __html: journeyHtml(j, APP) }} />
      <Script src="/landing/v4.js" strategy="afterInteractive" />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </div>
  );
}

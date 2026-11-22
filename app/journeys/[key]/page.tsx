import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { JOURNEYS, journeyHtml } from "@/lib/landing/journeyHtml";
import { MAIN_JOURNEYS, OLD_TO_JOURNEY } from "@/lib/landing/oneMain";
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
    title: `${OLD_TO_JOURNEY[j.key] ? (MAIN_JOURNEYS.find((x) => x.key === OLD_TO_JOURNEY[j.key].key)?.name ?? j.label) : j.label} · ${j.label} — 온순간`,
    description: j.description.replace(/\n/g, " "),
    openGraph: { title: `${j.label} — 온순간`, description: (j.card ?? j.description).replace(/\n/g, " "), images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }] },
  };
}

export default async function JourneyPage({ params }: { params: Promise<{ key: string }> }) {
  const j = find((await params).key);
  if (!j) notFound();
  return (
    <div className={`journey-page journey-${j.key}`}>
      {/* 여정은 하나(11-16) — 예전 주제 주소는 그대로 열고, 지금의 여정으로 잇는다 */}
      {(() => { const m = OLD_TO_JOURNEY[j.key]; const nj = m && MAIN_JOURNEYS.find((x) => x.key === m.key); return nj ? (
        <p data-journey-now style={{ margin: 0, padding: "14px max(16px, env(safe-area-inset-left, 0px))", background: "#f1f4ec", color: "#2f2a24", fontSize: 16, lineHeight: 1.6, textAlign: "center" }}>
          이 이야기는 이제 <strong>‘{nj.name}{m.note ? ` · ${m.note}` : ""}’</strong> 여정 안에 있어요. <a href={`/gift/${nj.key}/`} style={{ color: "#6f2f2a", textDecoration: "underline", textUnderlineOffset: 3 }}>{nj.name} 살펴보기 →</a>
        </p>) : null; })()}
      {j.key === "teen" && (
        <nav className="wrap" aria-label="사춘기 이야기 초상">
          <a className="text-link" href="/gift/teen/">사춘기의 하루를 그림 카드로 만나기 →</a>
        </nav>
      )}
      <div dangerouslySetInnerHTML={{ __html: journeyHtml(j, APP) }} />
      <Script src="/landing/v4.js" strategy="afterInteractive" />
      <Script src="/landing/app-origin.js" strategy="afterInteractive" />
    </div>
  );
}

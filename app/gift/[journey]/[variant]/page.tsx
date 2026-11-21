import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AB_KEYS, JOURNEY_AB, VARIANTS, type Variant } from "@/lib/landing/journeyAB";
import JourneyAB from "../../JourneyAB";

// 여정 A/B 랜딩(11-22) — /gift/parents/a/ · /gift/parents/b/ · beginnings · couple · self
//   A = 완성된 순간 먼저 · B = 내 장면 먼저. 그림체 · 상품은 같고 순서만 다르다. 검색에는 내보내지 않는다(시험 페이지).
type P = { params: Promise<{ journey: string; variant: string }> };

export function generateStaticParams() {
  return AB_KEYS.flatMap((journey) => VARIANTS.map((variant) => ({ journey, variant })));
}
export const dynamicParams = false;

const pick = (j: string, v: string) =>
  (AB_KEYS as string[]).includes(j) && (VARIANTS as readonly string[]).includes(v) ? { j: JOURNEY_AB[j as keyof typeof JOURNEY_AB], v: v as Variant } : null;

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { journey, variant } = await params;
  const p = pick(journey, variant);
  if (!p) return {};
  const title = `${p.j.label} — 온순간`;
  return {
    title,
    description: p.j.a.lead,
    robots: { index: false, follow: false },
    openGraph: { title, description: p.j.a.lead, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }] },
  };
}

export default async function Page({ params }: P) {
  const { journey, variant } = await params;
  const p = pick(journey, variant);
  if (!p) notFound();
  return <JourneyAB journey={p.j} variant={p.v} />;
}

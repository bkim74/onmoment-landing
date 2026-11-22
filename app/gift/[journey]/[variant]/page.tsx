import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JourneyV6 from "../../JourneyV6";

// 여정 A/B 랜딩(11-22) — /gift/parents/a/ · /gift/parents/b/ 외 일곱 여정
//   A = 완성된 순간 먼저 · B = 내 장면 먼저. 화면은 public/gift-v6 의 렌더러가 그린다. 검색에는 내보내지 않는다(시험 페이지).
type P = { params: Promise<{ journey: string; variant: string }> };

const KEYS = ["parents", "beginnings", "couple", "self", "retire", "together", "remember", "teen"] as const;
const VARIANTS = ["a", "b"] as const;
const LABEL: Record<(typeof KEYS)[number], string> = {
  parents: "부모님 이야기",
  beginnings: "우리 아이 이야기",
  couple: "두 사람 이야기",
  self: "나의 이야기",
  retire: "함께한 시간 이야기",
  together: "우리 모임 이야기",
  remember: "함께 기억하는 이야기",
  teen: "사춘기 아이와 함께",
};
const LEAD = "사진과 내 말이 만나는 한 장. 한 장면부터 시작해요.";

export function generateStaticParams() {
  return KEYS.flatMap((journey) => VARIANTS.map((variant) => ({ journey, variant })));
}
export const dynamicParams = false;

const ok = (j: string, v: string) => (KEYS as readonly string[]).includes(j) && (VARIANTS as readonly string[]).includes(v);

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { journey, variant } = await params;
  if (!ok(journey, variant)) return {};
  const title = `${LABEL[journey as (typeof KEYS)[number]]} — 나의 이야기 초상 | 온순간`;
  return {
    title,
    description: LEAD,
    robots: { index: false, follow: false },
    openGraph: { title, description: LEAD, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }] },
  };
}

export default async function Page({ params }: P) {
  const { journey, variant } = await params;
  if (!ok(journey, variant)) notFound();
  return <JourneyV6 journey={journey} variant={variant} />;
}

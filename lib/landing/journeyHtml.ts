// 일곱 여정 마크업 — 값은 모두 지어낸 가상 예시. 원천은 lib/landing/v4/*.json, 생성은 scripts/landing/build_v4.py.
import pages from "./v4/pages.json";
import raw from "./v4/journeys.json";

export type Journey = { key: string; label: string; description: string; card?: string };
export const JOURNEYS = raw as unknown as Journey[];

export function journeyHtml(j: Journey, appOrigin: string) {
  return (pages.journeys as Record<string, string>)[j.key].split("__APP__").join(appOrigin);
}

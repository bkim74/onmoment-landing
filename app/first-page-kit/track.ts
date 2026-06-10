/* first-page-kit 전용 로컬 이벤트 헬퍼.
   v1은 실측 배선 없음 — dev: console.log / prod: safe no-op.
   Supabase·product_events 연결은 별도 승인 안건 (CHECK ALTER 필요). */

export type FirstPageEvent =
  | "first_page_viewed"
  | "first_page_envelope_opened"
  | "first_page_primary_cta_clicked"
  | "first_page_quick_start_clicked"
  | "first_page_timeline_seen"
  | "first_page_story_growth_seen"
  | "first_page_gift_section_seen"
  | "first_page_sticky_cta_clicked"
  | "first_page_final_cta_clicked";

const firedOnce = new Set<FirstPageEvent>();

export function track(
  event: FirstPageEvent,
  payload: Record<string, unknown> = {},
  opts: { once?: boolean } = {},
) {
  if (typeof window === "undefined") return;
  if (opts.once) {
    if (firedOnce.has(event)) return;
    firedOnce.add(event);
  }

  const data = {
    variant: "ritual_kit_v1",
    source: "first_page_kit",
    path: window.location.pathname,
    referrer: document.referrer || null,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    timestamp: new Date().toISOString(),
    ...payload,
  };

  if (process.env.NODE_ENV !== "production") {
    console.log("[first-page-kit]", event, data);
  }
}

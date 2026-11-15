// 이야기 선물 랜딩 — 화면 안 움직임. 시안 v5 app.js 의 랜딩 부분만 옮겼다(역할 시안 · 브라우저 저장 원고는 없다).
//   행사 · 대상 · 책 보기를 바꾸면 같은 landing.mjs 로 다시 그리고, '써보기'는 고른 여정 · 행사 · 대상 그대로 앱 준비 화면으로 간다.
import { journeyHTML } from "./landing.mjs";
import { getJourney } from "./journeys.mjs";
import { appOrigin, realize, startHref } from "./realize.mjs";

const root = document.querySelector("[data-gift-root]");
if (root) {
  const page = root.dataset.page || "hub";
  const app = appOrigin();
  // 미리 그려 둔 HTML 의 링크도 시범 화면이면 시범 앱으로
  if (app !== "https://app.onmoment.kr") root.innerHTML = root.innerHTML.split("https://app.onmoment.kr").join(app);

  const q = new URLSearchParams(location.search);
  const choice = {};
  if (page !== "hub") {
    const j = getJourney(page);
    const o = q.get("o");
    if (o && j.moments.some((m) => m.id === o)) choice.moment = o;
    const t = q.get("t");
    if (t === "child" || t === "parents") choice.target = t;
    if (choice.moment || choice.target) draw();
  }

  function draw() {
    root.innerHTML = realize(journeyHTML(page, choice), { app, page });
  }

  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-action]");
    if (!b || !root.contains(b)) return;
    const a = b.dataset.action;
    if (a === "moment" || a === "target") {
      if (a === "moment") choice.moment = b.dataset.moment; else choice.target = b.dataset.target;
      const y = window.scrollY; draw(); window.scrollTo(0, y);
      try { const u = new URL(location.href); if (choice.moment) u.searchParams.set("o", choice.moment); if (choice.target) u.searchParams.set("t", choice.target); history.replaceState(null, "", u); } catch { /* 주소 그대로 */ }
    } else if (a === "book-view") {
      choice.bookView = b.dataset.view;
      const ex = () => document.getElementById("journey-example")?.getBoundingClientRect().top || 0;
      const top = ex(); draw(); window.scrollBy(0, ex() - top);
      root.querySelector(`[data-action="book-view"][data-view="${b.dataset.view}"]`)?.focus({ preventScroll: true });
    } else if (a === "scroll") {
      document.getElementById(b.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (a === "start-journey") {
      location.href = startHref(app, b.dataset.journey, b.dataset.moment, b.dataset.target);
    }
  });
}

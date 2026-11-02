// 메인 마크업 — 시안 v4 를 scripts/landing/build_v4.py 로 생성한 lib/landing/v4/pages.json. 동작은 public/landing/v4.js.
import pages from "./v4/pages.json";

export const homeHtml = (appOrigin: string) => pages.home.split("__APP__").join(appOrigin);

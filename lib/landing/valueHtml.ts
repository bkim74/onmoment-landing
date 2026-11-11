// 온순간 가치 동참 한 쪽 — scripts/landing/build_v4.py 가 만든 pages.json 의 value. 홈에는 바닥글 링크만 둔다.
import pages from "./v4/pages.json";

export const valueHtml = (appOrigin: string) => pages.value.split("__APP__").join(appOrigin);

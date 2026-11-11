// 이용 요금 한 쪽 — scripts/landing/build_v4.py 가 만든 pages.json 의 pricing. 홈에는 한 줄 띠만 둔다.
import pages from "./v4/pages.json";

export const pricingHtml = (appOrigin: string) => pages.pricing.split("__APP__").join(appOrigin);

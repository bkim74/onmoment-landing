import type { MetadataRoute } from "next";

// output: "export" 호환 — 정적 robots.txt 생성
export const dynamic = "force-static";

const SITE_URL = "https://onmoment.kr";

// 검색엔진(Googlebot·Bingbot 등)은 허용해 발견성을 지키고,
// AI 학습 크롤러·대량 스크래퍼만 차단한다. (정적 export → /robots.txt 생성)
const AI_AND_SCRAPER_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "CCBot",
  "PerplexityBot",
  "Perplexity-User",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  "Omgili",
  "Timpibot",
  "DataForSeoBot",
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "PetalBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AND_SCRAPER_BOTS, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

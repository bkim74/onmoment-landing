import type { MetadataRoute } from "next";
import { ARTICLES } from "./journal/articles";

// output: "export" 호환 — 정적 sitemap.xml 생성
export const dynamic = "force-static";

const SITE_URL = "https://onmoment.kr";

// trailingSlash: true 설정과 일치하도록 모든 URL에 끝 슬래시.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = ["", "/journal", "/principles", "/privacy", "/terms"];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}/journal/${a.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}

import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import "./teen.css";

const title = "사춘기 아이와 함께 — 온순간";
const description = "아이도 자라는 중. 나도 자라는 중. 함께한 하루를 이야기 초상으로 만나고, 나에게 남길 말과 아이에게 건넬 말을 고릅니다.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/gift/teen/" },
  openGraph: { title, description, url: "/gift/teen/", images: [{ url: "/teen-portrait/ice.webp", width: 724, height: 724, alt: "서로 다른 맛 아이스크림을 든 부모와 아이" }] },
};

function startLink(journey: "self" | "beginnings", occasion: "everyday" | "adolescence") {
  const app = new URL("/start", process.env.NEXT_PUBLIC_APP_ORIGIN || "https://app.onmoment.kr");
  const next = new URLSearchParams({ j: journey, o: occasion });
  app.searchParams.set("src", "journey-" + journey);
  app.searchParams.set("next", "/first?" + next.toString());
  return app.href.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

export default async function TeenPage() {
  // Fixed build-time editorial asset. Visitor writing never enters this template.
  const source = await readFile(join(process.cwd(), "lib/landing/teenPortrait.html"), "utf8");
  const markup = source.replaceAll("__TP_PRIVATE__", startLink("self", "everyday"))
    .replaceAll("__TP_GIFT__", startLink("beginnings", "adolescence"));
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}

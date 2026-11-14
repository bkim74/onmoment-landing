import type { Metadata } from "next";
import { notFound } from "next/navigation";
import data from "@/lib/landing/giftV5.json";
import GiftV5 from "../GiftV5";

// 이야기 선물 — 일곱 여정 각각의 랜딩(시안 v5): /gift/parents/ · retire · beginnings · couple · together · self · remember
type Meta = { title: string; description: string };
const META = data.meta as Record<string, Meta>;

export function generateStaticParams() {
  return Object.keys(data.journeys).map((journey) => ({ journey }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ journey: string }> }): Promise<Metadata> {
  const { journey } = await params;
  const m = META[journey];
  if (!m) return {};
  return {
    title: m.title,
    description: m.description,
    robots: { index: false, follow: false },
    openGraph: { title: m.title, description: m.description, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }] },
  };
}

export default async function GiftJourneyPage({ params }: { params: Promise<{ journey: string }> }) {
  const { journey } = await params;
  if (!META[journey]) notFound();
  return <GiftV5 page={journey} />;
}

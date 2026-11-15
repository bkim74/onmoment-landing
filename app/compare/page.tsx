import type { Metadata } from "next";
import CompareClient from "./CompareClient";
import "./compare.css";

// 비교 체험 — 링크를 받은 사람만(검색 노출 없음 · 홈에서 링크 없음). 지금의 홈과 이야기 선물 랜딩을 A/B 로 차례로 본다.
export const metadata: Metadata = {
  title: "화면 비교 — 온순간",
  description: "온순간 첫 화면 두 가지를 보고 생각을 들려주세요.",
  robots: { index: false, follow: false },
};

export default function ComparePage() {
  return <CompareClient />;
}

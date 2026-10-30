import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://onmoment.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "온순간 · 살아가는 이야기를, 소중한 당신에게.",
  description:
    "함께한 기억도, 미처 못한 말도. 내 글과 기억으로 만드는 편지와 작은 책. 오늘의 마음을 있는 그대로 담습니다.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "온순간",
    title: "온순간 · 하루 한 줄, 내일 다시 만나는 나",
    description: "가장 연약한 고백이, 가장 강한 연결이 됩니다.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "온순간 · 하루 한 줄, 내일 다시 만나는 나",
    description: "가장 연약한 고백이, 가장 강한 연결이 됩니다.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  // 기계가독 저작권·라이선스 신호 (복제본 대비 출처 명시)
  other: {
    copyright: "© 온순간 (OnMoment). All rights reserved.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Noto+Serif+KR:wght@300;400;500;600&family=Noto+Sans+KR:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#F5EDE0" />
        {/* 라이선스(이용약관) 연결 — 기계가독 권리 신호 */}
        <link rel="license" href={`${SITE_URL}/terms/`} />
        {/* 원저자·발행 주체 귀속 — 복제본 대비 출처(provenance) 신호 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "온순간",
              alternateName: "OnMoment",
              url: SITE_URL,
              logo: `${SITE_URL}/icon-192.png`,
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

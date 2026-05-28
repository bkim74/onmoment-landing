import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://onmoment.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "온순간 · 오늘이 선물이 되도록, 한 줄.",
  description:
    "하루 한 줄. 내일 다시 만나는 나. 점수도 진단도 연속 기록도 없습니다. 오늘의 마음을 있는 그대로 남깁니다.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "온순간",
    title: "온순간 · 오늘이 선물이 되도록, 한 줄.",
    description: "하루 한 줄. 내일 다시 만나는 나.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "온순간" }],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "온순간 · 오늘이 선물이 되도록, 한 줄.",
    description: "하루 한 줄. 내일 다시 만나는 나.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
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
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#F5EDE0" />
      </head>
      <body>{children}</body>
    </html>
  );
}

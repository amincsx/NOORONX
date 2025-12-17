import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOORONX - انرژی خورشیدی نوین | پنل‌های خورشیدی و راه‌حل‌های انرژی پاک",
  description: "شرکت NOORONX ارائه‌دهنده خدمات نصب و راه‌اندازی پنل‌های خورشیدی، مشاوره انرژی پاک و راه‌حل‌های پایدار برای کاهش هزینه‌های برق",
  keywords: [
    "انرژی خورشیدی",
    "پنل خورشیدی", 
    "نصب پنل خورشیدی",
    "انرژی پاک",
    "برق خورشیدی",
    "مزرعه خورشیدی",
    "صرفه‌جویی انرژی",
    "محیط زیست",
    "توسعه پایدار",
    "انرژی تجدیدپذیر"
  ],
  authors: [{ name: "NOORONX Team" }],
  creator: "NOORONX",
  publisher: "NOORONX",
  metadataBase: new URL('https://nooronx.liara.run'),
  alternates: {
    canonical: 'https://nooronx.liara.run',
    languages: {
      'fa-IR': 'https://nooronx.liara.run',
      'en-US': 'https://nooronx.liara.run/en',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://nooronx.liara.run',
    siteName: 'NOORONX',
    title: 'NOORONX - انرژی خورشیدی نوین',
    description: 'شرکت NOORONX ارائه‌دهنده خدمات نصب و راه‌اندازی پنل‌های خورشیدی، مشاوره انرژی پاک و راه‌حل‌های پایدار',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NOORONX - انرژی خورشیدی نوین',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nooronx',
    creator: '@nooronx',
    title: 'NOORONX - انرژی خورشیدی نوین',
    description: 'شرکت NOORONX ارائه‌دهنده خدمات نصب و راه‌اندازی پنل‌های خورشیدی، مشاوره انرژی پاک و راه‌حل‌های پایدار',
    images: ['/images/twitter-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code-here',
    // You can add Google Search Console verification code here
  },
  creator: "NOORONX",
  publisher: "NOORONX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nooronx.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "NOORONX - انرژی خورشیدی نوین",
    description: "راه‌حل‌های نوآورانه انرژی خورشیدی برای آینده‌ای پایدار و مقرون به صرفه",
    url: 'https://nooronx.com',
    siteName: 'NOORONX',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NOORONX - انرژی خورشیدی نوین',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOORONX - انرژی خورشیدی نوین',
    description: 'راه‌حل‌های نوآورانه انرژی خورشیدی برای آینده‌ای پایدار',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbbf24' },
    { media: '(prefers-color-scheme: dark)', color: '#f59e0b' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fbbf24" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NOORONX" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#fbbf24" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}

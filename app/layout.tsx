import type { Metadata } from "next";
import { Cairo, DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { getGoogleSiteVerification, getSiteUrl, SITE_NAME } from "@/lib/site";
import Script from "next/script";

const siteDescription = "Free browser-based tools for images, QR codes, text checks, passwords, and PDF tasks.";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { template: `%s | ${SITE_NAME}`, default: `${SITE_NAME} – Free Online Tools` },
  description: siteDescription,
  applicationName: SITE_NAME,
  verification: {
    google: getGoogleSiteVerification(),
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Free Online Tools`,
    description: siteDescription,
    url: getSiteUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Free Online Tools`,
    description: siteDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${syne.variable} ${dmSans.variable} ${cairo.variable}`}>
      <head>
        <script
          id="toolzee-adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3773949584185719"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TW545XMYG3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TW545XMYG3');
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}

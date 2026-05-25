import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://www.trackfindernyc.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TrackFinderNYC – Find Public Running Tracks in NYC",
    template: "%s | TrackFinderNYC",
  },
  description:
    "Find every public running track in New York City. Browse 50+ tracks across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. Filter by surface, lighting, lanes, and public access hours.",
  keywords: [
    "running track NYC",
    "public running track New York",
    "NYC track and field",
    "outdoor running track Manhattan",
    "running track Brooklyn",
    "running track Queens",
    "running track Bronx",
    "400m track NYC",
    "free running track New York City",
  ],
  authors: [{ name: "TrackFinderNYC" }],
  creator: "TrackFinderNYC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "TrackFinderNYC",
    title: "TrackFinderNYC – Find Public Running Tracks in NYC",
    description:
      "Find every public running track in New York City. 50+ tracks across all five boroughs with surface, lighting, lanes, and public access hours.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TrackFinderNYC – NYC Running Track Map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrackFinderNYC – Find Public Running Tracks in NYC",
    description:
      "Find every public running track in New York City across all five boroughs.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-200`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

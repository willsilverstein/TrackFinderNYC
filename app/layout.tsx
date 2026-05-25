import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { getCityConfig } from "@/lib/cityConfig";

const inter = Inter({ subsets: ["latin"] });

const city = getCityConfig();

export const metadata: Metadata = {
  metadataBase: new URL(city.siteUrl),
  title: {
    default: city.metaTitle,
    template: `%s | ${city.siteName}`,
  },
  description: city.metaDescription,
  keywords: city.keywords,
  verification: {
    google: "sXY5ZVqiudgJcxIimdsPLUJFUCw9tQfEt3xvbJeY5oY",
  },
  authors: [{ name: city.siteName }],
  creator: city.siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: city.siteUrl,
    siteName: city.siteName,
    title: city.metaTitle,
    description: city.ogDescription,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${city.siteName} – Running Track Map`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: city.metaTitle,
    description: city.twitterDescription,
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
    canonical: city.siteUrl,
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

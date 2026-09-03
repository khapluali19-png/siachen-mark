import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat, Inter } from "next/font/google";

import "./globals.css";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import Analytics from "@/components/analytics/Analytics";
import AdminProviders from "@/components/admin/AdminProviders";
import { getSiteSettings } from "@/lib/settings";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import MouseSpotlight from "@/components/ui/MouseSpotlight";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = settings.productionUrl || "https://siachenmark.com";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultMetaDescription,
    keywords: [
      "performance marketing agency Pakistan",
      "digital marketing Islamabad",
      "Meta Ads agency",
      "Google Ads management",
      "SEO agency Pakistan",
      "web design agency Islamabad",
      "social media marketing",
      "Siachen Mark",
    ],
    robots: {
      index: settings.robotsIndex,
      follow: settings.robotsFollow,
      googleBot: {
        index: settings.robotsIndex,
        follow: settings.robotsFollow,
      },
    },
    verification: settings.googleSearchConsoleCode
      ? {
          google: settings.googleSearchConsoleCode,
        }
      : undefined,
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      title: settings.defaultOgTitle || settings.defaultSeoTitle,
      description: settings.defaultOgDescription || settings.defaultMetaDescription,
      url: siteUrl,
      locale: "en_US",
      images: [
        {
          url: settings.defaultOgImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: settings.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultOgTitle || settings.defaultSeoTitle,
      description: settings.defaultOgDescription || settings.defaultMetaDescription,
      images: [settings.defaultOgImage || "/og-image.jpg"],
    },
    alternates: {
      canonical: settings.canonicalBaseUrl || siteUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AdminProviders>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <ScrollReveal />
          <MouseSpotlight />
          {children}
          <StickyMobileCTA whatsappNumber={settings.whatsappNumber || settings.whatsapp} />
        </AdminProviders>
      </body>
    </html>
  );
}


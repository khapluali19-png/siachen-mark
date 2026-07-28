import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import Analytics from "@/components/analytics/Analytics";
import AdminProviders from "@/components/admin/AdminProviders";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://siachenmark.com"
  ),
  title: {
    default: "Siachen Mark — Performance. Growth. Impact.",
    template: "%s — Siachen Mark",
  },
  description:
    "Digital marketing and design agency. We build brands, drive traffic, and turn clicks into customers.",
  openGraph: {
    type: "website",
    siteName: "Siachen Mark",
    title: "Siachen Mark — Performance. Growth. Impact.",
    description:
      "Digital marketing and design agency. We build brands, drive traffic, and turn clicks into customers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siachen Mark — Performance. Growth. Impact.",
    description:
      "Digital marketing and design agency. We build brands, drive traffic, and turn clicks into customers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N79GXB3L');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N79GXB3L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <AdminProviders>
          <OrganizationJsonLd />
          <WebSiteJsonLd />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <ScrollReveal />
          {children}
        </AdminProviders>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import Analytics from "@/components/analytics/Analytics";
import AdminProviders from "@/components/admin/AdminProviders";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
//tst
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://siachenmark.com"),
  title: {
    default: "Siachen Mark — Performance. Growth. Impact.",
    template: "%s — Siachen Mark",
  },
  description: "Digital marketing and design agency. We build brands, drive traffic, and turn clicks into customers.",
  openGraph: {
    type: "website",
    siteName: "Siachen Mark",
    title: "Siachen Mark — Performance. Growth. Impact.",
    description: "Digital marketing and design agency. We build brands, drive traffic, and turn clicks into customers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siachen Mark — Performance. Growth. Impact.",
    description: "Digital marketing and design agency. We build brands, drive traffic, and turn clicks into customers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
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

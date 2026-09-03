import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";

export async function getPageMetadata(
  pageKey: string,
  fallbackTitle: string,
  fallbackDesc: string
): Promise<Metadata> {
  const [meta, settings] = await Promise.all([
    db.seoMeta.findUnique({ where: { page: pageKey } }).catch(() => null),
    getSiteSettings(),
  ]);

  const title = meta?.title || fallbackTitle;
  const description = meta?.description || fallbackDesc || settings.defaultMetaDescription;
  const ogTitle = meta?.ogTitle || title;
  const ogDesc = meta?.ogDesc || description;
  const ogImage = meta?.ogImage || settings.defaultOgImage || "/og-image.jpg";
  const canonical = meta?.canonical || `${settings.productionUrl}/${pageKey === "home" ? "" : pageKey}`;

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      images: [{ url: ogImage }],
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [ogImage],
    },
    alternates: {
      canonical,
    },
  };
}

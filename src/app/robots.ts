import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const BASE = (settings.productionUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://siachenmark.com").replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/admin",
          "/admin/",
          "/api/",
          "/login",
          "/register",
          "/reset-password",
          "/forgot-password",
          "/auth/",
          "/user/",
        ],
      },
    ],
    host: BASE,
    sitemap: `${BASE}/sitemap.xml`,
  };
}

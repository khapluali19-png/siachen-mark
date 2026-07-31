import { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://siachen-mark.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/api",
          "/login",
          "/reset-password",
        ],
      },
    ],
    host: BASE,
    sitemap: `${BASE}/sitemap.xml`,
  };
}
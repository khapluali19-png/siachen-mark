import { db } from "@/lib/db";
import {
  GoogleAnalytics,
  GoogleTagManager,
  MetaPixel,
  TikTokPixel,
  LinkedInInsight,
  HotjarScript,
  ClarityScript,
} from "./Trackers";

const KEYS = [
  "ga4Id",
  "gtmId",
  "metaPixelId",
  "tiktokPixelId",
  "linkedinPartnerId",
  "hotjarId",
  "clarityId",
] as const;

type Key = (typeof KEYS)[number];

const ENV_FALLBACK: Record<Key, string | undefined> = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
  linkedinPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
  hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
};

export default async function Analytics() {
  const rows = await db.siteSetting
    .findMany({ where: { key: { in: KEYS as unknown as string[] } } })
    .catch(() => []);
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  const id = (k: Key) => (map[k] || ENV_FALLBACK[k] || "").trim();

  return (
    <>
      <GoogleTagManager id={id("gtmId")} />
      <GoogleAnalytics id={id("ga4Id")} />
      <MetaPixel id={id("metaPixelId")} />
      <TikTokPixel id={id("tiktokPixelId")} />
      <LinkedInInsight id={id("linkedinPartnerId")} />
      <HotjarScript id={id("hotjarId")} />
      <ClarityScript id={id("clarityId")} />
    </>
  );
}

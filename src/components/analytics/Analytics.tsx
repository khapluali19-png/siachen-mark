import { db } from "@/lib/db";
import {
  GoogleAnalytics,
  GoogleTagManager,
  GoogleAds,
  MetaPixel,
  TikTokPixel,
  LinkedInInsight,
  HotjarScript,
  ClarityScript,
} from "./Trackers";

const KEYS = [
  "ga4Id",
  "ga4Enabled",
  "gtmId",
  "gtmEnabled",
  "googleAdsConversionId",
  "googleAdsConversionLabel",
  "googleAdsEnabled",
  "metaPixelId",
  "metaPixelEnabled",
  "tiktokPixelId",
  "tiktokPixelEnabled",
  "linkedinPartnerId",
  "linkedinPartnerEnabled",
  "hotjarId",
  "hotjarEnabled",
  "clarityId",
  "clarityEnabled",
] as const;

type Key = (typeof KEYS)[number];

const ENV_FALLBACK: Record<string, string | undefined> = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-N79GXB3L",
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

  const getVal = (k: Key) => (map[k] !== undefined ? map[k] : ENV_FALLBACK[k] || "").trim();
  const isEnabled = (enabledKey: Key, idKey: Key) => {
    const explicitlyConfigured = map[enabledKey];
    if (explicitlyConfigured !== undefined) {
      return explicitlyConfigured === "true";
    }
    // If not explicitly disabled/enabled in DB, enable if ID exists
    return Boolean(getVal(idKey));
  };

  return (
    <>
      <GoogleTagManager
        id={getVal("gtmId")}
        enabled={isEnabled("gtmEnabled", "gtmId")}
      />
      <GoogleAnalytics
        id={getVal("ga4Id")}
        enabled={isEnabled("ga4Enabled", "ga4Id")}
      />
      <GoogleAds
        conversionId={getVal("googleAdsConversionId")}
        conversionLabel={getVal("googleAdsConversionLabel")}
        enabled={isEnabled("googleAdsEnabled", "googleAdsConversionId")}
      />
      <MetaPixel
        id={getVal("metaPixelId")}
        enabled={isEnabled("metaPixelEnabled", "metaPixelId")}
      />
      <TikTokPixel
        id={getVal("tiktokPixelId")}
        enabled={isEnabled("tiktokPixelEnabled", "tiktokPixelId")}
      />
      <LinkedInInsight
        id={getVal("linkedinPartnerId")}
        enabled={isEnabled("linkedinPartnerEnabled", "linkedinPartnerId")}
      />
      <HotjarScript
        id={getVal("hotjarId")}
        enabled={isEnabled("hotjarEnabled", "hotjarId")}
      />
      <ClarityScript
        id={getVal("clarityId")}
        enabled={isEnabled("clarityEnabled", "clarityId")}
      />
    </>
  );
}

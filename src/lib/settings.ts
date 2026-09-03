import { db } from "@/lib/db";

export interface SiteSettings {
  // Brand & Identity
  siteName: string;
  brandTagline: string;
  siteDescription: string;
  productionUrl: string;
  logo: string;
  mobileLogo: string;
  favicon: string;
  defaultOgImage: string;
  primaryColor: string;
  brightNavyColor: string;
  backgroundColor: string;

  // Contact & WhatsApp
  contactEmail: string;
  secondaryEmail: string;
  phone: string;
  phoneDisplay: string;
  phoneSecondary: string;
  whatsapp: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappDefaultMessage: string;
  address: string;
  googleMapsUrl: string;

  // Header & Navigation
  headerLogo: string;
  headerCtaText: string;
  headerCtaHref: string;
  headerCtaEnabled: boolean;
  headerWhatsAppEnabled: boolean;
  headerSticky: boolean;

  // Footer
  footerLogo: string;
  footerDescription: string;
  footerCopyright: string;
  footerCtaText: string;
  footerCtaHref: string;
  footerCtaEnabled: boolean;

  // Social Media
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  tiktokUrl: string;
  twitterUrl: string;

  // Global SEO & Verification
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  defaultOgTitle: string;
  defaultOgDescription: string;
  canonicalBaseUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  googleSearchConsoleCode: string;
  bingVerificationCode: string;

  // Analytics & Tracking IDs
  ga4Id: string;
  ga4Enabled: boolean;
  gtmId: string;
  gtmEnabled: boolean;
  metaPixelId: string;
  metaPixelEnabled: boolean;
  tiktokPixelId: string;
  tiktokPixelEnabled: boolean;
  linkedinPartnerId: string;
  linkedinPartnerEnabled: boolean;
  googleAdsConversionId: string;
  googleAdsConversionLabel: string;
  googleAdsEnabled: boolean;
  clarityId: string;
  clarityEnabled: boolean;
  hotjarId: string;
  hotjarEnabled: boolean;

  // Reusable CTAs
  strategyCallText: string;
  strategyCallHref: string;
  auditCtaText: string;
  auditCtaHref: string;
  globalCtaTitle: string;
  globalCtaSubtitle: string;

  // About Page CMS Content
  aboutHeroBadge: string;
  aboutHeroTitle: string;
  aboutHeroDescription: string;
  aboutHeroPrimaryCta: string;
  aboutHeroPrimaryHref: string;
  aboutHeroSecondaryCta: string;
  aboutHeroSecondaryHref: string;
  whySectionTitle: string;
  whySectionSubtitle: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;

  // Contact Page CMS Content
  contactPageBadge: string;
  contactPageTitle: string;
  contactPageSubtitle: string;
  contactFormTitle: string;
  contactFormSubtitle: string;
  contactSuccessMessage: string;
  contactPrivacyText: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  // Brand & Identity
  siteName: "Siachen Mark",
  brandTagline: "Performance Marketing & Digital Growth Agency",
  siteDescription:
    "Siachen Mark is a performance marketing and digital growth agency based in Islamabad, Pakistan. We help businesses acquire customers, scale revenue, and build high-converting systems through Meta Ads, Google Ads, SEO, and web development.",
  productionUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://siachenmark.com",
  logo: "/logo.png",
  mobileLogo: "/logo.png",
  favicon: "/favicon.ico",
  defaultOgImage: "/og-image.jpg",
  primaryColor: "#0a1e6e",
  brightNavyColor: "#0035ca",
  backgroundColor: "#f4f5f9",

  // Contact & WhatsApp
  contactEmail: "basharataliofficial76@gmail.com",
  secondaryEmail: "contact@siachenmark.com",
  phone: "+92 348 8868517",
  phoneDisplay: "+92 348 8868517",
  phoneSecondary: "",
  whatsapp: "+92 348 8868517",
  whatsappNumber: "+923488868517",
  whatsappDisplay: "+92 348 8868517",
  whatsappDefaultMessage: "Hi Siachen Mark team, I'd like to discuss a project.",
  address: "Islamabad, Pakistan",
  googleMapsUrl: "",

  // Header & Navigation
  headerLogo: "/logo.png",
  headerCtaText: "Book a Strategy Call",
  headerCtaHref: "/contact",
  headerCtaEnabled: true,
  headerWhatsAppEnabled: true,
  headerSticky: true,

  // Footer
  footerLogo: "/logo.png",
  footerDescription:
    "Performance marketing and digital growth agency helping businesses acquire customers, scale revenue, and build measurable acquisition systems.",
  footerCopyright: "All rights reserved.",
  footerCtaText: "Book a Strategy Call",
  footerCtaHref: "/contact",
  footerCtaEnabled: true,

  // Social Media
  facebookUrl: "https://www.facebook.com/siachen.mark",
  instagramUrl: "https://www.instagram.com/siachen.mark/",
  youtubeUrl: "https://www.youtube.com/@Siachen-Mark",
  linkedinUrl: "https://www.linkedin.com/company/109209003",
  tiktokUrl: "",
  twitterUrl: "",

  // Global SEO & Verification
  defaultSeoTitle: "Siachen Mark — Performance Marketing & Digital Growth Agency",
  defaultMetaDescription:
    "We help businesses acquire customers through Meta Ads, Google Ads, SEO, web design, and full-funnel tracking. Based in Pakistan, serving clients globally.",
  defaultOgTitle: "Siachen Mark — Performance Marketing & Digital Growth Agency",
  defaultOgDescription:
    "Turn your marketing budget into measurable growth with data-backed performance campaigns and full-funnel measurement.",
  canonicalBaseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://siachenmark.com",
  robotsIndex: true,
  robotsFollow: true,
  googleSearchConsoleCode: "googleab2ecd93670518cd",
  bingVerificationCode: "",

  // Analytics & Tracking IDs
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
  ga4Enabled: true,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-N79GXB3L",
  gtmEnabled: true,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  metaPixelEnabled: true,
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "",
  tiktokPixelEnabled: false,
  linkedinPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "",
  linkedinPartnerEnabled: false,
  googleAdsConversionId: "",
  googleAdsConversionLabel: "",
  googleAdsEnabled: false,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "",
  clarityEnabled: false,
  hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID || "",
  hotjarEnabled: false,

  // Reusable CTAs
  strategyCallText: "Book a Strategy Call",
  strategyCallHref: "/contact",
  auditCtaText: "Start with a Free Audit",
  auditCtaHref: "/contact",
  globalCtaTitle: "Your Growth Is Our Mission.",
  globalCtaSubtitle:
    "Let's build your brand, reach more customers, and hit your business goals — with a strategy built around your actual numbers, not vanity metrics.",

  // About Page CMS Content
  aboutHeroBadge: "Who We Are",
  aboutHeroTitle: "We Build Growth Systems. Not Just Campaigns.",
  aboutHeroDescription:
    "Siachen Mark is a performance marketing agency based in Islamabad, Pakistan. We partner with businesses across Pakistan, the Middle East, the UK, and beyond to turn paid media, search, and design into compounding revenue engines.",
  aboutHeroPrimaryCta: "Book a Strategy Call",
  aboutHeroPrimaryHref: "/contact",
  aboutHeroSecondaryCta: "Explore Our Services",
  aboutHeroSecondaryHref: "/services",
  whySectionTitle: "Why Businesses Choose Siachen Mark",
  whySectionSubtitle: "Transparent, measurable, and built around your business goals — not vanity metrics.",
  missionTitle: "Our Mission",
  missionText: "To give ambitious businesses access to enterprise-grade performance marketing, transparent tracking, and conversion-focused creative — without bloated agency retainers.",
  visionTitle: "Our Vision",
  visionText: "To be the most trusted digital growth partner for businesses across Pakistan and global markets, recognized for measurable business outcomes and uncompromising integrity.",

  // Contact Page CMS Content
  contactPageBadge: "Get In Touch",
  contactPageTitle: "Let's Talk About Your Growth",
  contactPageSubtitle: "Have a project in mind or want to explore how performance marketing can scale your revenue? Reach out directly.",
  contactFormTitle: "Send Us a Message",
  contactFormSubtitle: "Fill out the form below and we'll follow up with actionable next steps.",
  contactSuccessMessage: "Message received! We'll review your project details and get back to you with next steps.",
  contactPrivacyText: "We respect your privacy. No spam, no high-pressure sales calls.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await db.siteSetting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

    const parseBool = (key: string, fallback: boolean) => {
      if (map[key] !== undefined) return map[key] === "true";
      return fallback;
    };

    return {
      // Brand & Identity
      siteName: map.siteName || DEFAULT_SETTINGS.siteName,
      brandTagline: map.brandTagline || map.siteTagline || DEFAULT_SETTINGS.brandTagline,
      siteDescription: map.siteDescription || map.siteTagline || DEFAULT_SETTINGS.siteDescription,
      productionUrl: map.productionUrl || map.siteUrl || DEFAULT_SETTINGS.productionUrl,
      logo: map.logo || DEFAULT_SETTINGS.logo,
      mobileLogo: map.mobileLogo || map.logo || DEFAULT_SETTINGS.mobileLogo,
      favicon: map.favicon || DEFAULT_SETTINGS.favicon,
      defaultOgImage: map.defaultOgImage || DEFAULT_SETTINGS.defaultOgImage,
      primaryColor: map.primaryColor || DEFAULT_SETTINGS.primaryColor,
      brightNavyColor: map.brightNavyColor || DEFAULT_SETTINGS.brightNavyColor,
      backgroundColor: map.backgroundColor || DEFAULT_SETTINGS.backgroundColor,

      // Contact & WhatsApp
      contactEmail: map.contactEmail || map.email || DEFAULT_SETTINGS.contactEmail,
      secondaryEmail: map.secondaryEmail || DEFAULT_SETTINGS.secondaryEmail,
      phone: map.phone || DEFAULT_SETTINGS.phone,
      phoneDisplay: map.phoneDisplay || map.phone || DEFAULT_SETTINGS.phoneDisplay,
      phoneSecondary: map.phoneSecondary || DEFAULT_SETTINGS.phoneSecondary,
      whatsapp: map.whatsapp || DEFAULT_SETTINGS.whatsapp,
      whatsappNumber: map.whatsappNumber || map.whatsapp || DEFAULT_SETTINGS.whatsappNumber,
      whatsappDisplay: map.whatsappDisplay || map.whatsappNumber || map.whatsapp || DEFAULT_SETTINGS.whatsappDisplay,
      whatsappDefaultMessage: map.whatsappDefaultMessage || DEFAULT_SETTINGS.whatsappDefaultMessage,
      address: map.address || DEFAULT_SETTINGS.address,
      googleMapsUrl: map.googleMapsUrl || DEFAULT_SETTINGS.googleMapsUrl,

      // Header & Navigation
      headerLogo: map.headerLogo || map.logo || DEFAULT_SETTINGS.headerLogo,
      headerCtaText: map.headerCtaText || DEFAULT_SETTINGS.headerCtaText,
      headerCtaHref: map.headerCtaHref || DEFAULT_SETTINGS.headerCtaHref,
      headerCtaEnabled: parseBool("headerCtaEnabled", DEFAULT_SETTINGS.headerCtaEnabled),
      headerWhatsAppEnabled: parseBool("headerWhatsAppEnabled", DEFAULT_SETTINGS.headerWhatsAppEnabled),
      headerSticky: parseBool("headerSticky", DEFAULT_SETTINGS.headerSticky),

      // Footer
      footerLogo: map.footerLogo || map.logo || DEFAULT_SETTINGS.footerLogo,
      footerDescription: map.footerDescription || DEFAULT_SETTINGS.footerDescription,
      footerCopyright: map.footerCopyright || DEFAULT_SETTINGS.footerCopyright,
      footerCtaText: map.footerCtaText || DEFAULT_SETTINGS.footerCtaText,
      footerCtaHref: map.footerCtaHref || DEFAULT_SETTINGS.footerCtaHref,
      footerCtaEnabled: parseBool("footerCtaEnabled", DEFAULT_SETTINGS.footerCtaEnabled),

      // Social Media
      facebookUrl: map.facebookUrl ?? DEFAULT_SETTINGS.facebookUrl,
      instagramUrl: map.instagramUrl ?? DEFAULT_SETTINGS.instagramUrl,
      youtubeUrl: map.youtubeUrl ?? DEFAULT_SETTINGS.youtubeUrl,
      linkedinUrl: map.linkedinUrl ?? map.linkedin ?? DEFAULT_SETTINGS.linkedinUrl,
      tiktokUrl: map.tiktokUrl ?? DEFAULT_SETTINGS.tiktokUrl,
      twitterUrl: map.twitterUrl ?? DEFAULT_SETTINGS.twitterUrl,

      // Global SEO & Verification
      defaultSeoTitle: map.defaultSeoTitle || DEFAULT_SETTINGS.defaultSeoTitle,
      defaultMetaDescription: map.defaultMetaDescription || DEFAULT_SETTINGS.defaultMetaDescription,
      defaultOgTitle: map.defaultOgTitle || DEFAULT_SETTINGS.defaultOgTitle,
      defaultOgDescription: map.defaultOgDescription || DEFAULT_SETTINGS.defaultOgDescription,
      canonicalBaseUrl: map.canonicalBaseUrl || map.productionUrl || DEFAULT_SETTINGS.canonicalBaseUrl,
      robotsIndex: parseBool("robotsIndex", DEFAULT_SETTINGS.robotsIndex),
      robotsFollow: parseBool("robotsFollow", DEFAULT_SETTINGS.robotsFollow),
      googleSearchConsoleCode: map.googleSearchConsoleCode ?? DEFAULT_SETTINGS.googleSearchConsoleCode,
      bingVerificationCode: map.bingVerificationCode || DEFAULT_SETTINGS.bingVerificationCode,

      // Analytics & Tracking IDs
      ga4Id: map.ga4Id ?? DEFAULT_SETTINGS.ga4Id,
      ga4Enabled: parseBool("ga4Enabled", DEFAULT_SETTINGS.ga4Enabled),
      gtmId: map.gtmId ?? DEFAULT_SETTINGS.gtmId,
      gtmEnabled: parseBool("gtmEnabled", DEFAULT_SETTINGS.gtmEnabled),
      metaPixelId: map.metaPixelId ?? DEFAULT_SETTINGS.metaPixelId,
      metaPixelEnabled: parseBool("metaPixelEnabled", DEFAULT_SETTINGS.metaPixelEnabled),
      tiktokPixelId: map.tiktokPixelId ?? DEFAULT_SETTINGS.tiktokPixelId,
      tiktokPixelEnabled: parseBool("tiktokPixelEnabled", DEFAULT_SETTINGS.tiktokPixelEnabled),
      linkedinPartnerId: map.linkedinPartnerId ?? DEFAULT_SETTINGS.linkedinPartnerId,
      linkedinPartnerEnabled: parseBool("linkedinPartnerEnabled", DEFAULT_SETTINGS.linkedinPartnerEnabled),
      googleAdsConversionId: map.googleAdsConversionId ?? DEFAULT_SETTINGS.googleAdsConversionId,
      googleAdsConversionLabel: map.googleAdsConversionLabel ?? DEFAULT_SETTINGS.googleAdsConversionLabel,
      googleAdsEnabled: parseBool("googleAdsEnabled", DEFAULT_SETTINGS.googleAdsEnabled),
      clarityId: map.clarityId ?? DEFAULT_SETTINGS.clarityId,
      clarityEnabled: parseBool("clarityEnabled", DEFAULT_SETTINGS.clarityEnabled),
      hotjarId: map.hotjarId ?? DEFAULT_SETTINGS.hotjarId,
      hotjarEnabled: parseBool("hotjarEnabled", DEFAULT_SETTINGS.hotjarEnabled),

      // Reusable CTAs
      strategyCallText: map.strategyCallText || DEFAULT_SETTINGS.strategyCallText,
      strategyCallHref: map.strategyCallHref || DEFAULT_SETTINGS.strategyCallHref,
      auditCtaText: map.auditCtaText || DEFAULT_SETTINGS.auditCtaText,
      auditCtaHref: map.auditCtaHref || DEFAULT_SETTINGS.auditCtaHref,
      globalCtaTitle: map.globalCtaTitle || DEFAULT_SETTINGS.globalCtaTitle,
      globalCtaSubtitle: map.globalCtaSubtitle || DEFAULT_SETTINGS.globalCtaSubtitle,

      // About Page CMS Content
      aboutHeroBadge: map.aboutHeroBadge || DEFAULT_SETTINGS.aboutHeroBadge,
      aboutHeroTitle: map.aboutHeroTitle || DEFAULT_SETTINGS.aboutHeroTitle,
      aboutHeroDescription: map.aboutHeroDescription || DEFAULT_SETTINGS.aboutHeroDescription,
      aboutHeroPrimaryCta: map.aboutHeroPrimaryCta || DEFAULT_SETTINGS.aboutHeroPrimaryCta,
      aboutHeroPrimaryHref: map.aboutHeroPrimaryHref || DEFAULT_SETTINGS.aboutHeroPrimaryHref,
      aboutHeroSecondaryCta: map.aboutHeroSecondaryCta || DEFAULT_SETTINGS.aboutHeroSecondaryCta,
      aboutHeroSecondaryHref: map.aboutHeroSecondaryHref || DEFAULT_SETTINGS.aboutHeroSecondaryHref,
      whySectionTitle: map.whySectionTitle || DEFAULT_SETTINGS.whySectionTitle,
      whySectionSubtitle: map.whySectionSubtitle || DEFAULT_SETTINGS.whySectionSubtitle,
      missionTitle: map.missionTitle || DEFAULT_SETTINGS.missionTitle,
      missionText: map.missionText || DEFAULT_SETTINGS.missionText,
      visionTitle: map.visionTitle || DEFAULT_SETTINGS.visionTitle,
      visionText: map.visionText || DEFAULT_SETTINGS.visionText,

      // Contact Page CMS Content
      contactPageBadge: map.contactPageBadge || DEFAULT_SETTINGS.contactPageBadge,
      contactPageTitle: map.contactPageTitle || DEFAULT_SETTINGS.contactPageTitle,
      contactPageSubtitle: map.contactPageSubtitle || DEFAULT_SETTINGS.contactPageSubtitle,
      contactFormTitle: map.contactFormTitle || DEFAULT_SETTINGS.contactFormTitle,
      contactFormSubtitle: map.contactFormSubtitle || DEFAULT_SETTINGS.contactFormSubtitle,
      contactSuccessMessage: map.contactSuccessMessage || DEFAULT_SETTINGS.contactSuccessMessage,
      contactPrivacyText: map.contactPrivacyText || DEFAULT_SETTINGS.contactPrivacyText,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

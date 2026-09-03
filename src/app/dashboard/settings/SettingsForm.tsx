"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

const schema = z.object({
  // 1. Branding & Identity
  siteName: z.string().min(1, "Site name is required").max(100),
  brandTagline: z.string().max(200).optional().or(z.literal("")),
  siteDescription: z.string().max(400).optional().or(z.literal("")),
  productionUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  logo: z.string().max(250).optional().or(z.literal("")),
  mobileLogo: z.string().max(250).optional().or(z.literal("")),
  favicon: z.string().max(250).optional().or(z.literal("")),
  defaultOgImage: z.string().max(250).optional().or(z.literal("")),
  primaryColor: z.string().max(30).optional().or(z.literal("")),
  brightNavyColor: z.string().max(30).optional().or(z.literal("")),
  backgroundColor: z.string().max(30).optional().or(z.literal("")),

  // 2. Contact & WhatsApp
  whatsappNumber: z.string().max(40).optional().or(z.literal("")),
  whatsappDisplay: z.string().max(40).optional().or(z.literal("")),
  whatsappDefaultMessage: z.string().max(250).optional().or(z.literal("")),
  contactEmail: z.string().email("Must be a valid email").optional().or(z.literal("")),
  secondaryEmail: z.string().email("Must be a valid email").optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  phoneDisplay: z.string().max(40).optional().or(z.literal("")),
  phoneSecondary: z.string().max(40).optional().or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
  googleMapsUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),

  // 3. Header & Navigation
  headerCtaText: z.string().max(60).optional().or(z.literal("")),
  headerCtaHref: z.string().max(100).optional().or(z.literal("")),
  headerCtaEnabled: z.enum(["true", "false"]),
  headerWhatsAppEnabled: z.enum(["true", "false"]),
  headerSticky: z.enum(["true", "false"]),

  // 4. Footer
  footerDescription: z.string().max(400).optional().or(z.literal("")),
  footerCopyright: z.string().max(200).optional().or(z.literal("")),
  footerCtaText: z.string().max(60).optional().or(z.literal("")),
  footerCtaHref: z.string().max(100).optional().or(z.literal("")),
  footerCtaEnabled: z.enum(["true", "false"]),

  // 5. Reusable CTAs
  strategyCallText: z.string().max(60).optional().or(z.literal("")),
  strategyCallHref: z.string().max(100).optional().or(z.literal("")),
  auditCtaText: z.string().max(60).optional().or(z.literal("")),
  auditCtaHref: z.string().max(100).optional().or(z.literal("")),
  globalCtaTitle: z.string().max(150).optional().or(z.literal("")),
  globalCtaSubtitle: z.string().max(350).optional().or(z.literal("")),

  // 6. Social Media
  facebookUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagramUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  youtubeUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tiktokUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),

  // 7. About Page Content
  aboutHeroBadge: z.string().max(80).optional().or(z.literal("")),
  aboutHeroTitle: z.string().max(150).optional().or(z.literal("")),
  aboutHeroDescription: z.string().max(400).optional().or(z.literal("")),
  aboutHeroPrimaryCta: z.string().max(60).optional().or(z.literal("")),
  aboutHeroPrimaryHref: z.string().max(100).optional().or(z.literal("")),
  aboutHeroSecondaryCta: z.string().max(60).optional().or(z.literal("")),
  aboutHeroSecondaryHref: z.string().max(100).optional().or(z.literal("")),
  whySectionTitle: z.string().max(150).optional().or(z.literal("")),
  whySectionSubtitle: z.string().max(300).optional().or(z.literal("")),
  missionTitle: z.string().max(100).optional().or(z.literal("")),
  missionText: z.string().max(500).optional().or(z.literal("")),
  visionTitle: z.string().max(100).optional().or(z.literal("")),
  visionText: z.string().max(500).optional().or(z.literal("")),

  // 8. Contact Page Content
  contactPageBadge: z.string().max(80).optional().or(z.literal("")),
  contactPageTitle: z.string().max(150).optional().or(z.literal("")),
  contactPageSubtitle: z.string().max(300).optional().or(z.literal("")),
  contactFormTitle: z.string().max(100).optional().or(z.literal("")),
  contactSuccessMessage: z.string().max(300).optional().or(z.literal("")),
  contactPrivacyText: z.string().max(200).optional().or(z.literal("")),

  // 9. SEO & Search Console
  defaultSeoTitle: z.string().max(150).optional().or(z.literal("")),
  defaultMetaDescription: z.string().max(350).optional().or(z.literal("")),
  defaultOgTitle: z.string().max(150).optional().or(z.literal("")),
  defaultOgDescription: z.string().max(350).optional().or(z.literal("")),
  canonicalBaseUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  robotsIndex: z.enum(["true", "false"]),
  robotsFollow: z.enum(["true", "false"]),
  googleSearchConsoleCode: z.string().max(100).optional().or(z.literal("")),
  bingVerificationCode: z.string().max(100).optional().or(z.literal("")),

  // 10. Tracking & Analytics
  ga4Enabled: z.enum(["true", "false"]),
  ga4Id: z.string().max(50).optional().or(z.literal("")),
  gtmEnabled: z.enum(["true", "false"]),
  gtmId: z.string().max(50).optional().or(z.literal("")),
  metaPixelEnabled: z.enum(["true", "false"]),
  metaPixelId: z.string().max(50).optional().or(z.literal("")),
  linkedinPartnerEnabled: z.enum(["true", "false"]),
  linkedinPartnerId: z.string().max(50).optional().or(z.literal("")),
  googleAdsEnabled: z.enum(["true", "false"]),
  googleAdsConversionId: z.string().max(50).optional().or(z.literal("")),
  googleAdsConversionLabel: z.string().max(100).optional().or(z.literal("")),
  tiktokPixelEnabled: z.enum(["true", "false"]),
  tiktokPixelId: z.string().max(50).optional().or(z.literal("")),
  clarityEnabled: z.enum(["true", "false"]),
  clarityId: z.string().max(50).optional().or(z.literal("")),
  hotjarEnabled: z.enum(["true", "false"]),
  hotjarId: z.string().max(50).optional().or(z.literal("")),
});

type SettingsData = z.infer<typeof schema>;

const TABS = [
  { id: "branding", label: "🎨 Branding" },
  { id: "contact", label: "📞 Contact & WhatsApp" },
  { id: "header", label: "🧭 Header" },
  { id: "footer", label: "🦶 Footer" },
  { id: "ctas", label: "🎯 Reusable CTAs" },
  { id: "pages", label: "📖 About & Contact" },
  { id: "social", label: "📱 Social Media" },
  { id: "seo", label: "🔍 Global SEO" },
  { id: "tracking", label: "📊 Tracking" },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState<Tab>("branding");
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<SettingsData>({
    resolver: zodResolver(schema),
    defaultValues: {
      // Branding
      siteName: settings.siteName || "Siachen Mark",
      brandTagline: settings.brandTagline || "Performance Marketing & Digital Growth Agency",
      siteDescription: settings.siteDescription || "",
      productionUrl: settings.productionUrl || settings.siteUrl || "https://siachenmark.com",
      logo: settings.logo || "/logo.png",
      mobileLogo: settings.mobileLogo || "/logo.png",
      favicon: settings.favicon || "/favicon.ico",
      defaultOgImage: settings.defaultOgImage || "/og-image.jpg",
      primaryColor: settings.primaryColor || "#0a1e6e",
      brightNavyColor: settings.brightNavyColor || "#0035ca",
      backgroundColor: settings.backgroundColor || "#f4f5f9",

      // Contact & WhatsApp
      whatsappNumber: settings.whatsappNumber || settings.whatsapp || "+923488868517",
      whatsappDisplay: settings.whatsappDisplay || settings.whatsappNumber || "+92 348 8868517",
      whatsappDefaultMessage: settings.whatsappDefaultMessage || "Hi Siachen Mark team, I'd like to discuss a project.",
      contactEmail: settings.contactEmail || settings.email || "basharataliofficial76@gmail.com",
      secondaryEmail: settings.secondaryEmail || "contact@siachenmark.com",
      phone: settings.phone || "+92 348 8868517",
      phoneDisplay: settings.phoneDisplay || settings.phone || "+92 348 8868517",
      phoneSecondary: settings.phoneSecondary || "",
      address: settings.address || "Islamabad, Pakistan",
      googleMapsUrl: settings.googleMapsUrl || "",

      // Header & Navigation
      headerCtaText: settings.headerCtaText || "Book a Strategy Call",
      headerCtaHref: settings.headerCtaHref || "/contact",
      headerCtaEnabled: (settings.headerCtaEnabled === "false" ? "false" : "true") as "true" | "false",
      headerWhatsAppEnabled: (settings.headerWhatsAppEnabled === "false" ? "false" : "true") as "true" | "false",
      headerSticky: (settings.headerSticky === "false" ? "false" : "true") as "true" | "false",

      // Footer
      footerDescription: settings.footerDescription || "Performance marketing and digital growth agency helping businesses acquire customers, scale revenue, and build measurable acquisition systems.",
      footerCopyright: settings.footerCopyright || "All rights reserved.",
      footerCtaText: settings.footerCtaText || "Book a Strategy Call",
      footerCtaHref: settings.footerCtaHref || "/contact",
      footerCtaEnabled: (settings.footerCtaEnabled === "false" ? "false" : "true") as "true" | "false",

      // Reusable CTAs
      strategyCallText: settings.strategyCallText || "Book a Strategy Call",
      strategyCallHref: settings.strategyCallHref || "/contact",
      auditCtaText: settings.auditCtaText || "Start with a Free Audit",
      auditCtaHref: settings.auditCtaHref || "/contact",
      globalCtaTitle: settings.globalCtaTitle || "Your Growth Is Our Mission.",
      globalCtaSubtitle: settings.globalCtaSubtitle || "Let's build your brand, reach more customers, and hit your business goals — with a strategy built around your actual numbers, not vanity metrics.",

      // Social Media
      facebookUrl: settings.facebookUrl || "https://www.facebook.com/siachen.mark",
      instagramUrl: settings.instagramUrl || "https://www.instagram.com/siachen.mark/",
      youtubeUrl: settings.youtubeUrl || "https://www.youtube.com/@Siachen-Mark",
      linkedinUrl: settings.linkedinUrl || settings.linkedin || "https://www.linkedin.com/company/109209003",
      tiktokUrl: settings.tiktokUrl || "",
      twitterUrl: settings.twitterUrl || "",

      // About Page Content
      aboutHeroBadge: settings.aboutHeroBadge || "Who We Are",
      aboutHeroTitle: settings.aboutHeroTitle || "We Build Growth Systems. Not Just Campaigns.",
      aboutHeroDescription: settings.aboutHeroDescription || "Siachen Mark is a performance marketing agency based in Islamabad, Pakistan. We partner with businesses across Pakistan, the Middle East, the UK, and beyond to turn paid media, search, and design into compounding revenue engines.",
      aboutHeroPrimaryCta: settings.aboutHeroPrimaryCta || "Book a Strategy Call",
      aboutHeroPrimaryHref: settings.aboutHeroPrimaryHref || "/contact",
      aboutHeroSecondaryCta: settings.aboutHeroSecondaryCta || "Explore Our Services",
      aboutHeroSecondaryHref: settings.aboutHeroSecondaryHref || "/services",
      whySectionTitle: settings.whySectionTitle || "Why Businesses Choose Siachen Mark",
      whySectionSubtitle: settings.whySectionSubtitle || "Transparent, measurable, and built around your business goals — not vanity metrics.",
      missionTitle: settings.missionTitle || "Our Mission",
      missionText: settings.missionText || "To give ambitious businesses access to enterprise-grade performance marketing, transparent tracking, and conversion-focused creative — without bloated agency retainers.",
      visionTitle: settings.visionTitle || "Our Vision",
      visionText: settings.visionText || "To be the most trusted digital growth partner for businesses across Pakistan and global markets, recognized for measurable business outcomes and uncompromising integrity.",

      // Contact Page Content
      contactPageBadge: settings.contactPageBadge || "Get In Touch",
      contactPageTitle: settings.contactPageTitle || "Let's Talk About Your Growth",
      contactPageSubtitle: settings.contactPageSubtitle || "Have a project in mind or want to explore how performance marketing can scale your revenue? Reach out directly.",
      contactFormTitle: settings.contactFormTitle || "Send Us a Message",
      contactSuccessMessage: settings.contactSuccessMessage || "Message received! We'll review your project details and get back to you with next steps.",
      contactPrivacyText: settings.contactPrivacyText || "We respect your privacy. No spam, no high-pressure sales calls.",

      // SEO
      defaultSeoTitle: settings.defaultSeoTitle || "Siachen Mark — Performance Marketing & Digital Growth Agency",
      defaultMetaDescription: settings.defaultMetaDescription || "",
      defaultOgTitle: settings.defaultOgTitle || "Siachen Mark — Performance Marketing & Digital Growth Agency",
      defaultOgDescription: settings.defaultOgDescription || "",
      canonicalBaseUrl: settings.canonicalBaseUrl || "https://siachenmark.com",
      robotsIndex: (settings.robotsIndex === "false" ? "false" : "true") as "true" | "false",
      robotsFollow: (settings.robotsFollow === "false" ? "false" : "true") as "true" | "false",
      googleSearchConsoleCode: settings.googleSearchConsoleCode || "googleab2ecd93670518cd",
      bingVerificationCode: settings.bingVerificationCode || "",

      // Tracking
      ga4Enabled: (settings.ga4Enabled === "false" ? "false" : "true") as "true" | "false",
      ga4Id: settings.ga4Id || "",
      gtmEnabled: (settings.gtmEnabled === "false" ? "false" : "true") as "true" | "false",
      gtmId: settings.gtmId || "",
      metaPixelEnabled: (settings.metaPixelEnabled === "false" ? "false" : "true") as "true" | "false",
      metaPixelId: settings.metaPixelId || "",
      linkedinPartnerEnabled: (settings.linkedinPartnerEnabled === "false" ? "false" : "true") as "true" | "false",
      linkedinPartnerId: settings.linkedinPartnerId || "",
      googleAdsEnabled: (settings.googleAdsEnabled === "true" ? "true" : "false") as "true" | "false",
      googleAdsConversionId: settings.googleAdsConversionId || "",
      googleAdsConversionLabel: settings.googleAdsConversionLabel || "",
      tiktokPixelEnabled: (settings.tiktokPixelEnabled === "true" ? "true" : "false") as "true" | "false",
      tiktokPixelId: settings.tiktokPixelId || "",
      clarityEnabled: (settings.clarityEnabled === "true" ? "true" : "false") as "true" | "false",
      clarityId: settings.clarityId || "",
      hotjarEnabled: (settings.hotjarEnabled === "true" ? "true" : "false") as "true" | "false",
      hotjarId: settings.hotjarId || "",
    },
  });

  async function onSubmit(data: SettingsData) {
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setErrorMsg("An error occurred while saving. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-3">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-[var(--radius-md)] transition-colors ${
              activeTab === tab.id
                ? "bg-[var(--color-navy)] text-white shadow-sm"
                : "text-[var(--color-muted)] hover:text-[var(--color-navy)] hover:bg-[var(--color-off-white)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-sm">
        
        {/* ── 1. Branding & Identity ── */}
        {activeTab === "branding" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-navy)]">Brand Identity & Visuals</h2>
              <p className="text-xs text-[var(--color-muted)]">Control logos, brand names, taglines, and theme colors across the whole website.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="siteName">Brand Name *</Label>
                <Input id="siteName" {...register("siteName")} placeholder="Siachen Mark" />
                {errors.siteName && <p className="text-xs text-red-500 mt-1">{errors.siteName.message}</p>}
              </div>

              <div>
                <Label htmlFor="brandTagline">Brand Tagline</Label>
                <Input id="brandTagline" {...register("brandTagline")} placeholder="Performance Marketing & Digital Growth Agency" />
              </div>
            </div>

            <div>
              <Label htmlFor="siteDescription">Company / Agency Overview</Label>
              <textarea
                id="siteDescription"
                rows={3}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
                {...register("siteDescription")}
                placeholder="Brief summary used in footer, meta descriptions, and structured schemas."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-[var(--color-border)]">
              <div>
                <Label htmlFor="logo">Desktop Logo Path / URL</Label>
                <Input id="logo" {...register("logo")} placeholder="/logo.png" />
                <p className="text-[11px] text-[var(--color-muted)] mt-1">Upload in <a href="/dashboard/media" target="_blank" className="text-[var(--color-navy-bright)] underline">Media Library</a> and paste URL.</p>
              </div>
              <div>
                <Label htmlFor="mobileLogo">Mobile Logo Path / URL</Label>
                <Input id="mobileLogo" {...register("mobileLogo")} placeholder="/logo.png" />
              </div>
              <div>
                <Label htmlFor="favicon">Favicon Path</Label>
                <Input id="favicon" {...register("favicon")} placeholder="/favicon.ico" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-[var(--color-border)]">
              <div>
                <Label htmlFor="primaryColor">Primary Brand Color (Hex)</Label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={watch("primaryColor") || "#0a1e6e"} onChange={(e) => setValue("primaryColor", e.target.value)} className="w-9 h-9 rounded border border-[var(--color-border)] cursor-pointer" />
                  <Input id="primaryColor" {...register("primaryColor")} placeholder="#0a1e6e" />
                </div>
              </div>
              <div>
                <Label htmlFor="brightNavyColor">Bright Accent Color (Hex)</Label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={watch("brightNavyColor") || "#0035ca"} onChange={(e) => setValue("brightNavyColor", e.target.value)} className="w-9 h-9 rounded border border-[var(--color-border)] cursor-pointer" />
                  <Input id="brightNavyColor" {...register("brightNavyColor")} placeholder="#0035ca" />
                </div>
              </div>
              <div>
                <Label htmlFor="defaultOgImage">Default Social Share Image (OG)</Label>
                <Input id="defaultOgImage" {...register("defaultOgImage")} placeholder="/og-image.jpg" />
              </div>
            </div>
          </div>
        )}

        {/* ── 2. Contact & WhatsApp ── */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-navy)]">Contact Channels & WhatsApp Setup</h2>
              <p className="text-xs text-[var(--color-muted)]">Single source of truth for all WhatsApp buttons, phone links, and email channels across the entire site.</p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-4">
              <h3 className="font-bold text-sm text-emerald-950">WhatsApp Global Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsappNumber">WhatsApp Target Number (with country code, no + or spaces) *</Label>
                  <Input id="whatsappNumber" {...register("whatsappNumber")} placeholder="923488868517" />
                  <p className="text-[11px] text-emerald-800 mt-1">Used in direct <code>wa.me/923...</code> conversion links.</p>
                </div>
                <div>
                  <Label htmlFor="whatsappDisplay">WhatsApp Visible Display Number</Label>
                  <Input id="whatsappDisplay" {...register("whatsappDisplay")} placeholder="+92 348 8868517" />
                </div>
              </div>
              <div>
                <Label htmlFor="whatsappDefaultMessage">Default Pre-filled Message</Label>
                <Input id="whatsappDefaultMessage" {...register("whatsappDefaultMessage")} placeholder="Hi, I would like to discuss a marketing project." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="phone">Primary Phone Number</Label>
                <Input id="phone" {...register("phone")} placeholder="+92 348 8868517" />
              </div>
              <div>
                <Label htmlFor="phoneSecondary">Secondary Phone <span className="text-xs text-[var(--color-muted)]">(optional)</span></Label>
                <Input id="phoneSecondary" {...register("phoneSecondary")} placeholder="+92 300 0000000" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="contactEmail">Primary Contact Email *</Label>
                <Input id="contactEmail" type="email" {...register("contactEmail")} placeholder="contact@siachenmark.com" />
              </div>
              <div>
                <Label htmlFor="secondaryEmail">Secondary Email</Label>
                <Input id="secondaryEmail" type="email" {...register("secondaryEmail")} placeholder="info@siachenmark.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[var(--color-border)]">
              <div>
                <Label htmlFor="address">Physical Business Location / City</Label>
                <Input id="address" {...register("address")} placeholder="Islamabad, Pakistan" />
              </div>
              <div>
                <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
                <Input id="googleMapsUrl" {...register("googleMapsUrl")} placeholder="https://maps.google.com/..." />
              </div>
            </div>
          </div>
        )}

        {/* ── 3. Header & Navigation ── */}
        {activeTab === "header" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-navy)]">Header & Navigation Settings</h2>
                <p className="text-xs text-[var(--color-muted)]">Control header behavior, CTA buttons, and direct link manager.</p>
              </div>
              <a
                href="/dashboard/navigation"
                className="px-3.5 py-2 rounded-md bg-[var(--color-navy)] text-white text-xs font-semibold hover:bg-[var(--color-navy-bright)] transition-colors"
              >
                Manage Navigation Links →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="headerCtaText">Header Button Text</Label>
                <Input id="headerCtaText" {...register("headerCtaText")} placeholder="Book a Strategy Call" />
              </div>
              <div>
                <Label htmlFor="headerCtaHref">Header Button URL / Path</Label>
                <Input id="headerCtaHref" {...register("headerCtaHref")} placeholder="/contact" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-[var(--color-border)]">
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={watch("headerCtaEnabled") === "true"}
                  onChange={(e) => setValue("headerCtaEnabled", e.target.checked ? "true" : "false")}
                  className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                />
                Show Header Action Button
              </label>

              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={watch("headerSticky") === "true"}
                  onChange={(e) => setValue("headerSticky", e.target.checked ? "true" : "false")}
                  className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                />
                Sticky Header on Scroll
              </label>
            </div>
          </div>
        )}

        {/* ── 4. Footer ── */}
        {activeTab === "footer" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-navy)]">Footer & Copyright Settings</h2>
              <p className="text-xs text-[var(--color-muted)]">Control global footer text, copyright notice, and CTA banner.</p>
            </div>

            <div>
              <Label htmlFor="footerDescription">Footer Brand Description</Label>
              <textarea
                id="footerDescription"
                rows={3}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
                {...register("footerDescription")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="footerCtaText">Footer CTA Banner Headline</Label>
                <Input id="footerCtaText" {...register("footerCtaText")} placeholder="Book a Strategy Call" />
              </div>
              <div>
                <Label htmlFor="footerCtaHref">Footer CTA Button URL</Label>
                <Input id="footerCtaHref" {...register("footerCtaHref")} placeholder="/contact" />
              </div>
            </div>

            <div>
              <Label htmlFor="footerCopyright">Copyright Statement</Label>
              <Input id="footerCopyright" {...register("footerCopyright")} placeholder="All rights reserved." />
            </div>
          </div>
        )}

        {/* ── 5. Reusable CTAs ── */}
        {activeTab === "ctas" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-navy)]">Centralized Reusable CTA Texts</h2>
              <p className="text-xs text-[var(--color-muted)]">Manage common button labels and global CTA section copy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="strategyCallText">Primary Strategy Call Label</Label>
                <Input id="strategyCallText" {...register("strategyCallText")} placeholder="Book a Strategy Call" />
              </div>
              <div>
                <Label htmlFor="strategyCallHref">Strategy Call Destination</Label>
                <Input id="strategyCallHref" {...register("strategyCallHref")} placeholder="/contact" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="auditCtaText">Free Audit Button Label</Label>
                <Input id="auditCtaText" {...register("auditCtaText")} placeholder="Start with a Free Audit" />
              </div>
              <div>
                <Label htmlFor="auditCtaHref">Audit Button Destination</Label>
                <Input id="auditCtaHref" {...register("auditCtaHref")} placeholder="/contact" />
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--color-border)] space-y-4">
              <h3 className="font-bold text-sm text-[var(--color-navy)]">Global Bottom CTA Section</h3>
              <div>
                <Label htmlFor="globalCtaTitle">Section Headline</Label>
                <Input id="globalCtaTitle" {...register("globalCtaTitle")} placeholder="Your Growth Is Our Mission." />
              </div>
              <div>
                <Label htmlFor="globalCtaSubtitle">Section Supporting Text</Label>
                <textarea
                  id="globalCtaSubtitle"
                  rows={3}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
                  {...register("globalCtaSubtitle")}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── 6. About & Contact Pages CMS ── */}
        {activeTab === "pages" && (
          <div className="space-y-8">
            {/* About Page Hero */}
            <div className="space-y-4">
              <h3 className="font-bold text-base text-[var(--color-navy)]">About Page Hero Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aboutHeroBadge">Hero Badge Tag</Label>
                  <Input id="aboutHeroBadge" {...register("aboutHeroBadge")} placeholder="Who We Are" />
                </div>
                <div>
                  <Label htmlFor="aboutHeroTitle">Hero Main Headline</Label>
                  <Input id="aboutHeroTitle" {...register("aboutHeroTitle")} placeholder="We Build Growth Systems. Not Just Campaigns." />
                </div>
              </div>
              <div>
                <Label htmlFor="aboutHeroDescription">Hero Positioning Paragraph</Label>
                <textarea
                  id="aboutHeroDescription"
                  rows={3}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm"
                  {...register("aboutHeroDescription")}
                />
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--color-navy)]">Why Siachen Mark Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whySectionTitle">Section Title</Label>
                  <Input id="whySectionTitle" {...register("whySectionTitle")} placeholder="Why Businesses Choose Siachen Mark" />
                </div>
                <div>
                  <Label htmlFor="whySectionSubtitle">Section Subtitle</Label>
                  <Input id="whySectionSubtitle" {...register("whySectionSubtitle")} placeholder="Transparent, measurable, and built around your goals." />
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--color-navy)]">Mission & Vision</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="missionTitle">Mission Title</Label>
                  <Input id="missionTitle" {...register("missionTitle")} placeholder="Our Mission" />
                  <div className="mt-2">
                    <Label htmlFor="missionText">Mission Statement</Label>
                    <textarea id="missionText" rows={3} className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm" {...register("missionText")} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="visionTitle">Vision Title</Label>
                  <Input id="visionTitle" {...register("visionTitle")} placeholder="Our Vision" />
                  <div className="mt-2">
                    <Label htmlFor="visionText">Vision Statement</Label>
                    <textarea id="visionText" rows={3} className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm" {...register("visionText")} />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Page Copy */}
            <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--color-navy)]">Contact Page Copy & Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPageTitle">Contact Page Main Headline</Label>
                  <Input id="contactPageTitle" {...register("contactPageTitle")} placeholder="Let's Talk About Your Growth" />
                </div>
                <div>
                  <Label htmlFor="contactFormTitle">Form Heading</Label>
                  <Input id="contactFormTitle" {...register("contactFormTitle")} placeholder="Send Us a Message" />
                </div>
              </div>
              <div>
                <Label htmlFor="contactPrivacyText">Privacy / Reassurance Notice Under Button</Label>
                <Input id="contactPrivacyText" {...register("contactPrivacyText")} placeholder="We respect your privacy. No spam, no high-pressure sales calls." />
              </div>
            </div>
          </div>
        )}

        {/* ── 7. Social Media ── */}
        {activeTab === "social" && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-navy)]">Social Media Profiles</h2>
              <p className="text-xs text-[var(--color-muted)]">Icons are dynamically displayed in Navbar and Footer when a link is provided.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input id="facebookUrl" {...register("facebookUrl")} placeholder="https://www.facebook.com/siachen.mark" />
              </div>
              <div>
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input id="instagramUrl" {...register("instagramUrl")} placeholder="https://www.instagram.com/siachen.mark/" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input id="youtubeUrl" {...register("youtubeUrl")} placeholder="https://www.youtube.com/@Siachen-Mark" />
              </div>
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn Company URL</Label>
                <Input id="linkedinUrl" {...register("linkedinUrl")} placeholder="https://www.linkedin.com/company/109209003" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="tiktokUrl">TikTok URL</Label>
                <Input id="tiktokUrl" {...register("tiktokUrl")} placeholder="https://www.tiktok.com/@siachenmark" />
              </div>
              <div>
                <Label htmlFor="twitterUrl">X / Twitter URL</Label>
                <Input id="twitterUrl" {...register("twitterUrl")} placeholder="https://x.com/siachenmark" />
              </div>
            </div>
          </div>
        )}

        {/* ── 8. Global SEO ── */}
        {activeTab === "seo" && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-navy)]">Global SEO & Verification Codes</h2>
              <p className="text-xs text-[var(--color-muted)]">Global fallbacks when specific page SEO is not configured.</p>
            </div>

            <div>
              <Label htmlFor="defaultSeoTitle">Default Meta Title</Label>
              <Input id="defaultSeoTitle" {...register("defaultSeoTitle")} />
            </div>

            <div>
              <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
              <textarea
                id="defaultMetaDescription"
                rows={3}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
                {...register("defaultMetaDescription")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="defaultOgTitle">Default OG Title</Label>
                <Input id="defaultOgTitle" {...register("defaultOgTitle")} />
              </div>
              <div>
                <Label htmlFor="canonicalBaseUrl">Canonical Base URL</Label>
                <Input id="canonicalBaseUrl" {...register("canonicalBaseUrl")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[var(--color-border)]">
              <div>
                <Label htmlFor="googleSearchConsoleCode">Google Search Console Verification Token</Label>
                <Input id="googleSearchConsoleCode" {...register("googleSearchConsoleCode")} placeholder="googleab2ecd93670518cd" />
              </div>
              <div>
                <Label htmlFor="bingVerificationCode">Bing Webmaster Token</Label>
                <Input id="bingVerificationCode" {...register("bingVerificationCode")} placeholder="Optional Bing verification" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 pt-3 border-t border-[var(--color-border)]">
              <div>
                <Label>Robots Indexing</Label>
                <select
                  value={watch("robotsIndex")}
                  onChange={(e) => setValue("robotsIndex", e.target.value as "true" | "false")}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-2.5 text-sm bg-white"
                >
                  <option value="true">Index (Allowed in Search)</option>
                  <option value="false">Noindex (Hidden from Search)</option>
                </select>
              </div>

              <div>
                <Label>Robots Following</Label>
                <select
                  value={watch("robotsFollow")}
                  onChange={(e) => setValue("robotsFollow", e.target.value as "true" | "false")}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-2.5 text-sm bg-white"
                >
                  <option value="true">Follow (Follow links on pages)</option>
                  <option value="false">Nofollow (Do not follow links)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── 9. Tracking & Analytics ── */}
        {activeTab === "tracking" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-navy)]">Tracking & Analytics Integrations</h2>
              <p className="text-xs text-[var(--color-muted)]">Configure marketing tags and pixels.</p>
            </div>

            {/* GA4 */}
            <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-off-white)]/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-navy)]">Google Analytics 4</p>
                  <p className="text-xs text-[var(--color-muted)]">Measurement ID format: G-XXXXXXXXXX</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <span>Enabled:</span>
                  <input
                    type="checkbox"
                    checked={watch("ga4Enabled") === "true"}
                    onChange={(e) => setValue("ga4Enabled", e.target.checked ? "true" : "false")}
                    className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                  />
                </label>
              </div>
              <Input {...register("ga4Id")} placeholder="G-XXXXXXXXXX" />
            </div>

            {/* GTM */}
            <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-off-white)]/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-navy)]">Google Tag Manager</p>
                  <p className="text-xs text-[var(--color-muted)]">Container ID format: GTM-XXXXXXX</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <span>Enabled:</span>
                  <input
                    type="checkbox"
                    checked={watch("gtmEnabled") === "true"}
                    onChange={(e) => setValue("gtmEnabled", e.target.checked ? "true" : "false")}
                    className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                  />
                </label>
              </div>
              <Input {...register("gtmId")} placeholder="GTM-XXXXXXX" />
            </div>

            {/* Meta Pixel */}
            <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-off-white)]/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-navy)]">Meta Pixel (Facebook/Instagram)</p>
                  <p className="text-xs text-[var(--color-muted)]">Numeric Pixel ID</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <span>Enabled:</span>
                  <input
                    type="checkbox"
                    checked={watch("metaPixelEnabled") === "true"}
                    onChange={(e) => setValue("metaPixelEnabled", e.target.checked ? "true" : "false")}
                    className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                  />
                </label>
              </div>
              <Input {...register("metaPixelId")} placeholder="123456789012345" />
            </div>

            {/* LinkedIn Insight */}
            <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-off-white)]/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-navy)]">LinkedIn Insight Tag</p>
                  <p className="text-xs text-[var(--color-muted)]">Partner ID</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <span>Enabled:</span>
                  <input
                    type="checkbox"
                    checked={watch("linkedinPartnerEnabled") === "true"}
                    onChange={(e) => setValue("linkedinPartnerEnabled", e.target.checked ? "true" : "false")}
                    className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                  />
                </label>
              </div>
              <Input {...register("linkedinPartnerId")} placeholder="1234567" />
            </div>

            {/* Google Ads */}
            <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-off-white)]/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-navy)]">Google Ads Conversion Tracking</p>
                  <p className="text-xs text-[var(--color-muted)]">Conversion ID (AW-XXXXXXX)</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <span>Enabled:</span>
                  <input
                    type="checkbox"
                    checked={watch("googleAdsEnabled") === "true"}
                    onChange={(e) => setValue("googleAdsEnabled", e.target.checked ? "true" : "false")}
                    className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                  />
                </label>
              </div>
              <Input {...register("googleAdsConversionId")} placeholder="AW-XXXXXXXXX" />
            </div>

            {/* TikTok Pixel */}
            <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-off-white)]/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-navy)]">TikTok Pixel</p>
                  <p className="text-xs text-[var(--color-muted)]">TikTok Pixel ID</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <span>Enabled:</span>
                  <input
                    type="checkbox"
                    checked={watch("tiktokPixelEnabled") === "true"}
                    onChange={(e) => setValue("tiktokPixelEnabled", e.target.checked ? "true" : "false")}
                    className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                  />
                </label>
              </div>
              <Input {...register("tiktokPixelId")} placeholder="CXXXXXXXXXXXXX" />
            </div>

            {/* Clarity */}
            <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-off-white)]/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[var(--color-navy)]">Microsoft Clarity</p>
                  <p className="text-xs text-[var(--color-muted)]">Project ID</p>
                </div>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <span>Enabled:</span>
                  <input
                    type="checkbox"
                    checked={watch("clarityEnabled") === "true"}
                    onChange={(e) => setValue("clarityEnabled", e.target.checked ? "true" : "false")}
                    className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
                  />
                </label>
              </div>
              <Input {...register("clarityId")} placeholder="Clarity Project ID" />
            </div>
          </div>
        )}

        {/* Action bar */}
        <div className="flex items-center justify-between pt-5 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving Changes…" : "Save All Settings"}
            </Button>
            {saved && <span className="text-sm font-semibold text-emerald-600">✓ Settings saved successfully!</span>}
            {errorMsg && <span className="text-sm font-semibold text-red-500">{errorMsg}</span>}
          </div>
        </div>

      </form>
    </div>
  );
}

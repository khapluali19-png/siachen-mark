"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

const schema = z.object({
  siteName:    z.string().max(100),
  siteTagline: z.string().max(200),
  phone:       z.string().max(30),
  whatsapp:    z.string().max(30),
  linkedin:    z.string().max(200),
  email:       z.string().email(),
  ga4Id:             z.string().max(40).optional().or(z.literal("")),
  gtmId:             z.string().max(40).optional().or(z.literal("")),
  metaPixelId:       z.string().max(40).optional().or(z.literal("")),
  tiktokPixelId:     z.string().max(40).optional().or(z.literal("")),
  linkedinPartnerId: z.string().max(40).optional().or(z.literal("")),
  hotjarId:          z.string().max(40).optional().or(z.literal("")),
  clarityId:         z.string().max(40).optional().or(z.literal("")),
});

type SettingsData = z.infer<typeof schema>;

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SettingsData>({
    resolver: zodResolver(schema),
    defaultValues: {
      siteName:    settings.siteName    ?? "Siachen Mark",
      siteTagline: settings.siteTagline ?? "Performance. Growth. Impact.",
      phone:       settings.phone       ?? "+92 348 8868517",
      whatsapp:    settings.whatsapp    ?? "+92 348 8868517",
      linkedin:    settings.linkedin    ?? "https://linkedin.com/company/109209003",
      email:       settings.email       ?? "basharataliofficial76@gmail.com",
      ga4Id:             settings.ga4Id             ?? "",
      gtmId:             settings.gtmId             ?? "",
      metaPixelId:       settings.metaPixelId       ?? "",
      tiktokPixelId:     settings.tiktokPixelId     ?? "",
      linkedinPartnerId: settings.linkedinPartnerId ?? "",
      hotjarId:          settings.hotjarId          ?? "",
      clarityId:         settings.clarityId         ?? "",
    },
  });

  async function onSubmit(data: SettingsData) {
    await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8">
      {[
        { id: "siteName",    label: "Site Name" },
        { id: "siteTagline", label: "Tagline" },
        { id: "phone",       label: "Phone" },
        { id: "whatsapp",    label: "WhatsApp" },
        { id: "linkedin",    label: "LinkedIn URL" },
        { id: "email",       label: "Contact Email" },
      ].map(({ id, label }) => (
        <div key={id}>
          <Label htmlFor={id}>{label}</Label>
          <Input id={id} {...register(id as keyof SettingsData)} />
        </div>
      ))}

      <div className="pt-4 border-t border-[var(--color-border)]">
        <p className="font-semibold text-[var(--color-navy)] mb-1">Analytics & Tracking</p>
        <p className="text-xs text-[var(--color-muted)] mb-4">Leave blank to disable. Values are injected site-wide.</p>
        <div className="space-y-5">
          {[
            { id: "ga4Id",             label: "Google Analytics 4 ID (G-XXXX)" },
            { id: "gtmId",             label: "Google Tag Manager ID (GTM-XXXX)" },
            { id: "metaPixelId",       label: "Meta Pixel ID" },
            { id: "tiktokPixelId",     label: "TikTok Pixel ID" },
            { id: "linkedinPartnerId", label: "LinkedIn Partner ID" },
            { id: "hotjarId",          label: "Hotjar ID" },
            { id: "clarityId",         label: "Microsoft Clarity ID" },
          ].map(({ id, label }) => (
            <div key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input id={id} {...register(id as keyof SettingsData)} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : "Save Settings"}</Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </form>
  );
}

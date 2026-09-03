"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import type { SiteSettings } from "@/lib/settings";

const schema = z.object({
  title: z.string().max(120).optional().or(z.literal("")),
  description: z.string().max(320).optional().or(z.literal("")),
  ogTitle: z.string().max(120).optional().or(z.literal("")),
  ogDesc: z.string().max(320).optional().or(z.literal("")),
  ogImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  canonical: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  robots: z.string().max(80).optional().or(z.literal("")),
});

type SeoFormData = z.infer<typeof schema>;

interface SeoMetaRecord {
  id?: string;
  page?: string | null;
  title?: string | null;
  description?: string | null;
  ogTitle?: string | null;
  ogDesc?: string | null;
  ogImage?: string | null;
  canonical?: string | null;
  robots?: string | null;
}

export default function SeoEditForm({
  meta,
  page,
  globalSettings,
}: {
  meta: SeoMetaRecord;
  page: string;
  globalSettings: SiteSettings;
}) {
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SeoFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: meta.title ?? "",
      description: meta.description ?? "",
      ogTitle: meta.ogTitle ?? "",
      ogDesc: meta.ogDesc ?? "",
      ogImage: meta.ogImage ?? "",
      canonical: meta.canonical ?? "",
      robots: meta.robots ?? "index, follow",
    },
  });

  async function onSubmit(data: SeoFormData) {
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/admin/seo/${page}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save SEO");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setErrorMsg("Failed to save SEO metadata.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-sm"
    >
      <div className="border-b border-[var(--color-border)] pb-4">
        <h2 className="text-base font-bold text-[var(--color-navy)]">
          SEO & Social Metadata for /{page === "home" ? "" : page}
        </h2>
        <p className="text-xs text-[var(--color-muted)]">
          Leave any field blank to automatically inherit the global default.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="title">Meta Title</Label>
          <span className="text-[10px] text-[var(--color-muted)]">Fallback: {globalSettings.defaultSeoTitle}</span>
        </div>
        <Input id="title" {...register("title")} placeholder={globalSettings.defaultSeoTitle} />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="description">Meta Description</Label>
          <span className="text-[10px] text-[var(--color-muted)]">Recommended: 120-160 chars</span>
        </div>
        <textarea
          id="description"
          rows={3}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
          {...register("description")}
          placeholder={globalSettings.defaultMetaDescription}
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[var(--color-border)]">
        <div>
          <Label htmlFor="ogTitle">Open Graph Title</Label>
          <Input id="ogTitle" {...register("ogTitle")} placeholder="Social sharing title" />
        </div>
        <div>
          <Label htmlFor="canonical">Canonical URL</Label>
          <Input
            id="canonical"
            {...register("canonical")}
            placeholder={`${globalSettings.productionUrl}/${page === "home" ? "" : page}`}
          />
          {errors.canonical && <p className="text-xs text-red-500 mt-1">{errors.canonical.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="ogDesc">Open Graph Description</Label>
        <textarea
          id="ogDesc"
          rows={2}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
          {...register("ogDesc")}
          placeholder="Summary for Facebook, LinkedIn, Twitter/X"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="ogImage">OG Image URL</Label>
          <Input id="ogImage" {...register("ogImage")} placeholder="https://..." />
          {errors.ogImage && <p className="text-xs text-red-500 mt-1">{errors.ogImage.message}</p>}
        </div>
        <div>
          <Label htmlFor="robots">Robots Meta</Label>
          <Input id="robots" {...register("robots")} placeholder="index, follow" />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save SEO Settings"}
        </Button>
        {saved && <span className="text-sm font-semibold text-emerald-600">✓ SEO settings saved!</span>}
        {errorMsg && <span className="text-sm font-semibold text-red-500">{errorMsg}</span>}
      </div>
    </form>
  );
}

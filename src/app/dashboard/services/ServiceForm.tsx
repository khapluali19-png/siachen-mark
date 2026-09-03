"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  slug: z.string().min(1, "Slug is required").max(120),
  shortDescription: z.string().max(250).optional().or(z.literal("")),
  description: z.string().min(1, "Full description is required"),
  icon: z.string().optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  features: z.string().optional().or(z.literal("")),
  benefits: z.string().optional().or(z.literal("")),
  ctaText: z.string().optional().or(z.literal("")),
  ctaHref: z.string().optional().or(z.literal("")),
  seoTitle: z.string().max(120).optional().or(z.literal("")),
  seoDescription: z.string().max(320).optional().or(z.literal("")),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  order: z.coerce.number().default(0),
});

type ServiceFormData = z.infer<typeof schema>;

interface ServiceRecord {
  id?: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  description: string;
  icon?: string | null;
  image?: string | null;
  features?: string[];
  benefits?: string[];
  ctaText?: string | null;
  ctaHref?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  published?: boolean;
  featured?: boolean;
  order?: number;
}

export default function ServiceForm({ service }: { service?: ServiceRecord | null }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isEditing = Boolean(service?.id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: service?.title || "",
      slug: service?.slug || "",
      shortDescription: service?.shortDescription || "",
      description: service?.description || "",
      icon: service?.icon || "Target",
      image: service?.image || "",
      features: service?.features ? service.features.join(", ") : "",
      benefits: service?.benefits ? service.benefits.join(", ") : "",
      ctaText: service?.ctaText || "Book a Strategy Call",
      ctaHref: service?.ctaHref || "/contact",
      seoTitle: service?.seoTitle || "",
      seoDescription: service?.seoDescription || "",
      published: service?.published ?? true,
      featured: service?.featured ?? false,
      order: service?.order ?? 0,
    },
  });

  const generateSlug = () => {
    const titleVal = watch("title");
    if (titleVal) {
      const generated = titleVal
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", generated);
    }
  };

  async function onSubmit(data: ServiceFormData) {
    setErrorMsg(null);
    try {
      const payload = {
        ...data,
        features: data.features ? data.features.split(",").map((s) => s.trim()).filter(Boolean) : [],
        benefits: data.benefits ? data.benefits.split(",").map((s) => s.trim()).filter(Boolean) : [],
      };

      const url = isEditing ? `/api/admin/services/${service!.id}` : "/api/admin/services";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save service");

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        router.push("/dashboard/services");
        router.refresh();
      }, 1000);
    } catch {
      setErrorMsg("An error occurred while saving.");
    }
  }

  async function handleDelete() {
    if (!isEditing || !confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services/${service!.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/dashboard/services");
      router.refresh();
    } catch {
      setErrorMsg("Failed to delete service.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-sm"
    >
      <div className="border-b border-[var(--color-border)] pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[var(--color-navy)]">
            {isEditing ? `Edit Service — ${service?.title}` : "Add New Service Offering"}
          </h2>
          <p className="text-xs text-[var(--color-muted)]">
            Configure service title, slug, features, benefits, and SEO parameters.
          </p>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-3 py-1.5 rounded text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
          >
            Delete Service
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="title">Service Title *</Label>
          <Input id="title" {...register("title")} onBlur={generateSlug} placeholder="Meta Ads Management" />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="slug">URL Slug *</Label>
            <button
              type="button"
              onClick={generateSlug}
              className="text-[10px] text-[var(--color-navy-bright)] font-semibold hover:underline"
            >
              Auto-generate from Title
            </button>
          </div>
          <Input id="slug" {...register("slug")} placeholder="meta-ads" />
          {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="shortDescription">Outcome / Short Tagline (Card Subtitle)</Label>
        <Input id="shortDescription" {...register("shortDescription")} placeholder="Acquire customers at lower cost with structured paid media" />
      </div>

      <div>
        <Label htmlFor="description">Full Description *</Label>
        <textarea
          id="description"
          rows={5}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
          {...register("description")}
          placeholder="Detailed breakdown of what the service accomplishes, methodology, and deliverables..."
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="features">Key Features (Comma-separated)</Label>
          <Input id="features" {...register("features")} placeholder="Audience Research, Creative Testing, CAPI Tracking" />
        </div>

        <div>
          <Label htmlFor="benefits">Key Benefits (Comma-separated)</Label>
          <Input id="benefits" {...register("benefits")} placeholder="Lower CAC, Higher ROAS, Scalable Funnels" />
        </div>
      </div>

      <div>
        <Label htmlFor="image">Service Image / Visual Banner URL</Label>
        <div className="flex gap-3">
          <Input id="image" {...register("image")} placeholder="/images/services/meta-ads.jpg" className="flex-1" />
          <a
            href="/dashboard/media"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-navy)] hover:bg-[var(--color-off-white)] flex items-center shrink-0"
          >
            📁 Media Library
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[var(--color-border)]">
        <div>
          <Label htmlFor="ctaText">Primary Call-to-Action Text</Label>
          <Input id="ctaText" {...register("ctaText")} placeholder="Book a Strategy Call" />
        </div>

        <div>
          <Label htmlFor="ctaHref">CTA Target URL</Label>
          <Input id="ctaHref" {...register("ctaHref")} placeholder="/contact" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[var(--color-border)]">
        <div>
          <Label htmlFor="seoTitle">SEO Title Override</Label>
          <Input id="seoTitle" {...register("seoTitle")} placeholder="Meta Ads Management Services | Siachen Mark" />
        </div>

        <div>
          <Label htmlFor="seoDescription">SEO Meta Description</Label>
          <textarea
            id="seoDescription"
            rows={2}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
            {...register("seoDescription")}
            placeholder="Scale revenue with Meta Ads campaigns managed by performance specialists."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--color-border)]">
        <div>
          <Label htmlFor="order">Display Order</Label>
          <Input id="order" type="number" {...register("order")} />
        </div>

        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer pb-2">
            <input
              type="checkbox"
              checked={watch("published")}
              onChange={(e) => setValue("published", e.target.checked)}
              className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
            />
            <span>Published (Visible on site)</span>
          </label>
        </div>

        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer pb-2">
            <input
              type="checkbox"
              checked={watch("featured")}
              onChange={(e) => setValue("featured", e.target.checked)}
              className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
            />
            <span>Featured Service (Homepage priority)</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEditing ? "Update Service" : "Create Service"}
        </Button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/services")}
          className="text-xs font-semibold text-[var(--color-muted)] hover:underline"
        >
          Cancel
        </button>
        {saved && <span className="text-sm font-semibold text-emerald-600">✓ Service saved!</span>}
        {errorMsg && <span className="text-sm font-semibold text-red-500">{errorMsg}</span>}
      </div>
    </form>
  );
}

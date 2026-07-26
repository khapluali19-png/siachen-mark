"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

const schema = z.object({
  title:       z.string().max(120).optional(),
  description: z.string().max(320).optional(),
  ogTitle:     z.string().max(120).optional(),
  ogDesc:      z.string().max(320).optional(),
  ogImage:     z.string().url().optional().or(z.literal("")),
  canonical:   z.string().url().optional().or(z.literal("")),
  robots:      z.string().max(80).optional(),
});

type SeoFormData = z.infer<typeof schema>;

interface SeoMeta {
  id: string; page: string | null;
  title?: string | null; description?: string | null;
  ogTitle?: string | null; ogDesc?: string | null;
  ogImage?: string | null; canonical?: string | null;
  robots?: string | null;
}

export default function SeoEditForm({ meta }: { meta: SeoMeta }) {
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SeoFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title:       meta.title ?? "",
      description: meta.description ?? "",
      ogTitle:     meta.ogTitle ?? "",
      ogDesc:      meta.ogDesc ?? "",
      ogImage:     meta.ogImage ?? "",
      canonical:   meta.canonical ?? "",
      robots:      meta.robots ?? "index, follow",
    },
  });

  async function onSubmit(data: SeoFormData) {
    await fetch(`/api/admin/seo/${meta.page}`, {
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
        { id: "title",       label: "Meta Title" },
        { id: "description", label: "Meta Description" },
        { id: "ogTitle",     label: "OG Title" },
        { id: "ogDesc",      label: "OG Description" },
        { id: "ogImage",     label: "OG Image URL" },
        { id: "canonical",   label: "Canonical URL" },
        { id: "robots",      label: "Robots" },
      ].map(({ id, label }) => (
        <div key={id}>
          <Label htmlFor={id}>{label}</Label>
          <Input id={id} {...register(id as keyof SeoFormData)} />
        </div>
      ))}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : "Save"}</Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </form>
  );
}

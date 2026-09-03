"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

interface ProjectData {
  id?: string;
  title: string;
  slug?: string;
  category: string;
  clientName?: string | null;
  services: string[];
  description: string;
  challenge?: string | null;
  solution?: string | null;
  result?: string | null;
  coverImage?: string | null;
  images?: string[];
  projectUrl?: string | null;
  featured?: boolean;
  published?: boolean;
  order?: number;
}

const CATEGORIES = [
  "Performance Marketing",
  "SEO & Content",
  "Branding & Design",
  "Web Development",
  "Social Media",
  "Full-Funnel Growth",
];

export default function PortfolioForm({ initialData }: { initialData?: ProjectData }) {
  const router = useRouter();
  const isNew = !initialData?.id;

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "Performance Marketing");
  const [clientName, setClientName] = useState(initialData?.clientName || "");
  const [services, setServices] = useState(initialData?.services?.join(", ") || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [challenge, setChallenge] = useState(initialData?.challenge || "");
  const [solution, setSolution] = useState(initialData?.solution || "");
  const [result, setResult] = useState(initialData?.result || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [projectUrl, setProjectUrl] = useState(initialData?.projectUrl || "");
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));
  const [published, setPublished] = useState(initialData?.published !== undefined ? initialData.published : true);
  const [order, setOrder] = useState(initialData?.order || 0);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function generateSlug() {
    setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      category,
      clientName: clientName || null,
      services: services.split(",").map((s) => s.trim()).filter(Boolean),
      description,
      challenge: challenge || null,
      solution: solution || null,
      result: result || null,
      coverImage: coverImage || null,
      projectUrl: projectUrl || null,
      featured,
      published,
      order: Number(order),
    };

    try {
      const url = isNew ? "/api/admin/portfolio" : `/api/admin/portfolio/${initialData.id}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save project");
      }

      setSuccess(true);
      if (isNew) {
        router.push("/dashboard/portfolio");
        router.refresh();
      } else {
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving project");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-sm max-w-4xl">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700 font-semibold">
          ✓ Project saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Project / Client Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => { if (!slug) generateSlug(); }}
            placeholder="e.g. HealthCare Clinic Growth System"
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">URL Slug *</Label>
          <div className="flex gap-2">
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="healthcare-clinic-growth"
              required
            />
            <button
              type="button"
              onClick={generateSlug}
              className="px-3 py-2 text-xs border border-[var(--color-border)] rounded-md hover:bg-[var(--color-off-white)] shrink-0"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="category">Industry / Category *</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] text-sm bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="clientName">Client Name <span className="text-[var(--color-muted)] text-xs">(optional)</span></Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Islamabad Health Partners"
          />
        </div>

        <div>
          <Label htmlFor="order">Display Order</Label>
          <Input
            id="order"
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="services">Services Provided (comma-separated)</Label>
        <Input
          id="services"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          placeholder="Meta Ads, CAPI Integration, Landing Page UX"
        />
      </div>

      <div>
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://... or /projects/project.jpg"
        />
        <p className="text-xs text-[var(--color-muted)] mt-1">Upload via <a href="/dashboard/media" target="_blank" className="text-[var(--color-navy-bright)] underline">Media Library</a> and paste the link here.</p>
      </div>

      <div>
        <Label htmlFor="description">Short Project Summary *</Label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
          placeholder="Overview of the client engagement, industry context, and target objective."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="challenge">Business Challenge</Label>
          <textarea
            id="challenge"
            rows={3}
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
            placeholder="What difficulty or market constraint was the business facing?"
          />
        </div>

        <div>
          <Label htmlFor="solution">Solution & Strategy</Label>
          <textarea
            id="solution"
            rows={3}
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
            placeholder="What strategic changes, campaign structure, or technical implementations were built?"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="result">Qualitative Outcome / Impact</Label>
          <Input
            id="result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="e.g. Attributable lead volume increase & lower cost per lead"
          />
        </div>

        <div>
          <Label htmlFor="projectUrl">Live Project URL <span className="text-[var(--color-muted)] text-xs">(optional)</span></Label>
          <Input
            id="projectUrl"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 pt-4 border-t border-[var(--color-border)]">
        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
          />
          Published (Visible on public portfolio)
        </label>

        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
          />
          Featured Project
        </label>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-border)]">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving Project…" : (isNew ? "Create Project" : "Save Changes")}
        </Button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/portfolio")}
          className="px-5 py-2.5 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

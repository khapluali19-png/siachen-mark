"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

type Stat = { v: string; l: string };

export interface HeroSlideRecord {
  id?: string;
  badge?: string | null;
  headline?: string | null;
  subline?: string | null;
  ctaPrimary?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondary?: string | null;
  ctaSecondaryHref?: string | null;
  backgroundImage?: string | null;
  stats?: unknown;
  order?: number;
  isActive?: boolean;
  slideDuration?: number;
}

export default function HeroEditForm({ hero }: { hero: HeroSlideRecord | null }) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    badge: hero?.badge ?? "Performance Marketing & Digital Growth Agency",
    headline: hero?.headline ?? "",
    subline: hero?.subline ?? "We help ambitious businesses acquire customers, grow revenue, and build brands they are proud of.",
    ctaPrimary: hero?.ctaPrimary ?? "Book a Strategy Call",
    ctaPrimaryHref: hero?.ctaPrimaryHref ?? "/contact",
    ctaSecondary: hero?.ctaSecondary ?? "Explore Our Services",
    ctaSecondaryHref: hero?.ctaSecondaryHref ?? "/services",
    backgroundImage: hero?.backgroundImage ?? "",
    slideDuration: hero?.slideDuration ?? 6,
    isActive: hero?.isActive ?? true,
    order: hero?.order ?? 0,
  });
  const [stats, setStats] = useState<Stat[]>(
    Array.isArray(hero?.stats) ? (hero!.stats as Stat[]) : []
  );

  function set(id: string, v: unknown) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...values,
      id: hero?.id,
      stats: stats.filter((s) => s.v && s.l),
    };

    const res = await fetch("/api/admin/hero", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);

    if (!res.ok) {
      setError("Could not save hero settings.");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-sm">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h2 className="text-base font-bold text-[var(--color-navy)]">Homepage Hero Banner & Content</h2>
        <p className="text-xs text-[var(--color-muted)]">
          Manage the hero headline, call-to-action buttons, background imagery, and stat pills.
        </p>
      </div>

      <div>
        <Label htmlFor="badge">Badge / Eyebrow Text</Label>
        <Input id="badge" value={values.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Performance Marketing & Digital Growth Agency" />
      </div>

      <div>
        <Label htmlFor="headline">Main Headline *</Label>
        <Input id="headline" value={values.headline} onChange={(e) => set("headline", e.target.value)} placeholder="We Build Growth Systems That Scale Revenue." />
      </div>

      <div>
        <Label htmlFor="subline">Subheadline / Supporting Description *</Label>
        <textarea
          id="subline"
          rows={3}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
          value={values.subline}
          onChange={(e) => set("subline", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="backgroundImage">Hero Background Image URL (Optional)</Label>
        <div className="flex gap-3">
          <Input id="backgroundImage" value={values.backgroundImage} onChange={(e) => set("backgroundImage", e.target.value)} placeholder="/images/hero-bg.jpg or https://..." className="flex-1" />
          <a
            href="/dashboard/media"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-navy)] hover:bg-[var(--color-off-white)] flex items-center shrink-0"
          >
            📁 Media Library
          </a>
        </div>
        <p className="text-[11px] text-[var(--color-muted)] mt-1">
          If an image is set, it will render behind a contrast-optimized overlay. If blank, the solid premium navy theme is used.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[var(--color-border)]">
        <div>
          <Label htmlFor="ctaPrimary">Primary Button Text</Label>
          <Input id="ctaPrimary" value={values.ctaPrimary} onChange={(e) => set("ctaPrimary", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="ctaPrimaryHref">Primary Button URL</Label>
          <Input id="ctaPrimaryHref" value={values.ctaPrimaryHref} onChange={(e) => set("ctaPrimaryHref", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="ctaSecondary">Secondary Button Text</Label>
          <Input id="ctaSecondary" value={values.ctaSecondary} onChange={(e) => set("ctaSecondary", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="ctaSecondaryHref">Secondary Button URL</Label>
          <Input id="ctaSecondaryHref" value={values.ctaSecondaryHref} onChange={(e) => set("ctaSecondaryHref", e.target.value)} />
        </div>
      </div>

      <div className="pt-3 border-t border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-2">
          <Label>Stat Pills (Displayed on Hero)</Label>
          <button
            type="button"
            onClick={() => setStats((s) => [...s, { v: "", l: "" }])}
            className="text-xs font-semibold text-[var(--color-navy-bright)] hover:underline"
          >
            + Add stat pill
          </button>
        </div>
        <div className="space-y-2">
          {stats.map((s, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Value (e.g. 100+)"
                value={s.v}
                onChange={(e) => setStats((arr) => arr.map((x, j) => (j === i ? { ...x, v: e.target.value } : x)))}
              />
              <Input
                placeholder="Label (e.g. Clients Served)"
                value={s.l}
                onChange={(e) => setStats((arr) => arr.map((x, j) => (j === i ? { ...x, l: e.target.value } : x)))}
              />
              <button
                type="button"
                onClick={() => setStats((arr) => arr.filter((_, j) => j !== i))}
                className="shrink-0 px-3 rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-red-500 transition-colors"
                aria-label="Remove stat"
              >
                ✕
              </button>
            </div>
          ))}
          {!stats.length && <p className="text-xs text-[var(--color-muted)]">Using standard agency defaults (100+, 15+, 3.8x, 98%).</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[var(--color-border)]">
        <div>
          <Label htmlFor="slideDuration">Slide Rotation Interval (Seconds)</Label>
          <Input id="slideDuration" type="number" value={values.slideDuration} onChange={(e) => set("slideDuration", Number(e.target.value))} />
        </div>
        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer pb-2">
            <input
              type="checkbox"
              checked={values.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
              className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
            />
            <span>Active Hero Banner</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
        <Button type="submit" disabled={saving}>{saving ? "Saving Changes…" : "Save Hero Settings"}</Button>
        {saved && <span className="text-sm font-semibold text-emerald-600">✓ Hero updated!</span>}
        {error && <span className="text-sm font-semibold text-red-500">{error}</span>}
      </div>
    </form>
  );
}

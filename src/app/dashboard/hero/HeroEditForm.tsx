"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

type Stat = { v: string; l: string };
interface Hero {
  id?: string;
  badge?: string | null;
  headline?: string | null;
  subline?: string | null;
  ctaPrimary?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondary?: string | null;
  ctaSecondaryHref?: string | null;
  stats?: unknown;
}

const FIELDS: { id: string; label: string }[] = [
  { id: "badge", label: "Badge Text" },
  { id: "headline", label: "Headline" },
  { id: "subline", label: "Subline" },
  { id: "ctaPrimary", label: "Primary CTA Label" },
  { id: "ctaPrimaryHref", label: "Primary CTA Link" },
  { id: "ctaSecondary", label: "Secondary CTA Label" },
  { id: "ctaSecondaryHref", label: "Secondary CTA Link" },
];

export default function HeroEditForm({ hero }: { hero: Hero | null }) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState<Record<string, string>>({
    badge: hero?.badge ?? "",
    headline: hero?.headline ?? "",
    subline: hero?.subline ?? "",
    ctaPrimary: hero?.ctaPrimary ?? "",
    ctaPrimaryHref: hero?.ctaPrimaryHref ?? "",
    ctaSecondary: hero?.ctaSecondary ?? "",
    ctaSecondaryHref: hero?.ctaSecondaryHref ?? "",
  });
  const [stats, setStats] = useState<Stat[]>(
    Array.isArray(hero?.stats) ? (hero!.stats as Stat[]) : []
  );

  function set(id: string, v: string) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/hero", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, stats: stats.filter((s) => s.v && s.l) }),
    });
    setSaving(false);
    if (!res.ok) { setError("Could not save. Check required fields."); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8">
      {FIELDS.map(({ id, label }) => (
        <div key={id}>
          <Label htmlFor={id}>{label}</Label>
          <Input id={id} value={values[id]} onChange={(e) => set(id, e.target.value)} />
        </div>
      ))}

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Stat Pills</Label>
          <button
            type="button"
            onClick={() => setStats((s) => [...s, { v: "", l: "" }])}
            className="text-xs font-semibold text-[var(--color-navy-bright)] hover:underline"
          >
            + Add stat
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
                placeholder="Label (e.g. Clients)"
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
          {!stats.length && <p className="text-xs text-[var(--color-muted)]">No stats yet. The site uses defaults until you add some.</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </form>
  );
}

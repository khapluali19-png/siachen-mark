"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

export interface TestimonialData {
  id?: string;
  quote?: string;
  name?: string;
  role?: string;
  company?: string | null;
  industry?: string | null;
  avatar?: string | null;
  published?: boolean;
  order?: number;
}

export default function TestimonialForm({ initial }: { initial?: TestimonialData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [v, setV] = useState({
    quote: initial?.quote ?? "",
    name: initial?.name ?? "",
    role: initial?.role ?? "",
    company: initial?.company ?? "",
    industry: initial?.industry ?? "",
    avatar: initial?.avatar ?? "",
    published: initial?.published ?? true,
    order: initial?.order ?? 0,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = isEdit ? `/api/admin/testimonials/${initial!.id}` : "/api/admin/testimonials";
    const res = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...v, order: Number(v.order) || 0 }),
    });
    setSaving(false);
    if (!res.ok) { setError("Could not save. Check required fields."); return; }
    router.push("/dashboard/testimonials");
    router.refresh();
  }

  async function onDelete() {
    if (!isEdit || !confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${initial!.id}`, { method: "DELETE" });
    router.push("/dashboard/testimonials");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 max-w-2xl">
      <div>
        <Label htmlFor="quote">Quote</Label>
        <Textarea id="quote" rows={4} value={v.quote} onChange={(e) => setV({ ...v, quote: e.target.value })} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" value={v.role} onChange={(e) => setV({ ...v, role: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" value={v.company} onChange={(e) => setV({ ...v, company: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" value={v.industry} onChange={(e) => setV({ ...v, industry: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input id="avatar" value={v.avatar} onChange={(e) => setV({ ...v, avatar: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="order">Order</Label>
          <Input id="order" type="number" value={v.order} onChange={(e) => setV({ ...v, order: Number(e.target.value) })} />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-[var(--color-navy)]">
        <input type="checkbox" checked={v.published} onChange={(e) => setV({ ...v, published: e.target.checked })} />
        Published
      </label>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : isEdit ? "Save" : "Create"}</Button>
        {isEdit && (
          <button type="button" onClick={onDelete} className="text-sm font-semibold text-red-500 hover:underline">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

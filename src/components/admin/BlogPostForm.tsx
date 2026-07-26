"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

export interface BlogPostData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  coverImage?: string | null;
  published?: boolean;
}

export default function BlogPostForm({ initial }: { initial?: BlogPostData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [v, setV] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    coverImage: initial?.coverImage ?? "",
    published: initial?.published ?? false,
  });

  function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = isEdit ? `/api/admin/blog/${initial!.id}` : "/api/admin/blog";
    const res = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(v),
    });
    setSaving(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body?.error ?? "Could not save.");
      return;
    }
    router.push("/dashboard/blog");
    router.refresh();
  }

  async function onDelete() {
    if (!isEdit || !confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${initial!.id}`, { method: "DELETE" });
    router.push("/dashboard/blog");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 max-w-3xl">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={v.title}
          onChange={(e) => setV({ ...v, title: e.target.value, slug: isEdit ? v.slug : slugify(e.target.value) })}
          required
        />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" value={v.slug} onChange={(e) => setV({ ...v, slug: e.target.value })} required />
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input id="excerpt" value={v.excerpt} onChange={(e) => setV({ ...v, excerpt: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input id="coverImage" value={v.coverImage} onChange={(e) => setV({ ...v, coverImage: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          rows={16}
          value={v.content}
          onChange={(e) => setV({ ...v, content: e.target.value })}
          required
        />
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

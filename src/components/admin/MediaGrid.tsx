"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export default function MediaGrid({ files }: { files: MediaItem[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function onDelete(id: string) {
    if (!confirm("Delete this file? This also removes it from storage.")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (!res.ok) { alert("Could not delete this file."); return; }
    router.refresh();
  }

  async function onCopy(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {files.map((f) => (
        <div key={f.id} className="group relative rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden">
          {f.type.startsWith("image/") ? (
            <Image
           src={f.url}
           alt={f.name}
           width={400}
           height={400}
         className="w-full aspect-square object-cover"
/>
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-[var(--color-off-white)] text-xs text-[var(--color-muted)] font-medium uppercase">
              {f.type.split("/")[1] ?? "file"}
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex justify-end gap-1 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onCopy(f.url)}
              className="px-2 py-1 rounded-[var(--radius-sm)] bg-black/60 text-white text-[10px] font-semibold hover:bg-black/80"
            >
              {copied === f.url ? "Copied" : "Copy URL"}
            </button>
            <button
              type="button"
              onClick={() => onDelete(f.id)}
              disabled={deleting === f.id}
              className="px-2 py-1 rounded-[var(--radius-sm)] bg-red-500/80 text-white text-[10px] font-semibold hover:bg-red-600 disabled:opacity-50"
            >
              {deleting === f.id ? "…" : "Delete"}
            </button>
          </div>

          <div className="p-2">
            <p className="text-xs text-[var(--color-navy)] truncate font-medium">{f.name}</p>
            <p className="text-[10px] text-[var(--color-muted)]">{(f.size / 1024).toFixed(0)} KB</p>
          </div>
        </div>
      ))}
    </div>
  );
}

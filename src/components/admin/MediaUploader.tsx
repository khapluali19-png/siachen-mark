"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing-client";

export default function MediaUploader() {
  const router = useRouter();
  const [uploaded, setUploaded] = useState<{ name: string; url: string }[]>([]);

  return (
    <div className="space-y-6">
      <UploadDropzone
        endpoint="mediaUploader"
        onClientUploadComplete={(files) => {
          setUploaded((prev) => [...prev, ...files.map((f) => ({ name: f.name, url: f.ufsUrl ?? f.url }))]);
          router.refresh();
        }}
        onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
        appearance={{
          container: "border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-xl)] bg-[var(--color-background)] p-10",
          label: "text-[var(--color-navy)] font-semibold",
          allowedContent: "text-[var(--color-muted)] text-xs",
          button: "bg-[var(--color-navy)] text-white rounded-[var(--radius-md)] px-5 py-2 text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors ut-uploading:opacity-60",
        }}
      />
      {uploaded.length > 0 && (
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
          <p className="text-sm font-semibold text-[var(--color-navy)] mb-3">Uploaded this session</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {uploaded.map((f, i) => (
              <div key={i} className="space-y-1">
                <Image
                  src={f.url}
                  alt={f.name}
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover rounded-[var(--radius-lg)] border border-[var(--color-border)]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <a href="/dashboard/media" className="inline-block text-sm font-semibold text-[var(--color-navy-bright)] hover:underline">
        ← Back to Media Library
      </a>
    </div>
  );
}

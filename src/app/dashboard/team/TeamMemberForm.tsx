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
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  title: z.string().max(100).optional().or(z.literal("")),
  bio: z.string().max(1000).optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().email("Must be a valid email").optional().or(z.literal("")),
  skills: z.string().optional().or(z.literal("")),
  location: z.string().max(100).optional().or(z.literal("")),
  department: z.string().max(100).optional().or(z.literal("")),
  isFounder: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.coerce.number().default(0),
});

type TeamFormData = z.infer<typeof schema>;

interface TeamMemberRecord {
  id?: string;
  name: string;
  role: string;
  title?: string | null;
  bio?: string | null;
  image?: string | null;
  linkedin?: string | null;
  email?: string | null;
  skills?: string[];
  location?: string | null;
  department?: string | null;
  isFounder?: boolean;
  isFeatured?: boolean;
  published?: boolean;
  order?: number;
}

export default function TeamMemberForm({ member }: { member?: TeamMemberRecord | null }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isEditing = Boolean(member?.id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: member?.name || "",
      role: member?.role || "",
      title: member?.title || "",
      bio: member?.bio || "",
      image: member?.image || "",
      linkedin: member?.linkedin || "",
      email: member?.email || "",
      skills: member?.skills ? member.skills.join(", ") : "",
      location: member?.location || "Islamabad, Pakistan",
      department: member?.department || "",
      isFounder: member?.isFounder ?? false,
      isFeatured: member?.isFeatured ?? false,
      published: member?.published ?? true,
      order: member?.order ?? 0,
    },
  });

  async function onSubmit(data: TeamFormData) {
    setErrorMsg(null);
    try {
      const skillsArray = data.skills
        ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const payload = {
        ...data,
        skills: skillsArray,
      };

      const url = isEditing ? `/api/admin/team/${member!.id}` : "/api/admin/team";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save team member");

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        router.push("/dashboard/team");
        router.refresh();
      }, 1000);
    } catch {
      setErrorMsg("An error occurred while saving.");
    }
  }

  async function handleDelete() {
    if (!isEditing || !confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/admin/team/${member!.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/dashboard/team");
      router.refresh();
    } catch {
      setErrorMsg("Failed to delete team member.");
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
            {isEditing ? `Edit Team Member — ${member?.name}` : "Add New Team Member"}
          </h2>
          <p className="text-xs text-[var(--color-muted)]">
            Fill in the details below to update profile information.
          </p>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-3 py-1.5 rounded text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
          >
            Delete Member
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" {...register("name")} placeholder="Basharat Ali" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="role">Role / Position *</Label>
          <Input id="role" {...register("role")} placeholder="Performance Marketer & Founder" />
          {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="title">Secondary Title (Optional)</Label>
          <Input id="title" {...register("title")} placeholder="Digital Marketing Lead" />
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <Input id="department" {...register("department")} placeholder="Paid Media / Leadership" />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Short Bio</Label>
        <textarea
          id="bio"
          rows={3}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
          {...register("bio")}
          placeholder="Brief professional summary..."
        />
      </div>

      {/* Image selector */}
      <div>
        <Label htmlFor="image">Profile Image URL</Label>
        <div className="flex gap-3">
          <Input id="image" {...register("image")} placeholder="/images/team/member.jpg or https://..." className="flex-1" />
          <a
            href="/dashboard/media"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-navy)] hover:bg-[var(--color-off-white)] flex items-center shrink-0"
          >
            📁 Media Library
          </a>
        </div>
        {watch("image") && (
          <div className="mt-3 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--color-border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={watch("image")} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs text-emerald-600 font-semibold">Image URL preview</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
          <Input id="linkedin" {...register("linkedin")} placeholder="https://linkedin.com/in/profile" />
          {errors.linkedin && <p className="text-xs text-red-500 mt-1">{errors.linkedin.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" {...register("email")} placeholder="member@siachenmark.com" />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="skills">Skills & Expertise (Comma-separated)</Label>
          <Input id="skills" {...register("skills")} placeholder="Meta Ads, Google Ads, GA4, Funnel Optimization" />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} placeholder="Islamabad, Pakistan" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--color-border)]">
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
            <span>Published (Active)</span>
          </label>
        </div>

        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer pb-2">
            <input
              type="checkbox"
              checked={watch("isFounder")}
              onChange={(e) => setValue("isFounder", e.target.checked)}
              className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
            />
            <span>Leadership / Founder</span>
          </label>
        </div>

        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer pb-2">
            <input
              type="checkbox"
              checked={watch("isFeatured")}
              onChange={(e) => setValue("isFeatured", e.target.checked)}
              className="w-4 h-4 text-[var(--color-navy-bright)] rounded"
            />
            <span>Featured Member</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : isEditing ? "Update Team Member" : "Create Team Member"}
        </Button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/team")}
          className="text-xs font-semibold text-[var(--color-muted)] hover:underline"
        >
          Cancel
        </button>
        {saved && <span className="text-sm font-semibold text-emerald-600">✓ Saved successfully!</span>}
        {errorMsg && <span className="text-sm font-semibold text-red-500">{errorMsg}</span>}
      </div>
    </form>
  );
}

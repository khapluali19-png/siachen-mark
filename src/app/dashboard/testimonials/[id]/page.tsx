import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import TestimonialForm from "@/components/admin/TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await db.testimonial.findUnique({ where: { id } });
  if (!t) notFound();

  return (
    <>
      <Topbar title="Edit Testimonial" />
      <main className="flex-1 p-6">
        <TestimonialForm
          initial={{
            id: t.id,
            quote: t.quote,
            name: t.name,
            role: t.role,
            company: t.company,
            industry: t.industry,
            avatar: t.avatar,
            published: t.published,
            order: t.order,
          }}
        />
      </main>
    </>
  );
}

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Topbar from "@/components/admin/Topbar";
import PortfolioForm from "../PortfolioForm";

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await db.portfolioProject.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <>
      <Topbar title={`Edit Project: ${project.title}`} />
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <a href="/dashboard/portfolio" className="text-xs font-semibold text-[var(--color-navy-bright)] hover:underline">
            ← Back to Portfolio List
          </a>
          <a
            href="/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[var(--color-navy-bright)] hover:underline"
          >
            View Live Portfolio ↗
          </a>
        </div>
        <PortfolioForm
          initialData={{
            id: project.id,
            title: project.title,
            slug: project.slug,
            category: project.category,
            clientName: project.clientName,
            services: project.services,
            description: project.description,
            challenge: project.challenge,
            solution: project.solution,
            result: project.result,
            coverImage: project.coverImage,
            projectUrl: project.projectUrl,
            featured: project.featured,
            published: project.published,
            order: project.order,
          }}
        />
      </main>
    </>
  );
}

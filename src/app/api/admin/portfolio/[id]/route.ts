import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await db.portfolioProject.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  return NextResponse.json(project);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const project = await db.portfolioProject.update({
    where: { id },
    data: {
      title: body.title !== undefined ? String(body.title).trim() : undefined,
      slug: body.slug !== undefined ? String(body.slug).trim() : undefined,
      category: body.category !== undefined ? String(body.category).trim() : undefined,
      clientName: body.clientName !== undefined ? (body.clientName ? String(body.clientName).trim() : null) : undefined,
      services: body.services !== undefined ? (Array.isArray(body.services) ? body.services : (typeof body.services === "string" ? body.services.split(",").map((s: string) => s.trim()).filter(Boolean) : [])) : undefined,
      description: body.description !== undefined ? String(body.description).trim() : undefined,
      challenge: body.challenge !== undefined ? (body.challenge ? String(body.challenge).trim() : null) : undefined,
      solution: body.solution !== undefined ? (body.solution ? String(body.solution).trim() : null) : undefined,
      result: body.result !== undefined ? (body.result ? String(body.result).trim() : null) : undefined,
      coverImage: body.coverImage !== undefined ? (body.coverImage ? String(body.coverImage).trim() : null) : undefined,
      images: body.images !== undefined ? (Array.isArray(body.images) ? body.images : []) : undefined,
      projectUrl: body.projectUrl !== undefined ? (body.projectUrl ? String(body.projectUrl).trim() : null) : undefined,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
      published: body.published !== undefined ? Boolean(body.published) : undefined,
      order: body.order !== undefined ? Number(body.order) || 0 : undefined,
    },
  });

  try {
    revalidatePath("/portfolio");
    revalidatePath("/sitemap.xml");
  } catch {}

  return NextResponse.json(project);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.portfolioProject.delete({ where: { id } });

  try {
    revalidatePath("/portfolio");
    revalidatePath("/sitemap.xml");
  } catch {}

  return NextResponse.json({ ok: true });
}

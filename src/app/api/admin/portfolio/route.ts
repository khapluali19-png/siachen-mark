import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await db.portfolioProject.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const title = String(body.title || "").trim();
  if (!title) return NextResponse.json({ error: "Project title is required" }, { status: 400 });

  const slug = String(body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")).trim();

  const project = await db.portfolioProject.create({
    data: {
      title,
      slug,
      category: String(body.category || "Performance Marketing").trim(),
      clientName: body.clientName ? String(body.clientName).trim() : null,
      services: Array.isArray(body.services) ? body.services : (typeof body.services === "string" ? body.services.split(",").map((s: string) => s.trim()).filter(Boolean) : []),
      description: String(body.description || "").trim(),
      challenge: body.challenge ? String(body.challenge).trim() : null,
      solution: body.solution ? String(body.solution).trim() : null,
      result: body.result ? String(body.result).trim() : null,
      coverImage: body.coverImage ? String(body.coverImage).trim() : null,
      images: Array.isArray(body.images) ? body.images : [],
      projectUrl: body.projectUrl ? String(body.projectUrl).trim() : null,
      featured: Boolean(body.featured),
      published: body.published !== undefined ? Boolean(body.published) : true,
      order: Number(body.order) || 0,
    },
  });

  try {
    revalidatePath("/portfolio");
    revalidatePath("/sitemap.xml");
  } catch {}

  return NextResponse.json(project, { status: 201 });
}

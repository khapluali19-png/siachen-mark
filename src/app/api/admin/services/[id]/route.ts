import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const service = await db.service.findUnique({ where: { id } });
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(service);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};
  if (body.title !== undefined) updateData.title = String(body.title).trim();
  if (body.slug !== undefined) updateData.slug = String(body.slug).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription ? String(body.shortDescription).trim() : null;
  if (body.description !== undefined) updateData.description = String(body.description).trim();
  if (body.icon !== undefined) updateData.icon = body.icon ? String(body.icon).trim() : null;
  if (body.image !== undefined) updateData.image = body.image ? String(body.image).trim() : null;
  if (body.features !== undefined) {
    updateData.features = Array.isArray(body.features)
      ? body.features
      : (body.features ? String(body.features).split(",").map((s: string) => s.trim()) : []);
  }
  if (body.benefits !== undefined) {
    updateData.benefits = Array.isArray(body.benefits)
      ? body.benefits
      : (body.benefits ? String(body.benefits).split(",").map((s: string) => s.trim()) : []);
  }
  if (body.process !== undefined) updateData.process = body.process;
  if (body.ctaText !== undefined) updateData.ctaText = body.ctaText ? String(body.ctaText).trim() : "Book a Strategy Call";
  if (body.ctaHref !== undefined) updateData.ctaHref = body.ctaHref ? String(body.ctaHref).trim() : "/contact";
  if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle ? String(body.seoTitle).trim() : null;
  if (body.seoDescription !== undefined) updateData.seoDescription = body.seoDescription ? String(body.seoDescription).trim() : null;
  if (body.order !== undefined) updateData.order = Number(body.order) || 0;
  if (body.published !== undefined) updateData.published = Boolean(body.published);
  if (body.featured !== undefined) updateData.featured = Boolean(body.featured);

  const service = await db.service.update({
    where: { id },
    data: updateData,
  });

  try {
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
  } catch {}

  return NextResponse.json(service);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const service = await db.service.delete({ where: { id } });

  try {
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
  } catch {}

  return NextResponse.json({ ok: true });
}

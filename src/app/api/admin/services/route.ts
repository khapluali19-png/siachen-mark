import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const services = await db.service.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = String(body.slug || body.title || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const service = await db.service.create({
    data: {
      title: String(body.title || "").trim(),
      slug: slug || `service-${Date.now()}`,
      shortDescription: body.shortDescription ? String(body.shortDescription).trim() : null,
      description: String(body.description || "").trim(),
      icon: body.icon ? String(body.icon).trim() : null,
      image: body.image ? String(body.image).trim() : null,
      features: Array.isArray(body.features)
        ? body.features
        : (body.features ? String(body.features).split(",").map((s) => s.trim()) : []),
      benefits: Array.isArray(body.benefits)
        ? body.benefits
        : (body.benefits ? String(body.benefits).split(",").map((s) => s.trim()) : []),
      process: body.process || undefined,
      ctaText: body.ctaText ? String(body.ctaText).trim() : "Book a Strategy Call",
      ctaHref: body.ctaHref ? String(body.ctaHref).trim() : "/contact",
      seoTitle: body.seoTitle ? String(body.seoTitle).trim() : null,
      seoDescription: body.seoDescription ? String(body.seoDescription).trim() : null,
      order: Number(body.order) || 0,
      published: body.published !== undefined ? Boolean(body.published) : true,
      featured: Boolean(body.featured),
    },
  });

  try {
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
  } catch {}

  return NextResponse.json(service);
}

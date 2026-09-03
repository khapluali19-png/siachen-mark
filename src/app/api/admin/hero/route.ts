import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const slides = await db.heroContent.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(slides);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const slide = await db.heroContent.create({
    data: {
      headline: String(body.headline || "Performance Marketing & Digital Growth").trim(),
      subline: String(body.subline || "We help ambitious businesses acquire customers, scale revenue, and build high-converting systems.").trim(),
      badge: body.badge ? String(body.badge).trim() : "Performance Marketing Agency",
      ctaPrimary: body.ctaPrimary ? String(body.ctaPrimary).trim() : "Book a Strategy Call",
      ctaPrimaryHref: body.ctaPrimaryHref ? String(body.ctaPrimaryHref).trim() : "/contact",
      ctaSecondary: body.ctaSecondary ? String(body.ctaSecondary).trim() : "Explore Our Services",
      ctaSecondaryHref: body.ctaSecondaryHref ? String(body.ctaSecondaryHref).trim() : "/services",
      backgroundImage: body.backgroundImage ? String(body.backgroundImage).trim() : null,
      overlayImage: body.overlayImage ? String(body.overlayImage).trim() : null,
      stats: Array.isArray(body.stats) ? body.stats : undefined,
      order: Number(body.order) || 0,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      slideDuration: Number(body.slideDuration) || 6,
    },
  });

  try {
    revalidatePath("/");
  } catch {}

  return NextResponse.json(slide);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const id = body.id;

  if (!id) {
    // Update or create single default slide
    const existing = await db.heroContent.findFirst();
    const slideData = {
      headline: String(body.headline || "Performance Marketing & Digital Growth").trim(),
      subline: String(body.subline || "").trim(),
      badge: body.badge ? String(body.badge).trim() : null,
      ctaPrimary: body.ctaPrimary ? String(body.ctaPrimary).trim() : "Book a Strategy Call",
      ctaPrimaryHref: body.ctaPrimaryHref ? String(body.ctaPrimaryHref).trim() : "/contact",
      ctaSecondary: body.ctaSecondary ? String(body.ctaSecondary).trim() : "Explore Our Services",
      ctaSecondaryHref: body.ctaSecondaryHref ? String(body.ctaSecondaryHref).trim() : "/services",
      backgroundImage: body.backgroundImage ? String(body.backgroundImage).trim() : null,
      stats: Array.isArray(body.stats) ? body.stats : undefined,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      slideDuration: Number(body.slideDuration) || 6,
    };

    const slide = existing
      ? await db.heroContent.update({ where: { id: existing.id }, data: slideData })
      : await db.heroContent.create({ data: slideData });

    try {
      revalidatePath("/");
    } catch {}

    return NextResponse.json(slide);
  }

  const slide = await db.heroContent.update({
    where: { id: String(id) },
    data: {
      headline: body.headline !== undefined ? String(body.headline).trim() : undefined,
      subline: body.subline !== undefined ? String(body.subline).trim() : undefined,
      badge: body.badge !== undefined ? (body.badge ? String(body.badge).trim() : null) : undefined,
      ctaPrimary: body.ctaPrimary !== undefined ? String(body.ctaPrimary).trim() : undefined,
      ctaPrimaryHref: body.ctaPrimaryHref !== undefined ? String(body.ctaPrimaryHref).trim() : undefined,
      ctaSecondary: body.ctaSecondary !== undefined ? String(body.ctaSecondary).trim() : undefined,
      ctaSecondaryHref: body.ctaSecondaryHref !== undefined ? String(body.ctaSecondaryHref).trim() : undefined,
      backgroundImage: body.backgroundImage !== undefined ? (body.backgroundImage ? String(body.backgroundImage).trim() : null) : undefined,
      stats: body.stats !== undefined ? (Array.isArray(body.stats) ? body.stats : undefined) : undefined,
      order: body.order !== undefined ? Number(body.order) || 0 : undefined,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined,
      slideDuration: body.slideDuration !== undefined ? Number(body.slideDuration) || 6 : undefined,
    },
  });

  try {
    revalidatePath("/");
  } catch {}

  return NextResponse.json(slide);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  await db.heroContent.delete({ where: { id } });

  try {
    revalidatePath("/");
  } catch {}

  return NextResponse.json({ ok: true });
}

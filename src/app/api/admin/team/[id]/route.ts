import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const member = await db.teamMember.findUnique({ where: { id } });
  if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(member);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = String(body.name).trim();
  if (body.role !== undefined) updateData.role = String(body.role).trim();
  if (body.title !== undefined) updateData.title = body.title ? String(body.title).trim() : null;
  if (body.bio !== undefined) updateData.bio = body.bio ? String(body.bio).trim() : null;
  if (body.image !== undefined) updateData.image = body.image ? String(body.image).trim() : null;
  if (body.linkedin !== undefined) updateData.linkedin = body.linkedin ? String(body.linkedin).trim() : null;
  if (body.email !== undefined) updateData.email = body.email ? String(body.email).trim() : null;
  if (body.skills !== undefined) {
    updateData.skills = Array.isArray(body.skills)
      ? body.skills
      : (body.skills ? String(body.skills).split(",").map((s: string) => s.trim()) : []);
  }
  if (body.location !== undefined) updateData.location = body.location ? String(body.location).trim() : "Islamabad, Pakistan";
  if (body.department !== undefined) updateData.department = body.department ? String(body.department).trim() : null;
  if (body.isFounder !== undefined) updateData.isFounder = Boolean(body.isFounder);
  if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
  if (body.published !== undefined) updateData.published = Boolean(body.published);
  if (body.order !== undefined) updateData.order = Number(body.order) || 0;
  if (body.stats !== undefined) updateData.stats = body.stats;

  const member = await db.teamMember.update({
    where: { id },
    data: updateData,
  });

  try {
    revalidatePath("/about");
  } catch {}

  return NextResponse.json(member);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.teamMember.delete({ where: { id } });

  try {
    revalidatePath("/about");
  } catch {}

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  quote:     z.string().min(1).max(2000).optional(),
  name:      z.string().min(1).max(120).optional(),
  role:      z.string().min(1).max(120).optional(),
  company:   z.string().max(160).optional(),
  industry:  z.string().max(120).optional(),
  avatar:    z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional(),
  order:     z.number().int().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const updated = await db.testimonial.update({ where: { id }, data: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

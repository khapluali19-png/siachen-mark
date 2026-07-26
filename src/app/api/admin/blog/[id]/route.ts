import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  title:      z.string().min(1).max(200).optional(),
  slug:       z.string().min(1).max(200).regex(/^[a-z0-9-]+$/).optional(),
  excerpt:    z.string().max(400).optional(),
  content:    z.string().min(1).optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  published:  z.boolean().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { published, ...rest } = parsed.data;
  const current = await db.blogPost.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await db.blogPost.update({
    where: { id },
    data: {
      ...rest,
      ...(published !== undefined && {
        published,
        publishedAt: published && !current.publishedAt ? new Date() : current.publishedAt,
      }),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

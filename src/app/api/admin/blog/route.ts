import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  title:      z.string().min(1).max(200),
  slug:       z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "lowercase, digits, hyphens only"),
  excerpt:    z.string().max(400).optional(),
  content:    z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  published:  z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { published, ...rest } = parsed.data;
  const exists = await db.blogPost.findUnique({ where: { slug: rest.slug } });
  if (exists) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });

  const created = await db.blogPost.create({
    data: { ...rest, published: published ?? false, publishedAt: published ? new Date() : null },
  });
  return NextResponse.json(created, { status: 201 });
}

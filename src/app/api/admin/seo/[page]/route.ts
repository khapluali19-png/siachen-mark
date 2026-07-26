import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  title:       z.string().max(120).optional(),
  description: z.string().max(320).optional(),
  ogTitle:     z.string().max(120).optional(),
  ogDesc:      z.string().max(320).optional(),
  ogImage:     z.string().url().optional().or(z.literal("")),
  canonical:   z.string().url().optional().or(z.literal("")),
  robots:      z.string().max(80).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { page } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const meta = await db.seoMeta.upsert({
    where: { page },
    update: parsed.data,
    create: { page, ...parsed.data },
  });

  return NextResponse.json(meta);
}

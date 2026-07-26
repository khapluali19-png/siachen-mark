import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  badge:            z.string().max(120).optional(),
  headline:         z.string().min(1).max(200),
  subline:          z.string().min(1).max(400),
  ctaPrimary:       z.string().min(1).max(80),
  ctaPrimaryHref:   z.string().max(200).optional(),
  ctaSecondary:     z.string().min(1).max(80),
  ctaSecondaryHref: z.string().max(200).optional(),
  stats:            z.array(z.object({ v: z.string(), l: z.string() })).optional(),
});

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const existing = await db.heroContent.findFirst();
  const data = { ...parsed.data, stats: parsed.data.stats ?? undefined };

  const hero = existing
  ? await db.heroContent.update({
      where: { id: existing.id },
      data,
    })
  : await db.heroContent.create({
      data,
    });

  return NextResponse.json(hero);
}

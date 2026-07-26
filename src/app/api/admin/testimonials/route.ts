import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  quote:     z.string().min(1).max(2000),
  name:      z.string().min(1).max(120),
  role:      z.string().min(1).max(120),
  company:   z.string().max(160).optional(),
  industry:  z.string().max(120).optional(),
  avatar:    z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional(),
  order:     z.number().int().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const created = await db.testimonial.create({ data: parsed.data });
  return NextResponse.json(created, { status: 201 });
}

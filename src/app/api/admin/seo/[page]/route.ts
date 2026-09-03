import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
  title: z.string().max(120).optional().or(z.literal("")),
  description: z.string().max(320).optional().or(z.literal("")),
  ogTitle: z.string().max(120).optional().or(z.literal("")),
  ogDesc: z.string().max(320).optional().or(z.literal("")),
  ogImage: z.string().url().optional().or(z.literal("")),
  canonical: z.string().url().optional().or(z.literal("")),
  robots: z.string().max(80).optional().or(z.literal("")),
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

  try {
    const routePath = page === "home" ? "/" : `/${page}`;
    revalidatePath(routePath);
    revalidatePath("/sitemap.xml");
  } catch {
    // Revalidation error ignored
  }

  return NextResponse.json(meta);
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await db.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return NextResponse.json(map);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Record<string, unknown>;

  const upserts = Object.entries(body)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) =>
      db.siteSetting.upsert({
        where: { key },
        update: { value: String(value).trim() },
        create: { key, value: String(value).trim() },
      })
    );

  await db.$transaction(upserts);

  // Invalidate cache so changes take effect immediately across all routes
  try {
    revalidatePath("/", "layout");
    revalidatePath("/services");
    revalidatePath("/about");
    revalidatePath("/portfolio");
    revalidatePath("/contact");
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
  } catch {
    // Revalidation error ignored
  }

  return NextResponse.json({ ok: true });
}

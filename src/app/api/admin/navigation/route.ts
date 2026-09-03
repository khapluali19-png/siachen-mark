import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await db.navigationItem.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const label = String(body.label || "").trim();
  const href = String(body.href || "").trim();
  if (!label || !href) {
    return NextResponse.json({ error: "Label and URL are required" }, { status: 400 });
  }

  const item = await db.navigationItem.create({
    data: {
      label,
      href,
      order: Number(body.order) || 0,
      enabled: body.enabled !== undefined ? Boolean(body.enabled) : true,
      isExternal: Boolean(body.isExternal),
    },
  });

  try {
    revalidatePath("/", "layout");
  } catch {}

  return NextResponse.json(item, { status: 201 });
}

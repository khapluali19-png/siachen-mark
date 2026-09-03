import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const item = await db.navigationItem.update({
    where: { id },
    data: {
      label: body.label !== undefined ? String(body.label).trim() : undefined,
      href: body.href !== undefined ? String(body.href).trim() : undefined,
      order: body.order !== undefined ? Number(body.order) || 0 : undefined,
      enabled: body.enabled !== undefined ? Boolean(body.enabled) : undefined,
      isExternal: body.isExternal !== undefined ? Boolean(body.isExternal) : undefined,
    },
  });

  try {
    revalidatePath("/", "layout");
  } catch {}

  return NextResponse.json(item);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.navigationItem.delete({ where: { id } });

  try {
    revalidatePath("/", "layout");
  } catch {}

  return NextResponse.json({ ok: true });
}

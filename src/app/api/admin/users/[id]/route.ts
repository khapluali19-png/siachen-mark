import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guard = await requireAdmin();
  if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });

  const user = await db.user.findUnique({
    where: { id: params.id },
    include: {
      auditReports: {
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          businessName: true,
          query: true,
          score: true,
          grade: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Remove password hash from response
  const { password, ...safeUser } = user;
  return NextResponse.json(safeUser);
}

const updateSchema = z.object({
  plan: z.enum(["FREE", "UNLIMITED"]).optional(),
  role: z.enum(["ADMIN", "EDITOR"]).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const guard = await requireAdmin();
  if ("error" in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const user = await db.user.update({
    where: { id: params.id },
    data: parsed.data,
    select: { id: true, name: true, email: true, plan: true, role: true },
  });

  return NextResponse.json(user);
}

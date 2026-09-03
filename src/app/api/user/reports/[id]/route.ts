import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const report = await db.auditReport.findUnique({ where: { id: params.id } });

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  // Enforce ownership — users can only access their own reports
  if (report.userId !== session.user.id && (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(report);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const report = await db.auditReport.findUnique({ where: { id: params.id } });

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
  if (report.userId !== session.user.id && (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.auditReport.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

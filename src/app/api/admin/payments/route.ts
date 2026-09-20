import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status");

  const whereClause: any = {};
  if (statusFilter && ["PENDING", "APPROVED", "REJECTED"].includes(statusFilter.toUpperCase())) {
    whereClause.status = statusFilter.toUpperCase();
  }

  const paymentRequests = await db.paymentRequest.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          plan: true,
          scanCount: true,
        },
      },
    },
  });

  return NextResponse.json(paymentRequests);
}

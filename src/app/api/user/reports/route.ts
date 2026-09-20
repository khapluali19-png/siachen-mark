import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const FREE_LIMIT = 10;

const reportSchema = z.object({
  businessName: z.string().min(1).max(200),
  query:        z.string().min(1).max(500),
  address:      z.string().max(300).optional(),
  phone:        z.string().max(50).optional(),
  website:      z.string().max(300).optional(),
  rating:       z.number().min(0).max(5).optional(),
  reviewCount:  z.number().int().min(0).optional(),
  score:        z.number().int().min(0).max(100),
  grade:        z.string().max(5),
  issuesCount:  z.number().int().min(0).optional(),
  data:         z.record(z.any()),
});

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reports = await db.auditReport.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      businessName: true,
      query: true,
      address: true,
      score: true,
      grade: true,
      issuesCount: true,
      rating: true,
      reviewCount: true,
      createdAt: true,
    },
  });

  return NextResponse.json(reports);
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


  const body = await req.json();
  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  // Atomic credit deduction for FREE plan
  if (user.plan === "FREE") {
    const updated = await db.user.updateMany({
      where: {
        id: user.id,
        plan: "FREE",
        scanCount: { lt: FREE_LIMIT },
      },
      data: {
        scanCount: { increment: 1 },
      },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { error: "Free plan limit reached. Upgrade to Unlimited for more scans.", limitReached: true },
        { status: 403 }
      );
    }
  }

  const { issuesCount = 0, ...rest } = parsed.data;

  const report = await db.auditReport.create({
    data: {
      ...rest,
      issuesCount,
      userId: user.id,
    },
  });

  return NextResponse.json(report, { status: 201 });
}

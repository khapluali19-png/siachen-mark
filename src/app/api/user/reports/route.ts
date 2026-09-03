import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
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

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reports = await db.auditReport.findMany({
    where: { userId: session.user.id },
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
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Get fresh user data
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, scanCount: true },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Enforce free limit server-side
  if (user.plan === "FREE" && user.scanCount >= FREE_LIMIT) {
    return NextResponse.json(
      { error: "Free plan limit reached. Upgrade to Unlimited for more scans.", limitReached: true },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const { issuesCount = 0, ...rest } = parsed.data;

  const report = await db.auditReport.create({
    data: {
      ...rest,
      issuesCount,
      userId: session.user.id,
    },
  });

  // Increment scan count
  await db.user.update({
    where: { id: session.user.id },
    data: { scanCount: { increment: 1 } },
  });

  return NextResponse.json(report, { status: 201 });
}

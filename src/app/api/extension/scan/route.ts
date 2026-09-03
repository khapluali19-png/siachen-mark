import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const FREE_LIMIT = 10;

const scanSchema = z.object({
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

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "")?.trim();

  if (!token) return NextResponse.json({ error: "Token required" }, { status: 401 });

  const extToken = await db.extensionToken.findUnique({
    where: { token },
    include: { user: { select: { id: true, plan: true, scanCount: true } } },
  });

  if (!extToken) return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  if (extToken.revoked) return NextResponse.json({ error: "Token revoked" }, { status: 401 });
  if (extToken.expiresAt < new Date()) return NextResponse.json({ error: "Token expired" }, { status: 401 });

  const { user } = extToken;

  // Enforce plan limit server-side
  if (user.plan === "FREE" && user.scanCount >= FREE_LIMIT) {
    return NextResponse.json(
      { error: "Free plan limit reached. Please upgrade to Unlimited.", limitReached: true },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = scanSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const { issuesCount = 0, ...rest } = parsed.data;

  const report = await db.auditReport.create({
    data: { ...rest, issuesCount, userId: user.id },
  });

  await db.user.update({
    where: { id: user.id },
    data: { scanCount: { increment: 1 } },
  });

  const newCount = user.scanCount + 1;
  const remaining = user.plan === "UNLIMITED" ? null : Math.max(0, FREE_LIMIT - newCount);

  return NextResponse.json({ report, remaining }, { status: 201 });
}

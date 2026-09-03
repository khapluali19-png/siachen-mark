import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "")?.trim();

  if (!token) return NextResponse.json({ error: "Token required" }, { status: 401 });

  const extToken = await db.extensionToken.findUnique({
    where: { token },
    include: { user: { select: { id: true, name: true, email: true, plan: true, scanCount: true } } },
  });

  if (!extToken) return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  if (extToken.revoked) return NextResponse.json({ error: "Token revoked" }, { status: 401 });
  if (extToken.expiresAt < new Date()) return NextResponse.json({ error: "Token expired" }, { status: 401 });

  const FREE_LIMIT = 10;
  const { user } = extToken;
  const remaining = user.plan === "UNLIMITED" ? null : Math.max(0, FREE_LIMIT - user.scanCount);

  return NextResponse.json({
    valid: true,
    user: { ...user, remaining, freeLimit: FREE_LIMIT },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkAndExpireSubscription } from "@/lib/subscription";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "")?.trim();

  if (!token) return NextResponse.json({ error: "Token required" }, { status: 401 });

  const extToken = await db.extensionToken.findUnique({
    where: { token },
  });

  if (!extToken) return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  if (extToken.revoked) return NextResponse.json({ error: "Token revoked" }, { status: 401 });
  if (extToken.expiresAt < new Date()) return NextResponse.json({ error: "Token expired" }, { status: 401 });

  const activeUser = await checkAndExpireSubscription(extToken.userId);
  if (!activeUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const FREE_LIMIT = 10;
  const remaining = activeUser.plan === "UNLIMITED" ? null : Math.max(0, FREE_LIMIT - activeUser.scanCount);

  return NextResponse.json({
    valid: true,
    user: { ...activeUser, remaining, freeLimit: FREE_LIMIT },
  });
}

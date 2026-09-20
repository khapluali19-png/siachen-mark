import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";
import { checkAndExpireSubscription } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user?.password) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  // Revoke old tokens for this user
  await db.extensionToken.updateMany({
    where: { userId: user.id, revoked: false },
    data: { revoked: true },
  });

  // Create a new 30-day token
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await db.extensionToken.create({
    data: { userId: user.id, token, expiresAt },
  });

  // Update lastLoginAt
  await db.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  // Evaluate real-time subscription status and expiration
  const subState = await checkAndExpireSubscription(user.id);
  const activeUser = subState || user;
  const FREE_LIMIT = 10;
  const remaining = activeUser.plan === "UNLIMITED" ? null : Math.max(0, FREE_LIMIT - activeUser.scanCount);

  return NextResponse.json({
    token,
    expiresAt: expiresAt.toISOString(),
    user: {
      id: activeUser.id,
      name: activeUser.name,
      email: activeUser.email,
      plan: activeUser.plan,
      subscriptionStatus: activeUser.subscriptionStatus,
      subscriptionEnd: activeUser.subscriptionEnd,
      scanCount: activeUser.scanCount,
      remaining,
    },
  });
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      scanCount: true,
      role: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const FREE_LIMIT = 10;
  const remaining = user.plan === "UNLIMITED" ? null : Math.max(0, FREE_LIMIT - user.scanCount);

  return NextResponse.json({ ...user, remaining, freeLimit: FREE_LIMIT });
}

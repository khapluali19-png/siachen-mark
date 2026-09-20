import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { checkAndExpireSubscription } from "@/lib/subscription";

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const activeUser = await checkAndExpireSubscription(user.id);
  const u = activeUser || user;

  const FREE_LIMIT = 10;
  const remaining = u.plan === "UNLIMITED" ? null : Math.max(0, FREE_LIMIT - u.scanCount);

  return NextResponse.json({ ...u, remaining, freeLimit: FREE_LIMIT });
}



import { db } from "@/lib/db";

export async function checkAndExpireSubscription(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      subscriptionStatus: true,
      subscriptionStart: true,
      subscriptionEnd: true,
      scanCount: true,
      role: true,
      emailVerified: true,
    },
  });

  if (!user) return null;

  // Check if Unlimited plan has expired
  if (user.plan === "UNLIMITED" && user.subscriptionEnd) {
    if (new Date(user.subscriptionEnd) <= new Date()) {
      // Subscription has expired -> downgrade user plan to FREE and status to EXPIRED
      const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
          plan: "FREE",
          subscriptionStatus: "EXPIRED",
        },
        select: {
          id: true,
          name: true,
          email: true,
          plan: true,
          subscriptionStatus: true,
          subscriptionStart: true,
          subscriptionEnd: true,
          scanCount: true,
          role: true,
          emailVerified: true,
        },
      });

      return {
        ...updatedUser,
        isExpired: true,
        remaining: Math.max(0, 10 - updatedUser.scanCount),
      };
    }
  }

  const FREE_LIMIT = 10;
  const remaining = user.plan === "UNLIMITED" ? null : Math.max(0, FREE_LIMIT - user.scanCount);

  return {
    ...user,
    isExpired: user.subscriptionStatus === "EXPIRED",
    remaining,
  };
}

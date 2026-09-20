import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendPaymentApprovalEmail } from "@/lib/mail";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await getAuthUser(req);
    if (!adminUser || adminUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required." }, { status: 403 });
    }

    const { id } = params;

    // Check payment request exists
    const paymentRequest = await db.paymentRequest.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!paymentRequest) {
      return NextResponse.json({ error: "Payment request not found." }, { status: 404 });
    }

    // Security: Prevent duplicate approval or approving an already rejected/approved request
    if (paymentRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: `Payment request is already ${paymentRequest.status.toLowerCase()}.` },
        { status: 400 }
      );
    }

    const now = new Date();
    const expiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Atomic Database Transaction
    const [updatedRequest, updatedUser] = await db.$transaction([
      db.paymentRequest.update({
        where: { id },
        data: {
          status: "APPROVED",
          reviewedAt: now,
          reviewedBy: adminUser.id,
        },
      }),
      db.user.update({
        where: { id: paymentRequest.userId },
        data: {
          plan: "UNLIMITED",
          subscriptionStatus: "ACTIVE",
          subscriptionStart: now,
          subscriptionEnd: expiry,
        },
      }),
    ]);

    // Send email notification to user
    sendPaymentApprovalEmail({
      email: paymentRequest.user.email,
      name: paymentRequest.user.name || "Valued Customer",
      amount: paymentRequest.amount,
      start: now,
      expiry,
    }).catch(console.error);

    return NextResponse.json({
      ok: true,
      message: "Payment approved successfully. Unlimited plan activated for 30 days.",
      paymentRequest: updatedRequest,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        plan: updatedUser.plan,
        subscriptionStatus: updatedUser.subscriptionStatus,
        subscriptionEnd: updatedUser.subscriptionEnd,
      },
    });
  } catch (error: any) {
    console.error("Approve payment error:", error);
    return NextResponse.json({ error: error?.message || "Failed to approve payment." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendPaymentRejectionEmail } from "@/lib/mail";
import { z } from "zod";

const schema = z.object({
  rejectionReason: z.string().max(500).optional(),
});

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
    const body = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(body);
    const rejectionReason = parsed.success ? parsed.data.rejectionReason : undefined;

    // Check payment request exists
    const paymentRequest = await db.paymentRequest.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!paymentRequest) {
      return NextResponse.json({ error: "Payment request not found." }, { status: 404 });
    }

    // Security: Prevent processing already approved/rejected requests
    if (paymentRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: `Payment request is already ${paymentRequest.status.toLowerCase()}.` },
        { status: 400 }
      );
    }

    const now = new Date();

    // Update payment request to REJECTED (user plan remains unchanged)
    const updatedRequest = await db.paymentRequest.update({
      where: { id },
      data: {
        status: "REJECTED",
        rejectionReason: rejectionReason || "Payment verification failed or invalid receipt.",
        reviewedAt: now,
        reviewedBy: adminUser.id,
      },
    });

    // Send email notification to user
    sendPaymentRejectionEmail({
      email: paymentRequest.user.email,
      name: paymentRequest.user.name || "Valued Customer",
      transactionId: paymentRequest.transactionId,
      reason: updatedRequest.rejectionReason || undefined,
    }).catch(console.error);

    return NextResponse.json({
      ok: true,
      message: "Payment request rejected.",
      paymentRequest: updatedRequest,
    });
  } catch (error: any) {
    console.error("Reject payment error:", error);
    return NextResponse.json({ error: error?.message || "Failed to reject payment." }, { status: 500 });
  }
}

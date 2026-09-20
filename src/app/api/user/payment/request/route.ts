import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendPaymentConfirmationEmail } from "@/lib/mail";
import { z } from "zod";

const schema = z.object({
  senderName:    z.string().min(2).max(100),
  transactionId: z.string().min(3).max(100),
  paymentDate:   z.string().optional(),
  amount:        z.number().optional().default(1000),
  paymentMethod: z.string().optional().default("EASYPAISA"),
  screenshotUrl: z.string().min(1),
});

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's latest payment request
  const latestRequest = await db.paymentRequest.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ paymentRequest: latestRequest });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const { senderName, transactionId, paymentDate, amount, paymentMethod, screenshotUrl } = parsed.data;

    // Create PaymentRequest with PENDING status
    // CRITICAL SECURITY RULE: User plan remains FREE! Do NOT upgrade user.plan here!
    const paymentRequest = await db.paymentRequest.create({
      data: {
        userId: user.id,
        amount: amount || 1000,
        paymentMethod: paymentMethod || "EASYPAISA",
        senderName,
        transactionId,
        paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
        screenshotUrl,
        status: "PENDING",
      },
    });

    // Dispatch confirmation email to verified user
    sendPaymentConfirmationEmail({
      email: user.email,
      name: senderName || user.name || "Valued Customer",
      amount: paymentRequest.amount,
      transactionId: paymentRequest.transactionId,
    }).catch(console.error);

    return NextResponse.json(
      {
        ok: true,
        message: "Payment submitted. Your request is waiting for admin approval.",
        paymentRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Payment request error:", error);
    return NextResponse.json({ error: error?.message || "Failed to submit payment request." }, { status: 500 });
  }
}

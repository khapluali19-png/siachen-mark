import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validations";
import { sendSubmissionEmail } from "@/lib/mail";
import { rateLimit, getIp } from "@/lib/rate-limit";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`forgot:${ip}`, 3, 300_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  // Always return 200 to avoid user enumeration
  if (!user) return NextResponse.json({ ok: true });

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await db.passwordReset.create({ data: { userId: user.id, token, expires } });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await sendSubmissionEmail({
    subject: "Password Reset Request",
    fields: {
      Name: user.name ?? user.email,
      "Reset Link": resetUrl,
    },
  }).catch(console.error);

  return NextResponse.json({ ok: true });
}

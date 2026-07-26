import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { token, password } = parsed.data;

  const reset = await db.passwordReset.findUnique({ where: { token } });
  if (!reset || reset.used || reset.expires < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 12);

  await db.$transaction([
    db.user.update({ where: { id: reset.userId }, data: { password: hash } }),
    db.passwordReset.update({ where: { id: reset.id }, data: { used: true } }),
  ]);

  return NextResponse.json({ ok: true });
}

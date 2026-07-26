import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { careerApplicationSchema } from "@/lib/validations";
import { sendSubmissionEmail } from "@/lib/mail";
import { rateLimit, getIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(`career:${ip}`, 3, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const parsed = careerApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;
  const userAgent = req.headers.get("user-agent") ?? undefined;

  const application = await db.careerApplication.create({
    data: { ...data, ip },
  });

  await sendSubmissionEmail({
    subject: "New Career Application",
    fields: {
      Name:    data.name,
      Email:   data.email,
      Phone:   data.phone,
      Message: data.message,
    },
    ip,
    userAgent,
  }).catch(console.error);

  return NextResponse.json({ id: application.id }, { status: 201 });
}

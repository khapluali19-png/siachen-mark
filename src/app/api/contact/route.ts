import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations";
import { sendSubmissionEmail } from "@/lib/mail";
import { rateLimit, getIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    console.error("[contact] Validation failed:", JSON.stringify(flat));
    return NextResponse.json({ error: flat }, { status: 422 });
  }

  const data = parsed.data;
  const userAgent = req.headers.get("user-agent") ?? undefined;

  // 1) Save the lead FIRST. If this throws, we never send the email.
  let submission;
  try {
    submission = await db.contactSubmission.create({
      data: {
        name:       data.name,
        company:    data.company,
        email:      data.email,
        phone:      data.phone,
        industry:   data.industry,
        service:    data.service,
        budget:     data.budget,
        message:    data.message,
        sourcePage: data.sourcePage,
        ip,
        userAgent,
        // status defaults to NEW via schema
      },
    });
  } catch (err) {
    console.error("[contact] Failed to save submission:", err);
    return NextResponse.json({ error: "Could not save your message. Please try again." }, { status: 500 });
  }

  // 2) Lead is saved — send the admin email. A failure here must NOT drop the lead.
  try {
    await sendSubmissionEmail({
      subject: "New Contact Form Submission",
      fields: {
        "Full Name": data.name,
        Company:     data.company,
        Email:       data.email,
        Phone:       data.phone,
        Service:     data.service,
        Budget:      data.budget,
        Message:     data.message,
        "Source Page": data.sourcePage,
      },
      ip,
      userAgent,
    });
  } catch (err) {
    // Lead is already persisted and visible in the dashboard — just log the email error.
    console.error(`[contact] Lead ${submission.id} saved but admin email failed:`, err);
  }

  return NextResponse.json({ id: submission.id }, { status: 201 });
}

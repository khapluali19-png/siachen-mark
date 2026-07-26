import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface SubmissionMailOptions {
  subject: string;
  fields: Record<string, string | undefined>;
  ip?: string;
  userAgent?: string;
}

export async function sendSubmissionEmail({ subject, fields, ip, userAgent }: SubmissionMailOptions) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#0a1e6e;white-space:nowrap">${k}</td><td style="padding:6px 12px">${v}</td></tr>`)
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0a1e6e;padding:24px 32px">
        <h1 style="color:white;margin:0;font-size:20px">Siachen Mark — ${subject}</h1>
      </div>
      <div style="padding:24px 32px;background:#f4f5f9">
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden">
          ${rows}
          <tr><td style="padding:6px 12px;font-weight:600;color:#0a1e6e">Time</td><td style="padding:6px 12px">${new Date().toISOString()}</td></tr>
          ${ip ? `<tr><td style="padding:6px 12px;font-weight:600;color:#0a1e6e">IP</td><td style="padding:6px 12px">${ip}</td></tr>` : ""}
          ${userAgent ? `<tr><td style="padding:6px 12px;font-weight:600;color:#0a1e6e">User Agent</td><td style="padding:6px 12px;font-size:12px">${userAgent}</td></tr>` : ""}
        </table>
        <div style="margin-top:20px">
          <a href="${process.env.ADMIN_DASHBOARD_URL}" style="background:#0a1e6e;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px">
            View in Dashboard
          </a>
        </div>
      </div>
    </div>`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: `[Siachen Mark] ${subject}`,
    html,
  });
}

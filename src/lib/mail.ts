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

interface PaymentMailOptions {
  email: string;
  name: string;
  amount: number;
  transactionId: string;
}

export async function sendPaymentConfirmationEmail({ email, name, amount, transactionId }: PaymentMailOptions) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f4f5f9;border-radius:12px;overflow:hidden">
      <div style="background:#0a1e6e;padding:24px 32px;text-align:center">
        <h1 style="color:white;margin:0;font-size:22px">🏔 Siachen Mark</h1>
        <p style="color:#94a3b8;margin:6px 0 0 0;font-size:14px">Payment Request Received</p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#0a1e6e;margin-top:0">Hello ${name},</h2>
        <p style="color:#334155;font-size:15px;line-height:1.6">
          Thank you for submitting your payment request for the <strong>Unlimited Plan</strong>. We have received your payment proof and details.
        </p>
        <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e2e8f0;margin:20px 0">
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9">
            <span style="color:#64748b;font-weight:600">Plan</span>
            <strong style="color:#0a1e6e">Unlimited Plan (30 Days)</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9">
            <span style="color:#64748b;font-weight:600">Amount</span>
            <strong style="color:#0a1e6e">PKR ${amount.toLocaleString()}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9">
            <span style="color:#64748b;font-weight:600">Transaction ID</span>
            <strong style="color:#0a1e6e">${transactionId}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0">
            <span style="color:#64748b;font-weight:600">Status</span>
            <span style="background:#fef3c7;color:#d97706;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:700">AWAITING ADMIN APPROVAL</span>
          </div>
        </div>
        <p style="color:#64748b;font-size:14px;line-height:1.6">
          Your request is currently being verified by our admin team. Once approved, your account will be upgraded to the Unlimited Plan automatically.
        </p>
      </div>
      <div style="background:#e2e8f0;padding:16px;text-align:center;font-size:12px;color:#64748b">
        Siachen Mark — Google Business Profile Data Scraping & Audit Tool
      </div>
    </div>`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "[Siachen Mark] Payment Request Received — Awaiting Verification",
    html,
  }).catch(console.error);
}

interface PaymentApprovalMailOptions {
  email: string;
  name: string;
  amount: number;
  start: Date;
  expiry: Date;
}

export async function sendPaymentApprovalEmail({ email, name, amount, start, expiry }: PaymentApprovalMailOptions) {
  const startStr = start.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const expiryStr = expiry.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f4f5f9;border-radius:12px;overflow:hidden">
      <div style="background:#10b981;padding:24px 32px;text-align:center">
        <h1 style="color:white;margin:0;font-size:22px">🎉 Unlimited Plan Activated!</h1>
        <p style="color:#e6f4ea;margin:6px 0 0 0;font-size:14px">Siachen Mark GBP Auditor</p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#0a1e6e;margin-top:0">Hello ${name},</h2>
        <p style="color:#334155;font-size:15px;line-height:1.6">
          Great news! Your payment request for the <strong>Unlimited Plan</strong> has been verified and approved by admin.
        </p>
        <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e2e8f0;margin:20px 0">
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9">
            <span style="color:#64748b;font-weight:600">Plan</span>
            <strong style="color:#10b981">Unlimited Plan (30 Days)</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9">
            <span style="color:#64748b;font-weight:600">Amount</span>
            <strong style="color:#0a1e6e">PKR ${amount.toLocaleString()}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9">
            <span style="color:#64748b;font-weight:600">Activated On</span>
            <strong style="color:#0a1e6e">${startStr}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 0">
            <span style="color:#64748b;font-weight:600">Expires On</span>
            <strong style="color:#ef4444">${expiryStr}</strong>
          </div>
        </div>
        <p style="color:#334155;font-size:14px;line-height:1.6">
          You now have 30 days of unlimited business profile scraping and GBP audits via your dashboard and Chrome Extension.
        </p>
        <div style="margin-top:24px;text-align:center">
          <a href="${appUrl}/dashboard.html" style="background:#0a1e6e;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block">
            Open Dashboard →
          </a>
        </div>
      </div>
      <div style="background:#e2e8f0;padding:16px;text-align:center;font-size:12px;color:#64748b">
        Siachen Mark — Google Business Profile Data Scraping & Audit Tool
      </div>
    </div>`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "🚀 Your Siachen Mark Unlimited Plan Has Been Approved!",
    html,
  }).catch(console.error);
}

interface PaymentRejectionMailOptions {
  email: string;
  name: string;
  transactionId: string;
  reason?: string;
}

export async function sendPaymentRejectionEmail({ email, name, transactionId, reason }: PaymentRejectionMailOptions) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f4f5f9;border-radius:12px;overflow:hidden">
      <div style="background:#ef4444;padding:24px 32px;text-align:center">
        <h1 style="color:white;margin:0;font-size:22px">Payment Request Update</h1>
        <p style="color:#fee2e2;margin:6px 0 0 0;font-size:14px">Siachen Mark GBP Auditor</p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#0a1e6e;margin-top:0">Hello ${name},</h2>
        <p style="color:#334155;font-size:15px;line-height:1.6">
          We reviewed your recent payment submission for Transaction ID: <strong>${transactionId}</strong>. Unfortunately, we were unable to verify this transaction.
        </p>
        ${reason ? `
        <div style="background:#fef2f2;padding:16px;border-radius:8px;border:1px solid #fecaca;margin:20px 0">
          <strong style="color:#dc2626;display:block;margin-bottom:4px;font-size:13px;text-transform:uppercase">Reason for Rejection:</strong>
          <span style="color:#7f1d1d;font-size:14px">${reason}</span>
        </div>` : ""}
        <p style="color:#64748b;font-size:14px;line-height:1.6">
          Please verify your payment receipt details and submit a new request through your dashboard.
        </p>
        <div style="margin-top:24px;text-align:center">
          <a href="${appUrl}/dashboard.html" style="background:#0a1e6e;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block">
            Submit New Payment →
          </a>
        </div>
      </div>
      <div style="background:#e2e8f0;padding:16px;text-align:center;font-size:12px;color:#64748b">
        Siachen Mark — Google Business Profile Data Scraping & Audit Tool
      </div>
    </div>`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Siachen Mark Payment Request Update",
    html,
  }).catch(console.error);
}



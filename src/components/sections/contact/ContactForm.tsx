"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/tracking";

const SERVICE_OPTIONS = [
  "Performance Marketing",
  "SEO & Content",
  "Branding & Identity",
  "Web Design & Development",
  "Social Media Management",
  "Full-Funnel Tracking & Analytics",
  "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [messageError, setMessageError] = useState("");
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setServerError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Spam protection honeypot
    const honeypot = String(fd.get("website_url") ?? "");
    if (honeypot.trim()) {
      // Bot filled hidden field
      setStatus("sent");
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? "") || undefined,
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      industry: String(fd.get("industry") ?? "") || undefined,
      service: String(fd.get("service") ?? "") || undefined,
      budget: String(fd.get("budget") ?? "") || undefined,
      message: String(fd.get("message") ?? ""),
      sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
    };

    if (payload.message.trim().length < 10) {
      setMessageError("Please enter at least 10 characters describing your project.");
      setStatus("idle");
      return;
    }

    setMessageError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed");
      }

      // Primary conversion events
      trackEvent("generate_lead", {
        category: "conversion",
        label: payload.service || "general_inquiry",
        source: payload.sourcePage,
        service: payload.service,
      });
      trackEvent("contact_form_submit", {
        category: "contact_form",
        label: payload.service || "general_inquiry",
      });

      form.reset();
      setStatus("sent");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again or message us on WhatsApp.";
      setServerError(msg);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot field for bot spam prevention */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url">Do not fill this</label>
        <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "sent" && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-green-200 bg-green-50 p-5 animate-fade-up"
        >
          <svg viewBox="0 0 20 20" className="w-5 h-5 mt-0.5 shrink-0 text-green-600" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-base font-bold text-green-800">Message Received!</p>
            <p className="mt-1 text-sm text-green-700 leading-relaxed">
              Thank you for reaching out. Our strategy team will review your business details and get back to you with a clear action plan.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" placeholder="Your name" required aria-required="true" />
        </div>
        <div>
          <Label htmlFor="company">Company <span className="text-[var(--color-muted)] font-normal text-xs">(optional)</span></Label>
          <Input id="company" name="company" placeholder="Your company name" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="you@company.com" required aria-required="true" />
        </div>
        <div>
          <Label htmlFor="phone">Phone / WhatsApp <span className="text-[var(--color-muted)] font-normal text-xs">(optional)</span></Label>
          <Input id="phone" name="phone" type="tel" placeholder="+92 300 0000000" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="industry">Business / Industry</Label>
          <Input id="industry" name="industry" placeholder="e.g. E-commerce, Clinic, Real Estate" />
        </div>
        <div>
          <Label htmlFor="budget">Monthly Budget Range <span className="text-[var(--color-muted)] font-normal text-xs">(optional)</span></Label>
          <Input id="budget" name="budget" placeholder="e.g. $1,000/mo or project-based" />
        </div>
      </div>

      <div>
        <Label htmlFor="service">Service of Interest *</Label>
        <select
          id="service"
          name="service"
          required
          aria-required="true"
          className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] transition"
        >
          <option value="">Select a primary service</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message">Project Overview / Goals *</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your current challenges, growth goals, and target timeline."
          required
          aria-required="true"
          onChange={() => {
            if (messageError) setMessageError("");
          }}
        />
        {messageError && (
          <p className="mt-2 text-xs font-semibold text-red-600" role="alert">
            {messageError}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="rounded-[var(--radius-md)] bg-red-50 border border-red-200 p-3.5 text-xs text-red-700" role="alert">
          {serverError || "Something went wrong. Please check your details or connect with us directly via WhatsApp."}
        </div>
      )}

      <div className="pt-2">
        <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? "Sending Request…" : "Send Message & Request Audit"}
        </Button>
      </div>

      {/* UX reassurance */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] pt-1">
        <svg viewBox="0 0 16 16" className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8.5l3 3 7-7.5" />
        </svg>
        <span>We respect your privacy. No spam, no high-pressure sales calls.</span>
      </div>
    </form>
  );
}
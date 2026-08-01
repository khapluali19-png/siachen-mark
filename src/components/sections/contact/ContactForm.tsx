"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const SERVICE_OPTIONS = [
  "Performance Marketing",
  "SEO & Content",
  "Branding & Identity",
  "Web Design & Development",
  "Social Media Management",
  "WhatsApp & AI Automation",
  "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [messageError, setMessageError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const fd = new FormData(form);
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

    if (payload.message.trim().length < 20) {
      setMessageError(
        "Please enter at least 20 characters so we can better understand your project requirements."
      );
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

      if (!res.ok) throw new Error("Request failed");

      // Google Tag Manager Event
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "generate_lead",
          form_name: "contact_form",
          form_location: "contact_page",
        });
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "sent" && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-green-200 bg-green-50 p-4 animate-fade-up"
        >
          <svg viewBox="0 0 20 20" className="w-5 h-5 mt-0.5 shrink-0 text-green-600" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-green-800">Message received!</p>
            <p className="text-sm text-green-700">
              Thanks for reaching out — we&apos;ll get back to you with next steps. No pressure, no generic pitch.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div>
          <Label htmlFor="company">Company <span className="text-[var(--color-muted)] font-normal">(optional)</span></Label>
          <Input id="company" name="company" placeholder="Your company" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone <span className="text-[var(--color-muted)] font-normal">(optional)</span></Label>
          <Input id="phone" name="phone" type="tel" placeholder="+92 300 0000000" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="industry">Business / Industry</Label>
          <Input id="industry" name="industry" placeholder="e.g. E-commerce, Real Estate" required />
        </div>
        <div>
          <Label htmlFor="budget">Budget <span className="text-[var(--color-muted)] font-normal">(optional)</span></Label>
          <Input id="budget" name="budget" placeholder="e.g. $1,000/mo or one-time $5k" />
        </div>
      </div>

      <div>
        <Label htmlFor="service">What do you need help with?</Label>
        <select
          id="service"
          name="service"
          required
          className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] transition"
        >
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us a bit about your business and what you're looking to achieve."
          required
          onChange={() => {
            if (messageError) setMessageError("");
          }}
        />
        {messageError && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            {messageError}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500" role="alert">
          Something went wrong. Please try again or reach us on WhatsApp.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
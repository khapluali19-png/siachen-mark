"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-off-white)] px-4">
      <div className="w-full max-w-sm bg-[var(--color-background)] rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] p-8">
        <p className="font-extrabold text-xl text-[var(--color-navy)] text-center mb-6">Reset Password</p>
        {sent ? (
          <p className="text-sm text-[var(--color-muted)] text-center">
            If an account exists for that email, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send Reset Link"}
            </Button>
          </form>
        )}
        <div className="mt-4 text-center">
          <a href="/login" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors">Back to login</a>
        </div>
      </div>
    </div>
  );
}

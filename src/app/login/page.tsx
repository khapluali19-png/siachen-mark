"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setError("");
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.error) { setError("Invalid email or password."); return; }
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-off-white)] px-4">
      <div className="w-full max-w-sm bg-[var(--color-background)] rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] p-8">
        <div className="mb-8 text-center">
          <p className="font-extrabold text-xl text-[var(--color-navy)]">Siachen Mark</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}

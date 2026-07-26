import { z } from "zod";

// Trims strings; turns "" / whitespace-only into undefined so `.optional()`
// fields accept empty submissions instead of failing with a 422.
const optionalText = (max: number) =>
  z.preprocess(
    (v) => {
      if (typeof v !== "string") return v;
      const t = v.trim();
      return t === "" ? undefined : t;
    },
    z.string().max(max).optional()
  );

const requiredText = (min: number, max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : v),
    z.string().min(min).max(max)
  );

export const contactSchema = z.object({
  name:       requiredText(2, 100),
  company:    optionalText(150),
  email:      z.preprocess((v) => (typeof v === "string" ? v.trim() : v), z.string().email()),
  phone:      optionalText(30),
  industry:   optionalText(100),
  service:    optionalText(100),
  budget:     optionalText(100),
  message:    requiredText(10, 2000),
  sourcePage: optionalText(200),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});

export const careerApplicationSchema = z.object({
  careerId: z.string().cuid(),
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  phone:    z.string().max(30).optional(),
  message:  z.string().max(1000).optional(),
});

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
});

export const changePasswordSchema = z.object({
  current:  z.string().min(8),
  password: z.string().min(8),
  confirm:  z.string().min(8),
}).refine((d) => d.password === d.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token:    z.string(),
  password: z.string().min(8),
  confirm:  z.string().min(8),
}).refine((d) => d.password === d.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

export type ContactInput            = z.infer<typeof contactSchema>;
export type NewsletterInput         = z.infer<typeof newsletterSchema>;
export type CareerApplicationInput  = z.infer<typeof careerApplicationSchema>;
export type LoginInput              = z.infer<typeof loginSchema>;
export type ChangePasswordInput     = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput     = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput      = z.infer<typeof resetPasswordSchema>;

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Session cookie check (NextAuth default cookies)
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAdminRoute = pathname.startsWith("/dashboard");
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  // Agar user dashboard par bina login ke jaye -> redirect to /login
  if (isAdminRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Agar user already logged in ho aur login page par jaye -> redirect to /dashboard
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/forgot-password", "/reset-password"],
};
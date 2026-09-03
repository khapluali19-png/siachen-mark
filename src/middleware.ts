import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // Support /admin alias routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    const targetPath = pathname.replace(/^\/admin/, "/dashboard") || "/dashboard";
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/user");

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect already-logged-in users away from auth pages
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/auth/redirect", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/user/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};

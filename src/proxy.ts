/**
 * Next.js Middleware
 * Protects /admin/dashboard and all sub-routes
 * Redirects unauthenticated users to /admin login
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, TOKEN_NAME } from "@/lib/auth";

// Routes that require authentication
const PROTECTED_ADMIN_ROUTES = [
  "/admin/dashboard",
  "/admin/inquiries",
  "/admin/gallery",
  "/admin/testimonials",
  "/admin/banners",
];

// API routes that require authentication
const PROTECTED_API_ROUTES = [
  "/api/admin/stats",
  "/api/admin/inquiries",
  "/api/admin/gallery",
  "/api/admin/testimonials",
  "/api/admin/banners",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if route needs protection
  const isProtectedPage = PROTECTED_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedApi = PROTECTED_API_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = req.cookies.get(TOKEN_NAME)?.value;

  if (!token) {
    if (isProtectedApi) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    // Redirect to admin login
    const loginUrl = new URL("/admin", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  const payload = verifyToken(token);
  if (!payload) {
    if (isProtectedApi) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired session" },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/admin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Attach user info to headers for downstream use
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-admin-id", payload.id);
  requestHeaders.set("x-admin-email", payload.email);
  requestHeaders.set("x-admin-role", payload.role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/inquiries/:path*",
    "/admin/gallery/:path*",
    "/admin/testimonials/:path*",
    "/admin/banners/:path*",
    "/api/admin/stats",
    "/api/admin/inquiries/:path*",
    "/api/admin/gallery/:path*",
    "/api/admin/testimonials/:path*",
    "/api/admin/banners/:path*",
  ],
};

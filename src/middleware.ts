import { NextResponse } from "next/server";
import { checkAuth } from "@/src/app/utils/auth";

// List of admin-only routes
const adminRoutes = [
  "/dashboard/subscription-plans",
  "/dashboard/users",
  "/dashboard/all-publications",
];

export async function middleware(req: any) {
  const { isAuthenticated, isAdmin } = await checkAuth();

  const { pathname } = req.nextUrl;

  // Check if the route is an admin route
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access if authenticated and authorized
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to all routes starting with /dashboard
};

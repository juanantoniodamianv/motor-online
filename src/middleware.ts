import { NextResponse } from "next/server";
import { checkAuth } from "@/src/app/utils/auth";

// List of admin-only routes
const adminRoutes = [
  "/dashboard/subscription-plans",
  "/dashboard/users",
  "/dashboard/all-publications",
];

// Middleware to handle admin route protection
export async function middleware(req: any) {
  const { isAuthenticated, isAdmin } = await checkAuth();

  const { pathname } = req.nextUrl;

  // Check if the route is an admin route
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect non-admin users trying to access admin routes
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access if authenticated and authorized
  return NextResponse.next();
}

// Define the routes to apply middleware
export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to all routes starting with /dashboard
};

import { NextResponse } from "next/server";
import { storageKeys } from "./constants/storage-keys";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
export function middleware(request) {
  const cookie = request.cookies.get(storageKeys.AUTH_TOKEN);
  const role = request.cookies.get(storageKeys.ROLE);

  const isUser = role?.value === "USER";
  const isAdmin = role?.value === "ADMIN";
  const isAuthenticated = Boolean(cookie?.value);
  const pathname = request.nextUrl.pathname;

  const userShouldRedirect =
    isAuthenticated &&
    isUser &&
    (pathname === "/dashboard" || pathname === "/login");

  const adminShouldRedirect =
    isAuthenticated &&
    isAdmin &&
    (pathname === "/admin" || pathname === "/login-admin");

  if (userShouldRedirect) {
    return NextResponse.redirect(new URL("/dashboard/training", request.url));
  }

  if (adminShouldRedirect) {
    return NextResponse.redirect(
      new URL("/admin/management-user/trainee", request.url),
    );
  }

  return NextResponse.next();
}

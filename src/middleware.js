import { NextResponse } from "next/server";
// import { storageKeys } from "./constants/storage-keys";

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
  // const cookie = request.cookies.get(storageKeys.AUTH_TOKEN);
  // const role = request.cookies.get(storageKeys.ROLE);
  // if (request.nextUrl.pathname === '/' && cookie?.value && role === 'TRAINEE') {
  //   return NextResponse.redirect(new URL('/trainee/skema', request.url));
  // }
  // if (request.nextUrl.pathname === '/' && cookie?.value && role === 'ADMIN') {
  //   return NextResponse.redirect(new URL('/admin/manajemen-skema', request.url));
  // }
  // if (
  //   request.nextUrl.pathname.includes('/trainee') &&
  //   !cookie?.value &&
  //   !request.nextUrl.pathname.includes('/login/trainee')
  // ) {
  //   return NextResponse.redirect(new URL('/login/trainee', request.url));
  // }
  // if (
  //   request.nextUrl.pathname.includes('/admin') &&
  //   !cookie?.value &&
  //   !request.nextUrl.pathname.includes('/login/admin')
  // ) {
  //   return NextResponse.redirect(new URL('/login/admin', request.url));
  // }
}

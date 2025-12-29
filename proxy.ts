import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/profile"];

// This function can be marked `async` if using `await` inside
export async function proxy(req: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url))
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return res; // public route
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  // matcher: "/about/:path*", // to tell where to run this middleware / proxy
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ], // to tell where to run this middleware / proxy
};

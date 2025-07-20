import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected paths that require authentication
  const protectedPaths = [/\/shipping-address/, /\/payment-method/, /\/place-order/, /\/profile/, /\/user\/(.*)/, /\/order\/(.*)/, /\/admin/];

  // Check if current path is protected
  const isProtectedPath = protectedPaths.some((pattern) => pattern.test(pathname));

  if (isProtectedPath) {
    try {
      // Get the token to check authentication
      const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
        // Add cookieName to match NextAuth configuration
        cookieName: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      });

      console.log("Middleware - Path:", pathname, "Token exists:", !!token);

      if (!token) {
        console.log("No token found, redirecting to sign-in");
        // Create absolute URL for redirect
        const signInUrl = new URL("/sign-in", request.url);
        // Add callback URL to return after sign-in
        signInUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(signInUrl);
      }
    } catch (error) {
      console.error("Middleware error:", error);
      // If there's an error getting the token, redirect to sign-in
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Handle session cart ID cookie
  const response = NextResponse.next();

  if (!request.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    response.cookies.set("sessionCartId", sessionCartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;
}

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

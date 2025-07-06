import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const protectedPaths = [/^\/(shipping-address|payment-method|place-order|profile|user\/.*|order\/.*|admin)/];

  if (!session && protectedPaths.some((regex) => regex.test(pathname))) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // optional: set sessionCartId cookie if missing
  if (!request.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    const response = NextResponse.next();
    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  }

  return NextResponse.next();
}

import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const checkPublicPath = path === "/sign-in" || path === "/sign-up";

  // Try to get the token from cookies
  const token = request.cookies.get("token")?.value;

  // If on public path and already authenticated, redirect to home
  if (checkPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If on protected route and not authenticated, redirect to sign-in
  if (!checkPublicPath && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/sign-in", "/sign-up"],
};

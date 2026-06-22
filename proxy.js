import { NextResponse } from "next/server";

const API_URL = "http://localhost:8080";
const AUTH_COOKIE = "token";

async function getUser(request) {
  const authCookie = request.cookies.get(AUTH_COOKIE);
  if (!authCookie) return null;

  const response = await fetch(`${API_URL}/api/me`, {
    headers: { cookie: request.headers.get("cookie") ?? "" },
  });

  if (!response.ok) return null;
  return response.json();
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const user = await getUser(request);

  if (pathname.startsWith("/auth")) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth"],
};

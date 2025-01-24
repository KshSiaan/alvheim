import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

interface UserJWTPayload extends JWTPayload {
  id: string;
  username: string;
  email: string;
  role: string;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const secret = new TextEncoder().encode("raven");

  async function verifyToken(
    token: string | undefined
  ): Promise<UserJWTPayload | null> {
    if (!token) {
      console.log("Token not assigned");
      return null;
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      return payload as UserJWTPayload;
    } catch (err) {
      console.error("JWT verification failed: ", err);
      return null;
    }
  }

  // Redirect unauthenticated users to login page
  if (path !== "/" && path !== "/register" && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from login and register pages
  if ((path === "/" || path === "/register") && token) {
    const userData = await verifyToken(token);
    if (userData) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  }

  // Check for admin access
  if (path.startsWith("/admin")) {
    const userData = await verifyToken(token);
    if (!userData || userData.role !== "admin") {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
  }

  // Verify token for protected routes
  if (path === "/profile" || path === "/settings" || path === "/create-post") {
    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow request to proceed if no redirect conditions are met
  return NextResponse.next();
}

// Apply middleware to specified routes
export const config = {
  matcher: [
    "/",
    "/register",
    "/admin/:path*",
    "/profile",
    "/settings",
    "/create-post",
    "/feed/:path*",
  ],
};

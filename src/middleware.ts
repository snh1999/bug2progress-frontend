import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_PATH,
  AUTH_TOKEN_KEY,
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
} from "./app.constants";
import { verifyJwtToken } from "./lib/jwt-verify";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const { pathname } = request.nextUrl;

  const payload = authToken ? await verifyJwtToken(authToken) : null;
  const isLoggedIn = authToken && payload;

  const isAuthenticatedPath = !(
    pathname === LOGIN_PATH || pathname === REGISTER_PATH
  );

  if (!isLoggedIn && isAuthenticatedPath) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (
    isLoggedIn &&
    !pathname.startsWith(ADMIN_PATH) &&
    payload.role === "ADMIN"
  ) {
    return NextResponse.redirect(new URL(ADMIN_PATH, request.url));
  }

  if (isLoggedIn && !isAuthenticatedPath) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)"],
};

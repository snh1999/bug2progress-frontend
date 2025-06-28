import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN_KEY, LOGIN_PATH, REGISTER_PATH } from "./app.constants";
import { verifyJwtToken } from "./lib/jwt-verify";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = authToken && verifyJwtToken(authToken);
  const isAuthenticatedPath = !(
    pathname === LOGIN_PATH || pathname === REGISTER_PATH
  );

  if (!isLoggedIn && isAuthenticatedPath) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (isLoggedIn && !isAuthenticatedPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [`/((?!login|register))`],
// };

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

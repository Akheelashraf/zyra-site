import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LANGS = ["en", "ar"];
const LEGACY_PATHS = ["about", "services", "projects", "contact", "thank-you", "privacy-policy"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root → /en
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  // Legacy path without lang (e.g. /about) → /en/about
  const segment = pathname.replace(/^\//, "").split("/")[0];
  if (LEGACY_PATHS.includes(segment) && !VALID_LANGS.includes(segment)) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/about", "/services", "/projects", "/contact", "/thank-you", "/privacy-policy"],
};

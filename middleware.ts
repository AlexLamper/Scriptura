import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for API routes
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }

  // Check if the path already has a language prefix
  const pathnameHasLang = languages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  // Determine the current language
  let currentLang;
  if (pathnameHasLang) {
    currentLang = pathname.split("/")[1];
  } else if (req.cookies.has(cookieName)) {
    currentLang = req.cookies.get(cookieName)?.value;
  } else {
    currentLang =
      acceptLanguage.get(req.headers.get("Accept-Language")) || fallbackLng;
  }

  // Ensure currentLang is a supported language
  if (!languages.includes(currentLang)) {
    currentLang = fallbackLng;
  }

  // If the path doesn't have a language prefix, redirect to the path with the language prefix
  if (!pathnameHasLang) {
    return NextResponse.redirect(new URL(`/${currentLang}${pathname}`, req.url));
  }

  // Create a response object
  const response = NextResponse.next();

  // Always set the language cookie
  response.cookies.set(cookieName, currentLang, { path: "/" });

  // Authentication handling
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect logged-in users from `/` to `/dashboard`
  if (session && pathname === `/${currentLang}`) {
    return NextResponse.redirect(new URL(`/${currentLang}/dashboard`, req.url));
  }

  // Redirect unauthenticated users away from `/dashboard` and `/admin`
  if (!session && (pathname.endsWith("/dashboard") || pathname.endsWith("/admin"))) {
    return NextResponse.redirect(new URL(`/${currentLang}/`, req.url));
  }

  return response;
}

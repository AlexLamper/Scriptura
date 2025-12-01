import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

function getLocale(request: NextRequest): string {
  // 1. Check if there's a saved locale preference in the cookie
  const savedLocale = request.cookies.get(cookieName)?.value;
  if (savedLocale && languages.includes(savedLocale)) {
    return savedLocale;
  }

  // 2. Use the Accept-Language header to determine the preferred locale
  const acceptLanguageHeader = request.headers.get('accept-language');
  if (acceptLanguageHeader) {
    try {
      const headers = { 'accept-language': acceptLanguageHeader };
      const userLanguages = new Negotiator({ headers }).languages();
      const matchedLocale = match(userLanguages, languages, fallbackLng);
      return matchedLocale;
    } catch (error) {
      // If matching fails, fall back to default
      console.warn('Locale matching failed:', error);
    }
  }

  // 3. Fall back to the default locale
  return fallbackLng;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for API routes
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "https://scriptura.cloud");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }

  const locale = getLocale(req);
  const response = NextResponse.next();

  // Set the locale cookie if it's missing or different
  if (!req.cookies.has(cookieName) || req.cookies.get(cookieName)?.value !== locale) {
    response.cookies.set(cookieName, locale, { 
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  }

  // Authentication handling
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect logged-in users from `/` to `/study`
  if (session && pathname === `/`) {
    return NextResponse.redirect(new URL(`/study`, req.url));
  }

  // Redirect unauthenticated users away from `/study` and `/admin`
  if (!session && (pathname.startsWith("/study") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  return response;
}

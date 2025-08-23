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
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }

  // Check if the path already has a language prefix
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If there's no locale in the pathname, redirect to add the appropriate locale
  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    const redirectUrl = new URL(`/${locale}${pathname}`, req.url);
    const response = NextResponse.redirect(redirectUrl);
    
    // Set the locale cookie for future requests
    response.cookies.set(cookieName, locale, { 
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false, // Allow client-side access for language switcher
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    return response;
  }

  // If we reach here, the pathname already has a locale
  // Extract the current locale from the pathname
  const currentLocale = pathname.split("/")[1];

  // Create a response object
  const response = NextResponse.next();

  // Set or update the language cookie
  response.cookies.set(cookieName, currentLocale, { 
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false, // Allow client-side access for language switcher
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  // Authentication handling
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect logged-in users from `/` to `/dashboard`
  if (session && pathname === `/${currentLocale}`) {
    return NextResponse.redirect(new URL(`/${currentLocale}/dashboard`, req.url));
  }

  // Redirect unauthenticated users away from `/dashboard` and `/admin`
  if (!session && (pathname.endsWith("/dashboard") || pathname.endsWith("/admin"))) {
    return NextResponse.redirect(new URL(`/${currentLocale}/`, req.url));
  }

  return response;
}

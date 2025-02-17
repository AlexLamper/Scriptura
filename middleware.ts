import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    '/', 
    '/dashboard', 
    '/admin',
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'
  ]
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get language preference
  const lng = req.cookies.has(cookieName)
    ? acceptLanguage.get(req.cookies.get(cookieName)?.value)
    : acceptLanguage.get(req.headers.get('Accept-Language')) || fallbackLng;

  // Redirect if language in path is not supported
  if (!languages.some(loc => pathname.startsWith(`/${loc}`)) && !pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
  }

  // Store language preference in a cookie
  const response = NextResponse.next();
  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer')!);
    const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`));
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
  }

  // Authentication handling
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect logged-in users from `/` to `/dashboard`
  if (session && pathname === `/${lng}`) {
    return NextResponse.redirect(new URL(`/${lng}/dashboard`, req.url));
  }

  // Redirect unauthenticated users away from `/dashboard` and `/admin`
  if (!session && [`/${lng}/dashboard`, `/${lng}/admin`].includes(pathname)) {
    return NextResponse.redirect(new URL(`/${lng}/`, req.url));
  }

  return response;
}

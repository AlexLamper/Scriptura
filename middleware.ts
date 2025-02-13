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
  let lng;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // Redirect if language in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer')!);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  // Authentication handling
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (session && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!session && (pathname === '/dashboard' || pathname === '/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
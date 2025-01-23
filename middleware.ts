// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Retrieve the session token from the request
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If the user is authenticated and trying to access the root page, redirect to the dashboard
  if (session && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If the user is not authenticated and trying to access a protected route, redirect to the root page
  if (!session && (pathname === '/dashboard' || pathname === '/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

// Configure the middleware to apply to all routes
export const config = {
  matcher: ['/', '/dashboard', '/admin'],
};

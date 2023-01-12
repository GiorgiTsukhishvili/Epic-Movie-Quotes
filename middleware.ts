import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, GUEST_ROUTE } from 'config';

export function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const cookies = request.cookies.getAll();
  const userIsLoggedIn = cookies.some((cookie) => cookie.name === 'isLoggedIn');
  const { pathname } = request.nextUrl;

  if (pathname === GUEST_ROUTE && userIsLoggedIn) {
    response = NextResponse.rewrite(new URL('/news-feed', request.url));
  }
  for (const route of AUTH_ROUTES) {
    if (pathname.includes(route) && !userIsLoggedIn) {
      response = NextResponse.rewrite(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/news-feed', '/', '/movies', '/movies/:path*'],
};

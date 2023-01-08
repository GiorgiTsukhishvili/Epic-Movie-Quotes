import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, GUEST_ROUTE } from 'config';

export function middleware(request: NextRequest) {
  const cookies = request.cookies.getAll();
  const userHasToken = cookies.some((cookie) => cookie.name === 'XSRF-TOKEN');
  const { pathname } = request.nextUrl;

  if (pathname === GUEST_ROUTE && userHasToken) {
    return NextResponse.rewrite(new URL('/news-feed', request.url));
  }

  for (const route of AUTH_ROUTES) {
    if (route === pathname && !userHasToken) {
      return NextResponse.rewrite(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/news-feed', '/'],
};

import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const isLoggedIn = request.cookies.get('authToken');

  // Define the protected routes
  const protectedRoutes = ['/attendance', '/dashboard', '/qrcodescan'];

  // Check if the current path is one of the protected routes
  if (!isLoggedIn && protectedRoutes.some(route => url.pathname.startsWith(route))) {
    url.pathname = '/login'; // Redirect to login if not logged in
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply the middleware to the desired routes
export const config = {
  matcher: ['/attendance', '/dashboard', '/qrcodescan'], // Protect specific routes
};

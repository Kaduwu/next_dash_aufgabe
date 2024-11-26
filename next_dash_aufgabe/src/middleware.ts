import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for the token in cookies
  const token = request.cookies.get('token')?.value;
  console.log(token);
  // Redirect to login if token is not present for protected routes
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Allow the request to proceed if token is present
  return NextResponse.next();
}

// Specify protected routes
export const config = {
  matcher: ['/dashboard/:path*'], // Adjust for other protected routes as needed
};

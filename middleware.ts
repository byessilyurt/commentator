import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const { pathname } = request.nextUrl;

    // Check if the request is for a protected commentator route
    if (pathname.startsWith('/commentator') && pathname !== '/commentator/apply') {
        // Check for authentication token in cookies
        const token = request.cookies.get('token')?.value;
        
        if (!token) {
            // Redirect to login with return URL
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/commentator/:path*'
    ]
};
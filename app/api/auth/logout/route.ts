import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // Create response that clears the token cookie
    const response = NextResponse.json({ success: true });

    // Clear cookie
    response.cookies.set({
        name: 'token',
        value: '',
        httpOnly: true,
        expires: new Date(0), // Expire immediately
        path: '/',
    });

    return response;
} 
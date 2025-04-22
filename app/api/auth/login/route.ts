import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { comparePassword, generateToken } from '../../../lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const passwordValid = await comparePassword(password, user.password);
        if (!passwordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate token
        const token = generateToken(user.id);

        // Create response with cookie
        const response = NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });

        // Set cookie
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Failed to log in' },
            { status: 500 }
        );
    }
} 
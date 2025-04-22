import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '../../../lib/auth';

export async function GET(req: NextRequest) {
    try {
        const { user, error } = await getUserFromRequest(req);

        if (error || !user) {
            return NextResponse.json(
                { error: error || 'Not authenticated' },
                { status: 401 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        );
    }
} 
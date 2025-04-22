import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'commentator-secret-key';
const SALT_ROUNDS = 10;

// Hash password
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare password with hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (error) {
        return null;
    }
}

// Get user from request
export async function getUserFromRequest(req: NextRequest): Promise<{ user: any, error: string | null }> {
    try {
        // Get token from Authorization header or cookies
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : req.cookies.get('token')?.value;

        if (!token) {
            return { user: null, error: 'No token provided' };
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return { user: null, error: 'Invalid token' };
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true }
        });

        if (!user) {
            return { user: null, error: 'User not found' };
        }

        return { user, error: null };
    } catch (error) {
        console.error('Auth error:', error);
        return { user: null, error: 'Authentication failed' };
    }
} 
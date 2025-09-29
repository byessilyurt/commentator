import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const now = new Date();
        const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const matches = await prisma.match.findMany({
            where: {
                status: 'scheduled',
                scheduledTime: {
                    gte: now,
                    lte: sevenDaysFromNow
                }
            },
            include: {
                commentaries: {
                    where: {
                        status: {
                            in: ['scheduled', 'live']
                        }
                    },
                    include: {
                        commentator: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                scheduledTime: 'asc'
            }
        });

        return NextResponse.json({ matches });
    } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        return NextResponse.json(
            { error: 'Failed to fetch upcoming matches' },
            { status: 500 }
        );
    }
}
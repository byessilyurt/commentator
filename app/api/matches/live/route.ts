import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const matches = await prisma.match.findMany({
            where: {
                status: 'live'
            },
            include: {
                commentaries: {
                    where: {
                        status: 'live'
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
                },
                events: {
                    orderBy: {
                        timestamp: 'desc'
                    },
                    take: 10 // Last 10 events
                }
            },
            orderBy: {
                scheduledTime: 'asc'
            }
        });

        return NextResponse.json({ matches });
    } catch (error) {
        console.error('Error fetching live matches:', error);
        return NextResponse.json(
            { error: 'Failed to fetch live matches' },
            { status: 500 }
        );
    }
}
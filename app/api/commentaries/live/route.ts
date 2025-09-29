import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const matchId = searchParams.get('matchId');
        const language = searchParams.get('language');

        const whereClause: any = {
            status: 'live'
        };

        if (matchId) {
            whereClause.matchId = matchId;
        }

        if (language) {
            whereClause.language = language;
        }

        const commentaries = await prisma.commentary.findMany({
            where: whereClause,
            include: {
                commentator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                match: {
                    select: {
                        id: true,
                        league: true,
                        homeTeam: true,
                        awayTeam: true,
                        scheduledTime: true,
                        status: true
                    }
                },
                events: {
                    orderBy: {
                        timestamp: 'desc'
                    },
                    take: 5
                }
            },
            orderBy: {
                viewCount: 'desc'
            }
        });

        return NextResponse.json({ commentaries });
    } catch (error) {
        console.error('Error fetching live commentaries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch live commentaries' },
            { status: 500 }
        );
    }
}
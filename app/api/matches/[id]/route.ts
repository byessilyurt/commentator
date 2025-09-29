import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const match = await prisma.match.findUnique({
            where: { id },
            include: {
                commentaries: {
                    include: {
                        commentator: {
                            select: {
                                id: true,
                                name: true,
                                email: true
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
                        createdAt: 'desc'
                    }
                },
                events: {
                    orderBy: {
                        timestamp: 'desc'
                    }
                }
            }
        });

        if (!match) {
            return NextResponse.json(
                { error: 'Match not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ match });
    } catch (error) {
        console.error('Error fetching match:', error);
        return NextResponse.json(
            { error: 'Failed to fetch match' },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { getUserFromRequest } from '../../../../lib/auth';

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { user, error } = await getUserFromRequest(req);
        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: matchId } = params;
        const { type, team, player, minute, description } = await req.json();

        // Validate required fields
        if (!type || typeof minute !== 'number') {
            return NextResponse.json(
                { error: 'Type and minute are required' },
                { status: 400 }
            );
        }

        // Verify match exists
        const match = await prisma.match.findUnique({
            where: { id: matchId }
        });

        if (!match) {
            return NextResponse.json(
                { error: 'Match not found' },
                { status: 404 }
            );
        }

        // Create match event
        const matchEvent = await prisma.matchEvent.create({
            data: {
                matchId,
                type,
                team,
                player,
                minute,
                description,
                timestamp: new Date()
            }
        });

        return NextResponse.json(matchEvent, { status: 201 });
    } catch (error) {
        console.error('Error creating match event:', error);
        return NextResponse.json(
            { error: 'Failed to create match event' },
            { status: 500 }
        );
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id: matchId } = params;

        const events = await prisma.matchEvent.findMany({
            where: { matchId },
            orderBy: {
                timestamp: 'desc'
            }
        });

        return NextResponse.json({ events });
    } catch (error) {
        console.error('Error fetching match events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch match events' },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');
        const title = searchParams.get('title');

        if (!url) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            );
        }

        // Get current live matches
        const liveMatches = await prisma.match.findMany({
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
                }
            }
        });

        // Try to match based on URL patterns
        let detectedMatch = null;

        for (const match of liveMatches) {
            // Check if URL matches any of the stored patterns
            for (const pattern of match.streamUrlPatterns) {
                if (url.includes(pattern)) {
                    detectedMatch = match;
                    break;
                }
            }

            if (detectedMatch) break;

            // Fuzzy match based on title if provided
            if (title) {
                const titleLower = title.toLowerCase();
                const homeTeamLower = match.homeTeam.toLowerCase();
                const awayTeamLower = match.awayTeam.toLowerCase();

                if (titleLower.includes(homeTeamLower) && titleLower.includes(awayTeamLower)) {
                    detectedMatch = match;
                    break;
                }
            }
        }

        if (detectedMatch) {
            return NextResponse.json({
                match: detectedMatch,
                confidence: 'high'
            });
        }

        // If no exact match, return all live matches for manual selection
        return NextResponse.json({
            match: null,
            confidence: 'none',
            suggestions: liveMatches
        });
    } catch (error) {
        console.error('Error detecting match:', error);
        return NextResponse.json(
            { error: 'Failed to detect match' },
            { status: 500 }
        );
    }
}
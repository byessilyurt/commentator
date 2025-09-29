import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';
import { extractYouTubeVideoId, validateYouTubeUrl } from '../../../lib/youtube';

// Create new commentary stream
export async function POST(req: NextRequest) {
    try {
        const { user, error } = await getUserFromRequest(req);
        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is a commentator
        const commentator = await prisma.user.findUnique({
            where: { id: user.id }
        });

        if (!commentator?.isCommentator) {
            return NextResponse.json(
                { error: 'User is not authorized as a commentator' },
                { status: 403 }
            );
        }

        const { matchId, youtubeStreamUrl, language, title, description } = await req.json();

        // Validate required fields
        if (!matchId || !youtubeStreamUrl) {
            return NextResponse.json(
                { error: 'Match ID and YouTube stream URL are required' },
                { status: 400 }
            );
        }

        // Validate YouTube URL
        if (!validateYouTubeUrl(youtubeStreamUrl)) {
            return NextResponse.json(
                { error: 'Invalid YouTube URL' },
                { status: 400 }
            );
        }

        // Extract video ID
        const youtubeStreamId = extractYouTubeVideoId(youtubeStreamUrl);
        if (!youtubeStreamId) {
            return NextResponse.json(
                { error: 'Could not extract YouTube video ID' },
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

        // Create commentary
        const commentary = await prisma.commentary.create({
            data: {
                matchId,
                commentatorId: user.id,
                title: title || `${match.homeTeam} vs ${match.awayTeam} - ${user.name}`,
                description,
                youtubeStreamUrl,
                youtubeStreamId,
                language: language || 'en',
                status: 'scheduled',
                audioUrl: youtubeStreamUrl // For backward compatibility
            },
            include: {
                commentator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                match: true
            }
        });

        return NextResponse.json(commentary, { status: 201 });
    } catch (error) {
        console.error('Error creating commentary:', error);
        return NextResponse.json(
            { error: 'Failed to create commentary' },
            { status: 500 }
        );
    }
}
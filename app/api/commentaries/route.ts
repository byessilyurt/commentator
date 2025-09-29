import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { getUserFromRequest } from '../../lib/auth';
import { extractYouTubeVideoId, validateYouTubeUrl } from '../../lib/youtube';

// GET /api/commentaries - Get all commentaries
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const matchId = searchParams.get('matchId');
        const status = searchParams.get('status');
        const language = searchParams.get('language');

        const whereClause: any = {};

        if (matchId) {
            whereClause.matchId = matchId;
        }

        if (status) {
            whereClause.status = status;
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
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(commentaries);
    } catch (error) {
        console.error('Error fetching commentaries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch commentaries' },
            { status: 500 }
        );
    }
}

// POST /api/commentaries - Create a new commentary
export async function POST(req: NextRequest) {
    try {
        const { user, error } = await getUserFromRequest(req);
        if (error) {
            return NextResponse.json({ error }, { status: 401 });
        }

        const data = await req.json();

        // Support both legacy format and new live streaming format
        if (data.youtubeStreamUrl) {
            // New live streaming format
            if (!data.matchId || !data.youtubeStreamUrl) {
                return NextResponse.json(
                    { error: 'Match ID and YouTube stream URL are required for live commentary' },
                    { status: 400 }
                );
            }

            // Validate YouTube URL
            if (!validateYouTubeUrl(data.youtubeStreamUrl)) {
                return NextResponse.json(
                    { error: 'Invalid YouTube URL' },
                    { status: 400 }
                );
            }

            const youtubeStreamId = extractYouTubeVideoId(data.youtubeStreamUrl);
            if (!youtubeStreamId) {
                return NextResponse.json(
                    { error: 'Could not extract YouTube video ID' },
                    { status: 400 }
                );
            }

            // Verify match exists
            const match = await prisma.match.findUnique({
                where: { id: data.matchId }
            });

            if (!match) {
                return NextResponse.json(
                    { error: 'Match not found' },
                    { status: 404 }
                );
            }

            // Create live commentary
            const commentary = await prisma.commentary.create({
                data: {
                    matchId: data.matchId,
                    commentatorId: user?.id,
                    title: data.title || `${match.homeTeam} vs ${match.awayTeam} - ${user?.name}`,
                    description: data.description || '',
                    youtubeStreamUrl: data.youtubeStreamUrl,
                    youtubeStreamId,
                    language: data.language || 'en',
                    status: 'scheduled',
                    audioUrl: data.youtubeStreamUrl, // For backward compatibility
                    duration: 0
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
        } else {
            // Legacy format - validate required fields
            if (!data.title || !data.match || !data.audioData) {
                return NextResponse.json(
                    { error: 'Missing required fields' },
                    { status: 400 }
                );
            }

            // Save audio file (legacy)
            const { saveAudioFile } = await import('../../lib/file-storage');
            const audioUrl = await saveAudioFile(data.audioData);

            // Create legacy commentary record
            const commentary = await prisma.commentary.create({
                data: {
                    title: data.title,
                    description: data.description || '',
                    audioUrl,
                    commentatorId: user?.id,
                    duration: data.duration || 0,
                    // For legacy compatibility, create a match record or use existing
                    match: {
                        connectOrCreate: {
                            where: {
                                id: data.matchId || 'legacy-match'
                            },
                            create: {
                                league: 'Legacy',
                                homeTeam: data.match.split(' vs ')[0] || 'Team A',
                                awayTeam: data.match.split(' vs ')[1] || 'Team B',
                                scheduledTime: new Date(),
                                status: 'ended',
                                streamUrlPatterns: []
                            }
                        }
                    }
                },
            });

            return NextResponse.json(commentary, { status: 201 });
        }
    } catch (error) {
        console.error('Error creating commentary:', error);
            return NextResponse.json(
            { error: 'Failed to create commentary' },
            { status: 500 }
        );
    }
}

// DELETE /api/commentaries/:id - Delete a commentary
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: "Commentary ID is required" },
                { status: 400 }
            );
        }

        // Delete commentary using Prisma
        await prisma.commentary.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Commentary deleted successfully" });
    } catch (error) {
        console.error("Error deleting commentary:", error);
        return NextResponse.json(
            { error: "Failed to delete commentary" },
            { status: 500 }
        );
    }
} 
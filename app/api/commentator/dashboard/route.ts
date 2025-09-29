import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';

export async function GET(req: NextRequest) {
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

        // Get commentator's statistics
        const commentaries = await prisma.commentary.findMany({
            where: { commentatorId: user.id },
            include: {
                match: {
                    select: {
                        homeTeam: true,
                        awayTeam: true,
                        league: true,
                        scheduledTime: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Calculate stats
        const totalViews = commentaries.reduce((sum, c) => sum + c.viewCount, 0);
        const totalRatings = commentaries.filter(c => c.rating > 0);
        const averageRating = totalRatings.length > 0 
            ? totalRatings.reduce((sum, c) => sum + c.rating, 0) / totalRatings.length 
            : 0;
        const liveCommentaries = commentaries.filter(c => c.status === 'live').length;

        // Get upcoming matches for quick access
        const upcomingMatches = await prisma.match.findMany({
            where: {
                status: 'scheduled',
                scheduledTime: {
                    gte: new Date(),
                    lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
                }
            },
            orderBy: { scheduledTime: 'asc' },
            take: 5
        });

        return NextResponse.json({
            stats: {
                totalViews,
                averageRating: Math.round(averageRating * 10) / 10,
                totalCommentaries: commentaries.length,
                liveCommentaries
            },
            recentCommentaries: commentaries.slice(0, 5),
            upcomingMatches
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}
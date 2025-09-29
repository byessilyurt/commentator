import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';

export async function GET(req: NextRequest) {
    try {
        const { user, error } = await getUserFromRequest(req);
        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const period = searchParams.get('period') || '3months';

        // Calculate date range based on period
        const now = new Date();
        let startDate: Date;

        switch (period) {
            case '1month':
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '6months':
                startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
                break;
            case '1year':
                startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                break;
            default: // 3months
                startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        }

        // Get commentator's commentaries in the period
        const commentaries = await prisma.commentary.findMany({
            where: {
                commentatorId: user.id,
                createdAt: {
                    gte: startDate
                }
            },
            include: {
                match: {
                    select: {
                        homeTeam: true,
                        awayTeam: true,
                        league: true,
                        scheduledTime: true
                    }
                },
                syncReports: {
                    select: {
                        reportedOffset: true,
                        streamPlatform: true,
                        createdAt: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Calculate analytics
        const totalViews = commentaries.reduce((sum, c) => sum + c.viewCount, 0);
        const totalWatchTime = commentaries.reduce((sum, c) => sum + (c.duration * c.viewCount), 0);
        const ratedCommentaries = commentaries.filter(c => c.rating > 0);
        const averageRating = ratedCommentaries.length > 0 
            ? ratedCommentaries.reduce((sum, c) => sum + c.rating, 0) / ratedCommentaries.length 
            : 0;

        // Monthly breakdown
        const monthlyStats = [];
        for (let i = 0; i < 3; i++) {
            const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
            
            const monthCommentaries = commentaries.filter(c => 
                c.createdAt >= monthStart && c.createdAt <= monthEnd
            );
            
            const monthViews = monthCommentaries.reduce((sum, c) => sum + c.viewCount, 0);
            const monthRated = monthCommentaries.filter(c => c.rating > 0);
            const monthAvgRating = monthRated.length > 0 
                ? monthRated.reduce((sum, c) => sum + c.rating, 0) / monthRated.length 
                : 0;

            monthlyStats.push({
                month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                views: monthViews,
                commentaries: monthCommentaries.length,
                avgRating: Math.round(monthAvgRating * 10) / 10
            });
        }

        // Top commentaries
        const topCommentaries = commentaries
            .sort((a, b) => b.viewCount - a.viewCount)
            .slice(0, 5)
            .map(c => ({
                id: c.id,
                title: c.title,
                views: c.viewCount,
                rating: c.rating,
                date: c.createdAt.toISOString().split('T')[0]
            }));

        // Sync accuracy calculation
        const allSyncReports = commentaries.flatMap(c => c.syncReports);
        const syncAccuracy = allSyncReports.length > 0 
            ? Math.max(0, 100 - (allSyncReports.reduce((sum, r) => sum + Math.abs(r.reportedOffset), 0) / allSyncReports.length / 1000 * 10))
            : 95; // Default if no reports

        return NextResponse.json({
            overview: {
                totalViews,
                totalCommentaries: commentaries.length,
                averageRating: Math.round(averageRating * 10) / 10,
                totalWatchTime: Math.round(totalWatchTime)
            },
            monthlyStats: monthlyStats.reverse(),
            topCommentaries,
            audienceInsights: {
                topCountries: [
                    { country: "United Kingdom", percentage: 35 },
                    { country: "United States", percentage: 25 },
                    { country: "Canada", percentage: 15 },
                    { country: "Australia", percentage: 12 },
                    { country: "Ireland", percentage: 8 }
                ],
                avgSessionDuration: 4200, // This would come from detailed analytics
                retentionRate: 68,
                syncAccuracy: Math.round(syncAccuracy * 10) / 10
            }
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { getUserFromRequest } from '../../../../lib/auth';

export async function POST(
    req: NextRequest,
    { params }: { params: { commentaryId: string } }
) {
    try {
        const { commentaryId } = params;
        const { reportedOffset, streamPlatform } = await req.json();

        // Validate input
        if (typeof reportedOffset !== 'number') {
            return NextResponse.json(
                { error: 'Reported offset must be a number (milliseconds)' },
                { status: 400 }
            );
        }

        // Get user if authenticated (optional for sync reports)
        const { user } = await getUserFromRequest(req);

        // Verify commentary exists
        const commentary = await prisma.commentary.findUnique({
            where: { id: commentaryId }
        });

        if (!commentary) {
            return NextResponse.json(
                { error: 'Commentary not found' },
                { status: 404 }
            );
        }

        // Get user agent from headers
        const userAgent = req.headers.get('user-agent') || undefined;

        // Create sync report
        const syncReport = await prisma.syncReport.create({
            data: {
                commentaryId,
                userId: user?.id,
                reportedOffset,
                streamPlatform,
                userAgent
            }
        });

        // Update commentary's average latency
        const recentReports = await prisma.syncReport.findMany({
            where: { commentaryId },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        if (recentReports.length >= 5) {
            // Calculate new average (excluding outliers)
            const offsets = recentReports.map(r => r.reportedOffset);
            const mean = offsets.reduce((a, b) => a + b, 0) / offsets.length;
            const stdDev = Math.sqrt(
                offsets.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / offsets.length
            );

            const filteredOffsets = offsets.filter(
                offset => Math.abs(offset - mean) <= 2 * stdDev
            );

            if (filteredOffsets.length > 0) {
                const newAvgLatency = Math.round(
                    filteredOffsets.reduce((a, b) => a + b, 0) / filteredOffsets.length
                );

                await prisma.commentary.update({
                    where: { id: commentaryId },
                    data: { avgLatency: newAvgLatency }
                });
            }
        }

        return NextResponse.json({ 
            success: true,
            reportId: syncReport.id 
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating sync report:', error);
        return NextResponse.json(
            { error: 'Failed to create sync report' },
            { status: 500 }
        );
    }
}
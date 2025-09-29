import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET(
    req: NextRequest,
    { params }: { params: { commentaryId: string } }
) {
    try {
        const { commentaryId } = params;

        const commentary = await prisma.commentary.findUnique({
            where: { id: commentaryId },
            include: {
                events: {
                    orderBy: {
                        timestamp: 'desc'
                    },
                    take: 5
                },
                syncReports: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 10
                }
            }
        });

        if (!commentary) {
            return NextResponse.json(
                { error: 'Commentary not found' },
                { status: 404 }
            );
        }

        // Calculate average offset from recent sync reports
        const recentReports = commentary.syncReports.slice(0, 10);
        let avgOffset = commentary.baselineOffset;

        if (recentReports.length > 0) {
            // Remove outliers (beyond 2 standard deviations)
            const offsets = recentReports.map(r => r.reportedOffset);
            const mean = offsets.reduce((a, b) => a + b, 0) / offsets.length;
            const stdDev = Math.sqrt(
                offsets.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / offsets.length
            );

            const filteredOffsets = offsets.filter(
                offset => Math.abs(offset - mean) <= 2 * stdDev
            );

            if (filteredOffsets.length > 0) {
                avgOffset = Math.round(
                    filteredOffsets.reduce((a, b) => a + b, 0) / filteredOffsets.length
                );
            }
        }

        return NextResponse.json({
            baselineOffset: commentary.baselineOffset,
            avgLatency: avgOffset,
            recentEvents: commentary.events,
            syncHealth: {
                reportCount: recentReports.length,
                avgOffset,
                lastReportAt: recentReports[0]?.createdAt || null
            }
        });
    } catch (error) {
        console.error('Error fetching sync data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sync data' },
            { status: 500 }
        );
    }
}
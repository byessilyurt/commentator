import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { getUserFromRequest } from '../../../../lib/auth';

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { user, error } = await getUserFromRequest(req);
        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id: commentaryId } = params;
        const { action } = await req.json(); // 'start' or 'end'

        // Find commentary and verify ownership
        const commentary = await prisma.commentary.findUnique({
            where: { id: commentaryId },
            include: {
                commentator: true,
                match: true
            }
        });

        if (!commentary) {
            return NextResponse.json(
                { error: 'Commentary not found' },
                { status: 404 }
            );
        }

        if (commentary.commentatorId !== user.id) {
            return NextResponse.json(
                { error: 'Not authorized to control this commentary' },
                { status: 403 }
            );
        }

        let updateData: any = {};

        if (action === 'start') {
            if (commentary.status !== 'scheduled') {
                return NextResponse.json(
                    { error: 'Commentary is not in scheduled state' },
                    { status: 400 }
                );
            }

            updateData = {
                status: 'live',
                startedAt: new Date(),
                baselineOffset: 0 // Will be calibrated based on user reports
            };
        } else if (action === 'end') {
            if (commentary.status !== 'live') {
                return NextResponse.json(
                    { error: 'Commentary is not currently live' },
                    { status: 400 }
                );
            }

            updateData = {
                status: 'ended',
                endedAt: new Date()
            };
        } else {
            return NextResponse.json(
                { error: 'Invalid action. Use "start" or "end"' },
                { status: 400 }
            );
        }

        const updatedCommentary = await prisma.commentary.update({
            where: { id: commentaryId },
            data: updateData,
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

        return NextResponse.json(updatedCommentary);
    } catch (error) {
        console.error('Error controlling commentary:', error);
        return NextResponse.json(
            { error: 'Failed to control commentary' },
            { status: 500 }
        );
    }
}
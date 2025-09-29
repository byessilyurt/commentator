import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { user, error } = await getUserFromRequest(req);
        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { experience, languages, specialties, sampleUrl, motivation } = await req.json();

        // Validate required fields
        if (!experience || !motivation || !languages || languages.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already applied or is already a commentator
        const existingUser = await prisma.user.findUnique({
            where: { id: user.id }
        });

        if (existingUser?.isCommentator) {
            return NextResponse.json(
                { error: 'User is already a commentator' },
                { status: 400 }
            );
        }

        // In a real application, you would:
        // 1. Store the application in a separate table
        // 2. Send notification to admins for review
        // 3. Have an admin approval process
        
        // For this demo, we'll auto-approve and make them a commentator
        await prisma.user.update({
            where: { id: user.id },
            data: { isCommentator: true }
        });

        // In a real app, you might store application details in a separate table:
        // await prisma.commentatorApplication.create({
        //     data: {
        //         userId: user.id,
        //         experience,
        //         languages,
        //         specialties,
        //         sampleUrl,
        //         motivation,
        //         status: 'pending'
        //     }
        // });

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully'
        }, { status: 201 });
    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json(
            { error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}
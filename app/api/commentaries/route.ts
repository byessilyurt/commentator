import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { getUserFromRequest } from '../../lib/auth';
import { saveAudioFile } from '../../lib/file-storage';

// GET /api/commentaries - Get all commentaries
export async function GET(req: NextRequest) {
    try {
        const commentaries = await prisma.commentary.findMany({
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

        // Validate required fields
        if (!data.title || !data.match || !data.audioData) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Save audio file
        const audioUrl = await saveAudioFile(data.audioData);

        // Create commentary record with properly formatted data
        const commentary = await prisma.commentary.create({
            data: {
                title: data.title,
                description: data.description || '',
                match: data.match,
                audioUrl,
                userId: user?.id,
                duration: data.duration || 0,
                // Handle timeMarkers as Json type
                ...(data.timeMarkers && { timeMarkers: data.timeMarkers }),
            },
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
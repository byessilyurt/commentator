import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// This would be a database in a real application
let commentaries: any[] = [
    {
        id: '1',
        title: 'Premier League: Arsenal vs Liverpool',
        commentator: 'John Smith',
        matchId: 1,
        date: '2023-10-08',
        duration: '90:00',
        audioUrl: '/commentaries/1.mp3'
    },
    {
        id: '2',
        title: 'La Liga: Barcelona vs Real Madrid',
        commentator: 'Maria Garcia',
        matchId: 2,
        date: '2023-10-21',
        duration: '92:30',
        audioUrl: '/commentaries/2.mp3'
    },
    {
        id: '3',
        title: 'Champions League: Bayern vs PSG',
        commentator: 'David Johnson',
        matchId: 3,
        date: '2023-11-02',
        duration: '94:15',
        audioUrl: '/commentaries/3.mp3'
    },
];

// GET /api/commentaries - Get all commentaries
export async function GET(request: NextRequest) {
    // Optional filtering by matchId
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get('matchId');

    if (matchId) {
        const filteredCommentaries = commentaries.filter(
            commentary => commentary.matchId === Number(matchId)
        );
        return NextResponse.json(filteredCommentaries);
    }

    return NextResponse.json(commentaries);
}

// POST /api/commentaries - Create a new commentary
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // In a real application, you would process and store the audio file
        // For now, we're just simulating it
        const audioBlob = formData.get('audio') as File;
        const title = formData.get('title') as string;
        const commentator = formData.get('commentator') as string;
        const matchId = Number(formData.get('matchId'));
        const duration = formData.get('duration') as string;

        if (!audioBlob || !title || !commentator || !matchId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Generate a unique ID
        const id = uuidv4();

        // In a real app, you'd save the audio file to a storage service
        // and get back a URL to access it
        const audioUrl = `/commentaries/${id}.mp3`;

        const newCommentary = {
            id,
            title,
            commentator,
            matchId,
            date: new Date().toISOString().split('T')[0],
            duration,
            audioUrl
        };

        // Add to our "database"
        commentaries.push(newCommentary);

        return NextResponse.json(newCommentary, { status: 201 });
    } catch (error) {
        console.error("Error creating commentary:", error);
        return NextResponse.json(
            { error: "Failed to create commentary" },
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

        const initialLength = commentaries.length;
        commentaries = commentaries.filter(commentary => commentary.id !== id);

        if (commentaries.length === initialLength) {
            return NextResponse.json(
                { error: "Commentary not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Commentary deleted successfully" });
    } catch (error) {
        console.error("Error deleting commentary:", error);
        return NextResponse.json(
            { error: "Failed to delete commentary" },
            { status: 500 }
        );
    }
} 
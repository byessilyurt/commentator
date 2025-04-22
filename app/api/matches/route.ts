import { NextRequest, NextResponse } from 'next/server';

// This would be a database in a real application
const matches = [
    {
        id: 1,
        title: 'Premier League: Arsenal vs Liverpool',
        league: 'Premier League',
        teams: ['Arsenal', 'Liverpool'],
        date: '2023-10-08',
        duration: '90:00',
        videoUrl: '/matches/1.mp4'
    },
    {
        id: 2,
        title: 'La Liga: Barcelona vs Real Madrid',
        league: 'La Liga',
        teams: ['Barcelona', 'Real Madrid'],
        date: '2023-10-21',
        duration: '92:30',
        videoUrl: '/matches/2.mp4'
    },
    {
        id: 3,
        title: 'Champions League: Bayern vs PSG',
        league: 'Champions League',
        teams: ['Bayern Munich', 'Paris Saint-Germain'],
        date: '2023-11-02',
        duration: '94:15',
        videoUrl: '/matches/3.mp4'
    },
];

// GET /api/matches - Get all matches
export async function GET(request: NextRequest) {
    // Optional filtering by league
    const { searchParams } = new URL(request.url);
    const league = searchParams.get('league');
    const team = searchParams.get('team');

    let filteredMatches = [...matches];

    if (league) {
        filteredMatches = filteredMatches.filter(
            match => match.league.toLowerCase() === league.toLowerCase()
        );
    }

    if (team) {
        filteredMatches = filteredMatches.filter(
            match => match.teams.some(t => t.toLowerCase().includes(team.toLowerCase()))
        );
    }

    return NextResponse.json(filteredMatches);
}

// GET /api/matches/:id - Get a specific match by ID
export async function HEAD(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { error: "Match ID is required" },
            { status: 400 }
        );
    }

    const match = matches.find(match => match.id === Number(id));

    if (!match) {
        return NextResponse.json(
            { error: "Match not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(match);
} 
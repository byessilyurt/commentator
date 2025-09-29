import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    // Create sample users
    const commentator1 = await prisma.user.upsert({
        where: { email: 'john@commentator.com' },
        update: {},
        create: {
            email: 'john@commentator.com',
            name: 'John Smith',
            password: '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq', // "password123"
            isCommentator: true,
        },
    });

    const commentator2 = await prisma.user.upsert({
        where: { email: 'maria@commentator.com' },
        update: {},
        create: {
            email: 'maria@commentator.com',
            name: 'Maria Garcia',
            password: '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQq', // "password123"
            isCommentator: true,
        },
    });

    // Create sample matches
    const match1 = await prisma.match.upsert({
        where: { id: 'match-arsenal-liverpool' },
        update: {},
        create: {
            id: 'match-arsenal-liverpool',
            league: 'Premier League',
            homeTeam: 'Arsenal',
            awayTeam: 'Liverpool',
            scheduledTime: new Date('2024-01-15T16:00:00Z'),
            status: 'live',
            streamUrlPatterns: ['arsenal-liverpool', 'premier-league-match-1'],
        },
    });

    const match2 = await prisma.match.upsert({
        where: { id: 'match-barcelona-madrid' },
        update: {},
        create: {
            id: 'match-barcelona-madrid',
            league: 'La Liga',
            homeTeam: 'Barcelona',
            awayTeam: 'Real Madrid',
            scheduledTime: new Date('2024-01-20T20:00:00Z'),
            status: 'scheduled',
            streamUrlPatterns: ['barcelona-madrid', 'el-clasico'],
        },
    });

    // Create sample commentaries
    const commentary1 = await prisma.commentary.upsert({
        where: { id: 'commentary-1' },
        update: {},
        create: {
            id: 'commentary-1',
            matchId: match1.id,
            commentatorId: commentator1.id,
            title: 'Arsenal vs Liverpool - John Smith Commentary',
            description: 'Passionate English commentary for the big match!',
            youtubeStreamUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            youtubeStreamId: 'dQw4w9WgXcQ',
            language: 'en',
            status: 'live',
            audioUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            baselineOffset: 15000, // 15 seconds
            avgLatency: 18000, // 18 seconds
            viewCount: 1250,
            rating: 4.7,
            startedAt: new Date(),
        },
    });

    const commentary2 = await prisma.commentary.upsert({
        where: { id: 'commentary-2' },
        update: {},
        create: {
            id: 'commentary-2',
            matchId: match1.id,
            commentatorId: commentator2.id,
            title: 'Arsenal vs Liverpool - Maria Garcia Commentary',
            description: 'Spanish commentary with tactical analysis',
            youtubeStreamUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            youtubeStreamId: 'dQw4w9WgXcQ',
            language: 'es',
            status: 'live',
            audioUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            baselineOffset: 12000, // 12 seconds
            avgLatency: 16000, // 16 seconds
            viewCount: 890,
            rating: 4.5,
            startedAt: new Date(),
        },
    });

    // Create sample match events
    await prisma.matchEvent.createMany({
        data: [
            {
                matchId: match1.id,
                type: 'kickoff',
                minute: 0,
                timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
                description: 'Match kicks off',
            },
            {
                matchId: match1.id,
                type: 'goal',
                team: 'home',
                player: 'Bukayo Saka',
                minute: 23,
                timestamp: new Date(Date.now() - 22 * 60 * 1000), // 22 minutes ago
                description: 'Arsenal takes the lead!',
            },
            {
                matchId: match1.id,
                type: 'yellow_card',
                team: 'away',
                player: 'Jordan Henderson',
                minute: 34,
                timestamp: new Date(Date.now() - 11 * 60 * 1000), // 11 minutes ago
                description: 'Yellow card for dissent',
            },
        ],
    });

    // Create sample commentary events
    await prisma.commentaryEvent.createMany({
        data: [
            {
                commentaryId: commentary1.id,
                type: 'goal',
                gameMinute: 23,
                audioTimestamp: 1380000, // 23 minutes in milliseconds
                timestamp: new Date(Date.now() - 22 * 60 * 1000),
            },
            {
                commentaryId: commentary2.id,
                type: 'goal',
                gameMinute: 23,
                audioTimestamp: 1380000,
                timestamp: new Date(Date.now() - 22 * 60 * 1000),
            },
        ],
    });

    // Create sample sync reports
    await prisma.syncReport.createMany({
        data: [
            {
                commentaryId: commentary1.id,
                reportedOffset: 15500,
                streamPlatform: 'netflix',
                userAgent: 'Mozilla/5.0 (Chrome Extension)',
            },
            {
                commentaryId: commentary1.id,
                reportedOffset: 14800,
                streamPlatform: 'dazn',
                userAgent: 'Mozilla/5.0 (Chrome Extension)',
            },
            {
                commentaryId: commentary2.id,
                reportedOffset: 16200,
                streamPlatform: 'netflix',
                userAgent: 'Mozilla/5.0 (Chrome Extension)',
            },
        ],
    });

    console.log('Seed data created successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
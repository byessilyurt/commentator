"use client";

import { useState, useEffect } from 'react';

export default function TestAPIPage() {
    const [liveMatches, setLiveMatches] = useState([]);
    const [liveCommentaries, setLiveCommentaries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch live matches
                const matchesResponse = await fetch('/api/matches/live');
                const matchesData = await matchesResponse.json();
                setLiveMatches(matchesData.matches || []);

                // Fetch live commentaries
                const commentariesResponse = await fetch('/api/commentaries/live');
                const commentariesData = await commentariesResponse.json();
                setLiveCommentaries(commentariesData.commentaries || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Live Matches</h2>
                    {liveMatches.length > 0 ? (
                        <div className="space-y-4">
                            {liveMatches.map((match: any) => (
                                <div key={match.id} className="bg-gray-700 p-4 rounded">
                                    <h3 className="font-semibold">
                                        {match.homeTeam} vs {match.awayTeam}
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                        {match.league} - {match.status}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Commentaries: {match.commentaries?.length || 0}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No live matches found</p>
                    )}
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Live Commentaries</h2>
                    {liveCommentaries.length > 0 ? (
                        <div className="space-y-4">
                            {liveCommentaries.map((commentary: any) => (
                                <div key={commentary.id} className="bg-gray-700 p-4 rounded">
                                    <h3 className="font-semibold">{commentary.title}</h3>
                                    <p className="text-sm text-gray-300">
                                        By: {commentary.commentator?.name}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Language: {commentary.language}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Views: {commentary.viewCount} | Rating: {commentary.rating}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Match: {commentary.match?.homeTeam} vs {commentary.match?.awayTeam}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No live commentaries found</p>
                    )}
                </div>
            </div>

            <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">API Endpoints Test</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => window.open('/api/matches/live', '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Test /api/matches/live
                    </button>
                    <button
                        onClick={() => window.open('/api/matches/upcoming', '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Test /api/matches/upcoming
                    </button>
                    <button
                        onClick={() => window.open('/api/commentaries/live', '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Test /api/commentaries/live
                    </button>
                    <button
                        onClick={() => window.open('/api/sync/commentary-1', '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Test /api/sync/commentary-1
                    </button>
                </div>
            </div>
        </div>
    );
}
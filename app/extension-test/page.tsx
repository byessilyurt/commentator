"use client";

import { useState, useEffect } from 'react';

export default function ExtensionTestPage() {
    const [matches, setMatches] = useState([]);
    const [commentaries, setCommentaries] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {
        fetchLiveMatches();
    }, []);

    const fetchLiveMatches = async () => {
        try {
            const response = await fetch('/api/matches/live');
            const data = await response.json();
            setMatches(data.matches || []);
            
            if (data.matches && data.matches.length > 0) {
                setSelectedMatch(data.matches[0]);
                fetchCommentaries(data.matches[0].id);
            }
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    };

    const fetchCommentaries = async (matchId) => {
        try {
            const response = await fetch(`/api/commentaries/live?matchId=${matchId}`);
            const data = await response.json();
            setCommentaries(data.commentaries || []);
        } catch (error) {
            console.error('Error fetching commentaries:', error);
        }
    };

    const testMatchDetection = async () => {
        const testUrl = 'https://netflix.com/watch/arsenal-vs-liverpool';
        const testTitle = 'Arsenal vs Liverpool - Premier League Live';
        
        try {
            const response = await fetch(`/api/matches/detect?url=${encodeURIComponent(testUrl)}&title=${encodeURIComponent(testTitle)}`);
            const data = await response.json();
            
            alert(`Match Detection Result:\n${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            console.error('Error testing match detection:', error);
            alert('Error testing match detection');
        }
    };

    const testSyncReport = async () => {
        if (commentaries.length === 0) {
            alert('No commentaries available to test sync report');
            return;
        }
        
        const commentary = commentaries[0];
        const testOffset = Math.floor(Math.random() * 30000) - 15000; // Random offset between -15s and +15s
        
        try {
            const response = await fetch(`/api/sync/${commentary.id}/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reportedOffset: testOffset,
                    streamPlatform: 'netflix'
                })
            });
            
            const data = await response.json();
            alert(`Sync Report Submitted:\nOffset: ${testOffset}ms\nResponse: ${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            console.error('Error submitting sync report:', error);
            alert('Error submitting sync report');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Chrome Extension API Test</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Live Matches */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Live Matches</h2>
                        {matches.length > 0 ? (
                            <div className="space-y-4">
                                {matches.map((match) => (
                                    <div 
                                        key={match.id} 
                                        className={`p-4 rounded cursor-pointer transition-colors ${
                                            selectedMatch?.id === match.id 
                                                ? 'bg-blue-700' 
                                                : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                        onClick={() => {
                                            setSelectedMatch(match);
                                            fetchCommentaries(match.id);
                                        }}
                                    >
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

                    {/* Live Commentaries */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Live Commentaries
                            {selectedMatch && (
                                <span className="text-sm font-normal text-gray-300 ml-2">
                                    for {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                                </span>
                            )}
                        </h2>
                        {commentaries.length > 0 ? (
                            <div className="space-y-4">
                                {commentaries.map((commentary) => (
                                    <div key={commentary.id} className="bg-gray-700 p-4 rounded">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold">{commentary.commentator.name}</h3>
                                            <span className="bg-red-600 text-xs px-2 py-1 rounded">LIVE</span>
                                        </div>
                                        <p className="text-sm text-gray-300 mb-2">{commentary.title}</p>
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>Language: {commentary.language}</span>
                                            <span>Views: {commentary.viewCount}</span>
                                            <span>Rating: {commentary.rating.toFixed(1)}</span>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-400">
                                            <p>Avg Latency: {commentary.avgLatency}ms</p>
                                            <p>YouTube ID: {commentary.youtubeStreamId}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No live commentaries available</p>
                        )}
                    </div>
                </div>

                {/* Test Buttons */}
                <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Extension API Tests</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={testMatchDetection}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Test Match Detection
                        </button>
                        <button
                            onClick={testSyncReport}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            disabled={commentaries.length === 0}
                        >
                            Test Sync Report
                        </button>
                        <button
                            onClick={fetchLiveMatches}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                        >
                            Refresh Data
                        </button>
                    </div>
                </div>

                {/* Extension Installation Guide */}
                <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Chrome Extension Installation</h2>
                    <div className="space-y-4 text-sm">
                        <div>
                            <h3 className="font-semibold mb-2">1. Build the Extension</h3>
                            <code className="bg-gray-900 p-2 rounded block">
                                cd chrome-extension && ./build.sh
                            </code>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">2. Load in Chrome</h3>
                            <ol className="list-decimal list-inside space-y-1 text-gray-300">
                                <li>Open Chrome and go to <code>chrome://extensions/</code></li>
                                <li>Enable "Developer mode" (toggle in top right)</li>
                                <li>Click "Load unpacked"</li>
                                <li>Select the <code>chrome-extension/build/</code> directory</li>
                            </ol>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">3. Test the Extension</h3>
                            <ol className="list-decimal list-inside space-y-1 text-gray-300">
                                <li>Navigate to a streaming platform (Netflix, DAZN, etc.)</li>
                                <li>Play any video (doesn't need to be football for testing)</li>
                                <li>Click the Commentator extension icon</li>
                                <li>Verify the popup shows and detects the video</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* API Endpoints Reference */}
                <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">API Endpoints Reference</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h3 className="font-semibold mb-2">Match Endpoints</h3>
                            <ul className="space-y-1 text-gray-300">
                                <li><code>GET /api/matches/live</code> - Live matches</li>
                                <li><code>GET /api/matches/upcoming</code> - Upcoming matches</li>
                                <li><code>GET /api/matches/detect</code> - Detect match from URL</li>
                                <li><code>GET /api/matches/[id]</code> - Match details</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Commentary Endpoints</h3>
                            <ul className="space-y-1 text-gray-300">
                                <li><code>GET /api/commentaries/live</code> - Live commentaries</li>
                                <li><code>POST /api/commentaries/manage</code> - Create commentary</li>
                                <li><code>PUT /api/commentaries/[id]/control</code> - Start/stop</li>
                                <li><code>POST /api/sync/[id]/report</code> - Report sync offset</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
    ArrowLeft, 
    Users, 
    Clock, 
    Play, 
    Pause,
    Save,
    AlertTriangle
} from "lucide-react";
import LiveStatusIndicator from "../../../../components/LiveStatusIndicator";
import EventMarker from "../../../../components/EventMarker";
import GameTimer from "../../../../components/GameTimer";

type Commentary = {
    id: string;
    title: string;
    status: string;
    viewCount: number;
    rating: number;
    startedAt: string | null;
    match: {
        homeTeam: string;
        awayTeam: string;
        league: string;
        scheduledTime: string;
    };
    youtubeStreamId: string;
};

type MatchEvent = {
    type: string;
    team?: string;
    player?: string;
    minute: number;
    description?: string;
};

export default function LiveCommentaryPage() {
    const params = useParams();
    const commentaryId = params.id as string;

    const [commentary, setCommentary] = useState<Commentary | null>(null);
    const [isLive, setIsLive] = useState(false);
    const [gameTime, setGameTime] = useState({ minutes: 0, seconds: 0 });
    const [isGameTimePaused, setIsGameTimePaused] = useState(false);
    const [viewerCount, setViewerCount] = useState(0);
    const [syncHealth, setSyncHealth] = useState({ status: 'good', avgOffset: 0, reportCount: 0 });
    const [streamHealth, setStreamHealth] = useState({ status: 'connected', latency: 0 });
    const [notes, setNotes] = useState("");
    const [recentEvents, setRecentEvents] = useState<MatchEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const gameTimeInterval = useRef<NodeJS.Timeout | null>(null);
    const viewerCountInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchCommentaryData();
        startViewerCountUpdates();
        
        return () => {
            if (gameTimeInterval.current) clearInterval(gameTimeInterval.current);
            if (viewerCountInterval.current) clearInterval(viewerCountInterval.current);
        };
    }, [commentaryId]);

    const fetchCommentaryData = async () => {
        try {
            // Mock data for now - replace with actual API call
            setCommentary({
                id: commentaryId,
                title: "Arsenal vs Liverpool - Premier League Commentary",
                status: "live",
                viewCount: 1250,
                rating: 4.7,
                startedAt: new Date().toISOString(),
                match: {
                    homeTeam: "Arsenal",
                    awayTeam: "Liverpool",
                    league: "Premier League",
                    scheduledTime: new Date().toISOString()
                },
                youtubeStreamId: "dQw4w9WgXcQ"
            });

            setIsLive(true);
            startGameTimer();
            
            // Mock sync health data
            setSyncHealth({
                status: 'good',
                avgOffset: 1200, // 1.2 seconds
                reportCount: 45
            });

            setStreamHealth({
                status: 'connected',
                latency: 850 // 0.85 seconds
            });

        } catch (error) {
            console.error('Error fetching commentary data:', error);
        } finally {
            setLoading(false);
        }
    };

    const startGameTimer = () => {
        if (gameTimeInterval.current) clearInterval(gameTimeInterval.current);
        
        gameTimeInterval.current = setInterval(() => {
            if (!isGameTimePaused) {
                setGameTime(prev => {
                    let newSeconds = prev.seconds + 1;
                    let newMinutes = prev.minutes;
                    
                    if (newSeconds >= 60) {
                        newSeconds = 0;
                        newMinutes += 1;
                    }
                    
                    // Cap at 130 minutes (including extra time)
                    if (newMinutes >= 130) {
                        newMinutes = 130;
                        newSeconds = 0;
                    }
                    
                    return { minutes: newMinutes, seconds: newSeconds };
                });
            }
        }, 1000);
    };

    const startViewerCountUpdates = () => {
        viewerCountInterval.current = setInterval(() => {
            // Simulate viewer count changes
            setViewerCount(prev => {
                const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
                return Math.max(0, prev + change);
            });
        }, 5000);
    };

    const toggleGameTimer = () => {
        setIsGameTimePaused(!isGameTimePaused);
    };

    const adjustGameTime = (delta: number) => {
        setGameTime(prev => {
            const totalSeconds = prev.minutes * 60 + prev.seconds + delta;
            const clampedSeconds = Math.max(0, Math.min(130 * 60, totalSeconds));
            
            return {
                minutes: Math.floor(clampedSeconds / 60),
                seconds: clampedSeconds % 60
            };
        });
    };

    const markEvent = async (eventType: string, team?: string) => {
        const currentMinute = gameTime.minutes;
        
        try {
            // In a real app, this would call the API
            const newEvent: MatchEvent = {
                type: eventType,
                team,
                minute: currentMinute,
                description: `${eventType} at ${currentMinute}'`
            };
            
            setRecentEvents(prev => [newEvent, ...prev.slice(0, 4)]);
            
            // Show confirmation
            alert(`${eventType} marked at ${currentMinute}'`);
            
        } catch (error) {
            console.error('Error marking event:', error);
        }
    };

    const toggleLiveStatus = async () => {
        try {
            const action = isLive ? 'end' : 'start';
            
            // In a real app, this would call the API
            const response = await fetch(`/api/commentaries/${commentaryId}/control`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ action })
            });

            if (response.ok) {
                setIsLive(!isLive);
                if (!isLive) {
                    startGameTimer();
                } else {
                    if (gameTimeInterval.current) clearInterval(gameTimeInterval.current);
                }
            }
        } catch (error) {
            console.error('Error toggling live status:', error);
        }
    };

    const formatTime = (minutes: number, seconds: number) => {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const getSyncHealthColor = (status: string) => {
        switch (status) {
            case 'excellent': return 'text-green-500';
            case 'good': return 'text-blue-500';
            case 'fair': return 'text-yellow-500';
            case 'poor': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading commentary stream...</p>
                </div>
            </div>
        );
    }

    if (!commentary) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Commentary Not Found</h1>
                    <Link href="/commentator/dashboard" className="text-blue-400 hover:text-blue-300">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <Link href="/commentator/dashboard" className="text-blue-400 hover:text-blue-300 mr-4">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{commentary.title}</h1>
                            <p className="text-gray-400">{commentary.match.league}</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={toggleLiveStatus}
                        className={`px-6 py-3 rounded-lg font-semibold flex items-center ${
                            isLive 
                                ? "bg-red-600 hover:bg-red-700" 
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {isLive ? (
                            <>
                                <Square className="w-5 h-5 mr-2" />
                                End Stream
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5 mr-2" />
                                Go Live
                            </>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Control Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Game Timer & Status */}
                        <GameTimer
                            onTimeChange={(min, sec) => setGameTime({ minutes: min, seconds: sec })}
                            initialMinutes={gameTime.minutes}
                            initialSeconds={gameTime.seconds}
                            disabled={!isLive}
                        />

                        {/* Event Marking */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Mark Events</h2>
                            <EventMarker
                                onMarkEvent={markEvent}
                                gameTime={gameTime}
                                disabled={!isLive}
                            />
                        </div>

                        {/* Notes */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Commentary Notes</h2>
                                <button
                                    onClick={() => {/* Save notes */}}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center"
                                >
                                    <Save className="w-4 h-4 mr-1" />
                                    Save
                                </button>
                            </div>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Keep track of talking points, player names, tactical observations..."
                                rows={4}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Stream Status */}
                        <LiveStatusIndicator 
                            commentaryId={commentaryId}
                            isLive={isLive}
                        />

                        {/* Recent Events */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-4">Recent Events</h3>
                            
                            {recentEvents.length > 0 ? (
                                <div className="space-y-3">
                                    {recentEvents.map((event, index) => (
                                        <div key={index} className="flex justify-between items-center text-sm">
                                            <span className="capitalize">{event.type.replace('_', ' ')}</span>
                                            <span className="text-gray-400">{event.minute}'</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">No events marked yet</p>
                            )}
                        </div>

                        {/* YouTube Stream */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-4">YouTube Stream</h3>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Video ID</span>
                                    <span className="font-mono">{commentary.youtubeStreamId}</span>
                                </div>
                                
                                <a
                                    href={`https://www.youtube.com/watch?v=${commentary.youtubeStreamId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded text-sm"
                                >
                                    Open in YouTube
                                </a>
                                
                                <div className="p-3 bg-yellow-900 bg-opacity-30 rounded border border-yellow-700">
                                    <p className="text-yellow-300 text-xs">
                                        Keep your YouTube stream running. Viewers will hear your commentary through our platform.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
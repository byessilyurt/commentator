"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

// Mock data for available commentaries
const AVAILABLE_COMMENTARIES = [
    { id: 1, title: "Premier League: Arsenal vs Liverpool", commentator: "John Smith", date: "2023-10-08", duration: "90:00", isLive: false },
    { id: 2, title: "La Liga: Barcelona vs Real Madrid", commentator: "Maria Garcia", date: "2023-10-21", duration: "92:30", isLive: false },
    { id: 3, title: "Champions League: Bayern vs PSG", commentator: "David Johnson", date: "2023-11-02", duration: "94:15", isLive: false },
    { id: 4, title: "Premier League: Man City vs Chelsea", commentator: "Alex Turner", date: "2023-11-05", duration: "In Progress", isLive: true, liveStreamId: "stream-123456" },
];

// Mock data for matches
const MATCHES = [
    { id: 1, title: "Premier League: Arsenal vs Liverpool", status: "COMPLETED", date: "2023-10-08" },
    { id: 2, title: "La Liga: Barcelona vs Real Madrid", status: "COMPLETED", date: "2023-10-21" },
    { id: 3, title: "Champions League: Bayern vs PSG", status: "COMPLETED", date: "2023-11-02" },
    { id: 4, title: "Premier League: Man City vs Chelsea", status: "LIVE", date: "2023-11-05", currentGameTime: "45:20" },
    { id: 5, title: "Bundesliga: Dortmund vs Bayern", status: "UPCOMING", date: "2023-11-06" },
];

const WS_URL = 'ws://localhost:8081';

export default function WatchPage() {
    const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
    const [selectedCommentary, setSelectedCommentary] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [gameTime, setGameTime] = useState("00:00");
    const [syncDialogOpen, setSyncDialogOpen] = useState(false);
    const [manualGameMinute, setManualGameMinute] = useState("");
    const [manualGameSecond, setManualGameSecond] = useState("");
    const [isLiveCommentary, setIsLiveCommentary] = useState(false);
    const [isGameTimeStopped, setIsGameTimeStopped] = useState(false);
    const [commentaries, setCommentaries] = useState(AVAILABLE_COMMENTARIES);
    const [filteredCommentaries, setFilteredCommentaries] = useState(AVAILABLE_COMMENTARIES);

    const audioPlayerRef = useRef<any>(null);
    const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const gameTimeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const liveStreamIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const audioBufferRef = useRef<Blob[]>([]);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    // Handle match selection
    const handleMatchSelect = (id: number) => {
        setSelectedMatch(id);
        setSelectedCommentary(null);

        // Filter commentaries for this match
        const matchCommentaries = AVAILABLE_COMMENTARIES.filter(commentary =>
            commentary.title === MATCHES.find(m => m.id === id)?.title
        );

        setFilteredCommentaries(matchCommentaries);

        // If this is a live match, try to set initial game time
        const match = MATCHES.find(m => m.id === id);
        if (match && match.status === "LIVE" && match.currentGameTime) {
            const [min, sec] = match.currentGameTime.split(":");
            setManualGameMinute(min);
            setManualGameSecond(sec);
        }
    };

    const handleCommentarySelect = (id: number) => {
        setSelectedCommentary(id);

        const commentary = AVAILABLE_COMMENTARIES.find(c => c.id === id);
        setIsLiveCommentary(!!commentary?.isLive);

        if (commentary?.isLive && commentary?.liveStreamId) {
            // For live commentaries, start watching the live stream
            startWatchingLiveStream(commentary.liveStreamId);
        }

        // Auto-open sync dialog for non-live commentaries
        if (!commentary?.isLive) {
            setSyncDialogOpen(true);
        }
    };

    // Convert seconds to mm:ss format
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Convert mm:ss format to seconds
    const timeToSeconds = (time: string) => {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    const updateGameTime = () => {
        if (audioPlayerRef.current) {
            const currentSeconds = audioPlayerRef.current.audio.current.currentTime;
            setCurrentTime(currentSeconds);
            setGameTime(formatTime(currentSeconds));
        }
    };

    const handlePlay = () => {
        setIsPlaying(true);

        // Live commentaries use their own game time logic
        if (!isLiveCommentary) {
            // Start updating game time continuously for regular commentaries
            if (syncIntervalRef.current === null) {
                syncIntervalRef.current = setInterval(updateGameTime, 1000);
            }
        }
    };

    const handlePause = () => {
        setIsPlaying(false);

        // Stop updating game time for regular commentaries
        if (!isLiveCommentary && syncIntervalRef.current !== null) {
            clearInterval(syncIntervalRef.current);
            syncIntervalRef.current = null;
        }
    };

    const openSyncDialog = () => {
        setSyncDialogOpen(true);
    };

    const handleSync = () => {
        if (!manualGameMinute || !manualGameSecond) {
            alert("Please enter valid minutes and seconds");
            return;
        }

        if (isLiveCommentary) {
            // For live commentaries, we need to find the right position in the stream
            syncWithLiveStream(parseInt(manualGameMinute), parseInt(manualGameSecond));
        } else if (audioPlayerRef.current) {
            // For regular commentaries, just set the current time
            const targetSeconds = parseInt(manualGameMinute) * 60 + parseInt(manualGameSecond);
            audioPlayerRef.current.audio.current.currentTime = targetSeconds;
            updateGameTime();
        }

        setSyncDialogOpen(false);

        // Start the game time clock for live commentaries if it's not already running
        if (isLiveCommentary && !gameTimeIntervalRef.current) {
            startGameTimeClock();
        }
    };

    // Skip forward 10 seconds
    const skipForward = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.audio.current.currentTime += 10;
            updateGameTime();
        }
    };

    // Skip backward 10 seconds
    const skipBackward = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.audio.current.currentTime -= 10;
            updateGameTime();
        }
    };

    // Start the game time clock (for live commentaries)
    const startGameTimeClock = () => {
        // Clear any existing interval
        if (gameTimeIntervalRef.current) {
            clearInterval(gameTimeIntervalRef.current);
        }

        // Set up new interval
        const newIntervalId = setInterval(() => {
            setManualGameSecond(prev => {
                const newSec = parseInt(prev) + 1;
                if (newSec >= 60) {
                    // Increment minute
                    setManualGameMinute(prevMin => {
                        const newMin = parseInt(prevMin) + 1;
                        // Cap at 130 minutes
                        return newMin <= 130 ? newMin.toString().padStart(2, '0') : "130";
                    });
                    return "00";
                }
                return newSec.toString().padStart(2, '0');
            });

            // Update the displayed game time
            setGameTime(`${manualGameMinute}:${manualGameSecond}`);

        }, 1000);

        gameTimeIntervalRef.current = newIntervalId;
        setIsGameTimeStopped(false);
    };

    // Toggle game time clock on/off (for live commentaries)
    const toggleGameTimeClock = () => {
        if (isGameTimeStopped) {
            startGameTimeClock();
        } else {
            if (gameTimeIntervalRef.current) {
                clearInterval(gameTimeIntervalRef.current);
                gameTimeIntervalRef.current = null;
            }
            setIsGameTimeStopped(true);
        }
    };

    // Adjust game time +/- 1 second (for live commentaries)
    const adjustGameTime = (seconds: number) => {
        const min = parseInt(manualGameMinute || "0");
        const sec = parseInt(manualGameSecond || "0");

        const currentTotal = min * 60 + sec;
        let newTotal = currentTotal + seconds;

        // Ensure in valid range (0 to 130:00)
        newTotal = Math.max(0, Math.min(130 * 60, newTotal));

        const newMin = Math.floor(newTotal / 60);
        const newSec = newTotal % 60;

        setManualGameMinute(newMin.toString().padStart(2, '0'));
        setManualGameSecond(newSec.toString().padStart(2, '0'));
        setGameTime(`${newMin.toString().padStart(2, '0')}:${newSec.toString().padStart(2, '0')}`);
    };

    // Start watching a live stream commentary
    const startWatchingLiveStream = (streamId: string) => {
        // In a real app, this would connect to a WebSocket for live updates
        console.log(`Starting to watch live stream: ${streamId}`);

        // Simulate fetching the latest chunks periodically
        if (liveStreamIntervalRef.current) {
            clearInterval(liveStreamIntervalRef.current);
        }

        // In a real app, this would use WebSockets to get real-time updates
        liveStreamIntervalRef.current = setInterval(() => {
            fetchLatestStreamChunks(streamId);
        }, 1000);
    };

    // Sync with a live stream at a specific game time
    const syncWithLiveStream = (minutes: number, seconds: number) => {
        const targetTime = minutes * 60 + seconds;

        // In a real app, this would tell the server which part of the stream to send
        console.log(`Syncing to live stream at game time: ${formatTime(targetTime)}`);

        // Set the display
        setGameTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        wsRef.current = new WebSocket(WS_URL);
        wsRef.current.onopen = () => {
            wsRef.current?.send(JSON.stringify({
                type: 'start-listener',
                streamId: AVAILABLE_COMMENTARIES.find(c => c.id === selectedCommentary)?.liveStreamId,
                gameTime: minutes * 60 + seconds,
            }));
        };
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'audio-chunk' && data.audio) {
                // Convert base64 to Blob and play
                const byteString = atob(data.audio);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: 'audio/webm' });
                audioBufferRef.current.push(blob);
                if (audioElementRef.current && audioElementRef.current.paused) {
                    audioElementRef.current.src = URL.createObjectURL(blob);
                    audioElementRef.current.play();
                }
            }
        };
    };

    // Fetch the latest chunks of a live stream
    const fetchLatestStreamChunks = (streamId: string) => {
        // In a real app, this would fetch from an API or WebSocket
        console.log(`Fetching latest chunks for stream: ${streamId}`);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (syncIntervalRef.current !== null) {
                clearInterval(syncIntervalRef.current);
            }

            if (gameTimeIntervalRef.current !== null) {
                clearInterval(gameTimeIntervalRef.current);
            }

            if (liveStreamIntervalRef.current !== null) {
                clearInterval(liveStreamIntervalRef.current);
            }
        };
    }, []);

    return (
        <main className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/" className="text-blue-400 hover:text-blue-300">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="text-3xl font-bold mb-8">Watch with Custom Commentary</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 p-6 rounded-lg mb-6">
                            <h2 className="text-xl font-semibold mb-4">How to Use:</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>Start playing your football match on your preferred streaming site</li>
                                <li>Mute the original commentary from your video</li>
                                <li>Select a match, then choose a commentary</li>
                                <li>Enter your current game time to sync perfectly with your video</li>
                            </ol>
                        </div>

                        {selectedCommentary ? (
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">
                                        {AVAILABLE_COMMENTARIES.find(c => c.id === selectedCommentary)?.title}
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl font-mono bg-black px-3 py-1 rounded-lg">{gameTime}</span>

                                        {isLiveCommentary && (
                                            <div className="flex">
                                                <button
                                                    onClick={() => adjustGameTime(-1)}
                                                    className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded flex items-center justify-center"
                                                    title="Subtract 1 second"
                                                >
                                                    <span>-</span>
                                                </button>
                                                <button
                                                    onClick={() => adjustGameTime(1)}
                                                    className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded flex items-center justify-center ml-1"
                                                    title="Add 1 second"
                                                >
                                                    <span>+</span>
                                                </button>
                                                <button
                                                    onClick={toggleGameTimeClock}
                                                    className={`w-8 h-8 rounded flex items-center justify-center ml-1 ${isGameTimeStopped ? 'bg-green-700 hover:bg-green-600' : 'bg-yellow-700 hover:bg-yellow-600'
                                                        }`}
                                                    title={isGameTimeStopped ? "Resume game time" : "Pause game time"}
                                                >
                                                    {isGameTimeStopped ? "▶" : "⏸"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isLiveCommentary && (
                                    <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-blue-700 mb-4">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                                            <h3 className="font-semibold text-blue-300">Live Commentary</h3>
                                        </div>
                                        <p className="text-blue-100">
                                            You are listening to a live commentary by {AVAILABLE_COMMENTARIES.find(c => c.id === selectedCommentary)?.commentator}
                                        </p>
                                    </div>
                                )}

                                <audio ref={audioElementRef} style={{ display: 'none' }}></audio>

                                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                    {!isLiveCommentary && (
                                        <>
                                            <button
                                                onClick={skipBackward}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M8 5a1 1 0 1 0-2 0v4.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L8 9.586V5z" />
                                                </svg>
                                                -10s
                                            </button>

                                            <button
                                                onClick={skipForward}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 5a1 1 0 0 1 2 0v4.586l1.293-1.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L10 9.586V5z" />
                                                </svg>
                                                +10s
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={openSyncDialog}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-12a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l2.828 2.829a1 1 0 1 0 1.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        Sync with Match
                                    </button>
                                </div>

                                {syncDialogOpen && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                                            <h3 className="text-xl font-semibold mb-4">Sync with Match Time</h3>
                                            <p className="mb-4">Enter the current time shown on your video player:</p>

                                            <div className="flex mb-4">
                                                <div className="mr-2 flex-1">
                                                    <label className="block text-sm font-medium mb-1">Minutes</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="130"
                                                        value={manualGameMinute}
                                                        onChange={(e) => setManualGameMinute(e.target.value)}
                                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium mb-1">Seconds</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="59"
                                                        value={manualGameSecond}
                                                        onChange={(e) => setManualGameSecond(e.target.value)}
                                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => setSyncDialogOpen(false)}
                                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSync}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Sync
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : selectedMatch ? (
                            <div className="bg-gray-800 p-8 rounded-lg text-center">
                                <h2 className="text-xl font-semibold mb-4">Select a Commentary</h2>
                                <p className="text-gray-300 mb-6">Choose a commentary from the list on the right to get started.</p>
                                {filteredCommentaries.length === 0 && (
                                    <p className="text-gray-400">No commentaries available for this match yet.</p>
                                )}
                            </div>
                        ) : (
                            <div className="bg-gray-800 p-8 rounded-lg text-center">
                                <h2 className="text-xl font-semibold mb-4">Select a Match</h2>
                                <p className="text-gray-300 mb-6">Choose a match from the list on the right to get started.</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        {selectedMatch ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Available Commentaries</h2>
                                    <button
                                        onClick={() => setSelectedMatch(null)}
                                        className="text-sm text-blue-400 hover:text-blue-300"
                                    >
                                        Change Match
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {filteredCommentaries.map((commentary) => (
                                        <div
                                            key={commentary.id}
                                            className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedCommentary === commentary.id
                                                ? "bg-blue-700"
                                                : "bg-gray-700 hover:bg-gray-600"
                                                }`}
                                            onClick={() => handleCommentarySelect(commentary.id)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold">{commentary.commentator}</h3>
                                                {commentary.isLive && (
                                                    <div className="bg-red-600 text-xs px-2 py-1 rounded-full flex items-center">
                                                        <div className="w-2 h-2 rounded-full bg-white mr-1"></div>
                                                        LIVE
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-300">Date: {commentary.date}</p>
                                            <p className="text-sm text-gray-300">Duration: {commentary.duration}</p>
                                        </div>
                                    ))}
                                    {filteredCommentaries.length === 0 && (
                                        <div className="text-gray-400 text-center py-4">No commentaries available for this match yet.</div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Select a Match</h2>

                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-2 text-gray-300">Live Matches</h3>
                                    <div className="space-y-3">
                                        {MATCHES.filter(m => m.status === "LIVE").map((match) => (
                                            <div
                                                key={match.id}
                                                className="p-4 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
                                                onClick={() => handleMatchSelect(match.id)}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-medium">{match.title}</h4>
                                                    <div className="bg-red-600 text-xs px-2 py-1 rounded-full">LIVE</div>
                                                </div>
                                                <p className="text-sm text-gray-300">Date: {match.date}</p>
                                                {match.currentGameTime && (
                                                    <p className="text-sm text-gray-300">Current: {match.currentGameTime}</p>
                                                )}
                                            </div>
                                        ))}
                                        {MATCHES.filter(m => m.status === "LIVE").length === 0 && (
                                            <p className="text-gray-400 text-center py-2">No live matches at the moment</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-2 text-gray-300">Completed Matches</h3>
                                    <div className="space-y-3">
                                        {MATCHES.filter(m => m.status === "COMPLETED").map((match) => (
                                            <div
                                                key={match.id}
                                                className="p-4 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
                                                onClick={() => handleMatchSelect(match.id)}
                                            >
                                                <h4 className="font-medium">{match.title}</h4>
                                                <p className="text-sm text-gray-300">Date: {match.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2 text-gray-300">Upcoming Matches</h3>
                                    <div className="space-y-3">
                                        {MATCHES.filter(m => m.status === "UPCOMING").map((match) => (
                                            <div
                                                key={match.id}
                                                className="p-4 rounded-lg bg-gray-700 opacity-70"
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-medium">{match.title}</h4>
                                                    <div className="bg-gray-600 text-xs px-2 py-1 rounded-full">UPCOMING</div>
                                                </div>
                                                <p className="text-sm text-gray-300">Date: {match.date}</p>
                                            </div>
                                        ))}
                                        {MATCHES.filter(m => m.status === "UPCOMING").length === 0 && (
                                            <p className="text-gray-400 text-center py-2">No upcoming matches scheduled</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
} 
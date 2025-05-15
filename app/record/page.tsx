"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

// Mock data for games
const LIVE_GAMES = [
    { id: 1, title: "Premier League: Arsenal vs Liverpool", date: "2023-10-08", startTime: "16:00", status: "LIVE", currentGameTime: "35:12" },
    { id: 2, title: "La Liga: Barcelona vs Real Madrid", date: "2023-10-21", startTime: "15:30", status: "LIVE", currentGameTime: "12:45" },
    { id: 3, title: "Champions League: Bayern vs PSG", date: "2023-11-02", startTime: "15:00", status: "LIVE", currentGameTime: "78:20" },
];

const UPCOMING_GAMES = [
    { id: 4, title: "Premier League: Man City vs Chelsea", date: "2023-11-05", startTime: "17:30", status: "UPCOMING" },
    { id: 5, title: "Bundesliga: Dortmund vs Bayern", date: "2023-11-06", startTime: "20:00", status: "UPCOMING" },
    { id: 6, title: "Serie A: Inter vs Milan", date: "2023-11-10", startTime: "19:45", status: "UPCOMING" },
];

// Define types for our game objects
type LiveGame = {
    id: number;
    title: string;
    date: string;
    startTime: string;
    status: "LIVE";
    currentGameTime: string;
};

type UpcomingGame = {
    id: number;
    title: string;
    date: string;
    startTime: string;
    status: "UPCOMING";
};

type Game = LiveGame | UpcomingGame;

const WS_URL = 'ws://localhost:8081';

export default function RecordPage() {
    const [selectedGame, setSelectedGame] = useState<number | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [commentatorName, setCommentatorName] = useState("");
    const [commentaryTitle, setCommentaryTitle] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // Game time tracking
    const [gameTimeMin, setGameTimeMin] = useState("00");
    const [gameTimeSec, setGameTimeSec] = useState("00");
    const [isGameTimeStopped, setIsGameTimeStopped] = useState(false);
    const [gameTimeIntervalId, setGameTimeIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [liveStreamId, setLiveStreamId] = useState<string | null>(null);

    // Refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    // Computed game time in seconds
    const gameTimeInSeconds = () => {
        return parseInt(gameTimeMin) * 60 + parseInt(gameTimeSec);
    };

    // Format game time (ensure 2 digits)
    const formatTimeUnit = (unit: number): string => {
        return unit.toString().padStart(2, '0');
    };

    // Handle game selection
    const handleGameSelect = (id: number) => {
        const game = [...LIVE_GAMES, ...UPCOMING_GAMES].find(g => g.id === id) as Game;
        if (!game) return;

        setSelectedGame(id);
        setCommentaryTitle(game.title);

        // For live games, initialize with current game time
        if (game.status === "LIVE") {
            const liveGame = game as LiveGame;
            const [min, sec] = liveGame.currentGameTime.split(":");
            setGameTimeMin(min);
            setGameTimeSec(sec);
        }
    };

    // Start recording
    const startRecording = async () => {
        try {
            // Validate if a live game is selected
            const selectedGameData = LIVE_GAMES.find(g => g.id === selectedGame);
            if (!selectedGameData) {
                alert("Please select a live game before recording.");
                return;
            }

            // Generate a unique ID for live streaming
            const streamId = uuidv4();
            setLiveStreamId(streamId);

            // Set up audio stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStreamRef.current = stream;

            // Initialize MediaRecorder
            mediaRecorderRef.current = new MediaRecorder(stream);

            // Setup data handling
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                    // Convert audio chunk to base64 and send with game time
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Audio = reader.result?.toString().split(',')[1];
                        if (wsRef.current && wsRef.current.readyState === 1 && base64Audio) {
                            wsRef.current.send(JSON.stringify({
                                type: 'audio-chunk',
                                streamId,
                                gameTime: gameTimeInSeconds(),
                                audio: base64Audio,
                                timestamp: Date.now(),
                            }));
                        }
                    };
                    reader.readAsDataURL(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
                setRecordedBlob(blob);
            };

            // Set up timeslice to get frequent chunks (every 1 second)
            chunksRef.current = [];
            mediaRecorderRef.current.start(1000);

            setIsRecording(true);
            setIsPaused(false);

            // Start recording timer
            setRecordingTime(0);
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

            // Start game time progression
            startGameTimeClock();

            // Connect to WebSocket as commentator
            wsRef.current = new WebSocket(WS_URL);
            wsRef.current.onopen = () => {
                wsRef.current?.send(JSON.stringify({ type: 'start-commentator', streamId }));
            };

        } catch (error) {
            console.error("Error starting recording:", error);
            alert("Could not access your microphone. Please check your permissions.");
        }
    };

    // Pause/resume recording
    const togglePause = () => {
        if (isPaused) {
            // Resume recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
                mediaRecorderRef.current.resume();
            }
            setIsPaused(false);

            // Resume timers if game time is not manually stopped
            if (!isGameTimeStopped) {
                startGameTimeClock();
            }

            if (timerRef.current === null) {
                timerRef.current = setInterval(() => {
                    setRecordingTime(prev => prev + 1);
                }, 1000);
            }
        } else {
            // Pause recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.pause();
            }
            setIsPaused(true);

            // Pause timers
            if (gameTimeIntervalId) {
                clearInterval(gameTimeIntervalId);
                setGameTimeIntervalId(null);
            }

            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();

            // Stop all timers
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (gameTimeIntervalId) {
                clearInterval(gameTimeIntervalId);
                setGameTimeIntervalId(null);
            }

            // Clean up
            if (audioStreamRef.current) {
                audioStreamRef.current.getTracks().forEach(track => {
                    track.stop();
                });
            }

            setIsRecording(false);
            setIsPaused(false);

            // In a real implementation, finalize the live stream
            if (liveStreamId) {
                finalizeAudioStream(liveStreamId);
            }

            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
        }
    };

    // Start the game time clock
    const startGameTimeClock = () => {
        // Clear any existing interval
        if (gameTimeIntervalId) {
            clearInterval(gameTimeIntervalId);
        }

        // Set up new interval
        const newIntervalId = setInterval(() => {
            setGameTimeSec(prev => {
                const newSec = parseInt(prev) + 1;
                if (newSec >= 60) {
                    // Increment minute
                    setGameTimeMin(prevMin => {
                        const newMin = parseInt(prevMin) + 1;
                        // Cap at 130 minutes
                        return newMin <= 130 ? formatTimeUnit(newMin) : "130";
                    });
                    return "00";
                }
                return formatTimeUnit(newSec);
            });
        }, 1000);

        setGameTimeIntervalId(newIntervalId);
        setIsGameTimeStopped(false);
    };

    // Toggle game time clock on/off
    const toggleGameTimeClock = () => {
        if (isGameTimeStopped) {
            startGameTimeClock();
        } else {
            if (gameTimeIntervalId) {
                clearInterval(gameTimeIntervalId);
                setGameTimeIntervalId(null);
            }
            setIsGameTimeStopped(true);
        }
    };

    // Adjust game time +/- 1 second
    const adjustGameTime = (seconds: number) => {
        const currentTotal = parseInt(gameTimeMin) * 60 + parseInt(gameTimeSec);
        let newTotal = currentTotal + seconds;

        // Ensure in valid range (0 to 130:00)
        newTotal = Math.max(0, Math.min(130 * 60, newTotal));

        const newMin = Math.floor(newTotal / 60);
        const newSec = newTotal % 60;

        setGameTimeMin(formatTimeUnit(newMin));
        setGameTimeSec(formatTimeUnit(newSec));
    };

    // Handle manual minute input
    const handleMinuteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // If empty, set to "00"
        if (!value) {
            setGameTimeMin("00");
            return;
        }

        const parsed = parseInt(value);

        // Validate the input is a number in valid range
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 130) {
            setGameTimeMin(formatTimeUnit(parsed));
        }
    };

    // Handle manual second input
    const handleSecondInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // If empty, set to "00"
        if (!value) {
            setGameTimeSec("00");
            return;
        }

        const parsed = parseInt(value);

        // Validate the input is a number in valid range
        if (!isNaN(parsed) && parsed >= 0 && parsed < 60) {
            setGameTimeSec(formatTimeUnit(parsed));
        }
    };

    // Handle upload
    const handleUpload = async () => {
        if (!recordedBlob || !commentatorName || !commentaryTitle) {
            alert("Please fill in all fields and record a commentary before uploading.");
            return;
        }

        setIsUploading(true);

        // Create form data for upload
        const formData = new FormData();
        formData.append('audio', recordedBlob);
        formData.append('title', commentaryTitle);
        formData.append('commentator', commentatorName);
        formData.append('matchId', selectedGame?.toString() || '');
        formData.append('liveStreamId', liveStreamId || '');

        // In a real application, this would upload to a server
        // For now, we'll simulate an upload with a timeout
        setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(true);
            // Reset the live stream ID as it's now been fully processed
            setLiveStreamId(null);
        }, 2000);
    };

    // Live streaming functions using WebSockets
    const sendLiveAudioChunk = async (chunk: BlobPart, currentGameTime: number) => {
        if (!liveStreamId) return;

        try {
            // Create a small FormData object to send both the audio chunk and the game time
            const formData = new FormData();
            formData.append('chunk', new Blob([chunk], { type: 'audio/webm' }));
            formData.append('gameTime', currentGameTime.toString());
            formData.append('streamId', liveStreamId);
            formData.append('timestamp', Date.now().toString());

            // In a production app, this would be an actual API endpoint
            const endpoint = `/api/commentaries/stream/${liveStreamId}/chunk`;

            // Use fetch API to send the chunk
            // In a real application, WebSockets would be more efficient for streaming
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Error sending audio chunk:', await response.text());
            }
        } catch (error) {
            console.error('Failed to send audio chunk:', error);
        }
    };

    const finalizeAudioStream = async (streamId: string) => {
        try {
            // Let the server know the stream is complete
            const endpoint = `/api/commentaries/stream/${streamId}/finalize`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    commentatorName,
                    commentaryTitle,
                    matchId: selectedGame,
                    duration: recordingTime,
                    finalGameTime: gameTimeInSeconds(),
                }),
            });

            if (!response.ok) {
                console.error('Error finalizing stream:', await response.text());
            } else {
                console.log('Successfully finalized audio stream:', streamId);
            }
        } catch (error) {
            console.error('Failed to finalize audio stream:', error);
        }
    };

    // Format time for display (mm:ss)
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Clean up on component unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            if (gameTimeIntervalId) {
                clearInterval(gameTimeIntervalId);
            }

            // Stop any active audio stream
            if (audioStreamRef.current) {
                audioStreamRef.current.getTracks().forEach(track => {
                    track.stop();
                });
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

                <h1 className="text-3xl font-bold mb-8">Record Your Commentary</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {selectedGame ? (
                            <div>
                                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">
                                            {[...LIVE_GAMES, ...UPCOMING_GAMES].find(g => g.id === selectedGame)?.title}
                                        </h2>

                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center rounded bg-black p-2">
                                                <div className="mr-1 font-medium text-gray-400">Game Time:</div>

                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={gameTimeMin}
                                                        onChange={handleMinuteInput}
                                                        className={`w-10 bg-gray-700 border ${isGameTimeStopped ? 'border-yellow-500' : 'border-gray-600'} rounded p-1 text-center font-mono`}
                                                        disabled={!isRecording}
                                                    />
                                                    <span className="mx-1 font-mono">:</span>
                                                    <input
                                                        type="text"
                                                        value={gameTimeSec}
                                                        onChange={handleSecondInput}
                                                        className={`w-10 bg-gray-700 border ${isGameTimeStopped ? 'border-yellow-500' : 'border-gray-600'} rounded p-1 text-center font-mono`}
                                                        disabled={!isRecording}
                                                    />
                                                </div>

                                                {isRecording && (
                                                    <div className="flex ml-2">
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

                                            {isRecording && (
                                                <div className="flex items-center ml-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                                                    <span className="font-mono">{formatTime(recordingTime)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-center space-x-4 my-6">
                                        {!recordedBlob ? (
                                            !isRecording ? (
                                                <button
                                                    onClick={startRecording}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
                                                    disabled={!selectedGame || UPCOMING_GAMES.some(g => g.id === selectedGame)}
                                                >
                                                    Start Recording
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={togglePause}
                                                        className={`${isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'
                                                            } text-white px-6 py-3 rounded-lg font-bold text-lg`}
                                                    >
                                                        {isPaused ? 'Resume' : 'Pause'}
                                                    </button>
                                                    <button
                                                        onClick={stopRecording}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
                                                    >
                                                        Stop Recording
                                                    </button>
                                                </>
                                            )
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setRecordedBlob(null);
                                                    setUploadSuccess(false);
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
                                            >
                                                Record Again
                                            </button>
                                        )}
                                    </div>

                                    {isRecording && liveStreamId && (
                                        <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-blue-700 mb-4">
                                            <h3 className="font-semibold text-blue-300 mb-2">Live Commentary Active</h3>
                                            <p className="text-blue-100">Your commentary is being streamed live. Listeners can tune in while you're recording.</p>
                                            <p className="text-blue-100 mt-2">Stream ID: <span className="font-mono text-sm">{liveStreamId}</span></p>
                                        </div>
                                    )}

                                    {isRecording && (
                                        <div className="bg-yellow-900 bg-opacity-30 p-4 rounded-lg border border-yellow-700">
                                            <h3 className="font-semibold text-yellow-300 mb-2">Recording Tips:</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-yellow-100">
                                                <li>Keep an eye on the game time and adjust if it drifts from your video</li>
                                                <li>Mention key events with their game time for better synchronization</li>
                                                <li>Keep consistent volume levels</li>
                                                <li>Use the pause button if you need a break</li>
                                            </ul>
                                        </div>
                                    )}

                                    {recordedBlob && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold mb-2">Preview Your Commentary</h3>
                                            <audio
                                                controls
                                                src={URL.createObjectURL(recordedBlob)}
                                                className="w-full mb-4"
                                            ></audio>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Commentator Name</label>
                                                    <input
                                                        type="text"
                                                        value={commentatorName}
                                                        onChange={(e) => setCommentatorName(e.target.value)}
                                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Commentary Title</label>
                                                    <input
                                                        type="text"
                                                        value={commentaryTitle}
                                                        onChange={(e) => setCommentaryTitle(e.target.value)}
                                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                                                        placeholder="Title for your commentary"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleUpload}
                                                disabled={isUploading || uploadSuccess}
                                                className={`w-full py-3 rounded-lg font-semibold text-lg ${uploadSuccess
                                                    ? "bg-green-600 cursor-not-allowed"
                                                    : isUploading
                                                        ? "bg-gray-600 cursor-not-allowed"
                                                        : "bg-blue-600 hover:bg-blue-700"
                                                    }`}
                                            >
                                                {uploadSuccess ? "Uploaded Successfully!" : isUploading ? "Uploading..." : "Upload Commentary"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-800 p-8 rounded-lg text-center">
                                <h2 className="text-xl font-semibold mb-4">Select a Game to Get Started</h2>
                                <p className="text-gray-300 mb-6">Choose a live game from the list to begin recording your commentary.</p>
                                <div className="flex justify-center">
                                    <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
                                        <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Live Games</h2>
                            <div className="space-y-4">
                                {LIVE_GAMES.map((game) => (
                                    <div
                                        key={game.id}
                                        className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedGame === game.id
                                            ? "bg-blue-700"
                                            : "bg-gray-700 hover:bg-gray-600"
                                            }`}
                                        onClick={() => handleGameSelect(game.id)}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-semibold">{game.title}</h3>
                                            <div className="bg-red-600 text-xs px-2 py-1 rounded-full">LIVE</div>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-300">
                                            <span>Started: {game.startTime}</span>
                                            <span>Current: {game.currentGameTime}</span>
                                        </div>
                                    </div>
                                ))}
                                {LIVE_GAMES.length === 0 && (
                                    <div className="text-gray-400 text-center py-4">No live games available</div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Upcoming Games</h2>
                            <div className="space-y-4">
                                {UPCOMING_GAMES.map((game) => (
                                    <div
                                        key={game.id}
                                        className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedGame === game.id
                                            ? "bg-blue-700"
                                            : "bg-gray-700 hover:bg-gray-600"
                                            }`}
                                        onClick={() => handleGameSelect(game.id)}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-semibold">{game.title}</h3>
                                            <div className="bg-gray-600 text-xs px-2 py-1 rounded-full">UPCOMING</div>
                                        </div>
                                        <div className="flex text-sm text-gray-300">
                                            <span>Date: {game.date}</span>
                                            <span className="ml-auto">Time: {game.startTime}</span>
                                        </div>
                                    </div>
                                ))}
                                {UPCOMING_GAMES.length === 0 && (
                                    <div className="text-gray-400 text-center py-4">No upcoming games scheduled</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 
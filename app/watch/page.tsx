"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

// Mock data for available commentaries
const AVAILABLE_COMMENTARIES = [
    { id: 1, title: "Premier League: Arsenal vs Liverpool", commentator: "John Smith", date: "2023-10-08", duration: "90:00" },
    { id: 2, title: "La Liga: Barcelona vs Real Madrid", commentator: "Maria Garcia", date: "2023-10-21", duration: "92:30" },
    { id: 3, title: "Champions League: Bayern vs PSG", commentator: "David Johnson", date: "2023-11-02", duration: "94:15" },
];

export default function WatchPage() {
    const [selectedCommentary, setSelectedCommentary] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [gameTime, setGameTime] = useState("00:00");
    const [syncDialogOpen, setSyncDialogOpen] = useState(false);
    const [manualGameMinute, setManualGameMinute] = useState("");
    const [manualGameSecond, setManualGameSecond] = useState("");

    const audioPlayerRef = useRef<any>(null);
    const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleCommentarySelect = (id: number) => {
        setSelectedCommentary(id);
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
        // Start updating game time continuously
        if (syncIntervalRef.current === null) {
            syncIntervalRef.current = setInterval(updateGameTime, 1000);
        }
    };

    const handlePause = () => {
        setIsPlaying(false);
        // Stop updating game time
        if (syncIntervalRef.current !== null) {
            clearInterval(syncIntervalRef.current);
            syncIntervalRef.current = null;
        }
    };

    const openSyncDialog = () => {
        setSyncDialogOpen(true);
    };

    const handleSync = () => {
        if (audioPlayerRef.current && manualGameMinute && manualGameSecond) {
            const targetSeconds = parseInt(manualGameMinute) * 60 + parseInt(manualGameSecond);
            audioPlayerRef.current.audio.current.currentTime = targetSeconds;
            updateGameTime();
            setSyncDialogOpen(false);
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

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (syncIntervalRef.current !== null) {
                clearInterval(syncIntervalRef.current);
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
                                <li>Select a commentary from the list on the right</li>
                                <li>Use the sync controls to match our commentary with your video</li>
                            </ol>
                        </div>

                        {selectedCommentary ? (
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">
                                        {AVAILABLE_COMMENTARIES.find(c => c.id === selectedCommentary)?.title}
                                    </h2>
                                    <div className="flex items-center">
                                        <span className="text-xl font-mono bg-black px-3 py-1 rounded-lg">{gameTime}</span>
                                    </div>
                                </div>

                                <AudioPlayer
                                    ref={audioPlayerRef}
                                    src={`/commentaries/${selectedCommentary}.mp3`}
                                    onPlay={handlePlay}
                                    onPause={handlePause}
                                    showJumpControls={false}
                                    customProgressBarSection={[]}
                                    autoPlayAfterSrcChange={false}
                                    className="mb-4"
                                />

                                <div className="flex flex-wrap gap-2 mt-4 justify-center">
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
                                        onClick={openSyncDialog}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-12a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l2.828 2.829a1 1 0 1 0 1.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        Sync with Match
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
                                                        max="120"
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
                        ) : (
                            <div className="bg-gray-800 p-8 rounded-lg text-center">
                                <h2 className="text-xl font-semibold mb-4">Select a Commentary</h2>
                                <p className="text-gray-300 mb-6">Choose a commentary from the list on the right to get started.</p>
                                <div className="flex justify-center">
                                    <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 15c-1.66 0-3-1.34-3-3 0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.66-1.34 3-3 3z" />
                                        <path d="M12 3C7.03 3 3 7.03 3 12H0l4 4 4-4H5c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7c-1.9 0-3.62-.76-4.88-1.99L4.7 18.43C6.32 20.06 8.54 21 11 21c5.97 0 11-5.03 11-11S17.97 3 12 3z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Available Commentaries</h2>
                        <div className="space-y-4">
                            {AVAILABLE_COMMENTARIES.map((commentary) => (
                                <div
                                    key={commentary.id}
                                    className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedCommentary === commentary.id
                                        ? "bg-blue-700"
                                        : "bg-gray-700 hover:bg-gray-600"
                                        }`}
                                    onClick={() => handleCommentarySelect(commentary.id)}
                                >
                                    <h3 className="font-semibold">{commentary.title}</h3>
                                    <p className="text-sm text-gray-300">Commentator: {commentary.commentator}</p>
                                    <p className="text-sm text-gray-300">Date: {commentary.date}</p>
                                    <p className="text-sm text-gray-300">Duration: {commentary.duration}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 
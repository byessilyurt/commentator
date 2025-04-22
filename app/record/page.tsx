"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

// Mock data for available matches
const AVAILABLE_MATCHES = [
    { id: 1, title: "Premier League: Arsenal vs Liverpool", date: "2023-10-08", duration: "90:00" },
    { id: 2, title: "La Liga: Barcelona vs Real Madrid", date: "2023-10-21", duration: "92:30" },
    { id: 3, title: "Champions League: Bayern vs PSG", date: "2023-11-02", duration: "94:15" },
];

export default function RecordPage() {
    const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [commentatorName, setCommentatorName] = useState("");
    const [commentaryTitle, setCommentaryTitle] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [manualGameMinute, setManualGameMinute] = useState("");
    const [manualGameSecond, setManualGameSecond] = useState("");
    const [gameStartTime, setGameStartTime] = useState<number | null>(null);
    const [currentGameTime, setCurrentGameTime] = useState("00:00");
    const [includeTimeAnnouncements, setIncludeTimeAnnouncements] = useState(true);
    const [timeAnnouncementInterval, setTimeAnnouncementInterval] = useState(15); // in minutes

    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const timeAnnouncementTimerRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);

    const handleMatchSelect = (id: number) => {
        setSelectedMatch(id);
        setCommentaryTitle(AVAILABLE_MATCHES.find(m => m.id === id)?.title || "");
    };

    const startRecording = async () => {
        try {
            // First check if game start time is set
            if (!manualGameMinute || !manualGameSecond) {
                alert("Please set the game start time before recording.");
                return;
            }

            // Initialize game time
            const startTimeInSeconds = parseInt(manualGameMinute) * 60 + parseInt(manualGameSecond);
            setGameStartTime(startTimeInSeconds);
            setCurrentGameTime(formatTime(startTimeInSeconds));

            // Set up audio stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStreamRef.current = stream;

            // Initialize MediaRecorder
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
                setRecordedBlob(blob);
                chunksRef.current = [];

                // Stop and clean up audio stream
                if (audioStreamRef.current) {
                    audioStreamRef.current.getTracks().forEach(track => {
                        track.stop();
                    });
                }
            };

            chunksRef.current = [];
            mediaRecorderRef.current.start();

            setIsRecording(true);

            // Start recording timer
            setRecordingTime(0);
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => {
                    const newTime = prev + 1;

                    // Update game time based on recording time
                    if (gameStartTime !== null) {
                        const currentGame = gameStartTime + newTime;
                        setCurrentGameTime(formatTime(currentGame));
                    }

                    return newTime;
                });
            }, 1000);

            // Start time announcement timer if enabled
            if (includeTimeAnnouncements) {
                setupTimeAnnouncements(startTimeInSeconds);
            }

        } catch (error) {
            console.error("Error starting recording:", error);
            alert("Could not access your microphone. Please check your permissions.");
        }
    };

    const setupTimeAnnouncements = (startTimeInSeconds: number) => {
        // Determine when the next time announcement should be
        const intervalInSeconds = timeAnnouncementInterval * 60;
        const currentSecond = startTimeInSeconds % intervalInSeconds;
        const secondsUntilNextAnnouncement = intervalInSeconds - currentSecond;

        // Schedule the first announcement
        timeAnnouncementTimerRef.current = setTimeout(() => {
            // This would trigger a sound or visual cue for the commentator
            console.log(`Time to announce: ${formatTime(startTimeInSeconds + secondsUntilNextAnnouncement)}`);

            // Schedule subsequent announcements
            timeAnnouncementTimerRef.current = setInterval(() => {
                const gameSeconds = gameStartTime !== null ? gameStartTime + recordingTime : 0;
                console.log(`Time to announce: ${formatTime(gameSeconds)}`);
            }, intervalInSeconds * 1000);

        }, secondsUntilNextAnnouncement * 1000);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();

            setIsRecording(false);

            // Stop timers
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (timeAnnouncementTimerRef.current) {
                clearInterval(timeAnnouncementTimerRef.current);
                timeAnnouncementTimerRef.current = null;
            }
        }
    };

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
        formData.append('matchId', selectedMatch?.toString() || '');
        formData.append('startTime', gameStartTime?.toString() || '0');
        formData.append('duration', formatTime(recordingTime));

        // In a real application, this would upload to a server
        // For now, we'll simulate an upload with a timeout
        setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(true);
        }, 2000);
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

            if (timeAnnouncementTimerRef.current) {
                clearInterval(timeAnnouncementTimerRef.current);
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
                        {selectedMatch ? (
                            <div>
                                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                                    <h2 className="text-xl font-semibold mb-4">Setting Up</h2>
                                    <p className="mb-4">Before you start recording, set the current game time:</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Current Game Minute</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="120"
                                                value={manualGameMinute}
                                                onChange={(e) => setManualGameMinute(e.target.value)}
                                                disabled={isRecording}
                                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                                                placeholder="e.g., 15"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Current Game Second</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="59"
                                                value={manualGameSecond}
                                                onChange={(e) => setManualGameSecond(e.target.value)}
                                                disabled={isRecording}
                                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                                                placeholder="e.g., 30"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={includeTimeAnnouncements}
                                                onChange={(e) => setIncludeTimeAnnouncements(e.target.checked)}
                                                disabled={isRecording}
                                                className="mr-2"
                                            />
                                            <span>Include time announcements to help synchronization</span>
                                        </label>
                                    </div>

                                    {includeTimeAnnouncements && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium mb-1">Announce every (minutes)</label>
                                            <select
                                                value={timeAnnouncementInterval}
                                                onChange={(e) => setTimeAnnouncementInterval(parseInt(e.target.value))}
                                                disabled={isRecording}
                                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                                            >
                                                <option value="5">5 minutes</option>
                                                <option value="10">10 minutes</option>
                                                <option value="15">15 minutes</option>
                                                <option value="30">30 minutes</option>
                                            </select>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                {AVAILABLE_MATCHES.find(m => m.id === selectedMatch)?.title}
                                            </h2>
                                            <p className="text-gray-400 text-sm">
                                                Use time announcements to help listeners sync with the match.
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-4 text-center">
                                                <div className="text-sm text-gray-400">Game Time</div>
                                                <div className="text-xl font-mono bg-black px-3 py-1 rounded-lg">{currentGameTime}</div>
                                            </div>
                                            {isRecording && (
                                                <div className="flex items-center">
                                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                                                    <span className="font-mono">{formatTime(recordingTime)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-center my-6">
                                        {!recordedBlob ? (
                                            isRecording ? (
                                                <button
                                                    onClick={stopRecording}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
                                                >
                                                    Stop Recording
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={startRecording}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
                                                >
                                                    Start Recording
                                                </button>
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

                                    {isRecording && (
                                        <div className="bg-yellow-900 bg-opacity-30 p-4 rounded-lg border border-yellow-700">
                                            <h3 className="font-semibold text-yellow-300 mb-2">Recording Tips:</h3>
                                            <ul className="list-disc pl-5 space-y-1 text-yellow-100">
                                                <li>Mention the game time periodically to help listeners sync with their video</li>
                                                <li>Describe key events clearly (goals, cards, substitutions)</li>
                                                <li>Keep consistent volume levels</li>
                                                <li>Use a good quality microphone if possible</li>
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
                                <h2 className="text-xl font-semibold mb-4">Select a Match to Get Started</h2>
                                <p className="text-gray-300 mb-6">Choose a match from the list on the right to begin recording your commentary.</p>
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
                        <h2 className="text-xl font-semibold mb-4">Available Matches</h2>
                        <div className="space-y-4">
                            {AVAILABLE_MATCHES.map((match) => (
                                <div
                                    key={match.id}
                                    className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedMatch === match.id
                                        ? "bg-blue-700"
                                        : "bg-gray-700 hover:bg-gray-600"
                                        }`}
                                    onClick={() => handleMatchSelect(match.id)}
                                >
                                    <h3 className="font-semibold">{match.title}</h3>
                                    <p className="text-sm text-gray-300">Date: {match.date}</p>
                                    <p className="text-sm text-gray-300">Duration: {match.duration}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 
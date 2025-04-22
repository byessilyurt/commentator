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

    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMatchSelect = (id: number) => {
        setSelectedMatch(id);
        setCommentaryTitle(AVAILABLE_MATCHES.find(m => m.id === id)?.title || "");
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
            };

            chunksRef.current = [];
            mediaRecorderRef.current.start();

            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }

            setIsRecording(true);

            // Start timer
            setRecordingTime(0);
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error("Error starting recording:", error);
            alert("Could not access your microphone. Please check your permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();

            if (videoRef.current) {
                videoRef.current.pause();
            }

            setIsRecording(false);

            // Stop timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    const handleUpload = async () => {
        if (!recordedBlob || !commentatorName || !commentaryTitle) {
            alert("Please fill in all fields and record a commentary before uploading.");
            return;
        }

        setIsUploading(true);

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
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Clean up on component unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
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
                                <div className="bg-black rounded-lg overflow-hidden mb-4">
                                    <video
                                        ref={videoRef}
                                        controls={!isRecording}
                                        className="w-full"
                                        poster="/video-placeholder.jpg"
                                    >
                                        <source src={`/matches/${selectedMatch}.mp4`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>

                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold">
                                            Recording: {AVAILABLE_MATCHES.find(m => m.id === selectedMatch)?.title}
                                        </h2>
                                        <div className="flex items-center">
                                            {isRecording && (
                                                <div className="flex items-center mr-4">
                                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                                                    <span className="font-mono">{formatTime(recordingTime)}</span>
                                                </div>
                                            )}
                                            {!recordedBlob ? (
                                                isRecording ? (
                                                    <button
                                                        onClick={stopRecording}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Stop Recording
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={startRecording}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
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
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Record Again
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {recordedBlob && (
                                        <div className="mt-4">
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
                                                className={`w-full py-2 rounded-lg font-semibold ${uploadSuccess
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
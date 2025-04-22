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
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioPlayerRef = useRef<any>(null);

    const handleCommentarySelect = (id: number) => {
        setSelectedCommentary(id);
    };

    const handleVideoTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);

            // Sync the audio player with the video
            if (audioPlayerRef.current && Math.abs(audioPlayerRef.current.audio.current.currentTime - videoRef.current.currentTime) > 0.5) {
                audioPlayerRef.current.audio.current.currentTime = videoRef.current.currentTime;
            }
        }
    };

    const handleVideoPlay = () => {
        setIsPlaying(true);
        if (audioPlayerRef.current && selectedCommentary) {
            audioPlayerRef.current.audio.current.play();
        }
    };

    const handleVideoPause = () => {
        setIsPlaying(false);
        if (audioPlayerRef.current && selectedCommentary) {
            audioPlayerRef.current.audio.current.pause();
        }
    };

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
                        <div className="bg-black rounded-lg overflow-hidden">
                            <video
                                ref={videoRef}
                                controls
                                className="w-full"
                                onTimeUpdate={handleVideoTimeUpdate}
                                onPlay={handleVideoPlay}
                                onPause={handleVideoPause}
                                poster="/video-placeholder.jpg"
                            >
                                <source src="/sample-match.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {selectedCommentary && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">
                                    Selected Commentary: {AVAILABLE_COMMENTARIES.find(c => c.id === selectedCommentary)?.title}
                                </h2>
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <AudioPlayer
                                        ref={audioPlayerRef}
                                        src={`/commentaries/${selectedCommentary}.mp3`}
                                        showJumpControls={false}
                                        customProgressBarSection={[]}
                                        autoPlayAfterSrcChange={isPlaying}
                                    />
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
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar, Globe, Youtube, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

type Match = {
    id: string;
    homeTeam: string;
    awayTeam: string;
    league: string;
    scheduledTime: string;
    status: string;
};

export default function StreamSetupPage() {
    const searchParams = useSearchParams();
    const preselectedMatchId = searchParams.get('matchId');

    const [selectedMatch, setSelectedMatch] = useState<string>(preselectedMatchId || "");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [language, setLanguage] = useState("en");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUpcomingMatches();
    }, []);

    useEffect(() => {
        validateYoutubeUrl(youtubeUrl);
    }, [youtubeUrl]);

    useEffect(() => {
        if (selectedMatch && upcomingMatches.length > 0) {
            const match = upcomingMatches.find(m => m.id === selectedMatch);
            if (match) {
                setTitle(`${match.homeTeam} vs ${match.awayTeam} - Commentary`);
            }
        }
    }, [selectedMatch, upcomingMatches]);

    const fetchUpcomingMatches = async () => {
        try {
            // Mock data for now - replace with actual API call
            setUpcomingMatches([
                {
                    id: "1",
                    homeTeam: "Manchester City",
                    awayTeam: "Chelsea",
                    league: "Premier League",
                    scheduledTime: "2024-01-20T17:30:00Z",
                    status: "scheduled"
                },
                {
                    id: "2",
                    homeTeam: "Bayern Munich",
                    awayTeam: "Borussia Dortmund",
                    league: "Bundesliga",
                    scheduledTime: "2024-01-21T18:30:00Z",
                    status: "scheduled"
                },
                {
                    id: "3",
                    homeTeam: "Inter Milan",
                    awayTeam: "AC Milan",
                    league: "Serie A",
                    scheduledTime: "2024-01-22T19:45:00Z",
                    status: "scheduled"
                }
            ]);
        } catch (error) {
            console.error('Error fetching matches:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateYoutubeUrl = (url: string) => {
        if (!url) {
            setIsValidUrl(false);
            return;
        }

        // YouTube URL patterns
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([^&\n?#]+)/,
            /youtube\.com\/v\/([^&\n?#]+)/
        ];

        const isValid = patterns.some(pattern => pattern.test(url));
        setIsValidUrl(isValid);
    };

    const extractVideoId = (url: string) => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([^&\n?#]+)/,
            /youtube\.com\/v\/([^&\n?#]+)/
        ];

        for (let pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedMatch || !youtubeUrl || !isValidUrl) {
            alert("Please fill in all required fields with valid data");
            return;
        }

        setIsSubmitting(true);

        try {
            // In a real app, this would be an API call
            const response = await fetch('/api/commentaries/manage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    matchId: selectedMatch,
                    youtubeStreamUrl: youtubeUrl,
                    language,
                    title,
                    description
                })
            });

            if (response.ok) {
                setSubmitSuccess(true);
                // Reset form
                setSelectedMatch("");
                setYoutubeUrl("");
                setTitle("");
                setDescription("");
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to create commentary'}`);
            }
        } catch (error) {
            console.error('Error creating commentary:', error);
            alert('Failed to create commentary. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading matches...</p>
                </div>
            </div>
        );
    }

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center max-w-md">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-4">Commentary Registered!</h1>
                    <p className="text-gray-300 mb-6">
                        Your commentary stream has been registered successfully. You can now manage it from your dashboard.
                    </p>
                    <div className="space-y-3">
                        <Link
                            href="/commentator/dashboard"
                            className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Back to Dashboard
                        </Link>
                        <Link
                            href="/commentator/stream/setup"
                            className="block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                        >
                            Register Another Commentary
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/commentator/dashboard" className="text-blue-400 hover:text-blue-300 flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Set Up New Commentary</h1>
                    <p className="text-gray-400 mb-8">Register your YouTube Live stream for an upcoming match</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Match Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select Match <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={selectedMatch}
                                onChange={(e) => setSelectedMatch(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                                required
                            >
                                <option value="">Choose a match...</option>
                                {upcomingMatches.map((match) => (
                                    <option key={match.id} value={match.id}>
                                        {match.homeTeam} vs {match.awayTeam} - {match.league} ({formatDate(match.scheduledTime)})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* YouTube URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                YouTube Live Stream URL <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Youtube className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="url"
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className={`w-full bg-gray-700 text-white border rounded-lg p-3 pl-11 ${
                                        youtubeUrl && !isValidUrl ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    required
                                />
                                {youtubeUrl && (
                                    <div className="absolute right-3 top-3">
                                        {isValidUrl ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-500" />
                                        )}
                                    </div>
                                )}
                            </div>
                            {youtubeUrl && !isValidUrl && (
                                <p className="text-red-500 text-sm mt-1">Please enter a valid YouTube URL</p>
                            )}
                            <p className="text-gray-400 text-sm mt-1">
                                Make sure your YouTube stream is set to "Public" or "Unlisted"
                            </p>
                        </div>

                        {/* Language */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Commentary Language <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                                required
                            >
                                <option value="en">🇬🇧 English</option>
                                <option value="es">🇪🇸 Spanish</option>
                                <option value="fr">🇫🇷 French</option>
                                <option value="de">🇩🇪 German</option>
                                <option value="it">🇮🇹 Italian</option>
                                <option value="pt">🇵🇹 Portuguese</option>
                                <option value="tr">🇹🇷 Turkish</option>
                                <option value="ar">🇸🇦 Arabic</option>
                            </select>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Commentary Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Auto-generated from match selection"
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell viewers what makes your commentary special..."
                                rows={3}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                            />
                        </div>

                        {/* Pre-stream Checklist */}
                        <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-blue-700">
                            <h3 className="font-semibold text-blue-300 mb-3">Pre-Stream Checklist</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    <span>YouTube Live stream is set up and ready</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    <span>Audio quality is clear (test with friends)</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    <span>You have access to watch the match</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    <span>Stable internet connection</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!selectedMatch || !youtubeUrl || !isValidUrl || isSubmitting}
                            className={`w-full py-3 rounded-lg font-semibold text-lg ${
                                !selectedMatch || !youtubeUrl || !isValidUrl || isSubmitting
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {isSubmitting ? "Registering..." : "Register Commentary Stream"}
                        </button>
                    </form>

                    {/* Help Section */}
                    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                        <h3 className="font-semibold mb-3">Need Help?</h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <div>
                                <strong>Setting up YouTube Live:</strong>
                                <ol className="list-decimal list-inside mt-1 space-y-1">
                                    <li>Go to YouTube Studio → Create → Go Live</li>
                                    <li>Choose "Webcam" or "Streaming software"</li>
                                    <li>Set title and privacy (Public or Unlisted)</li>
                                    <li>Copy the stream URL and paste it above</li>
                                </ol>
                            </div>
                            <div>
                                <strong>Audio Quality Tips:</strong>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                    <li>Use a good microphone (USB or headset)</li>
                                    <li>Find a quiet environment</li>
                                    <li>Test your audio levels before going live</li>
                                    <li>Speak clearly and maintain consistent volume</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
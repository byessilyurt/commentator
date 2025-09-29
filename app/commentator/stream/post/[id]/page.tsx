"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
    ArrowLeft, 
    Users, 
    Star, 
    Clock, 
    TrendingUp, 
    Download,
    Share2,
    BarChart3,
    Target
} from "lucide-react";

type Commentary = {
    id: string;
    title: string;
    status: string;
    viewCount: number;
    rating: number;
    startedAt: string;
    endedAt: string;
    duration: number;
    match: {
        homeTeam: string;
        awayTeam: string;
        league: string;
        scheduledTime: string;
    };
};

type Analytics = {
    totalViews: number;
    peakViewers: number;
    averageViewTime: number;
    syncAccuracy: number;
    userRatings: number[];
    viewersByCountry: { country: string; count: number }[];
    viewersByHour: { hour: number; viewers: number }[];
};

export default function PostStreamAnalytics() {
    const params = useParams();
    const commentaryId = params.id as string;

    const [commentary, setCommentary] = useState<Commentary | null>(null);
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalyticsData();
    }, [commentaryId]);

    const fetchAnalyticsData = async () => {
        try {
            // Mock data for now - replace with actual API calls
            setCommentary({
                id: commentaryId,
                title: "Arsenal vs Liverpool - Premier League Commentary",
                status: "ended",
                viewCount: 2150,
                rating: 4.7,
                startedAt: "2024-01-15T16:00:00Z",
                endedAt: "2024-01-15T18:05:00Z",
                duration: 7500, // 125 minutes in seconds
                match: {
                    homeTeam: "Arsenal",
                    awayTeam: "Liverpool",
                    league: "Premier League",
                    scheduledTime: "2024-01-15T16:00:00Z"
                }
            });

            setAnalytics({
                totalViews: 2150,
                peakViewers: 1850,
                averageViewTime: 4200, // 70 minutes
                syncAccuracy: 94.5, // percentage
                userRatings: [5, 5, 4, 5, 4, 5, 5, 3, 4, 5],
                viewersByCountry: [
                    { country: "United Kingdom", count: 850 },
                    { country: "United States", count: 420 },
                    { country: "Canada", count: 280 },
                    { country: "Australia", count: 200 },
                    { country: "Ireland", count: 150 }
                ],
                viewersByHour: [
                    { hour: 16, viewers: 450 },
                    { hour: 17, viewers: 1200 },
                    { hour: 18, viewers: 1850 },
                    { hour: 19, viewers: 800 }
                ]
            });
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateRatingDistribution = (ratings: number[]) => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        ratings.forEach(rating => {
            distribution[rating as keyof typeof distribution]++;
        });
        return distribution;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading analytics...</p>
                </div>
            </div>
        );
    }

    if (!commentary || !analytics) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Analytics Not Available</h1>
                    <Link href="/commentator/dashboard" className="text-blue-400 hover:text-blue-300">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const ratingDistribution = calculateRatingDistribution(analytics.userRatings);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <Link href="/commentator/dashboard" className="text-blue-400 hover:text-blue-300 mr-4">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{commentary.title}</h1>
                            <p className="text-gray-400">
                                {formatDate(commentary.startedAt)} • {formatDuration(commentary.duration)}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                        </button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Total Views</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{analytics.peakViewers.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Peak Viewers</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{formatDuration(analytics.averageViewTime)}</p>
                        <p className="text-gray-400 text-sm">Avg Watch Time</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <Target className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{analytics.syncAccuracy.toFixed(1)}%</p>
                        <p className="text-gray-400 text-sm">Sync Accuracy</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Viewer Engagement */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Viewer Engagement</h2>
                        
                        {/* Rating Distribution */}
                        <div className="mb-6">
                            <h3 className="font-medium mb-3">Rating Distribution</h3>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map(rating => {
                                    const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                                    const percentage = (count / analytics.userRatings.length) * 100;
                                    
                                    return (
                                        <div key={rating} className="flex items-center">
                                            <span className="w-8 text-sm">{rating}★</span>
                                            <div className="flex-1 bg-gray-700 rounded-full h-2 mx-3">
                                                <div 
                                                    className="bg-yellow-500 h-2 rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="w-12 text-sm text-gray-400">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Viewers by Country */}
                        <div>
                            <h3 className="font-medium mb-3">Top Countries</h3>
                            <div className="space-y-2">
                                {analytics.viewersByCountry.slice(0, 5).map((country, index) => (
                                    <div key={country.country} className="flex justify-between items-center text-sm">
                                        <span>{country.country}</span>
                                        <span className="text-gray-400">{country.count} viewers</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Performance Insights */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Performance Insights</h2>
                        
                        {/* Sync Performance */}
                        <div className="mb-6">
                            <h3 className="font-medium mb-3">Synchronization Performance</h3>
                            <div className="bg-gray-700 p-4 rounded">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm">Sync Accuracy</span>
                                    <span className="font-semibold text-green-500">{analytics.syncAccuracy}%</span>
                                </div>
                                <div className="w-full bg-gray-600 rounded-full h-2">
                                    <div 
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: `${analytics.syncAccuracy}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    Based on viewer sync reports during the stream
                                </p>
                            </div>
                        </div>

                        {/* Viewer Retention */}
                        <div className="mb-6">
                            <h3 className="font-medium mb-3">Viewer Retention</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span>Started watching</span>
                                    <span>{analytics.totalViews} viewers</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Watched 50%+</span>
                                    <span>{Math.round(analytics.totalViews * 0.65)} viewers</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Watched until end</span>
                                    <span>{Math.round(analytics.totalViews * 0.45)} viewers</span>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div>
                            <h3 className="font-medium mb-3">Recommendations</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                                    <span>Great sync accuracy! Your event marking helped viewers stay synchronized.</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                                    <span>High viewer retention suggests engaging commentary style.</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3 flex-shrink-0"></div>
                                    <span>Consider promoting your next stream on social media to grow your audience.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center space-x-4">
                    <Link
                        href="/commentator/stream/setup"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Set Up Next Commentary
                    </Link>
                    <Link
                        href="/commentator/dashboard"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
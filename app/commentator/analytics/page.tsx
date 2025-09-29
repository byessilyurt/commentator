"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    ArrowLeft, 
    TrendingUp, 
    Users, 
    Star, 
    Clock, 
    Globe,
    Calendar,
    BarChart3,
    PieChart
} from "lucide-react";

type AnalyticsData = {
    overview: {
        totalViews: number;
        totalCommentaries: number;
        averageRating: number;
        totalWatchTime: number;
    };
    monthlyStats: {
        month: string;
        views: number;
        commentaries: number;
        avgRating: number;
    }[];
    topCommentaries: {
        id: string;
        title: string;
        views: number;
        rating: number;
        date: string;
    }[];
    audienceInsights: {
        topCountries: { country: string; percentage: number }[];
        avgSessionDuration: number;
        retentionRate: number;
    };
};

export default function CommentatorAnalytics() {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState("3months");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalyticsData();
    }, [selectedPeriod]);

    const fetchAnalyticsData = async () => {
        try {
            // Mock data for now - replace with actual API call
            setAnalyticsData({
                overview: {
                    totalViews: 125000,
                    totalCommentaries: 45,
                    averageRating: 4.6,
                    totalWatchTime: 8750000 // seconds
                },
                monthlyStats: [
                    { month: "Jan 2024", views: 45000, commentaries: 15, avgRating: 4.7 },
                    { month: "Dec 2023", views: 38000, commentaries: 12, avgRating: 4.5 },
                    { month: "Nov 2023", views: 42000, commentaries: 18, avgRating: 4.6 }
                ],
                topCommentaries: [
                    {
                        id: "1",
                        title: "Arsenal vs Liverpool - Premier League",
                        views: 8500,
                        rating: 4.9,
                        date: "2024-01-15"
                    },
                    {
                        id: "2",
                        title: "Barcelona vs Real Madrid - El Clasico",
                        views: 7200,
                        rating: 4.8,
                        date: "2024-01-10"
                    },
                    {
                        id: "3",
                        title: "Bayern vs PSG - Champions League",
                        views: 6800,
                        rating: 4.7,
                        date: "2024-01-05"
                    }
                ],
                audienceInsights: {
                    topCountries: [
                        { country: "United Kingdom", percentage: 35 },
                        { country: "United States", percentage: 25 },
                        { country: "Canada", percentage: 15 },
                        { country: "Australia", percentage: 12 },
                        { country: "Ireland", percentage: 8 }
                    ],
                    avgSessionDuration: 4200, // 70 minutes
                    retentionRate: 68
                }
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

    const formatLargeNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
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

    if (!analyticsData) {
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

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <Link href="/commentator/dashboard" className="text-blue-400 hover:text-blue-300 mr-4">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                            <p className="text-gray-400">Track your commentary performance</p>
                        </div>
                    </div>
                    
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                    >
                        <option value="1month">Last Month</option>
                        <option value="3months">Last 3 Months</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="1year">Last Year</option>
                    </select>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold">{formatLargeNumber(analyticsData.overview.totalViews)}</p>
                        <p className="text-gray-400">Total Views</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold">{analyticsData.overview.totalCommentaries}</p>
                        <p className="text-gray-400">Commentaries</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold">{analyticsData.overview.averageRating.toFixed(1)}</p>
                        <p className="text-gray-400">Avg Rating</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold">{formatDuration(analyticsData.overview.totalWatchTime)}</p>
                        <p className="text-gray-400">Watch Time</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Monthly Performance */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
                        <div className="space-y-4">
                            {analyticsData.monthlyStats.map((month, index) => (
                                <div key={month.month} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                                    <div>
                                        <p className="font-semibold">{month.month}</p>
                                        <p className="text-sm text-gray-400">{month.commentaries} commentaries</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{formatLargeNumber(month.views)} views</p>
                                        <p className="text-sm text-yellow-500">★ {month.avgRating.toFixed(1)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Commentaries */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Top Commentaries</h2>
                        <div className="space-y-4">
                            {analyticsData.topCommentaries.map((commentary, index) => (
                                <div key={commentary.id} className="flex items-center p-3 bg-gray-700 rounded">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{commentary.title}</p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(commentary.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold">{formatLargeNumber(commentary.views)}</p>
                                        <p className="text-xs text-yellow-500">★ {commentary.rating.toFixed(1)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Audience Insights */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Audience Insights</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-3">Top Countries</h3>
                                <div className="space-y-2">
                                    {analyticsData.audienceInsights.topCountries.map((country) => (
                                        <div key={country.country} className="flex justify-between items-center">
                                            <span className="text-sm">{country.country}</span>
                                            <div className="flex items-center">
                                                <div className="w-20 bg-gray-700 rounded-full h-2 mr-2">
                                                    <div 
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{ width: `${country.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-400">{country.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Engagement Metrics</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Avg Session</span>
                                        <span>{formatDuration(analyticsData.audienceInsights.avgSessionDuration)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Retention Rate</span>
                                        <span>{analyticsData.audienceInsights.retentionRate}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Growth Trends */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Growth Trends</h2>
                        
                        <div className="space-y-4">
                            <div className="p-4 bg-green-900 bg-opacity-30 rounded border border-green-700">
                                <div className="flex items-center mb-2">
                                    <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                                    <span className="font-semibold text-green-300">Growing Audience</span>
                                </div>
                                <p className="text-green-100 text-sm">
                                    Your viewership has grown 23% this month compared to last month.
                                </p>
                            </div>

                            <div className="p-4 bg-blue-900 bg-opacity-30 rounded border border-blue-700">
                                <div className="flex items-center mb-2">
                                    <Star className="w-5 h-5 text-blue-500 mr-2" />
                                    <span className="font-semibold text-blue-300">High Quality</span>
                                </div>
                                <p className="text-blue-100 text-sm">
                                    Your average rating is in the top 10% of all commentators.
                                </p>
                            </div>

                            <div className="p-4 bg-purple-900 bg-opacity-30 rounded border border-purple-700">
                                <div className="flex items-center mb-2">
                                    <Users className="w-5 h-5 text-purple-500 mr-2" />
                                    <span className="font-semibold text-purple-300">Loyal Viewers</span>
                                </div>
                                <p className="text-purple-100 text-sm">
                                    68% of your viewers return for multiple commentaries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 text-center">
                    <Link
                        href="/commentator/stream/setup"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center"
                    >
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule Next Commentary
                    </Link>
                </div>
            </div>
        </div>
    );
}
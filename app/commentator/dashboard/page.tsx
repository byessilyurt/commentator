"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Users, Star, TrendingUp, Play, Clock, Eye } from "lucide-react";

type Commentary = {
    id: string;
    title: string;
    status: string;
    viewCount: number;
    rating: number;
    startedAt: string | null;
    endedAt: string | null;
    match: {
        homeTeam: string;
        awayTeam: string;
        league: string;
        scheduledTime: string;
    };
};

type DashboardStats = {
    totalViews: number;
    averageRating: number;
    totalCommentaries: number;
    liveCommentaries: number;
};

export default function CommentatorDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalViews: 0,
        averageRating: 0,
        totalCommentaries: 0,
        liveCommentaries: 0
    });
    const [recentCommentaries, setRecentCommentaries] = useState<Commentary[]>([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // In a real app, these would be actual API calls
            // For now, we'll use mock data
            setStats({
                totalViews: 12450,
                averageRating: 4.6,
                totalCommentaries: 23,
                liveCommentaries: 2
            });

            setRecentCommentaries([
                {
                    id: "1",
                    title: "Arsenal vs Liverpool - Premier League",
                    status: "live",
                    viewCount: 1250,
                    rating: 4.7,
                    startedAt: new Date().toISOString(),
                    endedAt: null,
                    match: {
                        homeTeam: "Arsenal",
                        awayTeam: "Liverpool",
                        league: "Premier League",
                        scheduledTime: new Date().toISOString()
                    }
                },
                {
                    id: "2",
                    title: "Barcelona vs Real Madrid - La Liga",
                    status: "ended",
                    viewCount: 2100,
                    rating: 4.8,
                    startedAt: "2024-01-15T20:00:00Z",
                    endedAt: "2024-01-15T22:00:00Z",
                    match: {
                        homeTeam: "Barcelona",
                        awayTeam: "Real Madrid",
                        league: "La Liga",
                        scheduledTime: "2024-01-15T20:00:00Z"
                    }
                }
            ]);

            setUpcomingMatches([
                {
                    id: "3",
                    homeTeam: "Manchester City",
                    awayTeam: "Chelsea",
                    league: "Premier League",
                    scheduledTime: "2024-01-20T17:30:00Z"
                },
                {
                    id: "4",
                    homeTeam: "Bayern Munich",
                    awayTeam: "Borussia Dortmund",
                    league: "Bundesliga",
                    scheduledTime: "2024-01-21T18:30:00Z"
                }
            ]);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            live: "bg-red-600 text-white",
            scheduled: "bg-blue-600 text-white",
            ended: "bg-gray-600 text-white"
        };

        const icons = {
            live: <div className="w-2 h-2 rounded-full bg-white animate-pulse mr-1" />,
            scheduled: <Clock className="w-3 h-3 mr-1" />,
            ended: <div className="w-2 h-2 rounded-full bg-gray-400 mr-1" />
        };

        return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.ended}`}>
                {icons[status]}
                {status.toUpperCase()}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Commentator Dashboard</h1>
                        <p className="text-gray-400">Manage your live commentary streams</p>
                    </div>
                    <Link
                        href="/commentator/stream/setup"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                    >
                        <Play className="w-5 h-5 mr-2" />
                        New Commentary
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Views</p>
                                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                            </div>
                            <Eye className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Average Rating</p>
                                <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                            </div>
                            <Star className="w-8 h-8 text-yellow-500" />
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Commentaries</p>
                                <p className="text-2xl font-bold">{stats.totalCommentaries}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Live Now</p>
                                <p className="text-2xl font-bold">{stats.liveCommentaries}</p>
                            </div>
                            <Users className="w-8 h-8 text-red-500" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Commentaries */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Recent Commentaries</h2>
                        <div className="space-y-4">
                            {recentCommentaries.map((commentary) => (
                                <div key={commentary.id} className="bg-gray-700 p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{commentary.title}</h3>
                                        {getStatusBadge(commentary.status)}
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">
                                        {commentary.match.league} • {formatDate(commentary.match.scheduledTime)}
                                    </p>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <Eye className="w-4 h-4 mr-1" />
                                                {commentary.viewCount}
                                            </span>
                                            <span className="flex items-center">
                                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                                {commentary.rating.toFixed(1)}
                                            </span>
                                        </div>
                                        {commentary.status === "live" ? (
                                            <Link
                                                href={`/commentator/stream/live/${commentary.id}`}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Manage Live
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/commentator/stream/post/${commentary.id}`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                                            >
                                                View Analytics
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Matches */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
                        <div className="space-y-4">
                            {upcomingMatches.map((match: any) => (
                                <div key={match.id} className="bg-gray-700 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-1">
                                        {match.homeTeam} vs {match.awayTeam}
                                    </h3>
                                    <p className="text-sm text-gray-300 mb-3">
                                        {match.league} • {formatDate(match.scheduledTime)}
                                    </p>
                                    <Link
                                        href={`/commentator/stream/setup?matchId=${match.id}`}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm inline-flex items-center"
                                    >
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Register Commentary
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/commentator/stream/setup"
                            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center"
                        >
                            <Play className="w-8 h-8 mx-auto mb-2" />
                            <h3 className="font-semibold">Start New Stream</h3>
                            <p className="text-sm opacity-90">Set up commentary for upcoming match</p>
                        </Link>
                        
                        <Link
                            href="/commentator/profile"
                            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center"
                        >
                            <Users className="w-8 h-8 mx-auto mb-2" />
                            <h3 className="font-semibold">Profile Settings</h3>
                            <p className="text-sm opacity-90">Update your commentator profile</p>
                        </Link>
                        
                        <Link
                            href="/commentator/analytics"
                            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center"
                        >
                            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                            <h3 className="font-semibold">Analytics</h3>
                            <p className="text-sm opacity-90">View detailed performance metrics</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
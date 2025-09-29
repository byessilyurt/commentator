"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TestTube, CircleCheck as CheckCircle, Circle as XCircle } from "lucide-react";
import LiveStatusIndicator from "../../components/LiveStatusIndicator";
import EventMarker from "../../components/EventMarker";
import GameTimer from "../../components/GameTimer";

export default function CommentatorTestPage() {
    const [gameTime, setGameTime] = useState({ minutes: 45, seconds: 30 });
    const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});

    const runAPITest = async (testName: string, endpoint: string, method = 'GET') => {
        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || 'test-token'}`
                }
            });
            
            const success = response.ok;
            setTestResults(prev => ({ ...prev, [testName]: success }));
            
            return { success, data: success ? await response.json() : null };
        } catch (error) {
            setTestResults(prev => ({ ...prev, [testName]: false }));
            return { success: false, error };
        }
    };

    const runAllTests = async () => {
        console.log('Running all API tests...');
        
        const tests = [
            { name: 'Live Matches', endpoint: '/api/matches/live' },
            { name: 'Upcoming Matches', endpoint: '/api/matches/upcoming' },
            { name: 'Live Commentaries', endpoint: '/api/commentaries/live' },
            { name: 'Match Detection', endpoint: '/api/matches/detect?url=https://netflix.com/test&title=Arsenal vs Liverpool' },
            { name: 'Sync Data', endpoint: '/api/sync/commentary-1' },
            { name: 'Dashboard Data', endpoint: '/api/commentator/dashboard' }
        ];

        for (const test of tests) {
            await runAPITest(test.name, test.endpoint);
            // Small delay between tests
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    };

    const handleEventMark = (eventType: string, team?: string, player?: string) => {
        console.log('Event marked:', { eventType, team, player, gameTime });
        alert(`Event marked: ${eventType} at ${gameTime.minutes}:${gameTime.seconds.toString().padStart(2, '0')}`);
    };

    const handleTimeChange = (minutes: number, seconds: number) => {
        setGameTime({ minutes, seconds });
    };

    const getTestIcon = (testName: string) => {
        if (!(testName in testResults)) {
            return <div className="w-4 h-4 rounded-full bg-gray-500"></div>;
        }
        
        return testResults[testName] ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
            <XCircle className="w-4 h-4 text-red-500" />
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/commentator/dashboard" className="text-blue-400 hover:text-blue-300 flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Commentator Dashboard Test Suite</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Component Tests */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">Component Tests</h2>
                            
                            {/* Game Timer Test */}
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Game Timer Component</h3>
                                <GameTimer
                                    onTimeChange={handleTimeChange}
                                    initialMinutes={45}
                                    initialSeconds={30}
                                />
                                <p className="text-sm text-gray-400 mt-2">
                                    Current time: {gameTime.minutes}:{gameTime.seconds.toString().padStart(2, '0')}
                                </p>
                            </div>

                            {/* Event Marker Test */}
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Event Marker Component</h3>
                                <EventMarker
                                    onMarkEvent={handleEventMark}
                                    gameTime={gameTime}
                                />
                            </div>

                            {/* Live Status Test */}
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Live Status Indicator</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2">Live Stream</p>
                                        <LiveStatusIndicator 
                                            commentaryId="test-live"
                                            isLive={true}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-2">Offline Stream</p>
                                        <LiveStatusIndicator 
                                            commentaryId="test-offline"
                                            isLive={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* API Tests */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold">API Tests</h2>
                                <button
                                    onClick={runAllTests}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                    <TestTube className="w-4 h-4 mr-2" />
                                    Run All Tests
                                </button>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">API Endpoint Tests</h3>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Live Matches', endpoint: '/api/matches/live' },
                                        { name: 'Upcoming Matches', endpoint: '/api/matches/upcoming' },
                                        { name: 'Live Commentaries', endpoint: '/api/commentaries/live' },
                                        { name: 'Match Detection', endpoint: '/api/matches/detect' },
                                        { name: 'Sync Data', endpoint: '/api/sync/commentary-1' },
                                        { name: 'Dashboard Data', endpoint: '/api/commentator/dashboard' }
                                    ].map((test) => (
                                        <div key={test.name} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                                            <div className="flex items-center">
                                                {getTestIcon(test.name)}
                                                <span className="ml-3">{test.name}</span>
                                            </div>
                                            <button
                                                onClick={() => runAPITest(test.name, test.endpoint)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Test
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Page Navigation Tests */}
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Page Navigation Tests</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Link
                                        href="/commentator/dashboard"
                                        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded text-center"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/commentator/stream/setup"
                                        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded text-center"
                                    >
                                        Stream Setup
                                    </Link>
                                    <Link
                                        href="/commentator/profile"
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-center"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/commentator/analytics"
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded text-center"
                                    >
                                        Analytics
                                    </Link>
                                </div>
                            </div>

                            {/* Extension Integration Test */}
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Extension Integration</h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-blue-900 bg-opacity-30 rounded border border-blue-700">
                                        <p className="text-blue-300 text-sm">
                                            <strong>Extension Test:</strong> Install the Chrome extension and test on a video streaming site.
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            href="/extension-test"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                                        >
                                            Extension Test Page
                                        </Link>
                                        <button
                                            onClick={() => window.open('chrome://extensions/', '_blank')}
                                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
                                        >
                                            Chrome Extensions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Test Results Summary */}
                    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Test Results Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium mb-2">Passed Tests</h3>
                                <div className="space-y-1">
                                    {Object.entries(testResults)
                                        .filter(([_, passed]) => passed)
                                        .map(([testName]) => (
                                            <div key={testName} className="flex items-center text-sm">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                {testName}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Failed Tests</h3>
                                <div className="space-y-1">
                                    {Object.entries(testResults)
                                        .filter(([_, passed]) => !passed)
                                        .map(([testName]) => (
                                            <div key={testName} className="flex items-center text-sm">
                                                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                                {testName}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

import { useState, useEffect } from "react";
import { Users, Wifi, WifiOff, Target } from "lucide-react";

type LiveStatusProps = {
    commentaryId: string;
    isLive: boolean;
};

type SyncHealth = {
    status: 'excellent' | 'good' | 'fair' | 'poor';
    avgOffset: number;
    reportCount: number;
};

export default function LiveStatusIndicator({ commentaryId, isLive }: LiveStatusProps) {
    const [viewerCount, setViewerCount] = useState(0);
    const [syncHealth, setSyncHealth] = useState<SyncHealth>({
        status: 'good',
        avgOffset: 0,
        reportCount: 0
    });
    const [streamHealth, setStreamHealth] = useState<'connected' | 'disconnected' | 'unstable'>('connected');

    useEffect(() => {
        if (!isLive) return;

        // Simulate real-time updates
        const interval = setInterval(() => {
            // Simulate viewer count changes
            setViewerCount(prev => {
                const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
                return Math.max(0, prev + change);
            });

            // Simulate sync health updates
            setSyncHealth(prev => ({
                ...prev,
                reportCount: prev.reportCount + Math.floor(Math.random() * 3)
            }));
        }, 5000);

        // Initial fetch
        fetchSyncData();

        return () => clearInterval(interval);
    }, [commentaryId, isLive]);

    const fetchSyncData = async () => {
        try {
            const response = await fetch(`/api/sync/${commentaryId}`);
            if (response.ok) {
                const data = await response.json();
                setSyncHealth({
                    status: data.syncHealth?.status || 'good',
                    avgOffset: data.avgLatency || 0,
                    reportCount: data.syncHealth?.reportCount || 0
                });
            }
        } catch (error) {
            console.error('Error fetching sync data:', error);
        }
    };

    const getSyncHealthColor = (status: string) => {
        switch (status) {
            case 'excellent': return 'text-green-500';
            case 'good': return 'text-blue-500';
            case 'fair': return 'text-yellow-500';
            case 'poor': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const getStreamHealthIcon = () => {
        switch (streamHealth) {
            case 'connected':
                return <Wifi className="w-4 h-4 text-green-500" />;
            case 'unstable':
                return <Wifi className="w-4 h-4 text-yellow-500" />;
            case 'disconnected':
                return <WifiOff className="w-4 h-4 text-red-500" />;
        }
    };

    if (!isLive) {
        return (
            <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-center text-gray-400">
                    <div className="w-3 h-3 rounded-full bg-gray-500 mx-auto mb-2"></div>
                    <p className="text-sm">Stream Offline</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <div className="space-y-3">
                {/* Live Indicator */}
                <div className="flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                    <span className="text-red-500 font-semibold text-sm">LIVE</span>
                </div>

                {/* Viewer Count */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Viewers</span>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{viewerCount}</span>
                    </div>
                </div>

                {/* Stream Health */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Stream</span>
                    <div className="flex items-center">
                        {getStreamHealthIcon()}
                        <span className="text-sm ml-1 capitalize">{streamHealth}</span>
                    </div>
                </div>

                {/* Sync Health */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Sync</span>
                    <div className="flex items-center">
                        <Target className={`w-4 h-4 mr-1 ${getSyncHealthColor(syncHealth.status)}`} />
                        <span className={`text-sm capitalize ${getSyncHealthColor(syncHealth.status)}`}>
                            {syncHealth.status}
                        </span>
                    </div>
                </div>

                {/* Sync Details */}
                <div className="text-xs text-gray-400 text-center">
                    Offset: +{(syncHealth.avgOffset / 1000).toFixed(1)}s • {syncHealth.reportCount} reports
                </div>
            </div>
        </div>
    );
}
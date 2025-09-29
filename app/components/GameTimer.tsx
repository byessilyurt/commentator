"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

type GameTimerProps = {
    onTimeChange?: (minutes: number, seconds: number) => void;
    initialMinutes?: number;
    initialSeconds?: number;
    disabled?: boolean;
};

export default function GameTimer({ 
    onTimeChange, 
    initialMinutes = 0, 
    initialSeconds = 0,
    disabled = false 
}: GameTimerProps) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (onTimeChange) {
            onTimeChange(minutes, seconds);
        }
    }, [minutes, seconds, onTimeChange]);

    useEffect(() => {
        if (isRunning && !isPaused) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev >= 59) {
                        setMinutes(prevMin => Math.min(prevMin + 1, 130)); // Cap at 130 minutes
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, isPaused]);

    const toggleTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            setIsPaused(false);
        } else {
            setIsPaused(!isPaused);
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        setIsPaused(false);
        setMinutes(0);
        setSeconds(0);
    };

    const adjustTime = (deltaSeconds: number) => {
        const totalSeconds = minutes * 60 + seconds + deltaSeconds;
        const clampedSeconds = Math.max(0, Math.min(130 * 60, totalSeconds));
        
        setMinutes(Math.floor(clampedSeconds / 60));
        setSeconds(clampedSeconds % 60);
    };

    const formatTime = (min: number, sec: number) => {
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-center">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Match Timer</h2>
                    {isRunning && !isPaused && (
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
                            <span className="text-red-500 font-semibold text-sm">LIVE</span>
                        </div>
                    )}
                </div>
                
                {/* Timer Display */}
                <div className="text-6xl font-mono font-bold mb-6 text-center">
                    {formatTime(minutes, seconds)}
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center items-center space-x-4 mb-4">
                    <button
                        onClick={toggleTimer}
                        disabled={disabled}
                        className={`p-3 rounded-full ${
                            disabled 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : isRunning && !isPaused
                                    ? 'bg-yellow-600 hover:bg-yellow-700'
                                    : 'bg-green-600 hover:bg-green-700'
                        }`}
                        title={isRunning && !isPaused ? "Pause timer" : "Start/Resume timer"}
                    >
                        {isRunning && !isPaused ? (
                            <Pause className="w-6 h-6" />
                        ) : (
                            <Play className="w-6 h-6" />
                        )}
                    </button>

                    <button
                        onClick={resetTimer}
                        disabled={disabled}
                        className={`p-3 rounded-full ${
                            disabled 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                        title="Reset timer"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>

                {/* Fine Adjustment Controls */}
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => adjustTime(-60)}
                        disabled={disabled}
                        className={`px-3 py-1 rounded text-sm ${
                            disabled 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        -1m
                    </button>
                    <button
                        onClick={() => adjustTime(-1)}
                        disabled={disabled}
                        className={`px-3 py-1 rounded text-sm ${
                            disabled 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        -1s
                    </button>
                    <button
                        onClick={() => adjustTime(1)}
                        disabled={disabled}
                        className={`px-3 py-1 rounded text-sm ${
                            disabled 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        +1s
                    </button>
                    <button
                        onClick={() => adjustTime(60)}
                        disabled={disabled}
                        className={`px-3 py-1 rounded text-sm ${
                            disabled 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                        +1m
                    </button>
                </div>

                {/* Status Indicators */}
                {isRunning && (
                    <div className="mt-4 flex justify-center items-center space-x-4 text-sm">
                        <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                                isPaused ? 'bg-yellow-500' : 'bg-green-500 animate-pulse'
                            }`}></div>
                            <span className="text-gray-400">
                                {isPaused ? 'Paused' : 'Running'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
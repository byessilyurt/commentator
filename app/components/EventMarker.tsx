"use client";

import { useState } from "react";
import { Target, Square, Clock, Flag, Users, AlertTriangle } from "lucide-react";

type EventMarkerProps = {
    onMarkEvent: (eventType: string, team?: string, player?: string) => void;
    gameTime: { minutes: number; seconds: number };
    disabled?: boolean;
};

type EventType = {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    requiresTeam?: boolean;
    requiresPlayer?: boolean;
};

const EVENT_TYPES: EventType[] = [
    {
        id: 'goal',
        name: 'Goal',
        icon: <Target className="w-5 h-5" />,
        color: 'bg-green-600 hover:bg-green-700',
        requiresTeam: true,
        requiresPlayer: true
    },
    {
        id: 'yellow_card',
        name: 'Yellow Card',
        icon: <Square className="w-5 h-5" />,
        color: 'bg-yellow-600 hover:bg-yellow-700',
        requiresTeam: true,
        requiresPlayer: true
    },
    {
        id: 'red_card',
        name: 'Red Card',
        icon: <Square className="w-5 h-5" />,
        color: 'bg-red-600 hover:bg-red-700',
        requiresTeam: true,
        requiresPlayer: true
    },
    {
        id: 'corner',
        name: 'Corner',
        icon: <Flag className="w-5 h-5" />,
        color: 'bg-blue-600 hover:bg-blue-700',
        requiresTeam: true
    },
    {
        id: 'penalty',
        name: 'Penalty',
        icon: <AlertTriangle className="w-5 h-5" />,
        color: 'bg-purple-600 hover:bg-purple-700',
        requiresTeam: true
    },
    {
        id: 'substitution',
        name: 'Substitution',
        icon: <Users className="w-5 h-5" />,
        color: 'bg-indigo-600 hover:bg-indigo-700',
        requiresTeam: true
    },
    {
        id: 'halftime',
        name: 'Half Time',
        icon: <Clock className="w-5 h-5" />,
        color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
        id: 'fulltime',
        name: 'Full Time',
        icon: <Square className="w-5 h-5" />,
        color: 'bg-gray-600 hover:bg-gray-700'
    }
];

export default function EventMarker({ onMarkEvent, gameTime, disabled = false }: EventMarkerProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [playerName, setPlayerName] = useState<string>("");
    const [showModal, setShowModal] = useState(false);

    const handleEventClick = (eventType: EventType) => {
        if (disabled) return;

        if (eventType.requiresTeam || eventType.requiresPlayer) {
            setSelectedEvent(eventType);
            setSelectedTeam("");
            setPlayerName("");
            setShowModal(true);
        } else {
            // Simple events that don't need additional info
            onMarkEvent(eventType.id);
        }
    };

    const handleConfirmEvent = () => {
        if (!selectedEvent) return;

        const team = selectedEvent.requiresTeam ? selectedTeam : undefined;
        const player = selectedEvent.requiresPlayer ? playerName : undefined;

        onMarkEvent(selectedEvent.id, team, player);
        
        setShowModal(false);
        setSelectedEvent(null);
        setSelectedTeam("");
        setPlayerName("");
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {EVENT_TYPES.map((eventType) => (
                    <button
                        key={eventType.id}
                        onClick={() => handleEventClick(eventType)}
                        disabled={disabled}
                        className={`${eventType.color} p-3 rounded-lg text-center transition-colors ${
                            disabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <div className="flex flex-col items-center">
                            {eventType.icon}
                            <span className="text-sm mt-1">{eventType.name}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Event Details Modal */}
            {showModal && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold mb-4">
                            Mark {selectedEvent.name} - {gameTime.minutes}:{gameTime.seconds.toString().padStart(2, '0')}
                        </h3>

                        <div className="space-y-4">
                            {selectedEvent.requiresTeam && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">Team</label>
                                    <select
                                        value={selectedTeam}
                                        onChange={(e) => setSelectedTeam(e.target.value)}
                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select team...</option>
                                        <option value="home">Home Team</option>
                                        <option value="away">Away Team</option>
                                    </select>
                                </div>
                            )}

                            {selectedEvent.requiresPlayer && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Player Name {selectedEvent.requiresPlayer ? "(Required)" : "(Optional)"}
                                    </label>
                                    <input
                                        type="text"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        placeholder="Enter player name..."
                                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                                        required={selectedEvent.requiresPlayer}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmEvent}
                                disabled={
                                    (selectedEvent.requiresTeam && !selectedTeam) ||
                                    (selectedEvent.requiresPlayer && !playerName)
                                }
                                className={`px-4 py-2 rounded-lg font-semibold ${
                                    (selectedEvent.requiresTeam && !selectedTeam) ||
                                    (selectedEvent.requiresPlayer && !playerName)
                                        ? 'bg-gray-600 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white`}
                            >
                                Mark Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
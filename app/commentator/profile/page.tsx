"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, User, Mail, Globe, Star, Save, Camera } from "lucide-react";

type CommentatorProfile = {
    id: string;
    name: string;
    email: string;
    bio: string;
    languages: string[];
    specialties: string[];
    totalViews: number;
    averageRating: number;
    totalCommentaries: number;
    joinedAt: string;
};

export default function CommentatorProfile() {
    const [profile, setProfile] = useState<CommentatorProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        languages: [] as string[],
        specialties: [] as string[]
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            // Mock data for now - replace with actual API call
            const mockProfile: CommentatorProfile = {
                id: "1",
                name: "John Smith",
                email: "john@commentator.com",
                bio: "Passionate football commentator with 10+ years of experience. Specializing in Premier League and Champions League matches with tactical analysis.",
                languages: ["en", "es"],
                specialties: ["Premier League", "Champions League", "Tactical Analysis"],
                totalViews: 125000,
                averageRating: 4.6,
                totalCommentaries: 45,
                joinedAt: "2023-06-15T10:00:00Z"
            };

            setProfile(mockProfile);
            setFormData({
                name: mockProfile.name,
                bio: mockProfile.bio,
                languages: mockProfile.languages,
                specialties: mockProfile.specialties
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        
        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            // Update local state
            if (profile) {
                setProfile({
                    ...profile,
                    ...formData
                });
            }
            
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error('Error saving profile:', error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const toggleLanguage = (langCode: string) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.includes(langCode)
                ? prev.languages.filter(l => l !== langCode)
                : [...prev.languages, langCode]
        }));
    };

    const addSpecialty = (specialty: string) => {
        if (specialty && !formData.specialties.includes(specialty)) {
            setFormData(prev => ({
                ...prev,
                specialties: [...prev.specialties, specialty]
            }));
        }
    };

    const removeSpecialty = (specialty: string) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.filter(s => s !== specialty)
        }));
    };

    const getLanguageName = (code: string) => {
        const languages: { [key: string]: string } = {
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'tr': 'Turkish',
            'ar': 'Arabic'
        };
        return languages[code] || code;
    };

    const getLanguageFlag = (code: string) => {
        const flags: { [key: string]: string } = {
            'en': '🇬🇧',
            'es': '🇪🇸',
            'fr': '🇫🇷',
            'de': '🇩🇪',
            'it': '🇮🇹',
            'pt': '🇵🇹',
            'tr': '🇹🇷',
            'ar': '🇸🇦'
        };
        return flags[code] || '🌐';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
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
                <div className="mb-6">
                    <Link href="/commentator/dashboard" className="text-blue-400 hover:text-blue-300 flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Info */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold">Commentator Profile</h1>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                {saving ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Profile Picture */}
                                <div className="flex items-center mb-6">
                                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                                        <User className="w-10 h-10 text-gray-400" />
                                    </div>
                                    {isEditing && (
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm flex items-center">
                                            <Camera className="w-4 h-4 mr-2" />
                                            Change Photo
                                        </button>
                                    )}
                                </div>

                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                                            />
                                        ) : (
                                            <p className="text-gray-300">{profile.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <p className="text-gray-300 flex items-center">
                                            <Mail className="w-4 h-4 mr-2" />
                                            {profile.email}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                value={formData.bio}
                                                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                                rows={4}
                                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                                                placeholder="Tell viewers about your commentary style and experience..."
                                            />
                                        ) : (
                                            <p className="text-gray-300">{profile.bio}</p>
                                        )}
                                    </div>

                                    {/* Languages */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Languages</label>
                                        {isEditing ? (
                                            <div className="grid grid-cols-2 gap-2">
                                                {['en', 'es', 'fr', 'de', 'it', 'pt', 'tr', 'ar'].map(lang => (
                                                    <label key={lang} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.languages.includes(lang)}
                                                            onChange={() => toggleLanguage(lang)}
                                                            className="mr-2"
                                                        />
                                                        <span>{getLanguageFlag(lang)} {getLanguageName(lang)}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {profile.languages.map(lang => (
                                                    <span key={lang} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                                        {getLanguageFlag(lang)} {getLanguageName(lang)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Specialties */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Specialties</label>
                                        {isEditing ? (
                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {formData.specialties.map(specialty => (
                                                        <span 
                                                            key={specialty} 
                                                            className="bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center"
                                                        >
                                                            {specialty}
                                                            <button
                                                                onClick={() => removeSpecialty(specialty)}
                                                                className="ml-2 text-blue-200 hover:text-white"
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2">
                                                    {['Premier League', 'La Liga', 'Champions League', 'Bundesliga', 'Serie A', 'Tactical Analysis'].map(specialty => (
                                                        !formData.specialties.includes(specialty) && (
                                                            <button
                                                                key={specialty}
                                                                onClick={() => addSpecialty(specialty)}
                                                                className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-full text-sm"
                                                            >
                                                                + {specialty}
                                                            </button>
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {profile.specialties.map(specialty => (
                                                    <span key={specialty} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Sidebar */}
                        <div className="space-y-6">
                            {/* Performance Stats */}
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Performance Stats</h2>
                                
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-500">{profile.totalViews.toLocaleString()}</div>
                                        <div className="text-gray-400 text-sm">Total Views</div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-yellow-500 flex items-center justify-center">
                                            <Star className="w-8 h-8 mr-1" />
                                            {profile.averageRating.toFixed(1)}
                                        </div>
                                        <div className="text-gray-400 text-sm">Average Rating</div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-500">{profile.totalCommentaries}</div>
                                        <div className="text-gray-400 text-sm">Total Commentaries</div>
                                    </div>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="font-semibold mb-2">Member Since</h3>
                                <p className="text-gray-300">
                                    {new Date(profile.joinedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="font-semibold mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link
                                        href="/commentator/stream/setup"
                                        className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
                                    >
                                        New Commentary
                                    </Link>
                                    <Link
                                        href="/commentator/analytics"
                                        className="block bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded"
                                    >
                                        View Analytics
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block bg-gray-600 hover:bg-gray-700 text-white text-center py-2 rounded"
                                    >
                                        Account Settings
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
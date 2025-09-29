"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Users, Mic, Star } from "lucide-react";

export default function CommentatorApplication() {
    const [formData, setFormData] = useState({
        experience: "",
        languages: [] as string[],
        specialties: [] as string[],
        sampleUrl: "",
        motivation: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // In a real app, this would submit the application
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleLanguage = (lang: string) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.includes(lang)
                ? prev.languages.filter(l => l !== lang)
                : [...prev.languages, lang]
        }));
    };

    const toggleSpecialty = (specialty: string) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter(s => s !== specialty)
                : [...prev.specialties, specialty]
        }));
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center max-w-md">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
                    <p className="text-gray-300 mb-6">
                        Thank you for applying to become a commentator. We'll review your application and get back to you within 2-3 business days.
                    </p>
                    <Link
                        href="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-4">Become a Commentator</h1>
                        <p className="text-gray-400">
                            Join our community of passionate football commentators and share your voice with fans worldwide.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Reach Fans</h3>
                            <p className="text-sm text-gray-400">Connect with football fans who love your commentary style</p>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <Mic className="w-8 h-8 text-green-500 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Easy Streaming</h3>
                            <p className="text-sm text-gray-400">Use your existing YouTube setup to stream commentary</p>
                        </div>
                        
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Build Reputation</h3>
                            <p className="text-sm text-gray-400">Get rated by viewers and build your commentator brand</p>
                        </div>
                    </div>

                    {/* Application Form */}
                    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Application Form</h2>

                        {/* Experience */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Commentary Experience <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.experience}
                                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                                placeholder="Tell us about your commentary experience, background in football, or relevant skills..."
                                rows={4}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                                required
                            />
                        </div>

                        {/* Languages */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Languages <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { code: 'en', name: 'English', flag: '🇬🇧' },
                                    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                                    { code: 'fr', name: 'French', flag: '🇫🇷' },
                                    { code: 'de', name: 'German', flag: '🇩🇪' },
                                    { code: 'it', name: 'Italian', flag: '🇮🇹' },
                                    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
                                    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
                                    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
                                ].map(lang => (
                                    <label key={lang.code} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.languages.includes(lang.code)}
                                            onChange={() => toggleLanguage(lang.code)}
                                            className="mr-2"
                                        />
                                        <span>{lang.flag} {lang.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Specialties */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Football Specialties
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    'Premier League',
                                    'La Liga',
                                    'Champions League',
                                    'Bundesliga',
                                    'Serie A',
                                    'Ligue 1',
                                    'International Football',
                                    'Tactical Analysis',
                                    'Youth Football',
                                    'Women\'s Football'
                                ].map(specialty => (
                                    <label key={specialty} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.specialties.includes(specialty)}
                                            onChange={() => toggleSpecialty(specialty)}
                                            className="mr-2"
                                        />
                                        <span>{specialty}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sample URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Sample Commentary (Optional)
                            </label>
                            <input
                                type="url"
                                value={formData.sampleUrl}
                                onChange={(e) => setFormData(prev => ({ ...prev, sampleUrl: e.target.value }))}
                                placeholder="https://youtube.com/watch?v=... (link to your commentary sample)"
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                            />
                            <p className="text-gray-400 text-sm mt-1">
                                Share a link to a sample of your commentary work (YouTube, SoundCloud, etc.)
                            </p>
                        </div>

                        {/* Motivation */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Why do you want to be a commentator? <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={formData.motivation}
                                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                                placeholder="Tell us what motivates you to provide alternative commentary..."
                                rows={3}
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || formData.languages.length === 0}
                            className={`w-full py-3 rounded-lg font-semibold text-lg ${
                                isSubmitting || formData.languages.length === 0
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {isSubmitting ? "Submitting Application..." : "Submit Application"}
                        </button>
                    </form>

                    {/* Requirements */}
                    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                        <h3 className="font-semibold mb-3">Requirements</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                Good knowledge of football and commentary skills
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                Reliable internet connection for live streaming
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                YouTube channel for live streaming (can be new)
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                Commitment to providing quality commentary
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
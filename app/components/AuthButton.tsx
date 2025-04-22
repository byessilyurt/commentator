"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type User = {
    id: string;
    name: string | null;
    email: string;
};

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Check if user is logged in on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                // Validate token by calling an API endpoint
                const response = await fetch('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.user);
                }
            } catch (error) {
                console.error('Auth error:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            });

            // Clear token from localStorage
            localStorage.removeItem('token');
            setUser(null);
            setDropdownOpen(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    if (loading) {
        return <div className="h-10 w-24 bg-blue-800 bg-opacity-40 rounded animate-pulse"></div>;
    }

    if (!user) {
        return (
            <div className="flex space-x-2">
                <Link
                    href="/login"
                    className="bg-transparent hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Log In
                </Link>
                <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-blue-800 bg-opacity-40 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
                <span>{user.name || user.email}</span>
                <svg
                    className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-700 w-full text-left"
                        onClick={() => setDropdownOpen(false)}
                    >
                        Profile
                    </Link>
                    <Link
                        href="/my-commentaries"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-700 w-full text-left"
                        onClick={() => setDropdownOpen(false)}
                    >
                        My Commentaries
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-700 w-full text-left"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
} 
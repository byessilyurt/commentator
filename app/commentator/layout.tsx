"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CommentatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCommentator, setIsCommentator] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login?redirect=/commentator/dashboard');
                return;
            }

            const response = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setIsAuthenticated(true);
                
                // Check if user is a commentator
                if (userData.user.isCommentator) {
                    setIsCommentator(true);
                } else {
                    // Redirect to application page if not a commentator
                    router.push('/commentator/apply');
                    return;
                }
            } else {
                router.push('/login?redirect=/commentator/dashboard');
                return;
            }
        } catch (error) {
            console.error('Auth error:', error);
            router.push('/login?redirect=/commentator/dashboard');
            return;
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Checking permissions...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !isCommentator) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {children}
        </div>
    );
}
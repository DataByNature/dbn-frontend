"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/useAuth";

/**
 * Auth-aware navigation buttons that handle hydration safely.
 * Shows default buttons on server, then updates after client mount.
 */
export function NavAuthButtons() {
    const [mounted, setMounted] = useState(false);
    const { data: user, isLoading } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Before mount: show default buttons (matches SSR)
    if (!mounted) {
        return (
            <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-text-navy transition-colors">
                    Sign In
                </Link>
                <Link href="/register">
                    <Button className="font-semibold bg-primary-deep hover:bg-primary-deep/90 text-white rounded-full px-5 h-10 text-sm shadow-lg shadow-primary-deep/20">
                        Get Started
                    </Button>
                </Link>
            </>
        );
    }

    // Loading state
    if (isLoading) {
        return <div className="w-24 h-10 bg-gray-100 rounded-full animate-pulse" />;
    }

    // Authenticated
    if (user) {
        return (
            <Link href="/dashboard">
                <Button className="font-semibold bg-primary-deep hover:bg-primary-deep/90 text-white rounded-full px-5 h-10 text-sm shadow-lg shadow-primary-deep/20">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                </Button>
            </Link>
        );
    }

    // Not authenticated
    return (
        <>
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-text-navy transition-colors">
                Sign In
            </Link>
            <Link href="/register">
                <Button className="font-semibold bg-primary-deep hover:bg-primary-deep/90 text-white rounded-full px-5 h-10 text-sm shadow-lg shadow-primary-deep/20">
                    Get Started
                </Button>
            </Link>
        </>
    );
}

/**
 * Auth-aware hero CTA that handles hydration safely.
 */
export function HeroAuthCTA() {
    const [mounted, setMounted] = useState(false);
    const { data: user } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAuthenticated = mounted && !!user;

    return {
        href: isAuthenticated ? "/dashboard" : "/register",
        text: isAuthenticated ? "Go to Dashboard" : "Get Started Free",
    };
}

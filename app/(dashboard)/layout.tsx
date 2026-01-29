"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { isAuthenticated, logout } from "@/lib/auth/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useAuth();

  useEffect(() => {
    // If loading is complete and there's no token, redirect to login
    if (!isLoading && !isAuthenticated()) {
      router.push("/login");
      return;
    }

    // If loading is complete and we have an error or no user data (e.g., expired/invalid token),
    // but a token still exists in storage, clear auth and redirect to login
    // This handles cases where the token exists but is invalid/expired
    if (!isLoading && isAuthenticated() && (isError || !user)) {
      logout();
      router.push("/login");
    }
  }, [isLoading, isError, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-deep" />
      </div>
    );
  }

  // Don't render if not authenticated or if user data is missing (invalid/expired token)
  if (!isAuthenticated() || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <div className="flex flex-col min-h-screen min-w-0 lg:ml-64">
        <Topbar user={user} />
        <main className="flex-1 min-h-0 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

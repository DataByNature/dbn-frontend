"use client";

import { useState } from "react";
import { User, Bell, LogOut } from "lucide-react";
import { User as UserType } from "@/types/api";
import { useLogout } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils/cn";

interface TopbarProps {
  user: UserType | null;
}

export function Topbar({ user }: TopbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:ml-64">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-primary-deep flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-text-navy">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-text-navy">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

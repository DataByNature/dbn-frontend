"use client";

import { useMemo, useState } from "react";
import { User, Bell, LogOut } from "lucide-react";
import { User as UserType, Notification } from "@/types/api";
import { useLogout } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils/cn";
import { useNotifications, useMarkAllNotificationsRead, useMarkNotificationRead } from "@/lib/hooks/useNotifications";

interface TopbarProps {
  user: UserType | null;
}

export function Topbar({ user }: TopbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const logout = useLogout();
  const { data: notificationsData } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications: Notification[] = notificationsData?.results ?? [];
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read_at).length,
    [notifications]
  );

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <header className="h-16 min-h-16 flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 transition-colors relative rounded-lg"
          aria-label="Notifications"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-red-500 text-[10px] leading-4 text-white text-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-20 top-16 z-30 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <span className="text-sm font-semibold text-text-navy">Notifications</span>
              <button
                type="button"
                className="text-xs text-primary-deep hover:underline disabled:text-gray-400"
                onClick={() => markAllRead.mutate()}
                disabled={unreadCount === 0 || markAllRead.isPending}
              >
                Mark all as read
              </button>
            </div>
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-sm text-gray-500 text-center">
                No notifications yet.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notifications.slice(0, 10).map((n) => (
                  <li
                    key={n.id}
                    className={cn(
                      "px-4 py-3 text-sm cursor-pointer hover:bg-gray-50",
                      !n.read_at ? "bg-primary-deep/5" : "bg-white"
                    )}
                    onClick={() => {
                      if (!n.read_at) {
                        markRead.mutate(n.id);
                      }
                    }}
                  >
                    <p className="font-medium text-text-navy">{n.title}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {new Date(n.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* User Menu */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 py-2 pl-2 pr-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-primary-deep flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="hidden md:block text-left min-w-0">
              <p className="text-sm font-medium text-text-navy truncate">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 truncate max-w-[180px]">{user?.email}</p>
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

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import apiClient, { normalizeResponse, extractErrorMessage } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { NotificationPreference, User } from "@/types/api";
import { setUserInStorage } from "@/lib/auth/auth";
import { useNotificationPreferences, useUpdateNotificationPreferences } from "@/lib/hooks/useNotificationPreferences";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

interface PreferenceToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function PreferenceToggle({ label, description, checked, onChange }: PreferenceToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-medium text-text-navy">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-primary-deep transition-colors">
          <div className={cn(
            "h-5 w-5 bg-white rounded-full shadow transform transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )} />
        </div>
      </label>
    </div>
  );
}

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: user } = useAuth();
  const { data: notificationPrefs } = useNotificationPreferences();
  const updateNotificationPrefs = useUpdateNotificationPreferences();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, resetProfile]);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitProfile = async (data: ProfileFormData) => {
    setIsUpdatingProfile(true);
    try {
      const response = await apiClient.patch(API_ENDPOINTS.UPDATE_PROFILE, data);
      const updatedUser = normalizeResponse<User>(response.data);
      setUserInStorage(updatedUser);
      queryClient.setQueryData(["auth", "user"], updatedUser);
      toast.success("Profile updated successfully!");
      resetProfile(data);
    } catch (error: any) {
      const message = extractErrorMessage(error) || "Failed to update profile";
      toast.error(message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    setIsChangingPassword(true);
    try {
      // Change password endpoint is not implemented on the backend yet.
      toast.error("Password change is not available at the moment.");
      resetPassword();
    } catch (error: any) {
      const message = extractErrorMessage(error) || "Failed to change password";
      toast.error(message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-navy">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
            <Input
              label="Name"
              placeholder="Your name"
              error={profileErrors.name?.message}
              {...registerProfile("name")}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              error={profileErrors.email?.message}
              {...registerProfile("email")}
            />

            <Input
              label="Phone"
              placeholder="08012345678"
              error={profileErrors.phone?.message}
              {...registerProfile("phone")}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isUpdatingProfile}
            >
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <PreferenceToggle
              label="In-app notifications"
              description="Show transaction alerts in the dashboard."
              checked={notificationPrefs?.in_app ?? true}
              onChange={(checked) =>
                updateNotificationPrefs.mutate({ in_app: checked })
              }
            />
            <PreferenceToggle
              label="Email notifications"
              description="Send emails for important transaction events."
              checked={notificationPrefs?.email ?? false}
              onChange={(checked) =>
                updateNotificationPrefs.mutate({ email: checked })
              }
            />
            <PreferenceToggle
              label="Push notifications"
              description="Enable push notifications (when available)."
              checked={notificationPrefs?.push ?? false}
              onChange={(checked) =>
                updateNotificationPrefs.mutate({ push: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              error={passwordErrors.current_password?.message}
              {...registerPassword("current_password")}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              error={passwordErrors.new_password?.message}
              {...registerPassword("new_password")}
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              error={passwordErrors.confirm_password?.message}
              {...registerPassword("confirm_password")}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isChangingPassword}
            >
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <span className="font-medium capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium capitalize">{user?.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span className="font-medium">
                {user ? new Date(user.created_at).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

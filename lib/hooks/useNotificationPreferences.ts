"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { normalizeResponse, extractErrorMessage } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { NotificationPreference } from "@/types/api";
import { toast } from "sonner";

export function useNotificationPreferences() {
  return useQuery({
    queryKey: ["notifications", "preferences"],
    queryFn: async (): Promise<NotificationPreference> => {
      const response = await apiClient.get(API_ENDPOINTS.NOTIFICATION_PREFERENCES);
      return normalizeResponse<NotificationPreference>(response.data);
    },
    staleTime: 5 * 60_000,
  });
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<NotificationPreference>): Promise<NotificationPreference> => {
      const response = await apiClient.patch(API_ENDPOINTS.NOTIFICATION_PREFERENCES_UPDATE, data);
      const prefs = normalizeResponse<NotificationPreference>(response.data);
      return prefs;
    },
    onSuccess: (prefs) => {
      queryClient.setQueryData(["notifications", "preferences"], prefs);
      toast.success("Notification preferences updated.");
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Failed to update notification preferences";
      toast.error(message);
    },
  });
}


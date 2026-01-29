"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { extractErrorMessage } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Notification, PaginatedResponse } from "@/types/api";
import { toast } from "sonner";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async (): Promise<PaginatedResponse<Notification>> => {
      const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS);
      // Backend returns paginated { count, next, previous, results }
      return response.data as PaginatedResponse<Notification>;
    },
    staleTime: 60_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number | string): Promise<void> => {
      await apiClient.post(API_ENDPOINTS.NOTIFICATION_MARK_READ(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Failed to update notification";
      toast.error(message);
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      await apiClient.post(API_ENDPOINTS.NOTIFICATION_MARK_ALL_READ);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Failed to update notifications";
      toast.error(message);
    },
  });
}


"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { normalizeResponse, extractErrorMessage } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { User, PaginatedResponse, UserRole } from "@/types/api";
import { toast } from "sonner";

export interface UserFilters {
  role?: UserRole;
  status?: "active" | "suspended" | "inactive";
  search?: string;
  page?: number;
  page_size?: number;
}

export function useUsers(filters: UserFilters = {}) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: async (): Promise<PaginatedResponse<User>> => {
      const params = new URLSearchParams();
      if (filters.role) params.append("role", filters.role);
      if (filters.status) params.append("status", filters.status);
      if (filters.search) params.append("search", filters.search);
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.page_size) params.append("page_size", filters.page_size.toString());

      const response = await apiClient.get(
        `${API_ENDPOINTS.USERS}?${params.toString()}`
      );
      return normalizeResponse<PaginatedResponse<User>>(response.data);
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async (): Promise<User> => {
      const response = await apiClient.get(API_ENDPOINTS.USER_DETAIL(id));
      return normalizeResponse<User>(response.data);
    },
    enabled: !!id,
  });
}

export interface CreateUserRequest {
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  password: string;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserRequest): Promise<User> => {
      const response = await apiClient.post(API_ENDPOINTS.CREATE_USER, data);
      return normalizeResponse<User>(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully!");
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Failed to create user. Please try again.";
      toast.error(message);
    },
  });
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  role?: UserRole;
  status?: "active" | "suspended" | "inactive";
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserRequest }): Promise<User> => {
      const response = await apiClient.patch(API_ENDPOINTS.UPDATE_USER(id), data);
      return normalizeResponse<User>(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully!");
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Failed to update user. Please try again.";
      toast.error(message);
    },
  });
}

export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.post(API_ENDPOINTS.SUSPEND_USER(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User status updated!");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to update user status.";
      toast.error(message);
    },
  });
}

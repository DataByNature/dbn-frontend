"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { normalizeResponse, extractErrorMessage } from "@/lib/api/client";
import { getAuthToken } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { LoginRequest, LoginResponse, User } from "@/types/api";
import { setToken, setUserInStorage, removeToken, clearUserFromStorage } from "@/lib/auth/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async (): Promise<User | null> => {
      if (!getAuthToken()) {
        return null;
      }
      try {
        const response = await apiClient.get(API_ENDPOINTS.USER_PROFILE);
        const user = normalizeResponse<User>(response.data);
        setUserInStorage(user);
        return user;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    enabled: typeof window !== "undefined" && !!getAuthToken(),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      // Backend expects { username, password } and returns
      // { success: true, data: { user, tokens: { access, refresh } } }
      const payload = {
        username: data.email,
        password: data.password,
      };
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, payload);
      const normalized = normalizeResponse<{
        user: User;
        tokens: { access: string; refresh: string };
      }>(response.data);

      return {
        access: normalized.tokens.access,
        refresh: normalized.tokens.refresh,
        user: normalized.user,
      };
    },
    onSuccess: (data) => {
      setToken(data.access);
      setUserInStorage(data.user);
      queryClient.setQueryData(["auth", "user"], data.user);
      toast.success("Login successful!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Login failed. Please check your credentials.";
      toast.error(message);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        // Backend has no logout endpoint yet; keep this client-side only.
        // await apiClient.post(API_ENDPOINTS.LOGOUT);
      } catch {
        // Continue with logout even if API call fails
      }
    },
    onSuccess: () => {
      removeToken();
      clearUserFromStorage();
      queryClient.clear();
      router.push("/login");
    },
  });
}

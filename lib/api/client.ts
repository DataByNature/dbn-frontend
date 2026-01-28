import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./endpoints";
import { ApiError } from "../../types/api";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Normalize backend responses.
 *
 * The Django API generally wraps payloads as:
 * { success: boolean, data?: T, error?: { code, message, details? }, ... }
 * and for paginated lists it may use DRF's pagination shape with results.
 */
export function normalizeResponse<T = any>(raw: any): T {
  if (!raw) return raw;

  // DRF paginated response: { count, next, previous, results }
  if (
    typeof raw === "object" &&
    raw !== null &&
    "count" in raw &&
    "results" in raw
  ) {
    const results = (raw as any).results;

    // Wallet ledger wraps another { success, data } inside results
    if (
      results &&
      typeof results === "object" &&
      "success" in results &&
      "data" in results
    ) {
      return {
        count: raw.count,
        next: raw.next,
        previous: raw.previous,
        results: (results as any).data,
      } as T;
    }

    return raw as T;
  }

  // Standard { success, data } wrapper
  if (typeof raw === "object" && raw !== null && "success" in raw) {
    if ("data" in raw) {
      return (raw as any).data as T;
    }
  }

  return raw as T;
}

/**
 * Extract a user-friendly error message from backend error format.
 */
export function extractErrorMessage(error: AxiosError<any>): string {
  const responseData = error.response?.data;

  // Our backend error shape: { success: false, error: { code, message, details? } }
  if (responseData && typeof responseData === "object") {
    const err = (responseData as any).error;
    if (err?.message) {
      return err.message;
    }
    if (typeof (responseData as any).message === "string") {
      return (responseData as any).message;
    }
  }

  return "Something went wrong. Please try again.";
}

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      clearAuthToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Token management utilities
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
}

export default apiClient;

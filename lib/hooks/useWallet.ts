"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient, { normalizeResponse } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Wallet, WalletTransaction, PaginatedResponse } from "@/types/api";

export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: async (): Promise<Wallet> => {
      const response = await apiClient.get(API_ENDPOINTS.WALLET);
      return normalizeResponse<Wallet>(response.data);
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

export interface WalletHistoryFilters {
  type?: "CREDIT" | "DEBIT";
  start_date?: string;
  end_date?: string;
  page?: number;
  page_size?: number;
}

export function useWalletHistory(filters: WalletHistoryFilters = {}) {
  return useQuery({
    queryKey: ["wallet", "history", filters],
    queryFn: async (): Promise<PaginatedResponse<WalletTransaction>> => {
      const params = new URLSearchParams();
      if (filters.type) params.append("type", filters.type);
      if (filters.start_date) params.append("start_date", filters.start_date);
      if (filters.end_date) params.append("end_date", filters.end_date);
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.page_size) params.append("page_size", filters.page_size.toString());

      const response = await apiClient.get(
        `${API_ENDPOINTS.WALLET_HISTORY}?${params.toString()}`
      );
      return normalizeResponse<PaginatedResponse<WalletTransaction>>(response.data);
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

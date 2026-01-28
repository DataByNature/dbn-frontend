"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient, { normalizeResponse } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Transaction, PaginatedResponse, TransactionType, TransactionStatus, Network } from "@/types/api";

export interface TransactionFilters {
  type?: TransactionType;
  status?: TransactionStatus;
  network?: Network;
  phone?: string;
  reference?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  page_size?: number;
}

export function useTransactions(filters: TransactionFilters = {}) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async (): Promise<PaginatedResponse<Transaction>> => {
      const params = new URLSearchParams();
      if (filters.type) params.append("type", filters.type);
      if (filters.status) params.append("status", filters.status);
      if (filters.network) params.append("network", filters.network);
      if (filters.phone) params.append("phone", filters.phone);
      if (filters.reference) params.append("reference", filters.reference);
      if (filters.start_date) params.append("start_date", filters.start_date);
      if (filters.end_date) params.append("end_date", filters.end_date);
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.page_size) params.append("page_size", filters.page_size.toString());

      const response = await apiClient.get(
        `${API_ENDPOINTS.TRANSACTIONS}?${params.toString()}`
      );
      return normalizeResponse<PaginatedResponse<Transaction>>(response.data);
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: async (): Promise<Transaction> => {
      const response = await apiClient.get(API_ENDPOINTS.TRANSACTION_DETAIL(id));
      return normalizeResponse<Transaction>(response.data);
    },
    enabled: !!id,
  });
}

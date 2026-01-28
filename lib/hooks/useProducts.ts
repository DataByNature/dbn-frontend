"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient, { normalizeResponse } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Product, ProductCategory, Network, PaginatedResponse } from "@/types/api";

export interface ProductFilters {
  category?: ProductCategory;
  network?: Network;
  is_active?: boolean;
}

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.network) params.append("network", filters.network);
      if (filters.is_active !== undefined) params.append("is_active", filters.is_active.toString());

      const response = await apiClient.get(
        `${API_ENDPOINTS.PRODUCTS}?${params.toString()}`
      );
      return normalizeResponse<PaginatedResponse<Product>>(response.data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async (): Promise<Product> => {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCT_DETAIL(id));
      return normalizeResponse<Product>(response.data);
    },
    enabled: !!id,
  });
}

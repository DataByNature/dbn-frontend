"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { DashboardKPIs } from "@/types/api";

export function useDashboardKPIs() {
  return useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: async (): Promise<DashboardKPIs> => {
      // Backend has no dashboard endpoints yet; return placeholder zeros.
      const kpis: DashboardKPIs = {
        today_volume: 0,
        successful_vends: 0,
        failed_vends: 0,
        wallet_balance: 0,
      };
      return kpis;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

export interface SalesData {
  date: string;
  amount: number;
  count: number;
}

export function useDashboardSales(days: number = 7) {
  return useQuery({
    queryKey: ["dashboard", "sales", days],
    queryFn: async (): Promise<SalesData[]> => {
      // Not implemented in backend yet; return empty data.
      return [];
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

export interface NetworkDistribution {
  network: string;
  count: number;
  amount: number;
}

export function useNetworkDistribution() {
  return useQuery({
    queryKey: ["dashboard", "network-distribution"],
    queryFn: async (): Promise<NetworkDistribution[]> => {
      // Not implemented in backend yet; return empty data.
      return [];
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

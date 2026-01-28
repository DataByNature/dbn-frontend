"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { normalizeResponse, extractErrorMessage } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { BuyAirtimeRequest, Transaction } from "@/types/api";
import { toast } from "sonner";

export function useBuyAirtime() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BuyAirtimeRequest): Promise<Transaction> => {
      const response = await apiClient.post(API_ENDPOINTS.BUY_AIRTIME, data);
      const normalized = normalizeResponse<{ transaction: Transaction }>(response.data);
      return normalized.transaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Airtime purchase successful!");
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Airtime purchase failed. Please try again.";
      toast.error(message);
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { normalizeResponse, extractErrorMessage } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { FundWalletRequest, FundWalletResponse } from "@/types/api";
import { toast } from "sonner";

export function useFundWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FundWalletRequest): Promise<FundWalletResponse> => {
      const response = await apiClient.post(
        API_ENDPOINTS.INITIATE_DEPOSIT,
        data
      );
      return normalizeResponse<FundWalletResponse>(response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      // Redirect to payment gateway
      if (data.payment_url && typeof window !== "undefined") {
        window.location.href = data.payment_url;
      }
      toast.success("Redirecting to payment gateway...");
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Failed to initiate deposit. Please try again.";
      toast.error(message);
    },
  });
}

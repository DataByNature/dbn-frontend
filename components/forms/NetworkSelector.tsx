"use client";

import { Network } from "@/types/api";
import { cn } from "@/lib/utils/cn";

export interface NetworkSelectorProps {
  selectedNetwork: Network | null;
  onSelect: (network: Network) => void;
  className?: string;
}

const networks: { value: Network; label: string; color: string }[] = [
  { value: Network.MTN, label: "MTN", color: "bg-yellow-500" },
  { value: Network.GLO, label: "Glo", color: "bg-green-600" },
  { value: Network.AIRTEL, label: "Airtel", color: "bg-red-600" },
  { value: Network.NINEMOBILE, label: "9mobile", color: "bg-green-500" },
];

export function NetworkSelector({
  selectedNetwork,
  onSelect,
  className,
}: NetworkSelectorProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {networks.map((network) => (
        <button
          key={network.value}
          onClick={() => onSelect(network.value)}
          className={cn(
            "p-4 rounded-lg border-2 transition-all",
            selectedNetwork === network.value
              ? "border-primary-deep bg-primary-deep/10 shadow-md"
              : "border-gray-200 hover:border-gray-300 bg-white"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold",
                network.color
              )}
            >
              {network.label.charAt(0)}
            </div>
            <span className="font-medium text-text-navy">{network.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

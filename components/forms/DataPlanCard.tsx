"use client";

import { Product } from "@/types/api";
import { formatCurrency } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";

export interface DataPlanCardProps {
  plan: Product;
  isSelected: boolean;
  onSelect: (plan: Product) => void;
}

export function DataPlanCard({ plan, isSelected, onSelect }: DataPlanCardProps) {
  return (
    <button
      onClick={() => onSelect(plan)}
      className={cn(
        "w-full p-4 rounded-lg border-2 text-left transition-all",
        isSelected
          ? "border-primary-deep bg-primary-deep/10 shadow-md"
          : "border-gray-200 hover:border-gray-300 bg-white"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-text-navy">{plan.name}</h3>
            {isSelected && <Check className="h-5 w-5 text-primary-deep" />}
          </div>
          {plan.size && (
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">{plan.size}</span>
              {plan.validity && ` • Valid for ${plan.validity}`}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary-deep">
            {formatCurrency(plan.price)}
          </p>
        </div>
      </div>
    </button>
  );
}

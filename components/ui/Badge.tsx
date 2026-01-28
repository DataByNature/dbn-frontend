import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { TransactionStatus } from "@/types/api";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "error" | "warning" | "info" | "default";
  status?: TransactionStatus;
}

export function Badge({ className, variant, status, children, ...props }: BadgeProps) {
  let badgeVariant = variant;

  // Auto-determine variant from status if provided
  if (status && !variant) {
    switch (status) {
      case TransactionStatus.SUCCESS:
        badgeVariant = "success";
        break;
      case TransactionStatus.FAILED:
        badgeVariant = "error";
        break;
      case TransactionStatus.PENDING:
        badgeVariant = "warning";
        break;
      default:
        badgeVariant = "default";
    }
  }

  const variants = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[badgeVariant || "default"],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

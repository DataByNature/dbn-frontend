import { Card, CardContent } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils/cn";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface KPICardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning";
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = "default",
}: KPICardProps) {
  const variants = {
    default: "border-gray-200",
    primary: "border-primary-deep bg-primary-deep/5",
    success: "border-green-500 bg-green-50",
    warning: "border-yellow-500 bg-yellow-50",
  };

  const formatValue = (val: number | string): string => {
    if (typeof val === "string") return val;
    return formatCurrency(val);
  };

  return (
    <Card variant="outlined" className={cn("border-2", variants[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-text-navy">{formatValue(value)}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {Math.abs(trend.value)}%
                </span>
              </div>
            )}
          </div>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

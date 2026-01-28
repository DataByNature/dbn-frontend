"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";

export interface SalesChartProps {
  data: Array<{ date: string; amount: number; count: number }>;
  title?: string;
}

export function SalesChart({ data, title = "Sales Trend" }: SalesChartProps) {
  const chartData = data.map((item) => ({
    date: formatDate(item.date, "MMM dd"),
    amount: item.amount,
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => value.toString()}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "amount") {
                  return [formatCurrency(value), "Amount"];
                }
                return [value, "Count"];
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="amount"
              stroke="#1C4D2E"
              strokeWidth={2}
              name="Amount (₦)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="count"
              stroke="#2A5298"
              strokeWidth={2}
              name="Count"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

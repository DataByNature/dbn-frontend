"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils/formatters";

export interface NetworkDistribution {
  network: string;
  count: number;
  amount: number;
}

export interface NetworkPieChartProps {
  data: NetworkDistribution[];
  title?: string;
}

const COLORS = ["#1C4D2E", "#44A15A", "#2A5298", "#2B8A8E", "#E5C564"];

export function NetworkPieChart({ data, title = "Sales by Network" }: NetworkPieChartProps) {
  const chartData = data.map((item) => ({
    name: item.network,
    value: item.count,
    amount: item.amount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props: any) => {
                if (name === "value") {
                  return [
                    `${value} transactions (${formatCurrency(props.payload.amount)})`,
                    "Count",
                  ];
                }
                return [value, name];
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

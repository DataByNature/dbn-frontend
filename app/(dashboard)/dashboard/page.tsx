"use client";

import { useDashboardKPIs, useDashboardSales, useNetworkDistribution } from "@/lib/hooks/useDashboardKPIs";
import { useTransactions } from "@/lib/hooks/useTransactions";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { NetworkPieChart } from "@/components/dashboard/NetworkPieChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { DollarSign, TrendingUp, XCircle, Wallet } from "lucide-react";

export default function DashboardPage() {
  const { data: kpis, isLoading: kpisLoading } = useDashboardKPIs();
  const { data: salesData, isLoading: salesLoading } = useDashboardSales(7);
  const { data: networkData, isLoading: networkLoading } = useNetworkDistribution();
  const { data: transactionsData, isLoading: transactionsLoading } = useTransactions({
    page_size: 10,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-navy">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Today's Volume"
          value={kpis?.today_volume || 0}
          icon={<DollarSign className="h-6 w-6" />}
          variant="primary"
        />
        <KPICard
          title="Successful Vends"
          value={kpis?.successful_vends || 0}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="success"
        />
        <KPICard
          title="Failed Vends"
          value={kpis?.failed_vends || 0}
          icon={<XCircle className="h-6 w-6" />}
          variant="warning"
        />
        <KPICard
          title="Wallet Balance"
          value={kpis?.wallet_balance || 0}
          icon={<Wallet className="h-6 w-6" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {salesLoading ? (
          <div className="h-[300px] flex items-center justify-center bg-white rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-deep" />
          </div>
        ) : (
          <SalesChart data={salesData || []} title="Sales Trend (Last 7 Days)" />
        )}

        {networkLoading ? (
          <div className="h-[300px] flex items-center justify-center bg-white rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-deep" />
          </div>
        ) : (
          <NetworkPieChart data={networkData || []} />
        )}
      </div>

      {/* Recent Transactions */}
      {transactionsLoading ? (
        <div className="h-[400px] flex items-center justify-center bg-white rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-deep" />
        </div>
      ) : (
        <RecentTransactions transactions={transactionsData?.results || []} />
      )}
    </div>
  );
}

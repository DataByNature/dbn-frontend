"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useWallet, useWalletHistory } from "@/lib/hooks/useWallet";
import { useFundWallet } from "@/lib/hooks/useFundWallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { formatCurrency, formatDateTime } from "@/lib/utils/formatters";
import { Wallet } from "lucide-react";

const fundWalletSchema = z.object({
  amount: z.number().min(100, "Minimum amount is ₦100"),
  payment_method: z.string().min(1, "Please select a payment method"),
});

type FundWalletFormData = z.infer<typeof fundWalletSchema>;

export default function WalletPage() {
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [transactionType, setTransactionType] = useState<"CREDIT" | "DEBIT" | undefined>();
  const [page, setPage] = useState(1);

  const { data: historyData, isLoading: historyLoading } = useWalletHistory({
    type: transactionType,
    start_date: dateRange.start?.toISOString().split("T")[0],
    end_date: dateRange.end?.toISOString().split("T")[0],
    page,
    page_size: 20,
  });

  const fundWallet = useFundWallet();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FundWalletFormData>({
    resolver: zodResolver(fundWalletSchema),
  });

  const onSubmit = (data: FundWalletFormData) => {
    fundWallet.mutate({
      amount: data.amount,
      payment_method: data.payment_method,
    });
  };

  const paymentMethods = [
    { value: "paystack", label: "Paystack" },
    { value: "flutterwave", label: "Flutterwave" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-navy">Wallet</h1>
        <p className="text-gray-600 mt-1">Manage your wallet balance and transactions</p>
      </div>

      {/* Wallet Summary */}
      {walletLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4" />
              <div className="h-12 bg-gray-200 rounded w-1/2" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
                <p className="text-3xl font-bold text-primary-deep">
                  {wallet ? formatCurrency(wallet.balance) : "₦0.00"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Last updated: {wallet ? formatDateTime(wallet.last_updated) : "N/A"}
                </p>
              </div>
              <div className="h-16 w-16 rounded-full bg-primary-deep/10 flex items-center justify-center">
                <Wallet className="h-8 w-8 text-primary-deep" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fund Wallet */}
      <Card>
        <CardHeader>
          <CardTitle>Fund Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Amount (₦)"
              type="number"
              placeholder="1000"
              error={errors.amount?.message}
              {...register("amount", { valueAsNumber: true })}
            />

            <Select
              label="Payment Method"
              options={paymentMethods}
              error={errors.payment_method?.message}
              {...register("payment_method")}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={fundWallet.isPending}
            >
              Fund Wallet
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <DateRangePicker
                startDate={dateRange.start}
                endDate={dateRange.end}
                onChange={(start, end) => setDateRange({ start, end })}
                className="flex-1"
              />
              <Select
                label="Type"
                options={[
                  { value: "", label: "All" },
                  { value: "CREDIT", label: "Credit" },
                  { value: "DEBIT", label: "Debit" },
                ]}
                value={transactionType || ""}
                onChange={(e) =>
                  setTransactionType(
                    e.target.value ? (e.target.value as "CREDIT" | "DEBIT") : undefined
                  )
                }
                className="w-full md:w-48"
              />
            </div>

            {/* Table */}
            {historyLoading ? (
              <div className="py-8 text-center text-gray-500">Loading...</div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Balance After</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historyData?.results.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      historyData?.results.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{formatDateTime(transaction.created_at)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={transaction.type === "CREDIT" ? "success" : "error"}
                            >
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell>{formatCurrency(transaction.balance_after)}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {historyData && historyData.count > 20 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-600">
                      Showing {((page - 1) * 20) + 1} to {Math.min(page * 20, historyData.count)} of{" "}
                      {historyData.count} transactions
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={!historyData.next}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

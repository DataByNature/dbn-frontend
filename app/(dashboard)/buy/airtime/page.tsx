"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBuyAirtime } from "@/lib/hooks/useBuyAirtime";
import { useWallet } from "@/lib/hooks/useWallet";
import { NetworkSelector } from "@/components/forms/NetworkSelector";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Network } from "@/types/api";
import { formatCurrency } from "@/lib/utils/formatters";

const airtimeSchema = z.object({
  network: z.nativeEnum(Network, { required_error: "Please select a network" }),
  amount: z.number().min(1, "Amount must be at least ₦1"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type AirtimeFormData = z.infer<typeof airtimeSchema>;

const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export default function BuyAirtimePage() {
  const buyAirtime = useBuyAirtime();
  const { data: wallet } = useWallet();
  const [step, setStep] = useState<"network" | "amount" | "phone">("network");
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AirtimeFormData>({
    resolver: zodResolver(airtimeSchema),
    defaultValues: { amount: 0 },
  });

  const amount = watch("amount");
  const phone = watch("phone");

  const handleNetworkSelect = (network: Network) => {
    setSelectedNetwork(network);
    setValue("network", network);
    setStep("amount");
  };

  const handleAmountSelect = (value: number) => {
    setValue("amount", value);
    setStep("phone");
  };

  const onSubmit = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (!selectedNetwork || !amount || !phone) return;
    buyAirtime.mutate(
      {
        network: selectedNetwork,
        phone,
        amount: Number(amount),
      },
      {
        onSuccess: () => {
          setShowConfirm(false);
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-navy">Buy Airtime</h1>
        <p className="text-gray-600 mt-1">Top up airtime for any network</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div
          className={`flex items-center ${
            step === "network"
              ? "text-primary-deep"
              : step === "amount" || step === "phone"
                ? "text-green-600"
                : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "network"
                ? "bg-primary-deep text-white"
                : step === "amount" || step === "phone"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200"
            }`}
          >
            1
          </div>
          <span className="ml-2 font-medium">Network</span>
        </div>
        <div
          className={`w-16 h-1 ${
            step === "amount" || step === "phone" ? "bg-green-600" : "bg-gray-200"
          }`}
        />
        <div
          className={`flex items-center ${
            step === "amount"
              ? "text-primary-deep"
              : step === "phone"
                ? "text-green-600"
                : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "amount"
                ? "bg-primary-deep text-white"
                : step === "phone"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200"
            }`}
          >
            2
          </div>
          <span className="ml-2 font-medium">Amount</span>
        </div>
        <div
          className={`w-16 h-1 ${step === "phone" ? "bg-green-600" : "bg-gray-200"}`}
        />
        <div
          className={`flex items-center ${
            step === "phone" ? "text-primary-deep" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "phone" ? "bg-primary-deep text-white" : "bg-gray-200"
            }`}
          >
            3
          </div>
          <span className="ml-2 font-medium">Phone</span>
        </div>
      </div>

      {wallet && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Wallet Balance:</span>
              <span className="text-xl font-bold text-primary-deep">
                {formatCurrency(wallet.balance)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "network" && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Select Network</CardTitle>
          </CardHeader>
          <CardContent>
            <NetworkSelector
              selectedNetwork={selectedNetwork}
              onSelect={handleNetworkSelect}
            />
          </CardContent>
        </Card>
      )}

      {step === "amount" && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Enter Amount</CardTitle>
            <button
              onClick={() => setStep("network")}
              className="text-sm text-primary-deep hover:underline mt-2"
            >
              ← Change network
            </button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Select a preset amount or enter a custom value (₦)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleAmountSelect(preset)}
                  className={`p-4 rounded-lg border-2 text-left font-medium transition-all ${
                    amount === preset
                      ? "border-primary-deep bg-primary-deep/10"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 whitespace-nowrap">Custom:</span>
              <Input
                type="number"
                min={1}
                step={1}
                placeholder="e.g. 1500"
                value={amount && amount >= 1 ? amount : ""}
                onChange={(e) => {
                  const v = e.target.valueAsNumber;
                  setValue("amount", Number.isNaN(v) ? 0 : Math.max(0, v));
                }}
              />
              <Button
                type="button"
                variant="primary"
                onClick={() => Number(amount) >= 1 && setStep("phone")}
                disabled={!amount || Number(amount) < 1}
              >
                Next
              </Button>
            </div>
            {errors.amount?.message && (
              <p className="text-sm text-red-600 mt-2">{errors.amount.message}</p>
            )}
          </CardContent>
        </Card>
      )}

      {step === "phone" && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Enter Phone Number</CardTitle>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setStep("network")}
                className="text-sm text-primary-deep hover:underline"
              >
                ← Change network
              </button>
              <span className="text-gray-400">|</span>
              <button
                type="button"
                onClick={() => setStep("amount")}
                className="text-sm text-primary-deep hover:underline"
              >
                ← Change amount
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {amount > 0 && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Selected amount:</p>
                <p className="text-lg font-bold text-primary-deep mt-1">
                  {formatCurrency(Number(amount))}
                </p>
                {selectedNetwork && (
                  <p className="text-sm text-gray-600 mt-1">
                    Network: {selectedNetwork}
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <PhoneInput
                value={phone || ""}
                onChange={(value) => setValue("phone", value)}
                error={errors.phone?.message}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={!phone || !amount || amount < 1}
              >
                Confirm Purchase
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirm Airtime Purchase"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Network:</span>
              <span className="font-medium">{selectedNetwork}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">{formatCurrency(Number(amount))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{phone}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total:</span>
              <span className="text-primary-deep">
                {formatCurrency(Number(amount))}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowConfirm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              className="flex-1"
              isLoading={buyAirtime.isPending}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

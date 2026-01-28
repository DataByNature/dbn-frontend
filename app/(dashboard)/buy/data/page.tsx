"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBuyData } from "@/lib/hooks/useBuyData";
import { useProducts } from "@/lib/hooks/useProducts";
import { useWallet } from "@/lib/hooks/useWallet";
import { NetworkSelector } from "@/components/forms/NetworkSelector";
import { DataPlanCard } from "@/components/forms/DataPlanCard";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Network, ProductCategory, Product } from "@/types/api";
import { formatCurrency } from "@/lib/utils/formatters";

const dataSchema = z.object({
  network: z.nativeEnum(Network, { required_error: "Please select a network" }),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  product_id: z.string().min(1, "Please select a data plan"),
});

type DataFormData = z.infer<typeof dataSchema>;

export default function BuyDataPage() {
  const buyData = useBuyData();
  const { data: wallet } = useWallet();
  const [step, setStep] = useState<"network" | "plan" | "phone">("network");
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: productsData } = useProducts({
    category: ProductCategory.DATA,
    network: selectedNetwork || undefined,
    is_active: true,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DataFormData>({
    resolver: zodResolver(dataSchema),
  });

  const phone = watch("phone");

  const handleNetworkSelect = (network: Network) => {
    setSelectedNetwork(network);
    setValue("network", network);
    setStep("plan");
  };

  const handlePlanSelect = (plan: Product) => {
    setSelectedPlan(plan);
    setValue("product_id", plan.id);
    setStep("phone");
  };

  const onSubmit = (data: DataFormData) => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (!selectedPlan) return;
    buyData.mutate({
      network: selectedNetwork!,
      phone: watch("phone"),
      product_id: selectedPlan.id,
    });
    setShowConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-navy">Buy Data</h1>
        <p className="text-gray-600 mt-1">Purchase data bundle for any network</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center ${step === "network" ? "text-primary-deep" : step === "plan" || step === "phone" ? "text-green-600" : "text-gray-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "network" ? "bg-primary-deep text-white" : step === "plan" || step === "phone" ? "bg-green-100 text-green-600" : "bg-gray-200"}`}>
            1
          </div>
          <span className="ml-2 font-medium">Network</span>
        </div>
        <div className={`w-16 h-1 ${step === "plan" || step === "phone" ? "bg-green-600" : "bg-gray-200"}`} />
        <div className={`flex items-center ${step === "plan" ? "text-primary-deep" : step === "phone" ? "text-green-600" : "text-gray-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "plan" ? "bg-primary-deep text-white" : step === "phone" ? "bg-green-100 text-green-600" : "bg-gray-200"}`}>
            2
          </div>
          <span className="ml-2 font-medium">Plan</span>
        </div>
        <div className={`w-16 h-1 ${step === "phone" ? "bg-green-600" : "bg-gray-200"}`} />
        <div className={`flex items-center ${step === "phone" ? "text-primary-deep" : "text-gray-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "phone" ? "bg-primary-deep text-white" : "bg-gray-200"}`}>
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

      {step === "plan" && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Select Data Plan</CardTitle>
            <button
              onClick={() => setStep("network")}
              className="text-sm text-primary-deep hover:underline mt-2"
            >
              ← Change network
            </button>
          </CardHeader>
          <CardContent>
            {productsData?.results.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No data plans available for this network</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productsData?.results.map((plan) => (
                  <DataPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedPlan?.id === plan.id}
                    onSelect={handlePlanSelect}
                  />
                ))}
              </div>
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
                onClick={() => setStep("network")}
                className="text-sm text-primary-deep hover:underline"
              >
                ← Change network
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setStep("plan")}
                className="text-sm text-primary-deep hover:underline"
              >
                ← Change plan
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedPlan && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Selected Plan:</p>
                <p className="font-semibold text-text-navy">{selectedPlan.name}</p>
                <p className="text-lg font-bold text-primary-deep mt-1">
                  {formatCurrency(selectedPlan.price)}
                </p>
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
                disabled={!phone || !selectedPlan}
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
        title="Confirm Purchase"
      >
        {selectedPlan && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Network:</span>
                <span className="font-medium">{selectedNetwork}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{phone}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Amount:</span>
                <span className="text-primary-deep">{formatCurrency(selectedPlan.price)}</span>
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
                isLoading={buyData.isPending}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

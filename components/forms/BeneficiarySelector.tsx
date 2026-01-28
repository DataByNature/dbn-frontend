"use client";

import { Select } from "@/components/ui/Select";
import { useState, useEffect } from "react";

export interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  network: string;
}

export interface BeneficiarySelectorProps {
  selectedBeneficiary: Beneficiary | null;
  onSelect: (beneficiary: Beneficiary | null) => void;
  beneficiaries?: Beneficiary[];
  label?: string;
}

export function BeneficiarySelector({
  selectedBeneficiary,
  onSelect,
  beneficiaries = [],
  label = "Select Beneficiary",
}: BeneficiarySelectorProps) {
  const options = [
    { value: "", label: "New beneficiary" },
    ...beneficiaries.map((b) => ({
      value: b.id,
      label: `${b.name} - ${b.phone} (${b.network})`,
    })),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      onSelect(null);
      return;
    }
    const beneficiary = beneficiaries.find((b) => b.id === value);
    if (beneficiary) {
      onSelect(beneficiary);
    }
  };

  return (
    <Select
      label={label}
      options={options}
      value={selectedBeneficiary?.id || ""}
      onChange={handleChange}
    />
  );
}

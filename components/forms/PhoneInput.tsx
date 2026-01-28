"use client";

import { Input } from "@/components/ui/Input";
import { formatPhoneNumber } from "@/lib/utils/formatters";
import { useState } from "react";

export interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
}

export function PhoneInput({
  value,
  onChange,
  error,
  label = "Phone Number",
  placeholder = "08012345678",
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setDisplayValue(inputValue);
    onChange(inputValue);
  };

  return (
    <Input
      type="tel"
      label={label}
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      error={error}
      maxLength={11}
    />
  );
}

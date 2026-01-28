"use client";

import { useState, useEffect } from "react";
import { Input } from "./Input";
import { format } from "date-fns";

export interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  className,
}: DateRangePickerProps) {
  const [startDateStr, setStartDateStr] = useState(
    startDate ? format(startDate, "yyyy-MM-dd") : ""
  );
  const [endDateStr, setEndDateStr] = useState(
    endDate ? format(endDate, "yyyy-MM-dd") : ""
  );

  // Sync internal state when props change
  useEffect(() => {
    setStartDateStr(startDate ? format(startDate, "yyyy-MM-dd") : "");
  }, [startDate]);

  useEffect(() => {
    setEndDateStr(endDate ? format(endDate, "yyyy-MM-dd") : "");
  }, [endDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartDateStr(value);
    const date = value ? new Date(value) : undefined;
    onChange(date, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndDateStr(value);
    const date = value ? new Date(value) : undefined;
    onChange(startDate, date);
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      <Input
        type="date"
        label="Start Date"
        value={startDateStr}
        onChange={handleStartDateChange}
        className="flex-1"
      />
      <Input
        type="date"
        label="End Date"
        value={endDateStr}
        onChange={handleEndDateChange}
        className="flex-1"
      />
    </div>
  );
}

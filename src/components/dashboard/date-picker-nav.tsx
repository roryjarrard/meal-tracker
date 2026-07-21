"use client";

import { useRouter } from "next/navigation";

import { DatePicker } from "@/components/dashboard/date-picker";

function toDateParam(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DatePickerNav({ date }: { date: Date }) {
  const router = useRouter();

  return (
    <DatePicker
      date={date}
      onSelect={(selected) => {
        router.push(`/dashboard?date=${toDateParam(selected)}`);
      }}
    />
  );
}

export { DatePickerNav };

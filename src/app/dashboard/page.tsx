"use client";

import { useState } from "react";

import { DatePicker } from "@/components/dashboard/date-picker";
import { MealList, type Meal } from "@/components/dashboard/meal-list";

const mockMeals: Meal[] = [
  { id: "1", name: "Oatmeal with berries", time: "8:00 AM", calories: 320 },
  { id: "2", name: "Grilled chicken salad", time: "12:30 PM", calories: 480 },
  { id: "3", name: "Salmon with rice", time: "7:00 PM", calories: 610 },
];

export default function DashboardPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <DatePicker date={date} onSelect={setDate} />
      </div>
      <MealList meals={mockMeals} />
    </div>
  );
}

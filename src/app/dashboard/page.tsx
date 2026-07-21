import { DatePickerNav } from "@/components/dashboard/date-picker-nav";
import { MealList } from "@/components/dashboard/meal-list";
import { getMealsForDate } from "@/data/meals";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date: dateParam } = await searchParams;
  const date = dateParam ? new Date(`${dateParam}T00:00:00`) : new Date();

  const meals = await getMealsForDate(date);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <DatePickerNav date={date} />
      </div>
      <MealList meals={meals} />
    </div>
  );
}

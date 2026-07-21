import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditMealForm } from "@/components/dashboard/edit-meal-form";
import { getMealById } from "@/data/meals";

type EditMealPageProps = {
  params: Promise<{ mealId: string }>;
};

export default async function EditMealPage({ params }: EditMealPageProps) {
  const { mealId } = await params;
  const meal = await getMealById(mealId);

  if (!meal) notFound();

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
      <h1 className="text-2xl font-semibold tracking-tight">Edit meal</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit meal</CardTitle>
        </CardHeader>
        <CardContent>
          <EditMealForm
            mealId={meal.id}
            defaultName={meal.name ?? ""}
            defaultEatenAt={meal.eatenAt.toISOString().slice(0, 16)}
            defaultNotes={meal.notes ?? ""}
          />
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewMealForm } from "@/components/dashboard/new-meal-form";

export default function NewMealPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
      <h1 className="text-2xl font-semibold tracking-tight">Add meal</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>New meal</CardTitle>
        </CardHeader>
        <CardContent>
          <NewMealForm />
        </CardContent>
      </Card>
    </div>
  );
}

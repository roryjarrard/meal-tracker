import Link from "next/link";
import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Meal = {
  id: string;
  name: string | null;
  eatenAt: Date;
  foodItems: { calories: number | null }[];
};

function MealList({ meals }: { meals: Meal[] }) {
  if (meals.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        No meals logged for this date.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {meals.map((meal) => {
        const calories = meal.foodItems.reduce(
          (total, item) => total + (item.calories ?? 0),
          0,
        );

        return (
          <Card key={meal.id}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{meal.name ?? "Untitled meal"}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {meal.eatenAt.toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  nativeButton={false}
                  render={
                    <Link href={`/dashboard/meals/${meal.id}`} aria-label="Edit meal" />
                  }
                >
                  <Pencil />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {calories} kcal
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export { MealList };

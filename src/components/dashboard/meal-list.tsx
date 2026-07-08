import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Meal = {
  id: string;
  name: string;
  time: string;
  calories: number;
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
      {meals.map((meal) => (
        <Card key={meal.id}>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{meal.name}</CardTitle>
            <Badge variant="secondary">{meal.time}</Badge>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {meal.calories} kcal
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { MealList };

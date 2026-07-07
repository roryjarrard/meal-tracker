import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  meals: {
    foodItems: r.many.foodItems(),
  },
  foodItems: {
    meal: r.one.meals({
      from: r.foodItems.mealId,
      to: r.meals.id,
    }),
  },
}));

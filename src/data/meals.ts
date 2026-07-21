import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/index";
import { foodItems, meals } from "@/db/schema";

async function getMealsForDate(date: Date) {
  const { userId } = await auth();
  if (!userId) return [];

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  return db.query.meals.findMany({
    where: {
      userId: { eq: userId },
      eatenAt: { gte: startOfDay, lt: endOfDay },
    },
    with: { foodItems: true },
    orderBy: { eatenAt: "asc" },
  });
}

async function getMealById(mealId: string) {
  const { userId } = await auth();
  if (!userId) return null;

  const meal = await db.query.meals.findFirst({
    where: { id: { eq: mealId }, userId: { eq: userId } },
    with: { foodItems: true },
  });

  return meal ?? null;
}

type NewMealInput = {
  userId: string;
  name: string;
  eatenAt: Date;
  notes: string | null;
  foodItems: {
    name: string;
    quantity: string | null;
    servingUnit: string | null;
    calories: number | null;
    proteinG: string | null;
    carbsG: string | null;
    fatG: string | null;
  }[];
};

async function createMeal(input: NewMealInput) {
  const mealId = crypto.randomUUID();

  const mealInsert = db
    .insert(meals)
    .values({
      id: mealId,
      userId: input.userId,
      name: input.name,
      eatenAt: input.eatenAt,
      notes: input.notes,
    })
    .returning();

  if (input.foodItems.length === 0) {
    const [meal] = await mealInsert;
    return meal;
  }

  const foodItemsInsert = db.insert(foodItems).values(
    input.foodItems.map((item) => ({
      mealId,
      name: item.name,
      quantity: item.quantity,
      servingUnit: item.servingUnit,
      calories: item.calories,
      proteinG: item.proteinG,
      carbsG: item.carbsG,
      fatG: item.fatG,
    })),
  );

  const [[meal]] = await db.batch([mealInsert, foodItemsInsert]);

  return meal;
}

type UpdateMealInput = {
  userId: string;
  mealId: string;
  name: string;
  eatenAt: Date;
  notes: string | null;
};

async function updateMeal(input: UpdateMealInput) {
  const [meal] = await db
    .update(meals)
    .set({
      name: input.name,
      eatenAt: input.eatenAt,
      notes: input.notes,
      updatedAt: new Date(),
    })
    .where(
      and(eq(meals.id, input.mealId), eq(meals.userId, input.userId)),
    )
    .returning();

  return meal;
}

export { getMealsForDate, getMealById, createMeal, updateMeal };

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createMeal, updateMeal } from "@/data/meals";

const foodItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().nullable(),
  servingUnit: z.string().nullable(),
  calories: z.number().int().nonnegative().nullable(),
  proteinG: z.string().nullable(),
  carbsG: z.string().nullable(),
  fatG: z.string().nullable(),
});

const createMealSchema = z.object({
  name: z.string().min(1),
  eatenAt: z.date(),
  notes: z.string().nullable(),
  foodItems: z.array(foodItemSchema),
});

type CreateMealArgs = z.infer<typeof createMealSchema>;

async function createMealAction(args: CreateMealArgs) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const parsed = createMealSchema.parse(args);

  await createMeal({ userId, ...parsed });

  revalidatePath("/dashboard");
}

const updateMealSchema = z.object({
  mealId: z.string().uuid(),
  name: z.string().min(1),
  eatenAt: z.date(),
  notes: z.string().nullable(),
});

type UpdateMealArgs = z.infer<typeof updateMealSchema>;

async function updateMealAction(args: UpdateMealArgs) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const parsed = updateMealSchema.parse(args);

  await updateMeal({ userId, ...parsed });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/meals/${parsed.mealId}`);
}

export { createMealAction, updateMealAction };

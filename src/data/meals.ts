import { auth } from "@clerk/nextjs/server";

import { db } from "@/index";

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

export { getMealsForDate };

import {
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const meals = pgTable(
  "meals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    name: text("name"),
    eatenAt: timestamp("eaten_at").notNull().defaultNow(),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("meals_user_id_idx").on(table.userId)],
);

export const foodItems = pgTable("food_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  mealId: uuid("meal_id")
    .notNull()
    .references(() => meals.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  quantity: text("quantity"),
  servingUnit: text("serving_unit"),
  calories: integer("calories"),
  proteinG: numeric("protein_g"),
  carbsG: numeric("carbs_g"),
  fatG: numeric("fat_g"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

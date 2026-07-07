CREATE TABLE "food_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"meal_id" uuid NOT NULL,
	"name" text NOT NULL,
	"quantity" text,
	"serving_unit" text,
	"calories" integer,
	"protein_g" numeric,
	"carbs_g" numeric,
	"fat_g" numeric,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"name" text,
	"eaten_at" timestamp DEFAULT now() NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "meals_user_id_idx" ON "meals" ("user_id");--> statement-breakpoint
ALTER TABLE "food_items" ADD CONSTRAINT "food_items_meal_id_meals_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE CASCADE;
"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { createMealAction } from "@/app/dashboard/meals/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function NewMealForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [defaultEatenAt] = useState(() => new Date().toISOString().slice(0, 16));

  function handleSubmit(formData: FormData) {
    setError(null);

    const name = formData.get("name") as string;
    const eatenAt = formData.get("eatenAt") as string;
    const notes = formData.get("notes") as string;
    const foodName = formData.get("foodName") as string;
    const quantity = formData.get("quantity") as string;
    const servingUnit = formData.get("servingUnit") as string;
    const calories = formData.get("calories") as string;
    const proteinG = formData.get("proteinG") as string;
    const carbsG = formData.get("carbsG") as string;
    const fatG = formData.get("fatG") as string;

    startTransition(async () => {
      try {
        await createMealAction({
          name,
          eatenAt: eatenAt ? new Date(eatenAt) : new Date(),
          notes: notes || null,
          foodItems: foodName
            ? [
                {
                  name: foodName,
                  quantity: quantity || null,
                  servingUnit: servingUnit || null,
                  calories: calories ? parseInt(calories, 10) : null,
                  proteinG: proteinG || null,
                  carbsG: carbsG || null,
                  fatG: fatG || null,
                },
              ]
            : [],
        });
        toast.success("Meal logged successfully");
        router.push("/dashboard");
      } catch {
        setError("Failed to create meal. Please try again.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Meal name</Label>
        <Input id="name" name="name" placeholder="Breakfast" required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="eatenAt">Date &amp; time</Label>
        <Input
          id="eatenAt"
          name="eatenAt"
          type="datetime-local"
          defaultValue={defaultEatenAt}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Optional notes" />
      </div>

      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <h2 className="text-sm font-medium">Food item (optional)</h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="foodName">Food name</Label>
          <Input id="foodName" name="foodName" placeholder="Oatmeal" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" name="quantity" placeholder="1" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="servingUnit">Unit</Label>
            <Input id="servingUnit" name="servingUnit" placeholder="cup" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="calories">Calories</Label>
            <Input id="calories" name="calories" type="number" min="0" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="proteinG">Protein (g)</Label>
            <Input id="proteinG" name="proteinG" type="number" min="0" step="0.1" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="carbsG">Carbs (g)</Label>
            <Input id="carbsG" name="carbsG" type="number" min="0" step="0.1" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="fatG">Fat (g)</Label>
          <Input id="fatG" name="fatG" type="number" min="0" step="0.1" />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save meal"}
        </Button>
      </div>
    </form>
  );
}

export { NewMealForm };

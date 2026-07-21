"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateMealAction } from "@/app/dashboard/meals/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EditMealFormProps = {
  mealId: string;
  defaultName: string;
  defaultEatenAt: string;
  defaultNotes: string;
};

function EditMealForm({
  mealId,
  defaultName,
  defaultEatenAt,
  defaultNotes,
}: EditMealFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);

    const name = formData.get("name") as string;
    const eatenAt = formData.get("eatenAt") as string;
    const notes = formData.get("notes") as string;

    startTransition(async () => {
      try {
        await updateMealAction({
          mealId,
          name,
          eatenAt: eatenAt ? new Date(eatenAt) : new Date(),
          notes: notes || null,
        });
        toast.success("Meal updated successfully");
        router.push("/dashboard");
      } catch {
        setError("Failed to update meal. Please try again.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Meal name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Breakfast"
          defaultValue={defaultName}
          required
        />
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
        <Textarea
          id="notes"
          name="notes"
          placeholder="Optional notes"
          defaultValue={defaultNotes}
        />
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
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

export { EditMealForm };

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Meal Tracker</h1>
      <p className="max-w-md text-lg text-muted-foreground">
        Log your meals and keep track of what you eat, every day.
      </p>
    </div>
  );
}

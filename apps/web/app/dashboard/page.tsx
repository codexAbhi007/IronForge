import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl p-8">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold">Iron Forge Dashboard</h1>
            <p className="text-gray-600">
              Welcome, {session.user.name}
            </p>
          </div>

          <LogoutButton />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold">Today's Workout</h2>
            <p className="mt-2 text-gray-600">
              Push Day (placeholder)
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold">Calories</h2>
            <p className="mt-2 text-gray-600">0 kcal logged today</p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold">Active Session</h2>
            <p className="mt-2 text-gray-600">Authenticated with Better Auth</p>
          </div>
        </div>
      </div>
    </main>
  );
}
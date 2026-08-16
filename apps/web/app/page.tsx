import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Dumbbell,
  Flame,
  Play,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function HomePage() {
    const session = await getSession();
    if(session){
      redirect("/dashboard")

    }
  return (
    <main className="min-h-screen bg-[#f4faf9] text-slate-900">

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#f4faf9]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008f7a]">
              <span className="text-sm font-black text-white">
                IF
              </span>
            </div>

            <span className="text-xl font-black tracking-tight text-[#008f7a]">
              IRON FORGE
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-[#008f7a]"
            >
              Features
            </a>

            <a
              href="#progress"
              className="text-sm font-medium text-slate-600 transition hover:text-[#008f7a]"
            >
              Progress
            </a>

            <a
              href="#training"
              className="text-sm font-medium text-slate-600 transition hover:text-[#008f7a]"
            >
              Training
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
            >
              <Link href="/login">
                Log in 
              </Link>
            </Button>

            <Link
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#008f7a] px-5 text-sm font-semibold text-white transition hover:bg-[#007c6b]"
            >
              Get started
            </Link>
          </div>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border-[70px] border-[#008f7a]/10" />

        <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#008f7a]/5" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">

          {/* Hero text */}
          <div>

            <Badge
              variant="outline"
              className="mb-6 border-[#008f7a]/30 bg-[#008f7a]/5 px-4 py-2 text-[#008f7a]"
            >
              <Dumbbell className="mr-2 h-4 w-4" />
              Built for lifters
            </Badge>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

              Train Hard.
              <br />

              Track Everything.
              <br />

              <span className="text-[#008f7a]">
                Get Stronger.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Your complete workout companion for logging
              training, tracking progress, and building strength
              one session at a time.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#008f7a] px-7 text-sm font-bold text-white shadow-sm transition hover:bg-[#007c6b]"
              >
                Start training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-7 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Play className="mr-2 h-4 w-4" />
                Log in
              </Link>

            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <span>✓ Workout tracking</span>
              <span>✓ Progress tracking</span>
              <span>✓ Personal goals</span>
            </div>

          </div>


          {/* Dashboard preview */}
          <div
            id="progress"
            className="relative"
          >

            <Card className="relative overflow-hidden rounded-3xl border-slate-200 shadow-2xl shadow-[#008f7a]/10">

              <div className="border-b bg-white px-6 py-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Your progress
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Keep pushing.
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#008f7a]/10">
                    <TrendingUp className="h-5 w-5 text-[#008f7a]" />
                  </div>

                </div>

              </div>

              <CardContent className="space-y-6 bg-white p-6">

                {/* Progress */}
                <div>

                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">
                      Weekly goal
                    </span>

                    <span className="font-bold text-[#008f7a]">
                      78%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[78%] rounded-full bg-[#008f7a]" />
                  </div>

                </div>


                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">

                  <div className="rounded-2xl bg-[#f4faf9] p-4">
                    <Dumbbell className="mb-3 h-5 w-5 text-[#008f7a]" />

                    <p className="text-2xl font-bold">
                      24
                    </p>

                    <p className="text-xs text-slate-500">
                      Workouts
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f4faf9] p-4">
                    <Flame className="mb-3 h-5 w-5 text-orange-500" />

                    <p className="text-2xl font-bold">
                      12
                    </p>

                    <p className="text-xs text-slate-500">
                      Day streak
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f4faf9] p-4">
                    <BarChart3 className="mb-3 h-5 w-5 text-[#008f7a]" />

                    <p className="text-2xl font-bold">
                      +18%
                    </p>

                    <p className="text-xs text-slate-500">
                      Strength
                    </p>
                  </div>

                </div>


                {/* Recent workout */}
                <div className="rounded-2xl border border-slate-200 p-4">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="font-semibold">
                        Push Day
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Chest · Shoulders · Triceps
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-[#008f7a]">
                      Completed
                    </span>

                  </div>

                </div>

              </CardContent>
            </Card>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="border-y border-slate-200 bg-white"
      >

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-[#008f7a]">
              Everything you need
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Built around your training.
            </h2>

            <p className="mt-4 text-slate-600">
              Iron Forge keeps your workouts, goals, and progress
              in one place so you can focus on what matters —
              getting stronger.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* Feature 1 */}
            <Card className="rounded-2xl border-slate-200 shadow-none transition hover:-translate-y-1 hover:shadow-lg">

              <CardContent className="p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008f7a]/10">
                  <Dumbbell className="h-6 w-6 text-[#008f7a]" />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  Workout Tracking
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Log exercises, sets, reps, weight, and every
                  session so nothing gets forgotten.
                </p>

              </CardContent>

            </Card>


            {/* Feature 2 */}
            <Card className="rounded-2xl border-slate-200 shadow-none transition hover:-translate-y-1 hover:shadow-lg">

              <CardContent className="p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008f7a]/10">
                  <BarChart3 className="h-6 w-6 text-[#008f7a]" />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  Progress Tracking
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  See how your strength, volume, body weight,
                  and performance change over time.
                </p>

              </CardContent>

            </Card>


            {/* Feature 3 */}
            <Card className="rounded-2xl border-slate-200 shadow-none transition hover:-translate-y-1 hover:shadow-lg">

              <CardContent className="p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008f7a]/10">
                  <Flame className="h-6 w-6 text-[#008f7a]" />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  Build Consistency
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Build training streaks, set goals, and stay
                  consistent enough to see real results.
                </p>

              </CardContent>

            </Card>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section
        id="training"
        className="px-6 py-24"
      >

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#008f7a] px-8 py-16 text-center text-white shadow-xl sm:px-16">

          <p className="text-sm font-bold uppercase tracking-widest text-white/70">
            Your next session starts here
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Stop guessing.
            <br />
            Start tracking.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-white/80">
            Build a training history you can actually look back
            on and see how far you've come.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-white px-7 text-sm font-bold text-[#008f7a] transition hover:bg-slate-100"
          >
            Create your account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#008f7a]">
              <span className="text-xs font-black text-white">
                IF
              </span>
            </div>

            <span className="font-bold text-[#008f7a]">
              IRON FORGE
            </span>

          </div>

          <p className="text-sm text-slate-400">
            Train Hard. Track Everything. Get Stronger.
          </p>

        </div>

      </footer>

    </main>
  );
}
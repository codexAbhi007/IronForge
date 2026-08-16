"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#f4faf9] flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[#008f7a] flex items-center justify-center">
              <span className="text-white font-bold text-xl">IF</span>
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-[#008f7a]">
              IRON FORGE
            </span>
          </div>
        </div>

        {/* Error icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <TriangleAlert className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-red-500 mb-3">
          Something went wrong
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          We hit a snag.
        </h1>

        <p className="text-slate-600 text-base leading-7 max-w-md mx-auto mb-8">
          Something unexpected happened while loading this page. Please try
          again or return to the dashboard.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="h-11 px-6 bg-[#008f7a] hover:bg-[#007c6b]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>

          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to dashboard
          </Link>
        </div>

        <p className="mt-10 text-xs text-slate-400">
          Iron Forge · Train Hard. Track Everything. Get Stronger.
        </p>
      </div>
    </main>
  );
}

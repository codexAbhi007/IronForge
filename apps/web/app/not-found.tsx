import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
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

        {/* 404 */}
        <div className="mb-4">
          <h1 className="text-8xl font-black tracking-tight text-[#008f7a]">
            404
          </h1>
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Page not found
        </p>

        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
          Looks like you missed a rep.
        </h2>

        <p className="text-slate-600 text-base leading-7 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#008f7a] px-6 text-sm font-medium text-white transition-colors hover:bg-[#007c6b]"
          >
            <Home className="mr-2 h-4 w-4" />
            Go home
          </Link>

          <Link href="/dashboard" className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </div>

        <p className="mt-10 text-xs text-slate-400">
          Iron Forge · Train Hard. Track Everything. Get Stronger.
        </p>
      </div>
    </main>
  );
}

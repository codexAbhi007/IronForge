"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

import {
  signInSchema,
  type SignInInput,
} from "@iron-forge/validation";

import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const oauthErrorHandled = useRef(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  /*
   * =========================================================
   * OAUTH REDIRECT ERRORS
   * =========================================================
   */

  useEffect(() => {
    const error = searchParams.get("error");

    if (!error || oauthErrorHandled.current) {
      return;
    }

    oauthErrorHandled.current = true;

    switch (error) {
      case "signup_disabled":
        toast.error(
          "This account isn't registered with Iron Forge. Please sign up first."
        );
        break;

      case "account_not_linked":
        toast.error(
          "This Google account isn't linked to Iron Forge. Please sign up first."
        );
        break;

      case "unable_to_get_user_info":
        toast.error(
          "We couldn't retrieve your Google account information. Please try again."
        );
        break;

      case "unable_to_create_user":
        toast.error(
          "We couldn't create your account. Please try again."
        );
        break;

      case "state_mismatch":
      case "state_not_found":
      case "state_invalid":
        toast.error(
          "Your Google sign-in session expired. Please try again."
        );
        break;

      default:
        toast.error(
          "Google sign-in failed. Please try again."
        );
        break;
    }

    router.replace("/login", {
      scroll: false,
    });
  }, [searchParams, router]);

  /*
   * =========================================================
   * FORM
   * =========================================================
   */

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  /*
   * =========================================================
   * EMAIL + PASSWORD LOGIN
   * =========================================================
   */

  const onSubmit = async (data: SignInInput) => {
    try {
      /*
       * Check whether this email already belongs to an
       * OAuth-only account before attempting password login.
       */
      const accountCheckResponse = await fetch(
        `/api/auth/check-account?email=${encodeURIComponent(
          data.email
        )}`
      );

      if (accountCheckResponse.ok) {
        const accountInfo = await accountCheckResponse.json();

        /*
         * An account exists, but it doesn't have
         * an email/password credential.
         */
        if (
          accountInfo.exists &&
          !accountInfo.hasPassword
        ) {
          if (accountInfo.provider === "google") {
            toast.error(
              "This account was created with Google. Please continue with Google."
            );
          } else {
            toast.error(
              "This account uses social sign-in. Please use your original sign-in method."
            );
          }

          return;
        }

        /*
         * No Iron Forge account exists with this email.
         */
        if (!accountInfo.exists) {
          toast.error(
            "No Iron Forge account was found with this email. Please sign up first."
          );

          return;
        }
      }

      /*
       * Normal email/password login.
       */
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        const code = result.error.code;

        switch (code) {
          case "INVALID_EMAIL_OR_PASSWORD":
          case "INVALID_PASSWORD":
            toast.error(
              "Invalid email or password."
            );
            break;

          case "USER_NOT_FOUND":
          case "CREDENTIAL_ACCOUNT_NOT_FOUND":
            toast.error(
              "No email/password account was found. Please sign up first."
            );
            break;

          case "EMAIL_NOT_VERIFIED":
            toast.error(
              "Please verify your email address before logging in."
            );
            break;

          default:
            toast.error(
              "Unable to log in. Please check your credentials and try again."
            );
            break;
        }

        return;
      }

      toast.success("Welcome back!");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      toast.error(
        "Something went wrong while logging in. Please try again."
      );
    }
  };

  /*
   * =========================================================
   * GOOGLE LOGIN
   * =========================================================
   */

  const handleGoogleLogin = async () => {
    if (isGoogleLoading || isSubmitting) {
      return;
    }

    setIsGoogleLoading(true);

    try {
      /*
       * OAuth errors are handled after the redirect
       * through the ?error=... parameter.
       */
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: "/login",
      });
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);

      toast.error(
        "Google sign-in failed. Please try again."
      );

      setIsGoogleLoading(false);
    }
  };

  /*
   * =========================================================
   * UI
   * =========================================================
   */

  return (
    <main className="flex min-h-screen bg-background">

      {/* =====================================================
          LEFT BRAND PANEL
          ===================================================== */}

      <section className="relative hidden overflow-hidden bg-primary lg:flex lg:w-1/2">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full border-[70px] border-primary-foreground/10" />

        <div className="absolute right-20 top-20 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />

        <div className="relative z-10 flex w-full flex-col justify-center px-16 xl:px-24">

          {/* Logo */}

          <div className="mb-12 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground text-xl font-black text-primary shadow-lg">
              IF
            </div>

            <span className="text-3xl font-black tracking-tight text-primary-foreground">
              IRON FORGE
            </span>

          </div>

          {/* Hero */}

          <h1 className="max-w-xl text-5xl font-black leading-[1.08] tracking-tight text-primary-foreground xl:text-6xl">
            Train Hard.
            <br />

            Track Everything.
            <br />

            <span className="text-accent">
              Get Stronger.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-primary-foreground/80">
            Your complete workout tracker for logging workouts,
            tracking progress, and building strength one session
            at a time.
          </p>

          {/* Feature pills */}

          <div className="mt-10 flex flex-wrap gap-3">

            <div className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              🏋️ Workout Tracking
            </div>

            <div className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              📈 Progress Tracking
            </div>

            <div className="rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              🔥 Build Consistency
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          RIGHT LOGIN PANEL
          ===================================================== */}

      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">

        <div className="w-full max-w-md">

          {/* Mobile logo */}

          <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-black text-primary-foreground shadow-sm">
              IF
            </div>

            <span className="text-2xl font-black tracking-tight">
              IRON FORGE
            </span>

          </div>

          {/* Heading */}

          <div className="mb-8">

            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back
            </h2>

            <p className="mt-2 text-muted-foreground">
              Log in to continue your fitness journey.
            </p>

          </div>

          {/* =================================================
              EMAIL / PASSWORD
              ================================================= */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <Input
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="h-14 rounded-xl bg-muted/50 px-4 text-base"
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1.5 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}

            <div>

              <div className="relative">

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="h-14 rounded-xl bg-muted/50 px-4 pr-12 text-base"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="mt-1.5 text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* Forgot password */}

            <div className="flex justify-end">

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>

            </div>

            {/* Login button */}

            <Button
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
              className="h-14 w-full rounded-xl text-base font-semibold"
            >
              {isSubmitting
                ? "Logging in..."
                : "Log in"}
            </Button>

          </form>

          {/* =================================================
              DIVIDER
              ================================================= */}

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-border" />

            <span className="text-sm text-muted-foreground">
              or
            </span>

            <div className="h-px flex-1 bg-border" />

          </div>

          {/* =================================================
              GOOGLE
              ================================================= */}

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isSubmitting}
            className="h-14 w-full rounded-xl bg-background text-base font-semibold hover:bg-muted"
          >
            <FaGoogle className="mr-2 size-5 text-primary" />

            {isGoogleLoading
              ? "Connecting..."
              : "Continue with Google"}
          </Button>

          {/* =================================================
              SIGN UP
              ================================================= */}

          <p className="mt-8 text-center text-sm text-muted-foreground">

            Don&apos;t have an account?{" "}

            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign up now
            </Link>

          </p>

        </div>

      </section>

    </main>
  );
}
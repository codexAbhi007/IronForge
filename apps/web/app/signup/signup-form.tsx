"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

import {
  signUpSchema,
  type SignUpInput,
} from "@iron-forge/validation";

import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const oauthErrorHandled = useRef(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isGoogleLoading, setIsGoogleLoading] =
    useState(false);

  /*
   * =========================================================
   * OAUTH ERROR HANDLING
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
          "Google signup is currently unavailable."
        );
        break;

      case "account_not_linked":
        toast.error(
          "This Google account is already registered. Please log in instead."
        );
        break;

      case "user_already_exists":
        toast.error(
          "An account already exists with this email. Please log in instead."
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
          "Your Google signup session expired. Please try again."
        );
        break;

      default:
        toast.error(
          "Google signup failed. Please try again."
        );
        break;
    }

    router.replace("/signup", {
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
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /*
   * =========================================================
   * EMAIL + PASSWORD SIGNUP
   * =========================================================
   */

  const onSubmit = async (data: SignUpInput) => {
    try {
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log("SIGNUP RESULT:", result);

      if (result.error) {
        console.error(
          "SIGNUP ERROR:",
          result.error
        );

        const code = result.error.code;

        switch (code) {
          case "USER_ALREADY_EXISTS":
          case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
          case "EMAIL_ALREADY_EXISTS":
            toast.error(
              "An account already exists with this email."
            );
            break;

          case "INVALID_EMAIL":
            toast.error(
              "Please enter a valid email address."
            );
            break;

          case "PASSWORD_TOO_SHORT":
            toast.error(
              "Your password is too short."
            );
            break;

          default:
            toast.error(
              result.error.message ||
                "Unable to create your account."
            );
            break;
        }

        return;
      }

      /*
       * Account created successfully.
       *
       * IMPORTANT:
       * Do NOT send the user directly to dashboard.
       * They must complete onboarding first.
       */

      toast.success(
        "Account created successfully!"
      );

      toast.message(
        "Let's set up your Iron Forge profile."
      );

      router.push("/onboarding");
      router.refresh();

    } catch (error) {
      console.error(
        "SIGNUP ERROR:",
        error
      );

      toast.error(
        "Something went wrong while creating your account. Please try again."
      );
    }
  };

  /*
   * =========================================================
   * GOOGLE SIGNUP
   * =========================================================
   */

  const handleGoogleSignup = async () => {
  if (isGoogleLoading || isSubmitting) {
    return;
  }

  setIsGoogleLoading(true);

  try {
    const result = await authClient.signIn.social({
      provider: "google",

      // Existing Google user
      callbackURL: "/dashboard",

      // New Google user
      newUserCallbackURL: "/onboarding",

      // Required because we disabled implicit OAuth signup
      requestSignUp: true,

      // OAuth failure
      errorCallbackURL: "/signup",
    });

    if (result.error) {
      console.error(
        "GOOGLE SIGNUP ERROR:",
        result.error
      );

      toast.error(
        result.error.message ||
          "Google signup failed. Please try again."
      );

      setIsGoogleLoading(false);
    }
  } catch (error) {
    console.error(
      "GOOGLE SIGNUP ERROR:",
      error
    );

    toast.error(
      "Google signup failed. Please try again."
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

        {/* Decorative shapes */}

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
          RIGHT SIGNUP PANEL
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
              Create your account
            </h2>

            <p className="mt-2 text-muted-foreground">
              Start your fitness journey with Iron Forge.
            </p>

          </div>

          {/* =================================================
              EMAIL / PASSWORD SIGNUP
              ================================================= */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <Input
                placeholder="Name"
                autoComplete="name"
                className="h-14 rounded-xl bg-muted/50 px-4 text-base"
                {...register("name")}
              />

              {errors.name && (
                <p className="mt-1.5 text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}

            </div>

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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
                  autoComplete="new-password"
                  className="h-14 rounded-xl bg-muted/50 px-4 pr-12 text-base"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
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

            {/* Confirm password */}

            <div>

              <div className="relative">

                <Input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className="h-14 rounded-xl bg-muted/50 px-4 pr-12 text-base"
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}

            </div>

            {/* Create account */}

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                isGoogleLoading
              }
              className="h-14 w-full rounded-xl text-base font-semibold"
            >
              {isSubmitting
                ? "Creating account..."
                : "Create account"}
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
              GOOGLE SIGNUP
              ================================================= */}

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            disabled={
              isSubmitting ||
              isGoogleLoading
            }
            className="h-14 w-full rounded-xl bg-background text-base font-semibold hover:bg-muted"
          >

            <FaGoogle className="mr-2 size-5 text-primary" />

            {isGoogleLoading
              ? "Connecting..."
              : "Continue with Google"}

          </Button>

          {/* =================================================
              LOGIN LINK
              ================================================= */}

          <p className="mt-8 text-center text-sm text-muted-foreground">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Log in
            </Link>

          </p>

        </div>

      </section>

    </main>
  );
}
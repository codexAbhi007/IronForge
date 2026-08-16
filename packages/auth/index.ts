import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";

import { db } from "@iron-forge/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,

    // Don't allow email/password login
    // until email has been verified.
    requireEmailVerification: true,
  },

  plugins: [
    emailOTP({
      otpLength: 6,

      // 5 minutes
      expiresIn: 300,

      // Send OTP automatically after email/password signup
      sendVerificationOnSignUp: true,

      async sendVerificationOTP({
        email,
        otp,
        type,
      }) {
        console.log(
          "VERIFICATION OTP:",
          email,
          otp,
          type
        );

        // We'll replace this with Resend/email
        // after the verification flow is working.
      },
    }),
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      disableImplicitSignUp: true,
    },
  },
});
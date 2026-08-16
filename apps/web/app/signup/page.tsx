import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import SignUpForm from "./signup-form"

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <SignUpForm />;
}
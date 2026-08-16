import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
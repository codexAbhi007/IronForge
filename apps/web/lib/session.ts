import { headers } from "next/headers";
import { auth } from "@iron-forge/auth";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}
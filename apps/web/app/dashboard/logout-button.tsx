"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Log out
    </Button>
  );
}
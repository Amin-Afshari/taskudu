"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  return (
    <Button variant="link" onClick={() => signOut()}>
      <LogOut />
      Log out
    </Button>
  );
}

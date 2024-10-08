"use client";

import { useAuthContext } from "@/src/context/auth-context";
import { Sidebar } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiLogout } from "react-icons/hi";

export default function SignOutButton() {
  const { handleSignOut } = useAuthContext();
  const router = useRouter();

  // TODO: need to fix this, after signing out refreshes the site properly
  const onSignOut = async () => {
    try {
      await handleSignOut();
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Sidebar.Item
      href="#"
      icon={HiLogout}
      className="flex justify-start"
      onClick={onSignOut}
    >
      Cerrar Sesión
    </Sidebar.Item>
  );
}

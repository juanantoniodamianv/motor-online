"use client";

import { useAuthContext } from "@/src/context/auth-context";
import { Sidebar } from "flowbite-react";
import { HiLogout } from "react-icons/hi";

export default function SignOutButton() {
  const { handleSignOut } = useAuthContext();

  return (
    <Sidebar.Item
      href="#"
      icon={HiLogout}
      className="flex justify-start"
      onClick={handleSignOut}
    >
      Cerrar Sesión
    </Sidebar.Item>
  );
}

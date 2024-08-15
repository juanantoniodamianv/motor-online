"use client";

import { createClient } from "@/src/app/utils/supabase/client";
import { Sidebar } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiLogout } from "react-icons/hi";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

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

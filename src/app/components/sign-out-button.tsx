"use client";

import { createClient } from "@/src/app/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-white text-green-700 w-full py-2 rounded hover:bg-green-700 hover:text-white border hover:border-green-700"
    >
      Sign Out
    </button>
  );
}

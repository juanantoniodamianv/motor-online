import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function Users() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return <p>Users page</p>;
}

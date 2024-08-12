import { redirect } from "next/navigation";

import { createClient } from "@/src/app/utils/supabase/server";

export default async function MyFavorites() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return <p>My favorites page</p>;
}

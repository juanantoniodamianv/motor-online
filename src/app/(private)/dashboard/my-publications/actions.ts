"use client";

import { createClient } from "@/src/app/utils/supabase/client";

export async function updatePublicationStatus(
  id: number,
  status: "active" | "sold" | "draft" | "paused"
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("publications")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

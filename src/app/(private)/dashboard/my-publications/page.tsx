import { redirect } from "next/navigation";
import { HiCollection } from "react-icons/hi";

import { createClient } from "@/src/app/utils/supabase/server";
import PublicationList from "@/src/app/components/publication/list";

export default async function MyPublications() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const userId = data?.user.id;

  const { data: publications, error: publicationsError } = await supabase
    .from("publications")
    .select(
      "*, vehicle_categories (name), vehicle_makes (name), vehicle_models (name), vehicle_versions (name)"
    )
    .order("status", {
      referencedTable:
        "CASE WHEN status = 'active' THEN 1 WHEN status = 'paused' THEN 2 WHEN status = 'draft' THEN 3 WHEN status = 'sold' THEN 4 ELSE 5 END",
    })
    .eq("user_id", userId);

  // TODO: handle publicationsError

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiCollection className="inline" /> Mis Publicaciones
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mx-auto max-w-5xl">
          {publications && (
            <PublicationList publications={publications} extended={true} />
          )}
        </div>
      </div>
    </section>
  );
}

import { redirect } from "next/navigation";
import { HiCollection } from "react-icons/hi";

import { createClient } from "@/src/app/utils/supabase/server";
import Publication from "../../components/publication/publication";

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
    .eq("user_id", userId);

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiCollection className="inline" /> Mis Publicaciones
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mx-auto max-w-5xl">
          {publications?.map((publication) => (
            <Publication publication={publication} supabase={supabase} />
          ))}
        </div>
      </div>
    </section>
  );
}

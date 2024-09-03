import { HiCollection } from "react-icons/hi";

import { createClient } from "@/src/app/utils/supabase/server";
import PublicationList from "@/src/app/components/publication/list";

export default async function Home() {
  const supabase = createClient();

  // TODO: handle error
  const { data: publications, error: publicationsError } = await supabase
    .from("publications")
    .select(
      "*, vehicle_categories (name), vehicle_makes (name), vehicle_models (name), vehicle_versions (name)"
    )
    .limit(30);
  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiCollection className="inline" /> Publicado recientemente
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mx-auto max-w-5xl">
          {publications && <PublicationList publications={publications} />}
        </div>
      </div>
    </section>
  );
}

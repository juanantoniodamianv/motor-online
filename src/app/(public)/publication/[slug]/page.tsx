import { Textarea } from "flowbite-react";

import Carousel from "@/src/app/components/publication/carousel";
import PublicationList from "@/src/app/components/publication/list";
import { createClient } from "@/src/app/utils/supabase/client";
import { getFiles, getPublicUrls } from "@/src/app/utils/supabase/storage";

export default async function Publication({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("publications")
    .select(
      "*, vehicle_categories (name), vehicle_makes (name), vehicle_models (name), vehicle_versions (name)"
    )
    .eq("slug_url", slug)
    .limit(1)
    .single();

  if (!data) {
    // TODO: handle error
    return <>Error</>;
  }

  const limit = 10;
  const files = await getFiles(data.id, limit);
  const fileUrls = await getPublicUrls(files);

  const { data: publications, error: publicationsError } = await supabase
    .from("publications")
    .select(
      "*, vehicle_categories (name), vehicle_makes (name), vehicle_models (name), vehicle_versions (name)"
    )
    .limit(10);

  return (
    <section className="mx-auto px-4 bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="grid md:grid-cols-2 gap-8">
        <Carousel fileUrls={fileUrls} />

        {/* Vehicle Details */}
        <div className="space-y-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            {data.title}
          </h1>
          <p className="text-2xl font-semibold text-blue-600">${data.price}</p>
          <div className="space-y-2">
            <p className="text-gray-900 dark:text-white">
              <strong>Marca:</strong> {data.vehicle_makes?.name}
            </p>
            <p className="text-gray-900 dark:text-white">
              <strong>Modelo:</strong> {data.vehicle_models?.name}
            </p>
            <p className="text-gray-900 dark:text-white">
              <strong>Version:</strong> {data.vehicle_versions?.name}
            </p>
            <p className="text-gray-900 dark:text-white">
              <strong>Año:</strong> {data.year}
            </p>
            <p className="text-gray-900 dark:text-white">
              <strong>Kilometraje:</strong> {data.km}
            </p>
          </div>
          <p className="text-gray-900 dark:text-white">{data.description}</p>

          <form
            action=""
            className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
          >
            <h5 className="text-md font-semibold text-gray-900 dark:text-white sm:text-1xl mb-4">
              Contacta al anunciante
            </h5>
            <div className="mb-6 mt-6 grid grid-cols-1">
              <div className="col-span-2 sm:col-span-1">
                <Textarea
                  id="message"
                  name="message"
                  defaultValue={"Hola. ¿Sigue estando disponible?"}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="my-4">
        <h5 className="text-md font-semibold text-gray-900 dark:text-white sm:text-1xl mb-4">
          Otras opciones que te podrían interesar
        </h5>

        <div className="flex flex-wrap gap-4 mx-auto">
          {publications && <PublicationList publications={publications} />}
        </div>
      </div>
    </section>
  );
}

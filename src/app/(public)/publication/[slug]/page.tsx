import Carousel from "@/src/app/components/publication/carousel";
import PublicationList from "@/src/app/components/publication/publication-list";
import { createClient } from "@/src/app/utils/supabase/client";
import DescriptionContactSwitcher from "@/src/app/components/publication/description-contact-switcher";

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

  const { data: publications, error: publicationsError } = await supabase
    .from("publications")
    .select(
      "*, vehicle_categories (name), vehicle_makes (name), vehicle_models (name), vehicle_versions (name)"
    )
    .limit(10);

  return (
    <main className="mx-auto px-4 bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Carousel publicationId={data.id} />
        </div>

        <div>
          <Header title={data.title} price={data.price} />
          <Detail
            make={data.vehicle_makes?.name}
            model={data.vehicle_models?.name}
            version={data.vehicle_versions?.name}
            year={data.year}
            km={data.km}
          />
          <DescriptionContactSwitcher description={data.description} />
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
    </main>
  );
}

function Header({ title, price }: { title: string; price: number | null }) {
  return (
    <div>
      <h2 className="text-3xl text-gray-900 dark:text-white font-bold mb-4">
        {title}
      </h2>
      <p className="text-2xl text-blue-400 mb-4">${price}</p>
    </div>
  );
}

function Detail({
  make,
  model,
  version,
  year,
  km,
}: {
  make?: string;
  model?: string | null;
  version?: string;
  year: number | null;
  km: number | null;
}) {
  return (
    <div className="bg-white dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-4">
      <ul className="space-y-2">
        <li>
          <span className="font-semibold text-gray-900 dark:text-white">
            Marca:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">{make}</span>
        </li>
        <li>
          <span className="font-semibold text-gray-900 dark:text-white">
            Modelo:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">{model}</span>
        </li>
        <li>
          <span className="font-semibold text-gray-900 dark:text-white">
            Version:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">{version}</span>
        </li>
        <li>
          <span className="font-semibold text-gray-900 dark:text-white">
            Año:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">{year}</span>
        </li>
        <li>
          <span className="font-semibold text-gray-900 dark:text-white">
            Kilómetros:
          </span>{" "}
          <span className="text-gray-900 dark:text-white">{km}</span>
        </li>
      </ul>
    </div>
  );
}

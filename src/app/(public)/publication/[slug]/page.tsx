import Carousel from "@/src/app/components/publication/carousel";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Carousel fileUrls={fileUrls} />

        {/* Vehicle Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-2xl font-semibold text-blue-600">${data.price}</p>
          <div className="space-y-2">
            <p>
              <strong>Marca</strong> {data.vehicle_makes?.name}
            </p>
            <p>
              <strong>Modelo</strong> {data.vehicle_models?.name}
            </p>
            <p>
              <strong>Version</strong> {data.vehicle_versions?.name}
            </p>
            <p>
              <strong>Año</strong> {data.year}
            </p>
            <p>
              <strong>Kilometraje</strong> {data.km}
            </p>
          </div>
          <p className="text-gray-600">{data.description}</p>
        </div>
      </div>
    </div>
  );
}

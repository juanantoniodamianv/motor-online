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
    .limit(1);

  if (!data) {
    // TODO: handle error
    return <>Error</>;
  }

  // TODO: retornar un solo registro en lugar de seleccionar la posición 0
  const vehicle = data[0];
  const limit = 10;
  const files = await getFiles(supabase, vehicle.id, limit);
  const fileUrls = await getPublicUrls(supabase, files);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Carousel fileUrls={fileUrls} />

        {/* Vehicle Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{vehicle.title}</h1>
          <p className="text-2xl font-semibold text-blue-600">
            ${vehicle.price}
          </p>
          <div className="space-y-2">
            <p>
              <strong>Marca</strong> {vehicle.vehicle_makes.name}
            </p>
            <p>
              <strong>Modelo</strong> {vehicle.vehicle_models.name}
            </p>
            <p>
              <strong>Version</strong> {vehicle.vehicle_versions.name}
            </p>
            <p>
              <strong>Año</strong> {vehicle.year}
            </p>
            <p>
              <strong>Kilometraje</strong> {vehicle.km}
            </p>
          </div>
          <p className="text-gray-600">{vehicle.description}</p>
        </div>
      </div>
    </div>
  );
}

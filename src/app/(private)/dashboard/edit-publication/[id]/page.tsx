import Breadcrumb, {
  SectionTab,
  TabNames,
} from "@/src/app/components/publication-form/breadcrumb";
import InfoSection from "@/src/app/components/publication-form/info-section";
import LocationSection from "@/src/app/components/publication-form/location-section";
import { createClient } from "@/src/app/utils/supabase/server";

interface Props {
  params: { id: string };
  searchParams: { tab?: string };
}

export default async function PublicationEdit({ params, searchParams }: Props) {
  const activeTab: SectionTab =
    (searchParams.tab as SectionTab) || TabNames.info;

  const supabase = createClient();
  const publication = await supabase
    .from("publications")
    .select("*")
    .eq("id", params.id)
    .limit(1)
    .single();

  const infoSectionDefaultValues: Record<string, string | number> = {};

  if (publication?.data?.title) {
    infoSectionDefaultValues["title"] = publication?.data?.title;
  }

  if (publication?.data?.condition) {
    infoSectionDefaultValues["condition"] = publication?.data?.condition;
  }

  if (publication?.data?.description) {
    infoSectionDefaultValues["description"] = publication?.data?.description;
  }

  if (publication?.data?.year) {
    infoSectionDefaultValues["year"] = publication?.data?.year;
  }

  if (publication?.data?.km) {
    infoSectionDefaultValues["km"] = publication?.data?.km;
  }

  if (publication?.data?.transmision) {
    infoSectionDefaultValues["transmision"] = publication?.data?.transmision;
  }

  if (publication?.data?.engine) {
    infoSectionDefaultValues["engine"] = publication?.data?.engine;
  }

  if (publication?.data?.category) {
    infoSectionDefaultValues["category"] = publication?.data?.category;
  }

  if (publication?.data?.make) {
    infoSectionDefaultValues["make"] = publication?.data?.make;
  }

  if (publication?.data?.model) {
    infoSectionDefaultValues["model"] = publication?.data?.model;
  }

  if (publication?.data?.version) {
    infoSectionDefaultValues["version"] = publication?.data?.version;
  }

  console.log({ publication });

  console.log(publication.data);

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            Editar Publicación
          </h2>

          <div className="grid grid-rows-1 grid-cols-1">
            <Breadcrumb activeTab={activeTab} />

            <div className="flex justify-center min-h-10 mt-6 w-full">
              <form
                // action={createPublication}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                <InfoSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 1}
                  infoSectionDefaultValues={infoSectionDefaultValues}
                />

                <LocationSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 2}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

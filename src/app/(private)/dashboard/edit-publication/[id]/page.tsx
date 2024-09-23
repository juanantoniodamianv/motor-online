import { HiPencilAlt } from "react-icons/hi";

import Breadcrumb, {
  SectionTab,
  TabNames,
} from "@/src/app/components/publication-form/breadcrumb";
import ConfirmSection from "@/src/app/components/publication-form/sections/confirm/confirm-section";
import ImageSection from "@/src/app/components/publication-form/sections/image/image-section";
import InfoSection from "@/src/app/components/publication-form/sections/info/info-section";
import LocationSection from "@/src/app/components/publication-form/sections/location/location-section";
import DoneSection from "@/src/app/components/publication-form/sections/done/done-section";

import { getPublicationValues, updatePublication } from "./actions";

interface Props {
  params: { id: string };
  searchParams: { tab?: string; slug?: string };
}

export default async function PublicationEdit({ params, searchParams }: Props) {
  const activeTab: SectionTab =
    (searchParams.tab as SectionTab) || TabNames.info;
  const slug = searchParams.slug;
  const publicationId = params.id;

  const {
    infoSectionDefaultValues,
    localizationSectionDefaultValues,
    imageSectionDefaultValues,
    confirmSectionDefaultValues,
  } = await getPublicationValues({ publicationId });

  const handleUpdatePublication = async (formData: FormData) => {
    "use server";
    await updatePublication(parseInt(publicationId), formData);
  };

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiPencilAlt className="inline mr-2 inline" /> Editar Publicación
          </h2>

          <div className="grid grid-rows-1 grid-cols-1">
            <Breadcrumb activeTab={activeTab} isClickable={false} />

            <div className="flex justify-center min-h-10 mt-6 w-full">
              <form
                action={handleUpdatePublication}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                <InfoSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 1}
                  infoSectionDefaultValues={infoSectionDefaultValues}
                />

                <LocationSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 2}
                  localizationSectionDefaultValues={
                    localizationSectionDefaultValues
                  }
                />

                <ImageSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 3}
                  imageSectionDefaultValues={imageSectionDefaultValues}
                />

                <ConfirmSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 4}
                  confirmSectionDefaultValues={confirmSectionDefaultValues}
                  labelForward="Guardar"
                />

                <DoneSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 5}
                  slug={slug}
                  label="¡Tu publicación se ha actualizado exitosamente!"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

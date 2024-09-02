import Breadcrumb, {
  SectionTab,
  TabNames,
} from "@/src/app/components/publication-form/breadcrumb";
import ConfirmSection from "@/src/app/components/publication-form/confirm-section";
import ImageSection from "@/src/app/components/publication-form/image-section";
import InfoSection from "@/src/app/components/publication-form/info-section";
import LocationSection from "@/src/app/components/publication-form/location-section";

import { getPublicationValues, updatePublication } from "./actions";

interface Props {
  params: { id: string };
  searchParams: { tab?: string };
}

export default async function PublicationEdit({ params, searchParams }: Props) {
  const activeTab: SectionTab =
    (searchParams.tab as SectionTab) || TabNames.info;

  const {
    infoSectionDefaultValues,
    localizationSectionDefaultValues,
    imageSectionDefaultValues,
    confirmSectionDefaultValues,
  } = await getPublicationValues({ publicationId: params.id });

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
                action={updatePublication}
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
                  labelForward="Guardar cambios"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

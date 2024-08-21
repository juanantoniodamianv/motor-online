import InfoSection from "../../components/publication-form/info-section";
import LocationSection from "../../components/publication-form/location-section";
import ImageSection from "../../components/publication-form/image-section";
import ConfirmSection from "../../components/publication-form/confirm-section";
import DoneSection from "../../components/publication-form/done-section";
import Breadcrumb, {
  SectionTab,
  TabNames,
} from "../../components/publication-form/breadcrumb";
import { createPublication } from "./actions";

interface Props {
  searchParams: { tab?: string };
}

export default function NewPublication({ searchParams }: Props) {
  const activeTab: SectionTab =
    (searchParams.tab as SectionTab) || TabNames.info;
  const publicationId = searchParams.tab;

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            Nueva Publicación
          </h2>

          <div className="grid grid-rows-1 grid-cols-1">
            <Breadcrumb activeTab={activeTab} />

            <div className="flex justify-center min-h-10 mt-6 w-full">
              <form
                action={createPublication}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                <InfoSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 1}
                />

                <LocationSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 2}
                />

                <ImageSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 3}
                />

                <ConfirmSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 4}
                />

                <DoneSection
                  isActiveTab={parseInt(activeTab.split("-")[0]) === 5}
                  publicationId={publicationId}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { HiPencilAlt } from "react-icons/hi";

import ConfirmSection from "@/src/app/components/publication-form/sections/confirm/confirm-section";
import ImageSection from "@/src/app/components/publication-form/sections/image/image-section";
import InfoSection from "@/src/app/components/publication-form/sections/info/info-section";
import LocationSection from "@/src/app/components/publication-form/sections/location/location-section";
import DoneSection from "@/src/app/components/publication-form/sections/done/done-section";
import Breadcrumb, {
  SectionTab,
  TabNames,
} from "@/src/app/components/publication-form/breadcrumb";
import { createPublication } from "./actions";

interface Props {
  searchParams: { tab?: string; slug?: string };
}

export default function NewPublication({ searchParams }: Props) {
  const activeTab: SectionTab =
    (searchParams.tab as SectionTab) || TabNames.info;
  const slug = searchParams.slug;

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiPencilAlt className="inline mr-2" />
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
                  slug={slug}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

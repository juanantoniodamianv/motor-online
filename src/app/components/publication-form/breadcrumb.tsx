import Link from "next/link";
import { IconType } from "react-icons";
import {
  HiInformationCircle,
  HiLocationMarker,
  HiOutlineCheckCircle,
  HiOutlineDocumentSearch,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

type Section = {
  key: SectionTab;
  active: boolean;
  href: string;
  icon: IconType;
  last?: boolean;
  title: string;
};

export enum TabNames {
  info = "1-info",
  location = "2-location",
  media = "3-media",
  confirm = "4-confirm",
  done = "5-done",
}

export type SectionTab =
  | TabNames.info
  | TabNames.location
  | TabNames.media
  | TabNames.confirm
  | TabNames.done;

type BreadcrumbProps = {
  activeTab: SectionTab;
  isClickable: boolean;
};

export default function Breadcrumb({
  activeTab,
  isClickable,
}: BreadcrumbProps) {
  const sections: Section[] = [
    {
      key: TabNames.info,
      active: parseInt(activeTab.split("-")[0]) >= 1,
      href: "?tab=1-info",
      icon: HiInformationCircle,
      title: "Información básica",
    },
    {
      key: TabNames.location,
      active: parseInt(activeTab.split("-")[0]) >= 2,
      href: "?tab=2-location",
      icon: HiLocationMarker,
      title: "Localización",
    },
    {
      key: TabNames.media,
      active: parseInt(activeTab.split("-")[0]) >= 3,
      href: "?tab=3-media",
      icon: HiOutlinePhotograph,
      title: "Adjuntar imágenes",
    },
    {
      key: TabNames.confirm,
      active: parseInt(activeTab.split("-")[0]) >= 4,
      href: "?tab=4-confirm",
      icon: HiOutlineDocumentSearch,
      title: "Confirmar datos",
    },
    {
      key: TabNames.done,
      active: parseInt(activeTab.split("-")[0]) >= 5,
      href: "?tab=5-done",
      icon: HiOutlineCheckCircle,
      title: "Publicación enviada",
      last: true,
    },
  ];
  return (
    <ol className="flex items-center w-full justify-center">
      {sections.map((section) => (
        <li
          key={section.key}
          className={twMerge(
            (section?.last && "flex-item-center") ||
              "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700",
            section.active &&
              "text-blue-600 dark:text-blue-500 after:border-blue-100 dark:after:border-blue-800"
          )}
        >
          {isClickable ? (
            <Link href={section.href} title={section.title}>
              <span
                className={twMerge(
                  "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0",
                  section.active && "dark:bg-blue-800 "
                )}
              >
                <section.icon />
              </span>
            </Link>
          ) : (
            <span
              className={twMerge(
                "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0",
                section.active && "dark:bg-blue-800 "
              )}
            >
              <section.icon />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

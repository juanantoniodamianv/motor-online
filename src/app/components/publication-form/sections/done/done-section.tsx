import Link from "next/link";
import { type SectionProps } from "@/src/app/components/publication-form/types";

type DoneSectionProps = SectionProps & {
  slug?: string;
  label?: string;
};

export default function DoneSection({
  isActiveTab,
  slug,
  label = "¡Tu publicación se ha creado exitosamente!",
}: DoneSectionProps) {
  return (
    <div id="done-section" className={isActiveTab ? "block" : "hidden"}>
      <p className="text-gray-900 dark:text-white mb-6 text-center">{label}</p>

      <div className="mb-6 flex justify-center">
        <Link
          className="text-green-700 hover:text-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-green-400 dark:hover:text-green-500 dark:focus:ring-green-900"
          href={`/publication/${slug}`}
        >
          Ver publicación
        </Link>

        <Link
          className="text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800"
          href="/dashboard/new-publication"
        >
          Nueva publicación
        </Link>
      </div>
    </div>
  );
}

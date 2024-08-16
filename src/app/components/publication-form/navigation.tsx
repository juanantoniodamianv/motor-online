import Link from "next/link";

type NavigationProps = {
  hrefCancel: string;
  hrefBack?: string;
  labelBack?: string;
  hrefForward: string;
  labelForward: string;
  submit?: boolean;
};

export default function Navigation({
  hrefCancel,
  hrefBack,
  labelBack,
  hrefForward,
  labelForward,
  submit,
}: NavigationProps) {
  return (
    <div className="mb-6 flex justify-between">
      <Link
        href={hrefCancel}
        className="text-green-700 hover:text-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-green-400 dark:hover:text-green-500 dark:focus:ring-green-900"
      >
        Cancelar
      </Link>

      <div className="flex space-x-4">
        {hrefBack && (
          <Link
            href={hrefBack}
            className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            {labelBack}
          </Link>
        )}

        {(submit && (
          <button
            type="submit"
            className="text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            {labelForward}
          </button>
        )) || (
          <Link
            href={hrefForward}
            className="text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            {labelForward}
          </Link>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";

type NavigationProps = {
  hrefCancel?: string;
  hrefLeftOption?: string;
  labelLeftOption?: string;
  hrefRightOption?: string;
  labelRightOption?: string;
  submit?: boolean;
};

export default function Navigation({
  hrefCancel,
  hrefLeftOption,
  labelLeftOption,
  hrefRightOption,
  labelRightOption,
  submit,
}: NavigationProps) {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-4">
        {hrefCancel && (
          <Link
            href={hrefCancel}
            className="text-green-700 hover:text-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-green-400 dark:hover:text-green-500 dark:focus:ring-green-900"
            prefetch={false}
          >
            Cancelar
          </Link>
        )}
      </div>

      <div className="flex space-x-4">
        {hrefLeftOption && (
          <Link
            href={hrefLeftOption}
            className="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            prefetch={false}
          >
            {labelLeftOption}
          </Link>
        )}

        {(submit && (
          <button
            type="submit"
            className="text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            {labelRightOption}
          </button>
        )) ||
          (hrefRightOption && (
            <Link
              href={hrefRightOption}
              className="text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800"
              prefetch={false}
            >
              {labelRightOption}
            </Link>
          ))}
      </div>
    </div>
  );
}

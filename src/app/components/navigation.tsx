import Link from "next/link";

type NavigationButtonProps = {
  href?: string;
  label: string;
  disabled?: boolean;
  isSubmit?: boolean;
  variant?: "cancel" | "default" | "submit";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const buttonStyles = {
  cancel:
    "text-green-700 hover:text-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-green-400 dark:hover:text-green-500 dark:focus:ring-green-900",
  default:
    "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
  submit:
    "text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800",
};

const NavigationButton = ({
  href,
  label,
  disabled,
  isSubmit,
  variant = "default",
  onClick,
}: NavigationButtonProps) => {
  if (disabled) return null;

  if (isSubmit) {
    return (
      <button type="submit" className={buttonStyles[variant]}>
        {label}
      </button>
    );
  }

  return href ? (
    <Link
      href={href}
      prefetch={false}
      className={buttonStyles[variant]}
      onClick={onClick}
    >
      {label}
    </Link>
  ) : null;
};

type NavigationProps = {
  hrefCancel?: string;
  hrefLeftOption?: string;
  labelLeftOption?: string;
  leftOptionDisabled?: boolean;
  hrefRightOption?: string;
  labelRightOption?: string;
  rightOptionDisabled?: boolean;
  onClickRightOption?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  submit?: boolean;
};

export default function Navigation({
  hrefCancel,
  hrefLeftOption,
  labelLeftOption,
  leftOptionDisabled,
  hrefRightOption,
  labelRightOption,
  rightOptionDisabled,
  onClickRightOption,
  submit,
}: NavigationProps) {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-4">
        <NavigationButton href={hrefCancel} label="Cancelar" variant="cancel" />
      </div>

      <div className="flex space-x-4">
        <NavigationButton
          href={hrefLeftOption}
          label={labelLeftOption || ""}
          disabled={leftOptionDisabled}
        />
        <NavigationButton
          href={hrefRightOption}
          label={labelRightOption || ""}
          disabled={rightOptionDisabled}
          isSubmit={submit}
          variant="submit"
          onClick={onClickRightOption}
        />
      </div>
    </div>
  );
}

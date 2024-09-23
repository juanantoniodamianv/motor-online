import Link from "next/link";
import { Button, buttonStyles } from "./button";

type NavigationButtonProps = {
  href?: string;
  label: string;
  disabled?: boolean;
  isSubmit?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "link";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const NavigationButton = ({
  href,
  label,
  disabled,
  isSubmit,
  variant = "primary",
  onClick,
}: NavigationButtonProps) => {
  if (disabled) return null;

  if (isSubmit) {
    return (
      <Button type="submit" variant="success">
        {label}
      </Button>
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
        <NavigationButton
          href={hrefCancel}
          label="Cancelar"
          variant="secondary"
        />
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
          variant="primary"
          onClick={onClickRightOption}
        />
      </div>
    </div>
  );
}

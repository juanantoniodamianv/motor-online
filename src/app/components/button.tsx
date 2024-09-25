import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "link";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  formAction?: string | ((formData: FormData) => void);
};

export const buttonStyles = {
  primary:
    "w-full text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800",
  secondary:
    "w-full text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
  danger:
    "w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
  success:
    "w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  warning:
    "w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-800",
  link: "w-full text-green-700 hover:text-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-green-400 dark:hover:text-green-500 dark:focus:ring-green-900",
  disabled:
    "w-full text-gray-400 bg-gray-200 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-500",
};

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
  disabled = false,
  formAction,
}) => {
  const baseStyles = buttonStyles[variant]; // Get the variant's styles
  const disabledStyles = disabled ? buttonStyles.disabled : ""; // Apply disabled styles if necessary

  // Use twMerge to combine the variant and disabled styles
  const classes = twMerge(baseStyles, disabledStyles);

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      formAction={formAction}
    >
      {children}
    </button>
  );
};

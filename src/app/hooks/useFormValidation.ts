// This is a hook to handle client validation form, for new and edit publications
import { useRef, useState } from "react";

export function useFormValidation() {
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const validateSection = () => {
    const inputs = sectionRef.current?.querySelectorAll(
      "input, select, textarea"
    );
    let isValid = true;

    // Reverse inputs in order to show validation errors correctly
    Array.from(inputs || [])
      .reverse()
      .forEach((input) => {
        if (!(input as HTMLFormElement).checkValidity()) {
          isValid = false;
          (input as HTMLFormElement).reportValidity();
        }
      });

    return isValid;
  };

  const handleContinue = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!validateSection()) {
      e.preventDefault();
      setError("Por favor complete todos los campos requeridos.");
    } else {
      setError(null);
    }
  };

  return {
    sectionRef,
    error,
    setError,
    validateSection,
    handleContinue,
  };
}

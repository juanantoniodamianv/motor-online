"use client";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";

type InputNumberProps = {
  label: string;
  name: string;
  defaultValue?: number;
  useThousandSeparator: boolean;
};

export default function InputNumber({
  label,
  name,
  defaultValue,
  useThousandSeparator,
}: InputNumberProps) {
  const [inputValue, setInputValue] = useState<string>(
    defaultValue?.toString() || ""
  );

  const formatWithThousandSeparator = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = useThousandSeparator
      ? formatWithThousandSeparator(e.target.value)
      : e.target.value;
    setInputValue(value);
  };

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        type="text"
        id={name}
        name={name}
        value={inputValue}
        onChange={handleInputChange}
      />
    </>
  );
}

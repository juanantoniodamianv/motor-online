"use client";

import React, { useState } from "react";
import { Checkbox, Label, TextInput } from "flowbite-react";

export default function SwapSection({
  defaultValue,
}: {
  defaultValue?: boolean;
}) {
  const [isSwapChecked, setIsSwapChecked] = useState(defaultValue);

  const handleSwapCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSwapChecked(e.target.checked);
  };

  return (
    <div className="mb-6 grid grid-cols-1">
      <div className="col-span-2 sm:col-span-1">
        <div className="mb-1">
          <Checkbox
            id="swap"
            name="swap"
            checked={isSwapChecked}
            onChange={handleSwapCheckboxChange}
          />{" "}
          <Label htmlFor="swap">Acepta permuta</Label>
        </div>
        <TextInput
          type="text"
          name="swapDescription"
          id="swapDescription"
          disabled={!isSwapChecked}
          placeholder={
            isSwapChecked
              ? "Acepto vehículo de menor valor, modelo 2019 en adelante"
              : ""
          }
        />
        {isSwapChecked && (
          <Label
            htmlFor="swapDescription"
            className="text-xs font-thin text-gray-900 dark:text-white"
          >
            Especificar permuta
          </Label>
        )}
      </div>
    </div>
  );
}

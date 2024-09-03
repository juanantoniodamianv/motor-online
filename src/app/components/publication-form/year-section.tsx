"use client";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";

type YearSectionProps = {
  year?: number;
};

// TODO: Creo que este componente lo podemos exportar como uno generico para todos los campos que necesiten formatear numeros.
export default function YearSection({ year }: YearSectionProps) {
  const [formattedYear, setFormattedYear] = useState<string>(
    year?.toString() || ""
  );

  const formatNumber = (value: string) => {
    // Elimina cualquier carácter que no sea un dígito
    const cleanedValue = value.replace(/\D/g, "");

    // Aplica el formato de miles
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(e.target.value);
    setFormattedYear(formattedValue);
  };

  return (
    <div className="mb-6 grid grid-cols-1">
      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="year">Año / Modelo</Label>
        <TextInput
          type="text"
          id="year"
          name="year"
          value={formattedYear}
          onChange={handleYearChange}
        />
      </div>
    </div>
  );
}

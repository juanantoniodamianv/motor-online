"use client";
import { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';

type KmSectionProps = {
  km?: number;
};

export default function KmSection({ km }: KmSectionProps) {
  const [formattedKm, setFormattedKm] = useState<string>(km?.toString() || '');

  const formatNumber = (value: string) => {
    // Elimina cualquier carácter que no sea un dígito
    const cleanedValue = value.replace(/\D/g, '');

    // Aplica el formato de miles
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(e.target.value);
    setFormattedKm(formattedValue);
  };

  return (
    <div className="mb-6 grid grid-cols-1">
      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="km">Kilometros</Label>
        <TextInput
          type="text"
          id="km"
          name="km"
          value={formattedKm}
          onChange={handleKmChange}
        />
      </div>
    </div>
  );
}

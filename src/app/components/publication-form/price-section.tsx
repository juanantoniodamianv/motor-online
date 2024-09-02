"use client";
import { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';

type PriceSectionProps = {
  price?: number;
};

export default function PriceSection({ price }: PriceSectionProps) {
  const [formattedPrice, setFormattedPrice] = useState<string>(price?.toString() || '');

  const formatNumber = (value: string) => {
    // Elimina cualquier carácter que no sea un dígito
    const cleanedValue = value.replace(/\D/g, '');

    // Aplica el formato de miles
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(e.target.value);
    setFormattedPrice(formattedValue);
  };

  return (
    <div className="mb-6 grid grid-cols-1">
      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="price">Precio / Valor</Label>
        <TextInput
          type="text"
          id="price"
          name="price"
          value={formattedPrice}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
}

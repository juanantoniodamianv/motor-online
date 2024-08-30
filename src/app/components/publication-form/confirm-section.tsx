import { Checkbox, Label, Radio, TextInput } from "flowbite-react";
import Navigation from "./navigation";
import SwapSection from "./swap-section";
import { type SectionProps } from "./types";

type ConfirmSectionDefaultValuesProps = {
  currency_type?: string;
  price?: number;
  market_discount?: boolean;
  unique_owner?: boolean;
  swap?: boolean;
};

type ConfirmSectionProps = SectionProps & {
  confirmSectionDefaultValues?: ConfirmSectionDefaultValuesProps;
};

export default function ConfirmSection({
  isActiveTab,
  confirmSectionDefaultValues,
}: ConfirmSectionProps) {
  return (
    <div id="confirm-section" className={isActiveTab ? "block" : "hidden"}>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label>Moneda (*)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Radio
              id="ars"
              name="currency_type"
              value="ars"
              defaultChecked={
                confirmSectionDefaultValues?.currency_type === "ars"
              }
              required
            />
            <Label htmlFor="ars">ARS$</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Radio
              id="usd"
              name="currency_type"
              value="usd"
              defaultChecked={
                confirmSectionDefaultValues?.currency_type === "usd"
              }
              required
            />
            <Label htmlFor="usd">USD$</Label>
          </div>
        </div>

        <div>
          <Label htmlFor="price">Precio</Label>
          <TextInput
            type="number"
            id="price"
            name="price"
            className="w-full"
            defaultValue={confirmSectionDefaultValues?.price}
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Checkbox
            id="market_discount"
            name="market_discount"
            defaultChecked={confirmSectionDefaultValues?.market_discount}
          />{" "}
          <Label htmlFor="market_discount">Precio bajo info</Label>
          <p className="text-xs font-thin text-gray-900 dark:text-white">
            (Indicar que el precio esta por debajo del valor del mercado)
          </p>
        </div>
      </div>

      <SwapSection defaultValue={confirmSectionDefaultValues?.swap} />

      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Checkbox
            id="unique_owner"
            name="unique_owner"
            defaultChecked={confirmSectionDefaultValues?.unique_owner}
          />{" "}
          <Label htmlFor="unique_owner">Único dueño</Label>
        </div>
      </div>

      <Navigation
        hrefCancel="/dashboard"
        hrefBack="?tab=3-media"
        labelBack="Atrás"
        hrefForward="?tab=5-done"
        labelForward="Crear publicación"
        submit={true}
      />
    </div>
  );
}

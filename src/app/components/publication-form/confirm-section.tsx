import { Checkbox, Label, Radio, TextInput } from "flowbite-react";
import Navigation from "./navigation";
import SwapSection from "./swap-section";
import { type SectionProps } from "./types";

export default function ConfirmSection({ isActiveTab }: SectionProps) {
  return (
    <div id="confirm-section" className={isActiveTab ? "block" : "hidden"}>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label>Moneda (*)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Radio id="ars" name="currency" required />
            <Label htmlFor="ars">ARS$</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Radio id="usd" name="currency" required />
            <Label htmlFor="usd">USD$</Label>
          </div>
        </div>

        <div>
          <Label htmlFor="price">Precio</Label>
          <TextInput type="number" id="price" name="price" className="w-full" />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Checkbox id="marketDiscount" name="marketDiscount" />{" "}
          <Label htmlFor="marketDiscount">Precio bajo info</Label>
          <p className="text-xs font-thin text-gray-900 dark:text-white">
            (Indicar que el precio esta por debajo del valor del mercado)
          </p>
        </div>
      </div>

      <SwapSection />

      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Checkbox id="uniqueOwner" name="uniqueOwner" />{" "}
          <Label htmlFor="uniqueOwner">Único dueño</Label>
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

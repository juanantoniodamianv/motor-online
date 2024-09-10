import { Label, Radio } from "flowbite-react";
import { redirect } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";

import Navigation from "../navigation";
import InputNumber from "../form/input-number";
import VehicleSelector from "../publication-form/sections/info/vehicle-selector";

// TOOD: a pesar de que se esta importando como modulo, esto no se esta aplicando
//import styles from "./filter.module.css";

const CURRENCY = {
  ARS: "ars",
  USD: "usd",
};

export default function PublicationsFilter() {
  async function submit(formData: FormData) {
    "use server";

    const category = formData.get("category");
    const make = formData.get("make");
    const model = formData.get("model");
    const yearFrom = formData.get("yearFrom");
    const yearTo = formData.get("yearTo");
    const currencyType = formData.get("currencyType") || CURRENCY.ARS;
    const priceFrom = formData.get("priceFrom");
    const priceTo = formData.get("priceTo");

    const queryParams = new URLSearchParams();

    if (category) queryParams.append("category", String(category));
    if (make) queryParams.append("make", String(make));
    if (model) queryParams.append("model", String(model));
    if (yearFrom) queryParams.append("yearFrom", String(yearFrom));
    if (yearTo) queryParams.append("yearTo", String(yearTo));
    if (currencyType) queryParams.append("currencyType", String(currencyType));
    if (priceFrom) queryParams.append("priceFrom", String(priceFrom));
    if (priceTo) queryParams.append("priceTo", String(priceTo));

    const redirectUrl = `/?${queryParams.toString()}`;

    redirect(redirectUrl);
  }

  return (
    <form
      action={submit}
      className="mx-auto max-w-5xl w-full mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
    >
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiOutlineSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar vehículos por marca, modelo y más..."
          />
          <button
            type="submit"
            className="absolute end-2.5 bottom-2.5 text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800 px-4 py-2"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <input type="checkbox" id="toggle" className="hidden peer" />
        <label
          htmlFor="toggle"
          className="mb-4 label-text cursor-pointer text-green-700 hover:text-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:text-green-400 dark:hover:text-green-500 dark:focus:ring-green-900"
        >
          Mostrar/Ocultar opciones de búsqueda
        </label>

        <div className="peer-checked:block hidden">
          <VehicleSelector showVersionSelector={false} />

          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid grid-cols-1">
              <InputNumber
                name="yearFrom"
                label="Año Desde"
                useThousandSeparator={false}
              />
            </div>
            <div className="grid grid-cols-1">
              <InputNumber
                name="yearTo"
                label="Año Hasta"
                useThousandSeparator={false}
              />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label>Moneda (*)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio id="ars" name="currencyType" value="ars" required />
                <Label htmlFor="ars">ARS$</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio id="usd" name="currencyType" value="usd" required />
                <Label htmlFor="usd">USD$</Label>
              </div>
            </div>

            <div className="grid grid-cols-1">
              <InputNumber
                name="priceFrom"
                label="Precio Desde"
                useThousandSeparator={true}
              />
            </div>

            <div className="grid grid-cols-1">
              <InputNumber
                name="priceTo"
                label="Precio Hasta"
                useThousandSeparator={true}
              />
            </div>
          </div>

          <Navigation
            hrefLeftOption="/"
            labelLeftOption="Limpiar"
            labelRightOption="Filtrar"
            submit={true}
          />
        </div>
      </div>
    </form>
  );
}

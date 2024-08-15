import {
  Button,
  Checkbox,
  Label,
  Radio,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import {
  HiInformationCircle,
  HiLocationMarker,
  HiOutlineCheckCircle,
  HiOutlineDocumentSearch,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { IconType } from "react-icons";

import VehicleSelector from "@/src/app/components/publication-form/vehicle-selector";
import LocalizationSelector from "@/src/app/components/publication-form/localization-selector";
import SwapSection from "@/src/app/components/publication-form/swap-section";
import { notFound } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  searchParams: { tab?: string };
}

type Section = {
  key: string;
  active: boolean;
  href: string;
  icon: IconType;
  last?: boolean;
};

export default function NewPublication({ searchParams }: Props) {
  const activeTab = searchParams.tab || "1-info";

  const sections: Section[] = [
    {
      key: "1-info",
      active: parseInt(activeTab.split("-")[0]) >= 1,
      href: "?tab=1-info",
      icon: HiInformationCircle,
    },
    {
      key: "2-location",
      active: parseInt(activeTab.split("-")[0]) >= 2,
      href: "?tab=2-location",
      icon: HiLocationMarker,
    },
    {
      key: "3-media",
      active: parseInt(activeTab.split("-")[0]) >= 3,
      href: "?tab=3-media",
      icon: HiOutlinePhotograph,
    },
    {
      key: "4-confirm",
      active: parseInt(activeTab.split("-")[0]) >= 4,
      href: "?tab=4-confirm",
      icon: HiOutlineDocumentSearch,
    },
    {
      key: "5-done",
      active: parseInt(activeTab.split("-")[0]) >= 5,
      href: "?tab=5-done",
      icon: HiOutlineCheckCircle,
      last: true,
    },
  ];

  async function createPublication(formData: FormData) {
    "use server";
    const rawFormData = {
      category: formData.get("category"),
      city: formData.get("city"),
      condition: formData.get("condition"),
      currency: formData.get("currency"),
      description: formData.get("description"),
      engine: formData.get("engine"),
      km: formData.get("km"),
      make: formData.get("make"),
      marketDiscount: formData.get("marketDiscount"),
      model: formData.get("model"),
      price: formData.get("price"),
      province: formData.get("province"),
      swap: formData.get("swap"),
      swapDescription: formData.get("swapDescription"),
      title: formData.get("title"),
      transmision: formData.get("transmision"),
      uniqueOwner: formData.get("uniqueOwner"),
      version: formData.get("version"),
      year: formData.get("year"),
    };

    console.log({ rawFormData });

    // mutate data
    // revalidate cache
  }

  return (
    <section className="bg-white h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            Nueva Publicación
          </h2>

          <div className="grid grid-rows-1 grid-cols-1">
            <ol className="flex items-center w-full justify-center">
              {sections.map((section) => (
                <li
                  key={section.key}
                  className={twMerge(
                    (section?.last && "flex-item-center") ||
                      "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700",
                    section.active &&
                      "text-blue-600 dark:text-blue-500 after:border-blue-100 dark:after:border-blue-800"
                  )}
                >
                  <Link href={section.href}>
                    <span
                      className={twMerge(
                        "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0",
                        section.active && "dark:bg-blue-800 "
                      )}
                    >
                      <section.icon />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <div className="flex justify-center min-h-10	 mt-6 w-full">
              <form
                action={createPublication}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                {activeTab === "1-info" && (
                  <div id="info-section">
                    <div className="mb-6 grid grid-cols-1">
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="title">
                          Título de la publicación (*)
                        </Label>
                        <TextInput id="title" name="title" required />
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-6 gap-4">
                      <div className="col-span-2 sm:col-span-2">
                        <Label>Condición (*)</Label>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="used">Usado </Label>
                        <Radio id="used" name="condition" required />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="new">Nuevo </Label>
                        <Radio id="new" name="condition" required />
                      </div>
                    </div>

                    <VehicleSelector />

                    <div className="mb-6 grid grid-cols-1">
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="description">Descripción (*)</Label>
                        <Textarea
                          id="description"
                          name="description"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1">
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="year">Año / Modelo</Label>
                        <TextInput type="number" id="year" name="year" />
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1">
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="km">Km.</Label>
                        <TextInput type="number" id="km" name="km" />
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1">
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="transmision">Transmisión</Label>
                        <Select id="transmision" name="transmision">
                          <option value="manual" key="manual">
                            Manual
                          </option>
                          <option value="automatica" key="automatica">
                            Automática
                          </option>
                        </Select>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1">
                      <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="engine">Motor</Label>
                        <TextInput
                          id="engine"
                          name="engine"
                          placeholder="2.0 turbo"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Section */}
                {activeTab === "2-location" && (
                  <div id="localization-section">
                    <LocalizationSelector />
                  </div>
                )}

                {/* Image section */}
                {activeTab === "3-media" && <div id="media-section">Media</div>}

                {/* Confirm Section */}
                {activeTab === "4-confirm" && (
                  <div id="confirm-section">
                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Label>Moneda (*)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Radio id="ars" name="currency" required />
                          <Label htmlFor="ars">ARS$ </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Radio id="usd" name="currency" required />
                          <Label htmlFor="usd">USD$ </Label>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="price">Precio</Label>
                        <TextInput
                          type="number"
                          id="price"
                          name="price"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1">
                      <div className="col-span-2 sm:col-span-1">
                        <Checkbox id="marketDiscount" name="marketDiscount" />{" "}
                        <Label htmlFor="marketDiscount">Precio bajo info</Label>
                        <p className="text-xs font-thin text-gray-900 dark:text-white">
                          (Indicar que el precio esta por debajo del valor del
                          mercado)
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
                  </div>
                )}

                {activeTab === "5-done" && <div id="done-section">Done!</div>}

                <div className="mb-6 grid grid-cols-4 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <Button type="button" color="gray">
                      Cancelar
                    </Button>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Button type="submit">Continuar</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

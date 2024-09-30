"use client";

import { Label, Radio, Select, Textarea, TextInput } from "flowbite-react";

import InputNumber from "@/src/app/components/form/input-number";
import Navigation from "@/src/app/components/navigation";
import VehicleSelector from "@/src/app/components/publication-form/sections/info/vehicle-selector";
import { useFormValidation } from "@/src/app/hooks/useFormValidation";

import { type SectionProps } from "@/src/app/components/publication-form/types";

type InfoSectionDefaultValuesProps = {
  title?: string;
  condition?: string;
  description?: string;
  year?: number;
  km?: number;
  transmision?: string;
  engine?: string;
  category?: number;
  make?: number;
  model?: number;
  version?: number;
};

type InfoSectionProps = SectionProps & {
  infoSectionDefaultValues?: InfoSectionDefaultValuesProps;
};

export default function InfoSection({
  isActiveTab,
  infoSectionDefaultValues,
}: InfoSectionProps) {
  const { sectionRef, error, handleContinue } = useFormValidation();

  return (
    <div
      id="info-section"
      className={isActiveTab ? "block" : "hidden"}
      ref={sectionRef}
    >
      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="title">Título de la publicación (*)</Label>
          <TextInput
            id="title"
            name="title"
            defaultValue={infoSectionDefaultValues?.title}
            required
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-6 gap-4">
        <div className="col-span-2 sm:col-span-2">
          <Label>Condición (*)</Label>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="used">Usado </Label>
          <Radio
            id="used"
            value="used"
            name="condition"
            required
            defaultChecked={infoSectionDefaultValues?.condition === "used"}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="new">Nuevo </Label>
          <Radio
            id="new"
            value="new"
            name="condition"
            required
            defaultChecked={infoSectionDefaultValues?.condition === "new"}
          />
        </div>
      </div>

      {/* TODO: todos estos campos son requridos por ahora, luego se agregara un campo custom para los casos faltantes */}
      <VehicleSelector
        category={infoSectionDefaultValues?.category}
        categoryRequired={true}
        make={infoSectionDefaultValues?.make}
        makeRequired={true}
        model={infoSectionDefaultValues?.model}
        modelRequired={true}
        version={infoSectionDefaultValues?.version}
        versionRequired={true}
      />

      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="description">Descripción (*)</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={infoSectionDefaultValues?.description}
            required
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1">
        <InputNumber
          name="year"
          defaultValue={infoSectionDefaultValues?.year}
          label="Año / Modelo"
          useThousandSeparator={false}
        />
      </div>

      <div className="mb-6 grid grid-cols-1">
        <InputNumber
          name="km"
          defaultValue={infoSectionDefaultValues?.km}
          label="Kilometros"
          useThousandSeparator={true}
        />
      </div>

      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="transmision">Transmisión</Label>
          <Select
            id="transmision"
            name="transmision"
            defaultValue={infoSectionDefaultValues?.transmision}
          >
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
            defaultValue={infoSectionDefaultValues?.engine}
          />
        </div>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <Navigation
        hrefCancel="/dashboard"
        hrefRightOption="?tab=2-location"
        labelRightOption="Continuar"
        onClickRightOption={handleContinue}
      />
    </div>
  );
}

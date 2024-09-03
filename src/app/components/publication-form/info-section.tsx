import { Label, Radio, Select, Textarea, TextInput } from "flowbite-react";

import Navigation from "./navigation";
import VehicleSelector from "./vehicle-selector";
import { type SectionProps } from "./types";
import YearSection from "./year-section";
import KmSection from "./km-section";

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
  return (
    <div id="info-section" className={isActiveTab ? "block" : "hidden"}>
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

      <VehicleSelector
        category={infoSectionDefaultValues?.category}
        make={infoSectionDefaultValues?.make}
        model={infoSectionDefaultValues?.model}
        version={infoSectionDefaultValues?.version}
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
        <YearSection/>
      </div>

      <div className="mb-6 grid grid-cols-1">
        <KmSection/>
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

      <Navigation
        hrefCancel="/dashboard"
        hrefForward="?tab=2-location"
        labelForward="Continuar"
      />
    </div>
  );
}

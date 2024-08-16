import { Label, Radio, Select, Textarea, TextInput } from "flowbite-react";

import Navigation from "./navigation";
import VehicleSelector from "./vehicle-selector";
import { type SectionProps } from "./types";

export default function InfoSection({ isActiveTab }: SectionProps) {
  return (
    <div id="info-section" className={isActiveTab ? "block" : "hidden"}>
      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="title">Título de la publicación (*)</Label>
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
          <Textarea id="description" name="description" required />
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
          <TextInput id="engine" name="engine" placeholder="2.0 turbo" />
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

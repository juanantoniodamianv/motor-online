"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label, Select } from "flowbite-react";
import {
  VehicleCategory,
  VehicleMake,
  VehicleModel,
  VehicleVersion,
} from "../../types";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

export default function VehicleDetailSelector({
  vehicleCategories,
  existentSelection,
}: {
  vehicleCategories: VehicleCategory[];
  existentSelection: {
    category?: number;
    make?: number;
    model?: number;
    version?: number;
  };
}) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    existentSelection?.category || null
  );
  const [selectedMake, setSelectedMake] = useState<number | null>(
    existentSelection?.make || null
  );
  const [selectedModel, setSelectedModel] = useState<number | null>(
    existentSelection?.model || null
  );
  const [selectedVersion, setSelectedVersion] = useState<number | null>(
    existentSelection?.version || null
  );

  const handleSelectCategory = (val: number | null) => {
    setSelectedCategory(val);
    setSelectedMake(null);
    setSelectedModel(null);
    setSelectedVersion(null);
  };

  const handleSelectMake = (val: number | null) => {
    setSelectedMake(val);
    setSelectedModel(null);
    setSelectedVersion(null);
  };

  const handleSelectModel = (val: number | null) => {
    setSelectedModel(val);
    setSelectedVersion(null);
  };

  return (
    <>
      <CategorySelector
        categories={vehicleCategories}
        onSelectCategory={(val: number | null) => handleSelectCategory(val)}
        selectedCategory={selectedCategory}
      />
      <MakeSelector
        categoryId={selectedCategory}
        onSelectMake={(val: number | null) => handleSelectMake(val)}
        selectedMake={selectedMake}
      />
      <ModelSelector
        makeId={selectedMake}
        onSelectModel={(val: number | null) => handleSelectModel(val)}
        selectedModel={selectedModel}
      />
      <VersionSelector
        modelId={selectedModel}
        onSelectVersion={setSelectedVersion}
        selectedVersion={selectedVersion}
      />
    </>
  );
}

const CategorySelector = ({
  categories,
  onSelectCategory,
  selectedCategory,
}: {
  categories: VehicleCategory[];
  onSelectCategory: (val: number | null) => void;
  selectedCategory: number | null;
}) => {
  return (
    <div className="mb-6 grid">
      <Label htmlFor="category">Categoria</Label>
      <Select
        id="category"
        name="category"
        onChange={(e) => onSelectCategory(Number(e.target.value) || null)}
        value={selectedCategory?.toString() || ""}
      >
        <option value="">Seleccione una categoría</option>
        {categories &&
          categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
      </Select>
    </div>
  );
};

const MakeSelector = ({
  categoryId,
  onSelectMake,
  selectedMake,
}: {
  categoryId: number | null;
  onSelectMake: (val: number | null) => void;
  selectedMake: number | null;
}) => {
  const [makes, setMakes] = useState<VehicleMake[]>([]);

  useEffect(() => {
    if (categoryId) {
      const fetchMakes = async () => {
        const { data: models, error: fetchModelsError } = await supabase
          .from("vehicle_models")
          .select("vehicle_make_id")
          .eq("vehicle_category_id", categoryId);

        if (fetchModelsError !== null) {
          // TODO: handle error
          console.log(fetchModelsError);
          return;
        }

        const makeIds = models?.map((model) => model.vehicle_make_id);

        if (!makeIds) {
          return;
        }

        const { data, error } = await supabase
          .from("vehicle_makes")
          .select()
          .in("id", makeIds);

        if (error !== null) {
          // TODO: handle error
          console.log(error);
          return;
        }

        setMakes(data || []);
      };
      fetchMakes();
    }
  }, [categoryId]);

  return (
    <div className="mb-6 grid">
      <Label htmlFor="make">Marca</Label>
      <Select
        id="make"
        name="make"
        onChange={(e) => onSelectMake(Number(e.target.value) || null)}
        value={selectedMake?.toString() || ""}
      >
        <option value="">Seleccione una marca</option>
        {makes &&
          makes.map((make) => (
            <option value={make.id} key={make.id}>
              {make.name}
            </option>
          ))}
      </Select>
    </div>
  );
};

const ModelSelector = ({
  makeId,
  onSelectModel,
  selectedModel,
}: {
  makeId: number | null;
  onSelectModel: (val: number | null) => void;
  selectedModel: number | null;
}) => {
  const [models, setModels] = useState<VehicleModel[]>([]);

  useEffect(() => {
    if (makeId) {
      const fetchModels = async () => {
        const { data, error } = await supabase
          .from("vehicle_models")
          .select()
          .eq("vehicle_make_id", makeId);

        if (error !== null) {
          // TODO: handle error
          console.log(error);
          return;
        }

        setModels(data || []);
      };
      fetchModels();
    }
  }, [makeId]);

  return (
    <div className="mb-6 grid">
      <Label htmlFor="model">Modelo</Label>
      <Select
        id="model"
        name="model"
        onChange={(e) => onSelectModel(Number(e.target.value) || null)}
        value={selectedModel?.toString() || ""}
      >
        <option value="">Seleccione un modelo</option>
        {models &&
          models.map((model) => (
            <option value={model.id} key={model.id}>
              {model.name}
            </option>
          ))}
      </Select>
    </div>
  );
};

const VersionSelector = ({
  modelId,
  onSelectVersion,
  selectedVersion,
}: {
  modelId: number | null;
  onSelectVersion: Dispatch<SetStateAction<number | null>>;
  selectedVersion: number | null;
}) => {
  const [versions, setVersions] = useState<VehicleVersion[]>([]);

  useEffect(() => {
    if (modelId) {
      const fetchVersions = async () => {
        const { data, error } = await supabase
          .from("vehicle_versions")
          .select()
          .eq("vehicle_model_id", modelId);

        if (error !== null) {
          // TODO: handle error
          console.log(error);
          return;
        }

        setVersions(data || []);
      };
      fetchVersions();
    }
  }, [modelId]);

  return (
    <div className="mb-6 grid">
      <Label htmlFor="version">Versión</Label>
      <Select
        id="version"
        name="version"
        onChange={(e) => onSelectVersion(Number(e.target.value) || null)}
        value={selectedVersion?.toString() || ""}
      >
        <option value="">Seleccione una versión</option>
        {versions &&
          versions.map((version) => (
            <option value={version.id} key={version.id}>
              {version.name}
            </option>
          ))}
      </Select>
    </div>
  );
};

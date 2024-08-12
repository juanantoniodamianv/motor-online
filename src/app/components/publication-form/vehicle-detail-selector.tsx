"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  existentSelection?: {
    category: number;
    make: number;
    model: number;
    version: number;
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

  // useEffect(() => {
  //   if (!existentSelection?.category) {
  //     setSelectedModel(null);
  //     setSelectedVersion(null);
  //   }
  // }, [selectedCategory]);

  return (
    <>
      <CategorySelector
        categories={vehicleCategories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <MakeSelector
        categoryId={selectedCategory}
        onSelectMake={setSelectedMake}
        selectedMake={selectedMake}
      />
      <ModelSelector
        makeId={selectedMake}
        onSelectModel={setSelectedModel}
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
  onSelectCategory: Dispatch<SetStateAction<number | null>>;
  selectedCategory: number | null;
}) => {
  return (
    <div className="mb-6 grid">
      <label
        htmlFor="category"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Categoria
      </label>
      <select
        id="category"
        name="category"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        onChange={(e) => onSelectCategory(Number(e.target.value) || null)}
      >
        <option value="">Seleccione una categoría</option>
        {categories &&
          categories.map((category) => (
            <option
              value={category.id}
              key={category.id}
              selected={selectedCategory === category.id}
            >
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
};

const MakeSelector = ({
  categoryId,
  onSelectMake,
  selectedMake,
}: {
  categoryId: number | null;
  onSelectMake: Dispatch<SetStateAction<number | null>>;
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
      <label
        htmlFor="make"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Marca
      </label>
      <select
        id="make"
        name="make"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        onChange={(e) => onSelectMake(Number(e.target.value) || null)}
      >
        <option value="">Seleccione una marca</option>
        {makes &&
          makes.map((make) => (
            <option
              value={make.id}
              key={make.id}
              selected={selectedMake === make.id}
            >
              {make.name}
            </option>
          ))}
      </select>
    </div>
  );
};

const ModelSelector = ({
  makeId,
  onSelectModel,
  selectedModel,
}: {
  makeId: number | null;
  onSelectModel: Dispatch<SetStateAction<number | null>>;
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
      <label
        htmlFor="model"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Modelo
      </label>
      <select
        id="model"
        name="model"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        onChange={(e) => onSelectModel(Number(e.target.value) || null)}
      >
        <option value="">Seleccione un modelo</option>
        {models &&
          models.map((model) => (
            <option
              value={model.id}
              key={model.id}
              selected={selectedModel === model.id}
            >
              {model.name}
            </option>
          ))}
      </select>
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
      <label
        htmlFor="version"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Versión
      </label>
      <select
        id="version"
        name="version"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        onChange={(e) => onSelectVersion(Number(e.target.value) || null)}
      >
        <option value="">Seleccione una versión</option>
        {versions &&
          versions.map((version) => (
            <option
              value={version.id}
              key={version.id}
              selected={selectedVersion === version.id}
            >
              {version.name}
            </option>
          ))}
      </select>
    </div>
  );
};

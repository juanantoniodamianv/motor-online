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
}: {
  vehicleCategories: VehicleCategory[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  return (
    <>
      <CategorySelector
        categories={vehicleCategories}
        onSelectCategory={setSelectedCategory}
      />
      <MakeSelector
        categoryId={selectedCategory}
        onSelectMake={setSelectedMake}
      />
      <ModelSelector makeId={selectedMake} onSelectModel={setSelectedModel} />
      <VersionSelector modelId={selectedModel} />
    </>
  );
}

const CategorySelector = ({
  categories,
  onSelectCategory,
}: {
  categories: VehicleCategory[];
  onSelectCategory: Dispatch<SetStateAction<number | null>>;
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
            <option value={category.id} key={category.id}>
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
}: {
  categoryId: number | null;
  onSelectMake: Dispatch<SetStateAction<number | null>>;
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
            <option value={make.id} key={make.id}>
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
}: {
  makeId: number | null;
  onSelectModel: Dispatch<SetStateAction<number | null>>;
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
            <option value={model.id} key={model.id}>
              {model.name}
            </option>
          ))}
      </select>
    </div>
  );
};

const VersionSelector = ({ modelId }: { modelId: number | null }) => {
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
      >
        <option value="">Seleccione una versión</option>
        {versions &&
          versions.map((version) => (
            <option value={version.id} key={version.id}>
              {version.name}
            </option>
          ))}
      </select>
    </div>
  );
};

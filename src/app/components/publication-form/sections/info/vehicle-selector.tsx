"use client";

import { createClient } from "@/src/app/utils/supabase/client";
import VehicleDetailSelector from "./vehicle-detail-selector";
import { useEffect, useState } from "react";

type VehicleSelectorProps = {
  category?: number;
  categoryRequired?: boolean;
  make?: number;
  makeRequired?: boolean;
  model?: number;
  modelRequired?: boolean;
  version?: number;
  versionRequired?: boolean;
  showVersionSelector?: boolean;
};

export default function VehicleSelector({
  category,
  categoryRequired = false,
  make,
  makeRequired = false,
  model,
  modelRequired = false,
  version,
  versionRequired = false,
  showVersionSelector = true,
}: VehicleSelectorProps) {
  const [vehicleCategories, setVehicleCategories] = useState<
    | {
        created_at: string;
        id: number;
        name: string;
      }[]
    | null
  >(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchVehicleCategories = async () => {
      const { data, error } = await supabase
        .from("vehicle_categories")
        .select();

      if (error) {
        throw error;
      }

      setVehicleCategories(data);
    };

    fetchVehicleCategories();
  }, []);

  const existentSelection = {
    category,
    make,
    model,
    version,
  };

  return (
    <VehicleDetailSelector
      vehicleCategories={vehicleCategories}
      categoryRequired={categoryRequired}
      makeRequired={makeRequired}
      modelRequired={modelRequired}
      versionRequired={versionRequired}
      existentSelection={existentSelection}
      showVersionSelector={showVersionSelector}
    />
  );
}

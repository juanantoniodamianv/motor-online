import { createClient } from "@/src/app/utils/supabase/server";
import VehicleDetailSelector from "./vehicle-detail-selector";

type VehicleSelectorProps = {
  category?: number;
  make?: number;
  model?: number;
  version?: number;
  showVersionSelector?: boolean;
};

export default async function VehicleSelector({
  category,
  make,
  model,
  version,
  showVersionSelector = true,
}: VehicleSelectorProps) {
  const supabase = createClient();
  const { data: vehicleCategories, error } = await supabase
    .from("vehicle_categories")
    .select();

  if (error) {
    throw error;
  }

  const existentSelection = {
    category,
    make,
    model,
    version,
  };

  return (
    <VehicleDetailSelector
      vehicleCategories={vehicleCategories}
      existentSelection={existentSelection}
      showVersionSelector={showVersionSelector}
    />
  );
}

import { createClient } from "@/src/app/utils/supabase/server";
import VehicleDetailSelector from "./vehicle-detail-selector";

export default async function VehicleSelector() {
  const supabase = createClient();
  const { data: vehicleCategories, error } = await supabase
    .from("vehicle_categories")
    .select();

  if (error) {
    throw error;
  }

  const existentSelection = {
    category: 1,
    make: 4,
    model: 35,
    version: 458,
  };

  return (
    <VehicleDetailSelector
      vehicleCategories={vehicleCategories}
      // existentSelection={existentSelection}
    />
  );
}

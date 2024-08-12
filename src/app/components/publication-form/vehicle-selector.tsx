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

  return <VehicleDetailSelector vehicleCategories={vehicleCategories} />;
}

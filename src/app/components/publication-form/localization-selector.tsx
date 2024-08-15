import { createClient } from "@/src/app/utils/supabase/server";
import LocalizationDetailSelector from "@/src/app/components/publication-form/localization-detail-selector";

export default async function LocalizationSelector() {
  const supabase = createClient();
  const { data, error } = await supabase.from("provinces").select();

  if (error) {
    throw error;
  }

  return (
    <LocalizationDetailSelector
      provinces={data}
      //existentSelection={existentSelection}
    />
  );
}

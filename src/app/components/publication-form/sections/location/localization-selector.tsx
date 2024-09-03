import { createClient } from "@/src/app/utils/supabase/server";
import LocalizationDetailSelector from "@/src/app/components/publication-form/sections/location/localization-detail-selector";
import { LocalizationSectionDefaultValuesProps } from "./location-section";

export default async function LocalizationSelector({
  localizationSectionDefaultValues,
}: {
  localizationSectionDefaultValues?: LocalizationSectionDefaultValuesProps;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.from("provinces").select();

  if (error) {
    throw error;
  }

  return (
    <LocalizationDetailSelector
      provinces={data}
      existentSelection={localizationSectionDefaultValues}
    />
  );
}

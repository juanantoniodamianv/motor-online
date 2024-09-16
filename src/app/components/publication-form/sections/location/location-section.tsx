import LocalizationSelector from "./localization-selector";
import Navigation from "@/src/app/components/navigation";
import { type SectionProps } from "@/src/app/components/publication-form/types";

export type LocalizationSectionDefaultValuesProps = {
  province?: number;
  city?: number;
};

type LocationSectionProps = SectionProps & {
  localizationSectionDefaultValues?: LocalizationSectionDefaultValuesProps;
};

export default function LocationSection({
  isActiveTab,
  localizationSectionDefaultValues,
}: LocationSectionProps) {
  return (
    <div id="localization-section" className={isActiveTab ? "block" : "hidden"}>
      <LocalizationSelector
        localizationSectionDefaultValues={localizationSectionDefaultValues}
      />

      <Navigation
        hrefCancel="/dashboard"
        hrefLeftOption="?tab=1-info"
        labelLeftOption="Atrás"
        hrefRightOption="?tab=3-media"
        labelRightOption="Continuar"
      />
    </div>
  );
}

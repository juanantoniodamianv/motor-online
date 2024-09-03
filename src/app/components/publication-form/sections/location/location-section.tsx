import LocalizationSelector from "./localization-selector";
import Navigation from "../../navigation";
import { type SectionProps } from "../../types";

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
        hrefBack="?tab=1-info"
        labelBack="Atrás"
        hrefForward="?tab=3-media"
        labelForward="Continuar"
      />
    </div>
  );
}

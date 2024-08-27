import LocalizationSelector from "./localization-selector";
import Navigation from "./navigation";
import { type SectionProps } from "./types";

export default function LocationSection({ isActiveTab }: SectionProps) {
  return (
    <div id="localization-section" className={isActiveTab ? "block" : "hidden"}>
      <LocalizationSelector />

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

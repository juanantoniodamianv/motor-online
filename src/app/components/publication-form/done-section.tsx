import { type SectionProps } from "./types";

export default function DoneSection({ isActiveTab }: SectionProps) {
  return (
    <div id="done-section" className={isActiveTab ? "block" : "hidden"}>
      Done!
    </div>
  );
}

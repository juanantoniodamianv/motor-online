import type { Publication as PublicationType } from "../../types";
import Publication from "./publication";
import PublicationExtended from "./publication-extended";

type PublicationListProps = {
  publications: PublicationType[];
  extended?: boolean;
};

export default function PublicationList({
  publications,
  extended = false,
}: PublicationListProps) {
  return publications.map((publication) =>
    extended ? (
      <PublicationExtended publication={publication} />
    ) : (
      <Publication publication={publication} />
    )
  );
}

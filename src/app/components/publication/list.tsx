import type { Publication as PublicationType } from "../../types";
import Publication from "./publication";

type PublicationListProps = {
  publications: PublicationType[];
  edit?: boolean;
};

export default function PublicationList({
  publications,
  edit = false,
}: PublicationListProps) {
  return publications.map((publication) => (
    <Publication edit={edit} publication={publication} />
  ));
}

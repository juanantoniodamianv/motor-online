import { SupabaseClient } from "@supabase/supabase-js";
import type { Publication as PublicationType } from "../../types";
import Publication from "./publication";

type PublicationListProps = {
  publications: PublicationType[];
  supabase: SupabaseClient;
  edit: boolean;
};

export default function PublicationList({
  publications,
  supabase,
  edit,
}: PublicationListProps) {
  return publications.map((publication) => (
    <Publication edit={edit} publication={publication} supabase={supabase} />
  ));
}

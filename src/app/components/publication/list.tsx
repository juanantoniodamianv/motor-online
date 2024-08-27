import { SupabaseClient } from "@supabase/supabase-js";
import type { Publication as PublicationType } from "../../types";
import Publication from "./publication";

type PublicationListProps = {
  publications: PublicationType[];
  supabase: SupabaseClient;
};

export default function PublicationList({
  publications,
  supabase,
}: PublicationListProps) {
  return publications.map((publication) => (
    <Publication publication={publication} supabase={supabase} />
  ));
}

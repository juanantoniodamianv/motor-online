import { useEffect, useState } from "react";

import { Publication } from "@/src/app/types";
import { createClient } from "@/src/app/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

type UsePublicationsProps = {
  /**
   * Provide userId if you want to fetch publications by user
   */
  userId?: string;
};

export default function UsePublications({ userId }: UsePublicationsProps): {
  publications: Publication[] | null;
  error: PostgrestError | string | null;
} {
  const supabase = createClient();
  const [error, setError] = useState<PostgrestError | string | null>(null);
  const [publications, setPublications] = useState<Publication[] | null>(null);

  useEffect(() => {
    const fetchPublications = async (userId?: string) => {
      try {
        let query = supabase
          .from("publications")
          .select(
            "*, vehicle_categories (name), vehicle_makes (name), vehicle_models (name), vehicle_versions (name)"
          );

        if (userId) {
          query = query.eq("user_id", userId);
        }

        query = query.order("updated_at", { ascending: false });

        const { data, error } = await query;

        setPublications(data);
        setError(error);
      } catch (error) {
        setError("Something went wrong");
      }
    };

    fetchPublications(userId);
  }, []);

  return { error, publications };
}

import { useEffect, useState } from "react";

import { createClient } from "@/src/app/utils/supabase/client";

interface UseStorageProps {
  publicationId: number;
  limit: number; // Limit of query results, for listing cards limit must be 1
}

export function useStorage({ publicationId, limit }: UseStorageProps) {
  const [error, setError] = useState<string | null | unknown>(null);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const supabaseClient = createClient();

  // Get public url based on publication file
  const getFileUrl = (filePath: string) => {
    const { data } = supabaseClient.storage
      .from("publication_files")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Get files from publication_files table
  const fetchFiles = async () => {
    try {
      const { data, error } = await supabaseClient.storage
        .from("publication_files")
        .list(`${publicationId.toString()}`, {
          limit,
        });

      if (error) {
        setError(error.message);
        return;
      }

      const imagePaths = data.map((file) => `${publicationId}/${file.name}`);

      const fileUrls = await Promise.all(imagePaths.map(getFileUrl));
      setFileUrls(fileUrls);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [publicationId]);

  return { fileUrls, error };
}

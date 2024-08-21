import { SupabaseClient } from "@supabase/supabase-js";

export const uploadFiles = async (
  supabase: SupabaseClient,
  bucket: "publication_files",
  folder: string,
  files: File[]
) => {
  "use server";
  try {
    for (const file of files) {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(`${folder}/${file.name}`, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        continue;
      }
    }
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};

export const getFiles = async (
  supabase: SupabaseClient,
  publicationId: number
) => {
  "use server";
  const { data, error } = await supabase.storage
    .from("publication_files")
    .list(`${publicationId}/`, {
      limit: 10,
    });

  if (error) {
    console.error("Error fetching images:", error.message);
    return [];
  }

  const imagePaths = data.map((file) => `${publicationId}/${file.name}`);

  return imagePaths;
};

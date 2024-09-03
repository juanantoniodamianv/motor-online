import { createClient } from "./server";

export const uploadFiles = async (
  bucket: "publication_files",
  folder: string,
  files: File[]
) => {
  "use server";
  try {
    const supabase = createClient();
    const uploadedFiles = [];

    for (const file of files) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(`${folder}/${file.name}`, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        continue;
      } else {
        uploadedFiles.push(data);
      }
    }

    return uploadedFiles;
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};

export const getFiles = async (publicationId: number, limit: number = 1) => {
  "use server";
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("publication_files")
    .list(`${publicationId.toString()}`, {
      limit,
    });

  if (error) {
    console.error("Error fetching images:", error.message);
    throw error;
  }

  const imagePaths = data.map((file) => `${publicationId}/${file.name}`);

  return imagePaths;
};

export const getPublicUrls = async (files: string[]) => {
  // TODO: probablemente sea mejor "use server" al inicio del documento y no en cada funcion
  "use server";
  let fileUrls = [];

  for (const file of files) {
    const fileUrl = await getPublicUrl(file);
    fileUrls.push(fileUrl);
  }

  return fileUrls;
};

export const getPublicUrl = async (file: string) => {
  "use server";
  const supabase = createClient();
  const { data } = supabase.storage
    .from("publication_files")
    .getPublicUrl(file);

  return data.publicUrl;
};

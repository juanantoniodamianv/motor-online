import { createClient } from "./client";

// TODO: este archivo debe ser indistinto a si se usa supabase storage o aws s3.
// TODO: modificar la politica en supabase en la tabla "publication_files" para que unicamente los usuarios autenticados y propietarios de la publicación (o administradores) tengan acceso a eliminar registros
// TODO: esta funcion necesita mejorar, tal vez usar una transacción aqui. Asegurarse de que el registro en bd se elimine y que el archivo en el storage tambien
export const deleteFileAndRow = async (
  filePublicUrl: string
): Promise<void> => {
  "use client";
  const supabase = createClient();
  // File url example: "https://rshwzlgddvrlluhsagdb.supabase.co/storage/v1/object/public/publication_files/46/Audi_A5_F5_Facelift_Shishi_01_2022-09-20.jpg"
  // This code will extract: "46/Audi_A5_F5_Facelift_Shishi_01_2022-09-20.jpg"
  const match = filePublicUrl.match(/publication_files\/(.+)/);
  const path = match ? match[1] : null;

  if (!path) {
    throw new Error("Not found file path");
  }

  // Remove file from db
  const { error } = await supabase
    .from("publication_files")
    .delete()
    .eq("file_url", path);

  if (error) {
    throw new Error(`Failed to delete row: ${error.message}`);
  }

  // Remove file from supabase storage
  const { error: storageError } = await supabase.storage
    .from("publication_files")
    .remove([path]);

  if (storageError) {
    throw new Error(
      `Failed to delete file from storage: ${storageError.message}`
    );
  }
};

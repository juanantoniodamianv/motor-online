import slugify from "slugify";
import { PublicationInsert } from "@/src/app/types";
import { uploadFiles } from "../../utils/supabase/storage";
import { createClient } from "../../utils/supabase/server";

type PublicationField = {
  field: keyof PublicationInsert;
  required: boolean;
};

export const publicationModel: PublicationField[] = [
  { field: "category", required: true },
  { field: "city", required: false },
  { field: "color", required: false },
  { field: "condition", required: false },
  { field: "created_at", required: false },
  { field: "currency_type", required: false },
  { field: "description", required: true },
  { field: "doors", required: false },
  { field: "engine", required: false },
  { field: "fuel_type", required: false },
  { field: "km", required: false },
  { field: "make", required: true },
  { field: "market_discount", required: false },
  { field: "model", required: true },
  { field: "neiborhood", required: false },
  { field: "owner_phone", required: false },
  { field: "previous_price", required: false },
  { field: "price", required: false },
  { field: "province", required: false },
  { field: "swap", required: false },
  { field: "title", required: true },
  { field: "transmision", required: false },
  { field: "unique_owner", required: false },
  { field: "updated_at", required: false },
  { field: "version", required: true },
  { field: "year", required: false },
];

const generateRandomString = (length = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

export const slugifyAsUrl = (toSlugify: string) => {
  const slug = slugify(toSlugify, { remove: /[*+~.()'"!:@]/g });
  const uniqueSlug = `${slug}-${generateRandomString()}`;

  return uniqueSlug;
};

export const getUser = async () => {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user.user?.id) {
    throw new Error("Error getting user or user not found");
  }

  return user.user;
};

export const getPublication = async (publicationId: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("id", publicationId)
    .limit(1)
    .single();

  if (error) {
    throw new Error("Publication not found");
  }

  return data;
};

export const parseFormData = (
  formData: FormData
): Partial<PublicationInsert> => {
  const rawFormData: Partial<PublicationInsert> = {};

  for (const { field, required } of publicationModel) {
    const value = formData.get(field as string);

    if (required && value === null) {
      throw new Error(`${field} is a required field`);
    } else if (!required && value === "") {
      continue;
    }

    // TODO: check types
    rawFormData[field] = value;
  }

  return rawFormData;
};

export const updatePublicationInDB = async (
  publicationId: number,
  rawFormData: Partial<PublicationInsert>
) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("publications")
    .update(rawFormData)
    .eq("id", publicationId);

  console.log({ publicationId, error });

  if (error) {
    throw new Error(`Failed to update publication: ${error?.message}`);
  }
};

export const createPublicationInDB = async (
  rawFormData: Partial<PublicationInsert>
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("publications")
    .insert(rawFormData)
    .select();

  if (error || !data[0].id) {
    throw new Error(`Failed to create publication: ${error?.message}`);
  }

  return data[0].id;
};

export const handleFileUploads = async (
  publicationId: number,
  formData: FormData
) => {
  const supabase = createClient();
  const files = formData.getAll("files");

  // "application/octet-stream" is not supported
  const fileArray: File[] = files.filter(
    (item): item is File =>
      item instanceof File && item.type !== "application/octet-stream"
  );

  if (fileArray.length > 0) {
    const bucket = "publication_files";
    const folder = publicationId.toString();
    const uploadedFiles = await uploadFiles(
      supabase,
      bucket,
      folder,
      fileArray
    );

    if (uploadedFiles) {
      for (const uploadedFile of uploadedFiles) {
        await supabase.from("publication_files").insert({
          publication: publicationId,
          file_url: uploadedFile.path,
        });
      }
    }
  }
};

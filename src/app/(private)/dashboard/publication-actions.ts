import slugify from "slugify";

import { PublicationInsert } from "@/src/app/types";
import { uploadFiles } from "../../utils/supabase/storage";
import { createClient } from "../../utils/supabase/server";
import { sanitizeValue } from "../../utils/numbers";

type PublicationField = {
  field: keyof PublicationInsert;
  type?: "text" | "number" | "checkbox";
  required: boolean;
};

export const publicationModel: PublicationField[] = [
  { field: "category", type: "number", required: true },
  { field: "city", type: "number", required: false },
  { field: "color", type: "text", required: false },
  { field: "condition", type: "text", required: false },
  { field: "created_at", type: "text", required: false },
  { field: "currency_type", type: "text", required: false },
  { field: "description", type: "text", required: true },
  { field: "doors", type: "number", required: false },
  { field: "engine", type: "text", required: false },
  { field: "fuel_type", type: "text", required: false },
  { field: "km", type: "number", required: false },
  { field: "make", type: "number", required: true },
  { field: "market_discount", type: "checkbox", required: false },
  { field: "model", type: "number", required: true },
  { field: "neiborhood", type: "text", required: false },
  { field: "owner_phone", type: "text", required: false },
  { field: "previous_price", type: "number", required: false },
  { field: "price", type: "number", required: false },
  { field: "province", type: "number", required: false },
  { field: "swap", type: "checkbox", required: false },
  { field: "title", type: "text", required: true },
  { field: "transmision", type: "text", required: false },
  { field: "unique_owner", type: "checkbox", required: false },
  { field: "updated_at", type: "text", required: false },
  { field: "version", type: "number", required: true },
  { field: "year", type: "number", required: false },
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

  for (const { field, required, type } of publicationModel) {
    const value = formData.get(field as string);

    if (required && (value === null || value === "")) {
      throw new Error(`${field} is a required field`);
    }

    // TODO: check types
    if (value !== null) {
      if (type === "number") {
        const sanitizedValue = sanitizeValue(value.toString());
        rawFormData[field] =
          sanitizedValue !== "" ? Number(sanitizedValue) : null;
      } else if (type === "checkbox") {
        rawFormData[field] = value.toString().toLowerCase() === "on";
      } else {
        rawFormData[field] = value.toString();
      }
    }
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
  // TODO: check types
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
    const uploadedFiles = await uploadFiles(bucket, folder, fileArray);

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

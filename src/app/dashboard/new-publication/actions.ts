import { redirect } from "next/navigation";
import slugify from "slugify";
import { Publication } from "../../types";
import { createClient } from "../../utils/supabase/server";
import { uploadFiles } from "../../utils/supabase/storage";

type PublicationField = {
  field: keyof Publication;
  required: boolean;
};

const publicationModel: PublicationField[] = [
  { field: "description", required: true },
  { field: "category", required: true },
  { field: "make", required: true },
  { field: "model", required: true },
  { field: "title", required: true },
  { field: "version", required: true },
  { field: "color", required: false },
  { field: "condition", required: false },
  { field: "created_at", required: false },
  { field: "currency_type", required: false },
  { field: "doors", required: false },
  { field: "engine", required: false },
  { field: "fuel_type", required: false },
  { field: "km", required: false },
  { field: "market_discount", required: false },
  { field: "neiborhood", required: false },
  { field: "owner_phone", required: false },
  { field: "previous_price", required: false },
  { field: "price", required: false },
  { field: "swap", required: false },
  { field: "transmision", required: false },
  { field: "unique_owner", required: false },
  { field: "updated_at", required: false },
  { field: "year", required: false },
];

export async function createPublication(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: user, error: getUserError } = await supabase.auth.getUser();

  if (getUserError !== null) {
    throw new Error("Error getting user");
  }

  if (!user.user?.id) {
    throw new Error("User not found");
  }

  const rawFormData: Partial<Publication> = {
    user_id: user.user.id,
  };

  for (const { field, required } of publicationModel) {
    const value = formData.get(field as string);

    if (required && value === null) {
      throw new Error(`${field} is a required field`);
    } else if (!required && value === "") {
      continue;
    }

    // TODO: check types
    rawFormData[field] = value as string | null;
  }

  if (!rawFormData.title) {
    throw new Error("title is a required field");
  }

  rawFormData.slug_url = slugifyAsUrl(rawFormData.title);

  // TODO: check types
  const { data, error } = await supabase
    .from("publications")
    .insert(rawFormData)
    .select();

  if (error || !data[0].id) {
    throw new Error(`Failed to create publication: ${error?.message}`);
  }

  // Prepare files to upload
  const files = formData.getAll("files");
  const fileArray: File[] = files.filter(
    (item): item is File => item instanceof File
  );
  const publicationId = data[0].id;

  // Upload files
  if (fileArray.length > 0) {
    const bucket = "publication_files";
    const folder = publicationId.toString();
    await uploadFiles(supabase, bucket, folder, fileArray);
  }

  redirect(`?tab=5-done&publication_id=${publicationId}`);
}

function slugifyAsUrl(toSlugify: string, hasConcat?: string) {
  const slugified = slugify(toSlugify, { remove: /[*+~.()'"!:@]/g });
  return hasConcat && typeof hasConcat === "number"
    ? slugified.concat(hasConcat)
    : slugified;
}

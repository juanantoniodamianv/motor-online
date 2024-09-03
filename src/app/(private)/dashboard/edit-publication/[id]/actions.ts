import { redirect } from "next/navigation";

import { createClient } from "@/src/app/utils/supabase/server";
import {
  getPublication,
  getUser,
  handleFileUploads,
  parseFormData,
  slugifyAsUrl,
  updatePublicationInDB,
} from "@/src/app/(private)/dashboard/publication-actions";

export async function getPublicationValues({
  publicationId,
}: {
  publicationId: string;
}) {
  const supabase = createClient();
  const publication = await supabase
    .from("publications")
    .select("*, publication_files (id, file_url)")
    .eq("id", publicationId)
    .limit(1)
    .single();

  const setDefaultValues = (
    keys: string[],
    source: Record<string, any>,
    target: Record<string, any>
  ) => {
    keys.forEach((key) => {
      if (source[key] !== undefined) {
        target[key] = source[key];
      }
    });
  };

  const infoSectionKeys = [
    "title",
    "condition",
    "description",
    "year",
    "km",
    "transmision",
    "engine",
    "category",
    "make",
    "model",
    "version",
  ];

  const localizationSectionKeys = ["province", "city"];

  const confirmSectionKeys = [
    "currency_type",
    "price",
    "market_discount",
    "unique_owner",
    "swap",
  ];

  const infoSectionDefaultValues: Record<string, string | number> = {};
  const localizationSectionDefaultValues: Record<string, string | number> = {};
  const confirmSectionDefaultValues: Record<string, string | number | boolean> =
    {};

  if (publication?.data) {
    setDefaultValues(
      infoSectionKeys,
      publication.data,
      infoSectionDefaultValues
    );
    setDefaultValues(
      localizationSectionKeys,
      publication.data,
      localizationSectionDefaultValues
    );
    setDefaultValues(
      confirmSectionKeys,
      publication.data,
      confirmSectionDefaultValues
    );
  }

  const imageSectionDefaultValues = publication.data?.publication_files;

  return {
    infoSectionDefaultValues,
    localizationSectionDefaultValues,
    imageSectionDefaultValues,
    confirmSectionDefaultValues,
  };
}

export async function updatePublication(
  publicationId: number,
  formData: FormData
) {
  "use server";

  const user = await getUser();
  const publication = await getPublication(publicationId);

  // TODO: check for admin users too
  if (user.id !== publication.user_id) {
    throw new Error("Not allowed to update this publication");
  }

  const rawFormData = parseFormData(formData);

  if (!rawFormData.title) {
    throw new Error("Title is a required field");
  }

  // If title change then update slug
  let slug = publication.slug_url;
  if (rawFormData.title !== publication.title) {
    slug = slugifyAsUrl(rawFormData.title);
    rawFormData.slug_url = slug;
  }

  await updatePublicationInDB(publication.id, rawFormData);

  await handleFileUploads(publicationId, formData);

  redirect(`?tab=5-done&slug=${slug}`);
}

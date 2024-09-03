import { redirect } from "next/navigation";

import {
  createPublicationInDB,
  getUser,
  handleFileUploads,
  parseFormData,
  slugifyAsUrl,
} from "@/src/app/(private)/dashboard/publication-actions";

export async function createPublication(formData: FormData) {
  "use server";

  const user = await getUser();

  const rawFormData = parseFormData(formData);
  rawFormData.user_id = user.id;

  if (!rawFormData.title) {
    throw new Error("Title is a required field");
  }

  rawFormData.slug_url = slugifyAsUrl(rawFormData.title);

  const publicationId = await createPublicationInDB(rawFormData);

  await handleFileUploads(publicationId, formData);

  redirect(`?tab=5-done&slug=${rawFormData.slug_url}`);
}

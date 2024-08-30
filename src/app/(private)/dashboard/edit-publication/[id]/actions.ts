import { createClient } from "@/src/app/utils/supabase/server";

export async function getPublicationValues({
  publicationId,
}: {
  publicationId: string;
}) {
  const supabase = createClient();
  const publication = await supabase
    .from("publications")
    .select("*")
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

  return {
    infoSectionDefaultValues,
    localizationSectionDefaultValues,
    confirmSectionDefaultValues,
  };
}

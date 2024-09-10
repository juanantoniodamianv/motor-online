import { HiCollection } from "react-icons/hi";

import { createClient } from "@/src/app/utils/supabase/server";
import PublicationList from "@/src/app/components/publication/list";
import PublicationsFilter from "../components/filter/filter";

interface Props {
  searchParams: {
    limit?: string;
    category?: string;
    make?: string;
    model?: string;
    yearFrom?: string;
    yearTo?: string;
    currencyType?: string;
    priceFrom?: string;
    priceTo?: string;
  };
}

const CURRENCY = {
  ARS: "ars",
  USD: "usd",
};

const DEFAULT_LIMIT_OF_RECORDS = "10";

export default async function Home({ searchParams }: Props) {
  const supabase = createClient();

  const limit = parseInt(searchParams.limit || DEFAULT_LIMIT_OF_RECORDS);
  const category = searchParams.category;
  const make = searchParams.make;
  const model = searchParams.model;
  const yearFrom = searchParams.yearFrom;
  const yearTo = searchParams.yearTo;
  const currencyType = searchParams.currencyType || CURRENCY.ARS;
  const priceFrom = searchParams.priceFrom;
  const priceTo = searchParams.yearTo;

  // TODO: handle error
  let query = supabase
    .from("publications")
    .select(
      "*, vehicle_categories (name), vehicle_makes (name), vehicle_models (name), vehicle_versions (name)"
    )
    .limit(limit);

  if (category) {
    query = query.eq("category", category);
  }

  if (make) {
    query = query.eq("make", make);
  }

  if (model) {
    query = query.eq("model", model);
  }

  if (yearFrom) {
    query = query.gte("year", yearFrom);
  }

  if (yearTo) {
    query = query.lte("year", yearTo);
  }

  if (priceFrom && parseInt(priceFrom) > 0) {
    query = query.gte("price", parseInt(priceFrom));
  }

  if (priceTo && parseInt(priceTo) > 0) {
    query = query.lte("price", parseInt(priceTo));
  }

  // Set currency when price filtering
  if (priceFrom || priceTo) {
    query = query.eq("currency_type", currencyType);
  }

  const { data: publications, error: publicationsError } = await query;

  console.log({ publicationsError });

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiCollection className="inline" /> Publicado recientemente
          </h2>
        </div>

        <PublicationsFilter />

        <div className="flex flex-wrap gap-4 mx-auto max-w-5xl">
          {publications && <PublicationList publications={publications} />}
        </div>
      </div>
    </section>
  );
}

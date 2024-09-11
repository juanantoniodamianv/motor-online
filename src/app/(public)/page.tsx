// TODO: hay mucha logica (publication 'fetches') que deberiamos moverla de aqui, ya que sera necesario utilizarla en otras secciones, no unicamente en Home.

import { HiCollection } from "react-icons/hi";

import { createClient } from "@/src/app/utils/supabase/server";
import PublicationList from "@/src/app/components/publication/list";
import PublicationsFilter from "@/src/app/components/filter/filter";
import Navigation from "@/src/app/components/navigation";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
    search?: string;
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

const DEFAULT_LIMIT_OF_RECORDS = 10;

export default async function Home({ searchParams }: Props) {
  const supabase = createClient();

  const limit = parseInt(
    searchParams.limit || DEFAULT_LIMIT_OF_RECORDS.toString()
  );
  const page = parseInt(searchParams.page || "0");
  const offset = page * limit;

  // Get publications, filters are applied below
  let query = supabase
    .from("publications")
    .select(
      "*, vehicle_categories!inner(*), vehicle_makes!inner(*), vehicle_models!inner(*), vehicle_versions!inner(*)"
    )
    .range(offset, offset + limit - 1);

  // Total count query to show/hide pagination buttons
  let countQuery = supabase
    .from("publications")
    .select(
      "*, vehicle_categories!inner(*), vehicle_makes!inner(*), vehicle_models!inner(*), vehicle_versions!inner(*)",
      { count: "exact", head: true }
    );

  // To keep parameters when paginating
  const queryParams = new URLSearchParams();

  const search = searchParams.search;
  if (search) {
    // Filter by search box
    query = query.or(`title.ilike.%${search}%`);
    countQuery = countQuery.or(`title.ilike.%${search}%`);

    queryParams.append("search", String(search));
  } else {
    // Filter by parameters: category, make, model, year and price
    const {
      category,
      make,
      model,
      yearFrom,
      yearTo,
      currencyType = CURRENCY.ARS,
      priceFrom,
      priceTo,
    } = searchParams;

    if (category) {
      query = query.eq("category", category);
      countQuery = countQuery.eq("category", category);
      queryParams.append("category", String(category));
    }

    if (make) {
      query = query.eq("make", make);
      countQuery = countQuery.eq("make", make);
      queryParams.append("make", String(make));
    }

    if (model) {
      query = query.eq("model", model);
      countQuery = countQuery.eq("model", model);
      queryParams.append("model", String(model));
    }

    if (yearFrom) {
      query = query.gte("year", yearFrom);
      countQuery = countQuery.gte("year", yearFrom);
      queryParams.append("yearFrom", String(yearFrom));
    }

    if (yearTo) {
      query = query.lte("year", yearTo);
      countQuery = countQuery.lte("year", yearTo);
      queryParams.append("yearTo", String(yearTo));
    }

    if (priceFrom) {
      query = query.gte("price", parseInt(priceFrom));
      countQuery = countQuery.gte("price", parseInt(priceFrom));
      queryParams.append("priceFrom", String(priceFrom));
    }

    if (priceTo) {
      query = query.lte("price", parseInt(priceTo));
      countQuery = countQuery.lte("price", parseInt(priceTo));
      queryParams.append("priceTo", String(priceTo));
    }

    if (priceFrom || priceTo) {
      query = query.eq("currency_type", currencyType);
      countQuery = countQuery.eq("currency_type", currencyType);
      queryParams.append("currencyType", String(currencyType));
    }
  }

  // Fetch publications (including parameters and pagination) and total count of publications for pagination buttons (prev/next page)
  const [
    { data: publications, error: publicationsError },
    { count, error: countError },
  ] = await Promise.all([query, countQuery]);

  if (publicationsError || countError) {
    // TODO: handle error
    console.error(publicationsError || countError);
    return <p>Error</p>;
  }

  const showPrevPage = page > 0;
  const showNextPage = offset + limit < (count || 0);

  let prevPageUrl = undefined;
  let nextPageUrl = undefined;

  if (showPrevPage) {
    const prevPageParams = new URLSearchParams(queryParams);
    prevPageParams.set("page", String(page - 1));
    prevPageUrl = `/?${prevPageParams.toString()}`;
  }

  if (showNextPage) {
    const nextPageParams = new URLSearchParams(queryParams);
    nextPageParams.set("page", String(page + 1));
    nextPageUrl = `/?${nextPageParams.toString()}`;
  }

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

        <div className="mt-6 flex flex-wrap gap-4 mx-auto max-w-5xl">
          <Navigation
            hrefLeftOption={prevPageUrl}
            labelLeftOption="Anterior"
            leftOptionDisabled={!showPrevPage}
            labelRightOption="Siguiente"
            hrefRightOption={nextPageUrl}
            rightOptionDisabled={!showNextPage}
          />
        </div>
      </div>
    </section>
  );
}

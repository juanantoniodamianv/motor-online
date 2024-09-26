"use client";

import { useEffect, useState } from "react";

import { SubscriptionPlanEntity } from "../../types";
import { createClient } from "../../utils/supabase/client";
import CustomTable, { Row } from "../table";

export default function SubscriptionPlanList() {
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlanEntity[] | null
  >(null);
  const supabase = createClient();

  // TODO: mover a un hook
  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*");

      if (error) {
        console.error("Error fetching subscription plans:", error);
      } else {
        setSubscriptionPlans(data);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const columns = [
    { label: "Nombre", showHeader: true },
    { label: "Precio", showHeader: true },
    { label: "Cantidad de publicaciones", showHeader: true },
    { label: "Duración", showHeader: true },
  ];

  if (!subscriptionPlans) {
    return;
  }

  const rows: Row[][] = subscriptionPlans.map((plan) => {
    return [
      { value: plan.name, type: "text" },
      { value: plan.price ? plan.price.toString() : "N/A", type: "currency" },
      {
        value: plan.max_publications ? plan.max_publications.toString() : "N/A",
        type: "text",
      },
      {
        value: plan.duration_days ? plan.duration_days?.toString() : "N/A",

        type: "text",
      },
    ];
  });

  return (
    <div className="overflow-x-auto">
      <CustomTable columns={columns} rows={rows} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

import { SubscriptionPlanEntity } from "../../types";
import { createClient } from "../../utils/supabase/client";
import CustomTable from "../table";

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

  const columns = ["Nombre", "Precio", "Cantidad de publicaciones", "Duración"];

  if (!subscriptionPlans) {
    return;
  }

  const rows = subscriptionPlans.map((plan) => {
    return [
      { field: "Nombre", value: plan.name },
      { field: "Precio", value: plan.price ? plan.price.toString() : "N/A" },
      {
        field: "Cantidad de publicaciones",
        value: plan.max_publications ? plan.max_publications.toString() : "N/A",
      },
      {
        field: "Duración",
        value: plan.duration_days ? plan.duration_days?.toString() : "N/A",
      },
    ];
  });

  return (
    <div className="overflow-x-auto">
      <CustomTable columns={columns} rows={rows} />
    </div>
  );
}

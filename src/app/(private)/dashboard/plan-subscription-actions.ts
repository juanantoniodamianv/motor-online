import { SubscriptionPlanInsert } from "../../types";
import { sanitizeValue } from "../../utils/numbers";

import { createClient } from "../../utils/supabase/server";

type SubscriptionPlanField = {
  field: keyof SubscriptionPlanInsert;
  type?: "text" | "number";
  required: boolean;
};

export const subscriptionPlanModel: SubscriptionPlanField[] = [
  { field: "name", type: "text", required: true },
  { field: "price", type: "number", required: true },
  { field: "max_publications", type: "number", required: true },
  { field: "duration_days", type: "number", required: true },
];

export const getSubscriptionPlansFromDB = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("subscription_plans").select("*");

  if (error) {
    throw new Error(`Failed to fetch subscription plans: ${error.message}`);
  }

  return data;
};

export const createSubscriptionPlanInDB = async (
  rawFormData: Partial<SubscriptionPlanInsert>
) => {
  const supabase = createClient();
  // TODO: check types
  const { data, error } = await supabase
    .from("subscription_plans")
    .insert(rawFormData)
    .select();

  if (error || !data[0].id) {
    throw new Error(`Failed to create subscription plan: ${error?.message}`);
  }

  return data[0].id;
};

export const parseFormData = (
  formData: FormData
): Partial<SubscriptionPlanInsert> => {
  const rawFormData: Partial<SubscriptionPlanInsert> = {};

  for (const { field, required, type } of subscriptionPlanModel) {
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

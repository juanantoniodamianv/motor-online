"use server";

import {
  createSubscriptionPlanInDB,
  parseFormData,
} from "../plan-subscription-actions";

export async function createSubscriptionPlan(formData: FormData) {
  try {
    const rawFormData = parseFormData(formData);
    await createSubscriptionPlanInDB(rawFormData);
  } catch (error) {
    // Not allowed error
    if (
      error instanceof Error &&
      error.message.includes("new row violates row-level security policy")
    ) {
      // send message to client
      return;
    }
    // TODO: handle this error, show a popup message or so
    console.log(error);
  }
}

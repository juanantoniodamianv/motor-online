import { redirect } from "next/navigation";
import Link from "next/link";
import { Label, TextInput } from "flowbite-react";
import { HiBriefcase } from "react-icons/hi";

import { createClient } from "@/src/app/utils/supabase/server";
import InputNumber from "@/src/app/components/form/input-number";
import { createSubscriptionPlan } from "./action";
import { Button, buttonStyles } from "@/src/app/components/button";
import SubscriptionPlanList from "@/src/app/components/subscription-plans/subscription-plan-list";

export default async function Configurations() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiBriefcase className="inline mr-2" />
            Planes de suscripción
          </h2>

          <div className="grid grid-rows-1 grid-cols-1">
            <div className="flex justify-center min-h-10 mt-6 w-full">
              <form
                action={createSubscriptionPlan}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div className="mb-6 mt-6 grid grid-cols-1">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="name">Nombre del plan</Label>
                    <TextInput
                      id="name"
                      name="name"
                      // defaultValue={name}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6 mt-6 grid grid-cols-1">
                  <div className="col-span-2 sm:col-span-1">
                    <InputNumber
                      name="price"
                      label="Precio"
                      useThousandSeparator={true}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6 mt-6 grid grid-cols-1">
                  <div className="col-span-2 sm:col-span-1">
                    <InputNumber
                      name="max_publications"
                      label="Cantidad de publicaciones"
                      useThousandSeparator={false}
                      required
                    />
                  </div>
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Cantidad de publicaciones activas
                  </p>
                </div>

                <div className="mb-6 mt-6 grid grid-cols-1">
                  <div className="col-span-2 sm:col-span-1">
                    <InputNumber
                      name="duration_days"
                      label="Duración (en días)"
                      useThousandSeparator={false}
                      required
                    />
                  </div>
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Indicar la cantidad de días en que el plan estará activo
                  </p>
                </div>

                <div className="mb-6 flex justify-between">
                  <Link
                    href="/dashboard"
                    className={buttonStyles.link}
                    prefetch={false}
                  >
                    Cancelar
                  </Link>

                  <div className="flex space-x-4">
                    <Button type="submit" variant="primary">
                      Guardar
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="grid grid-rows-1 grid-cols-1">
            <SubscriptionPlanList />
          </div>
        </div>
      </div>
    </section>
  );
}

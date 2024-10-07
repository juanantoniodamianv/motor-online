import Link from "next/link";
import { Label, TextInput } from "flowbite-react";
import { HiBriefcase } from "react-icons/hi";

import InputNumber from "@/src/app/components/form/input-number";
import { Button, buttonStyles } from "@/src/app/components/button";
import SubscriptionPlanList from "@/src/app/components/subscription-plans/subscription-plan-list";

import { createSubscriptionPlan } from "./action";

export default async function SubscriptionPlan() {
  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiBriefcase className="inline mr-2" />
            Planes de suscripción
          </h2>

          <div className="w-full">
            <div className="w-full">
              <form
                action={createSubscriptionPlan}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="col-span-1">
                    <Label htmlFor="name">Nombre del plan</Label>
                    <TextInput id="name" name="name" required />
                  </div>

                  <div className="col-span-1">
                    <InputNumber
                      name="price"
                      label="Precio"
                      useThousandSeparator={true}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                  <div className="col-span-1">
                    <InputNumber
                      name="max_publications"
                      label="Cantidad de publicaciones"
                      useThousandSeparator={false}
                      required
                    />
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      Cantidad de publicaciones activas
                    </p>
                  </div>

                  <div className="col-span-1">
                    <InputNumber
                      name="duration_days"
                      label="Duración (en días)"
                      useThousandSeparator={false}
                      required
                    />
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      Indicar la cantidad de días en que el plan estará activo
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Link
                    href="/dashboard"
                    className={buttonStyles.link}
                    prefetch={false}
                  >
                    Cancelar
                  </Link>
                  <Button type="submit" variant="primary">
                    Guardar
                  </Button>
                </div>
              </form>
            </div>

            <div className="w-full mt-8">
              <SubscriptionPlanList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

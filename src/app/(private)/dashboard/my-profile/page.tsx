import { redirect } from "next/navigation";
import Image from "next/image";
import { HiUser } from "react-icons/hi";
import { Label, TextInput } from "flowbite-react";
import Link from "next/link";

import { createClient } from "@/src/app/utils/supabase/server";

export default async function MyProfile() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const avatarUrl = data.user.user_metadata.avatar_url;
  const name = data.user.user_metadata.full_name;
  const email = data.user.user_metadata.email;
  const phone = undefined;
  const phoneWp = undefined;

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiUser className="inline mr-2" />
            Mi Perfil
          </h2>

          <div className="grid grid-rows-1 grid-cols-1">
            <div className="flex justify-center min-h-10 mt-6 w-full">
              <form
                action=""
                className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
              >
                {avatarUrl && (
                  <Image
                    src={avatarUrl}
                    width={70}
                    height={70}
                    alt="Picture of the account"
                    className="rounded-full"
                    unoptimized
                  />
                )}

                <div className="mb-6 mt-6 grid grid-cols-1">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="title">Nombre</Label>
                    <TextInput
                      id="name"
                      name="name"
                      defaultValue={name}
                      readOnly
                      required
                    />
                  </div>
                </div>

                <div className="mb-6 mt-6 grid grid-cols-1">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="title">Correo Electrónico</Label>
                    <TextInput
                      id="email"
                      name="email"
                      defaultValue={email}
                      readOnly
                      required
                    />
                  </div>
                </div>

                <div className="mb-6 mt-6 grid grid-cols-1">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="phone">Teléfono (SMS)</Label>
                    <TextInput
                      id="phone"
                      name="phone"
                      defaultValue={phone}
                      readOnly
                      required
                    />
                  </div>
                </div>

                <div className="mb-6 mt-6 grid grid-cols-1">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="phone-wp">Teléfono (Whatsapp)</Label>
                    <TextInput
                      id="phone-wp"
                      name="phone-wp"
                      defaultValue={phoneWp}
                      readOnly
                      aria-describedby="helper-text-explanation"
                      required
                    />
                  </div>
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Los teléfonos deben coincidir con el formato de su país.
                    <br />
                    Nombre, Correo Electrónico y Teléfonos serán visibles en sus
                    publicaciones.
                  </p>
                </div>

                <div className="mb-6 flex justify-between">
                  <Link
                    href="/dashboard"
                    className="text-green-700 hover:text-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-green-400 dark:hover:text-green-500 dark:focus:ring-green-900"
                    prefetch={false}
                  >
                    Volver al Inicio
                  </Link>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="cursor-not-allowed text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800"
                      disabled
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

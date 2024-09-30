import { redirect } from "next/navigation";
import { HiCollection } from "react-icons/hi";

import useServerUser from "@/src/app/hooks/useServerUser";
import MyPublicationsList from "@/src/app/components/publication/my-publication-list";

export default async function MyPublications() {
  const { error, isAuthenticated, user } = await useServerUser();

  if (error || !isAuthenticated) {
    redirect("/login");
  }

  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            <HiCollection className="inline" /> Mis Publicaciones
          </h2>
        </div>

        {user?.id && (
          <div className="flex flex-wrap gap-4 mx-auto max-w-5xl">
            <MyPublicationsList userId={user.id} />
          </div>
        )}
      </div>
    </section>
  );
}

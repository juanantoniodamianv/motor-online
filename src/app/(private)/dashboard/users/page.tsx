import { redirect } from "next/navigation";
import { HiUserGroup } from "react-icons/hi";

import { createClient } from "@/src/app/utils/supabase/server";
import UsersList from "@/src/app/components/users/users-list";

export default async function Users() {
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
            <HiUserGroup className="inline mr-2" />
            Usuarios
          </h2>

          <div className="w-full">
            <UsersList />
          </div>
        </div>
      </div>
    </section>
  );
}

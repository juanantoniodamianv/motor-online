import { redirect } from "next/navigation";

import useServerUser from "@/src/app/hooks/useServerUser";

export default async function AllPublications() {
  const { error, isAuthenticated } = await useServerUser();

  if (error || !isAuthenticated) {
    redirect("/login");
  }

  return <p>All publications page</p>;
}

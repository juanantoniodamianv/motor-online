import { redirect } from "next/navigation";

import useServerUser from "@/src/app/hooks/useServerUser";

export default async function PrivatePage() {
  const { error, isAuthenticated, user } = await useServerUser();

  if (error || !isAuthenticated) {
    redirect("/login");
  }

  return <p>Hello {user?.email}, this is your dashboard</p>;
}

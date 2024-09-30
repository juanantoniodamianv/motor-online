import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SidebarProvider } from "@/src/context/sidebar-context";
import { DashboardLayoutContent } from "@/src/app/components/private-layout/layout-content";
import useServerUser from "@/src/app/hooks/useServerUser";

import "@/src/app/globals.css";

export const metadata: Metadata = {
  title: "Motor Online - Dashboard",
};

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { error, isAuthenticated, user } = await useServerUser();

  if (error || !isAuthenticated) {
    redirect("/login");
  }

  // TODO: default profile image here
  const avatarUrl = user?.avatar_url;

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <DashboardLayoutContent avatarUrl={avatarUrl}>
            {children}
          </DashboardLayoutContent>
        </SidebarProvider>
      </body>
    </html>
  );
}

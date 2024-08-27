import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SidebarProvider } from "@/src/context/sidebar-context";
import { DashboardLayoutContent } from "@/src/app/components/dashboard-layout-content";
import { createClient } from "@/src/app/utils/supabase/server";

import "../../globals.css";

export const metadata: Metadata = {
  title: "Motor Online - Dashboard",
};

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const avatarUrl = data.user.user_metadata.avatar_url;

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

import type { Metadata } from "next";

import { AuthProvider } from "@/src/context/auth-context";
import { SidebarProvider } from "@/src/context/sidebar-context";
import { DashboardLayoutContent } from "@/src/app/components/private-layout/layout-content";

import "@/src/app/globals.css";

export const metadata: Metadata = {
  title: "Motor Online - Dashboard",
};

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SidebarProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

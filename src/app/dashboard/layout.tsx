import type { Metadata } from "next";

import { SidebarProvider } from "@/src/context/sidebar-context";
import { DashboardLayoutContent } from "@/src/components/dashboard-layout-content";

import "../globals.css";

export const metadata: Metadata = {
  title: "Motor Online - Dashboard",
};

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}

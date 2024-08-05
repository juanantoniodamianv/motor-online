"use client";

import type { FC, PropsWithChildren } from "react";
import { useSidebarContext } from "@/src/context/sidebar-context";
import { twMerge } from "tailwind-merge";
import { DashboardNavbar } from "@/src/components/navbar";
import { DashboardSidebar } from "@/src/components/sidebar";

export const DashboardLayoutContent: FC<PropsWithChildren> = function ({
  children,
}) {
  const { isCollapsed } = useSidebarContext();

  return (
    <>
      <DashboardNavbar />
      <div className="mt-16 flex items-start">
        <DashboardSidebar />
        <div
          id="main-content"
          className={twMerge(
            "relative h-full w-full overflow-y-auto",
            isCollapsed ? "lg:ml-[4.5rem]" : "lg:ml-64"
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

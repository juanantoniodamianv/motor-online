"use client";

import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { useSidebarContext } from "@/src/context/sidebar-context";

import { DashboardNavbar } from "@/src/app/components/navbar";
import { DashboardSidebar } from "@/src/app/components/sidebar-client";

type DashboardLayoutContentProps = PropsWithChildren<{
  avatarUrl: string;
}>;

export const DashboardLayoutContent: FC<DashboardLayoutContentProps> =
  function ({ children, avatarUrl }) {
    const { isCollapsed } = useSidebarContext();
    const [sidebarClass, setSidebarClass] = useState<string>(
      "lg:ml-64" // Default value matching server-side
    );

    // Adjust class based on collapse state after mount
    useEffect(() => {
      if (isCollapsed) {
        setSidebarClass("lg:ml-[4.5rem]");
      } else {
        setSidebarClass("lg:ml-64");
      }
    }, [isCollapsed]);

    return (
      <>
        <DashboardNavbar avatarUrl={avatarUrl} />
        <div className="mt-16 flex items-start">
          <DashboardSidebar />
          <div
            id="main-content"
            className={twMerge(
              "relative h-full w-full overflow-y-auto",
              sidebarClass
            )}
          >
            {children}
          </div>
        </div>
      </>
    );
  };

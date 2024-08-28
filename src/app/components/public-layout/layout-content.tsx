"use client";

import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import { useSidebarContext } from "@/src/context/sidebar-context";
import Navbar from "@/src/app/components/navbar";
import { PublicSidebar } from "@/src/app/components/public-layout/sidebar-client";

type PublicLayoutContentProps = PropsWithChildren<{
  avatarUrl?: string;
}>;

export const PublicLayoutContent: FC<PublicLayoutContentProps> = function ({
  children,
  avatarUrl,
}) {
  const { isCollapsed } = useSidebarContext();
  const [sidebarClass, setSidebarClass] = useState<string>(
    "lg:ml-64" // Default value matching server-side
  );

  // Adjust class based on collapse state after mount
  useEffect(() => {
    if (isCollapsed) {
      setSidebarClass("lg:ml-[4.0rem]");
    } else {
      setSidebarClass("lg:ml-64");
    }
  }, [isCollapsed]);

  return (
    <>
      <Navbar avatarUrl={avatarUrl} />
      <div className="mt-16 flex items-start">
        <PublicSidebar />
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

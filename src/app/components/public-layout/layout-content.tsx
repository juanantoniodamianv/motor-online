"use client";

import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import { useSidebarContext } from "@/src/context/sidebar-context";
import Navbar from "@/src/app/components/navbar";
import Sidebar from "./sidebar";
import { useAuthContext } from "@/src/context/auth-context";

type PublicLayoutContentProps = PropsWithChildren<{}>;

export const PublicLayoutContent: FC<PublicLayoutContentProps> = function ({
  children,
}) {
  const { isAuthenticated } = useAuthContext();
  // Display sidebar and menu button for authenticated users only
  const { isCollapsed } = useSidebarContext();
  const [sidebarClass, setSidebarClass] = useState<
    "lg:ml-[4.0rem]" | "lg:ml-64"
  >("lg:ml-64");

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
      <Navbar />
      <div className="mt-16 flex items-start">
        <Sidebar />
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

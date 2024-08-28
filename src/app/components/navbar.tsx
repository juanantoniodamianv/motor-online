import type { FC } from "react";
import Image from "next/image";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { DarkThemeToggle, Navbar as FlowbiteNavbar } from "flowbite-react";

import { useSidebarContext } from "@/src/context/sidebar-context";
import { isSmallScreen } from "@/src/helpers";

type NavbarProps = {
  avatarUrl?: string;
};

export default function Navbar({ avatarUrl }: NavbarProps) {
  const { isCollapsed: isSidebarCollapsed, setCollapsed: setSidebarCollapsed } =
    useSidebarContext();

  return (
    <header>
      <FlowbiteNavbar
        fluid
        className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white p-0 dark:border-gray-700 dark:bg-gray-800 sm:p-0"
      >
        <div className="w-full p-3 pr-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                aria-controls="sidebar"
                aria-expanded
                className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
              >
                {isSidebarCollapsed || !isSmallScreen() ? (
                  <HiMenuAlt1 className="h-6 w-6" />
                ) : (
                  <HiX className="h-6 w-6" />
                )}
              </button>
              <FlowbiteNavbar.Brand href="/">
                <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
                  Motor Online
                </span>
                {avatarUrl && (
                  <Image
                    loader={() => avatarUrl}
                    src={avatarUrl}
                    width={30}
                    height={30}
                    alt="Picture of the account"
                    className="rounded-full"
                    unoptimized
                  />
                )}
              </FlowbiteNavbar.Brand>
            </div>
            <DarkThemeToggle />
          </div>
        </div>
      </FlowbiteNavbar>
    </header>
  );
}

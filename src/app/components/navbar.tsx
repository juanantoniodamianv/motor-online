import Image from "next/image";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { DarkThemeToggle, Navbar as FlowbiteNavbar } from "flowbite-react";

import { useSidebarContext } from "@/src/context/sidebar-context";
import { isSmallScreen } from "@/src/helpers";
import Link from "next/link";

type NavbarProps = {
  avatarUrl?: string;
  authenticated: boolean;
};

export default function Navbar({ avatarUrl, authenticated }: NavbarProps) {
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
              {authenticated && (
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
              )}

              <FlowbiteNavbar.Brand href="/">
                <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
                  Motor Online
                </span>
                {authenticated && avatarUrl && (
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
            <div className="flex items-center">
              {!authenticated && (
                <Link
                  href="/login"
                  className="text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Iniciar Sesión
                </Link>
              )}
              {authenticated && <DarkThemeToggle />}
            </div>
          </div>
        </div>
      </FlowbiteNavbar>
    </header>
  );
}

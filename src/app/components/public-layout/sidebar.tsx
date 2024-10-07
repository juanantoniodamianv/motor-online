"use client";

import Link from "next/link";
import { Sidebar } from "flowbite-react";
import { HiDotsHorizontal, HiPencilAlt } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { useSidebarContext } from "@/src/context/sidebar-context";
import { useAuthContext } from "@/src/context/auth-context";
import SignInButton from "../sign-in-button";
import SignOutButton from "../sign-out-button";

export default function CustomSidebar() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return null;
  }

  const { isCollapsed } = useSidebarContext();
  const pathname = usePathname();

  const links: { name: string; href: string; icon: any; animate?: boolean }[] =
    [
      {
        name: "Nueva Publicación",
        href: "/dashboard/new-publication",
        icon: HiPencilAlt,
        animate: true,
      },
      {
        name: "Más Configuraciones",
        href: "/dashboard",
        icon: HiDotsHorizontal,
      },
    ];

  return (
    <Sidebar
      collapsed={isCollapsed}
      id="sidebar"
      className={twMerge(
        "fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
        isCollapsed && "hidden lg:block w-16"
      )}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {links.map((l, key) => (
            <Sidebar.Item
              as={Link}
              href={l.href}
              prefetch={false}
              icon={() => (
                <l.icon
                  className={twMerge(
                    "h-6 w-6",
                    l.animate && "animate-color-change"
                  )}
                />
              )}
              className={twMerge(
                "flex justify-start",
                pathname === l.href &&
                  "bg-green-700 text-white hover:bg-green-700 text-white",
                pathname !== l.href && "hover:bg-green-300"
              )}
              key={key}
            >
              {l.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          {isAuthenticated && <SignOutButton />}
          {!isAuthenticated && <SignInButton />}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

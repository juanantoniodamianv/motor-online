import Link from "next/link";
import { Sidebar } from "flowbite-react";
import { HiDotsHorizontal, HiPencilAlt } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { useSidebarContext } from "@/src/context/sidebar-context";
import SignOutButton from "@/src/app/components/sign-out-button";
import SignInButton from "../sign-in-button";

export default function PublicSidebar({
  authenticated,
}: {
  authenticated: boolean;
}) {
  const { isCollapsed } = useSidebarContext();
  const pathname = usePathname();

  const links: { name: string; href: string; icon: any; animate?: boolean }[] =
    [];

  if (authenticated) {
    links.push({
      name: "Nueva Publicación",
      href: "/dashboard/new-publication",
      icon: HiPencilAlt,
      animate: true,
    });
    links.push({
      name: "Más Configuraciones",
      href: "/dashboard",
      icon: HiDotsHorizontal,
    });
  }

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
                    "h-6 w-6", // Tamaño del ícono
                    l.animate && "animate-color-change" // Aplicar animación si animate es true
                  )}
                />
              )}
              className={twMerge(
                "flex justify-start",
                pathname === l.href &&
                  "bg-green-700 text-white hover:bg-green-700 text-white", // Ensure hover styles are consistent
                pathname !== l.href && "hover:bg-green-300" // Add hover effect for non-active items
              )}
              key={key}
            >
              {l.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          {authenticated && <SignOutButton />}
          {!authenticated && <SignInButton />}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

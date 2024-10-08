import Link from "next/link";
import { Sidebar } from "flowbite-react";
import {
  HiHome,
  HiPencilAlt,
  HiCollection,
  HiHeart,
  HiUser,
  HiMail,
  HiOutlineAdjustments,
  HiUserGroup,
  HiBriefcase,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { useSidebarContext } from "@/src/context/sidebar-context";
import SignOutButton from "@/src/app/components/sign-out-button";
import { useAuthContext } from "@/src/context/auth-context";

export default function DashboardSidebar() {
  const { isCollapsed } = useSidebarContext();
  const pathname = usePathname();
  const { isAdmin } = useAuthContext();

  let links = [
    { name: "Mi Panel", href: "/dashboard", icon: HiOutlineAdjustments },
    {
      name: "Nueva Publicación",
      href: "/dashboard/new-publication",
      icon: HiPencilAlt,
    },
    {
      name: "Mis Publicaciones",
      href: "/dashboard/my-publications",
      icon: HiCollection,
    },

    { name: "Mis Favoritos", href: "/dashboard/my-favorites", icon: HiHeart },
    { name: "Mi Perfil", href: "/dashboard/my-profile", icon: HiUser },
    { name: "Mensajes", href: "/dashboard/messages", icon: HiMail },
  ];

  if (isAdmin) {
    links.push({
      name: "Lista de usuarios",
      href: "/dashboard/users",
      icon: HiUserGroup,
    });

    links.push({
      name: "Todas las publicaciones",
      href: "/dashboard/all-publications",
      icon: HiCollection,
    });

    links.push({
      name: "Planes de suscripción",
      href: "/dashboard/subscription-plans",
      icon: HiBriefcase,
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
              icon={l.icon}
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
          <Sidebar.Item
            as={Link}
            href="/"
            prefetch={false}
            icon={HiHome}
            className="flex justify-start hover:bg-green-300"
          >
            Volver al Inicio
          </Sidebar.Item>
          <SignOutButton />
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

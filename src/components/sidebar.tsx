import { useSidebarContext } from "@/src/context/sidebar-context";
import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import {
  HiHome,
  HiPencilAlt,
  HiCollection,
  HiHeart,
  HiUser,
  HiUserGroup,
  HiCog,
  HiLogout,
  HiMail,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export const DashboardSidebar: FC = function () {
  const { isCollapsed } = useSidebarContext();

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      collapsed={isCollapsed}
      id="sidebar"
      className={twMerge(
        "fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
        isCollapsed && "hidden w-16"
      )}
    >
      <Sidebar.Items>
        {/* First Group: Main Navigation */}
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiHome} className="flex justify-start">
            Inicio
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiPencilAlt}
            className="flex justify-start"
          >
            Nueva Publicación
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiCollection}
            className="flex justify-start"
          >
            Mis Publicaciones
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser} className="flex justify-start">
            Todas las Publicaciones
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiHeart} className="flex justify-start">
            Mis Favoritos
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        {/* Second Group: User Profile */}
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiUser} className="flex justify-start">
            Mi Perfil
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiMail} className="flex justify-start">
            Mensajes
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        {/* Third Group: Administration and Settings */}
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="#"
            icon={HiUserGroup}
            className="flex justify-start"
          >
            Usuarios
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiCog} className="flex justify-start">
            Configuraciones
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiLogout} className="flex justify-start">
            Cerrar Sesión
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

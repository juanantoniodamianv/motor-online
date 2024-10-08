"use client";

import { useUsers } from "@/src/app/hooks/useUsers";
import CustomTable, { Row } from "@/src/app/components/table";

export default function UsersList() {
  const { error, users } = useUsers();

  if (!users) {
    return <div className="overflow-x-auto">Cargando usuarios</div>;
  }

  if (error) {
    return (
      <div className="overflow-x-auto">
        Ha ocurrido un error al cargar los usuarios
      </div>
    );
  }

  const columns = [
    { label: "Avatar", showHeader: false },
    { label: "Nombre", showHeader: true },
    { label: "Email", showHeader: true },
    { label: "Rol", showHeader: true },
  ];

  const rows: Row[][] = users.map((user) => {
    return [
      { value: user.avatar_url ? user.avatar_url : "", type: "image-url" },
      { value: user.name ? user.name : "", type: "text" },
      { value: user.email ? user.email : "", type: "text" },
      { value: user.role ? user.role : "", type: "text" },
    ];
  });

  return (
    <div className="overflow-x-auto">
      <CustomTable columns={columns} rows={rows} />
    </div>
  );
}

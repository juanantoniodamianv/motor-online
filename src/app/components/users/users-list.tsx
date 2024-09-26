"use client";

import { useEffect, useState } from "react";

import { User } from "../../types";
import { createClient } from "../../utils/supabase/client";
import CustomTable, { Row } from "../table";

export default function UsersList() {
  const [users, setUsers] = useState<User[] | null>(null);
  const supabase = createClient();

  // TODO: mover a un hook
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { label: "Avatar", showHeader: false },
    { label: "Nombre", showHeader: true },
    { label: "Email", showHeader: true },
    { label: "Rol", showHeader: true },
  ];

  if (!users) {
    return;
  }

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

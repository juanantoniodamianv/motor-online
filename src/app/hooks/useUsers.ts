import { useEffect, useState } from "react";

import { User } from "@/src/app/types";
import { createClient } from "@/src/app/utils/supabase/client";

export function useUsers() {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");

        if (error) {
          setError(error.message);
        } else {
          setUsers(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch users");
        }
      }
    };

    fetchUsers();
  }, []);

  return { error, users };
}

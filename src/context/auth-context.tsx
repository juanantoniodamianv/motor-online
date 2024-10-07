"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { createClient } from "@/src/app/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { User } from "@/src/app/types";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<AuthError | string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  const fetchUser = async () => {
    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError !== null) {
        throw authError;
      }

      const userAuthenticated = !!authData?.user;

      if (!userAuthenticated) {
        setIsAuthenticated(false);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (userError !== null) {
        throw userError;
      }

      const user = userData;
      const adminStatus = user?.role === "admin";

      setIsAuthenticated(true);
      setIsAdmin(adminStatus);
      setUser(user);
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message);
        setIsAuthenticated(false);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ error, isAuthenticated, isAdmin, user, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the User context
export const useAuthContext = () => {
  return useContext(AuthContext);
};
